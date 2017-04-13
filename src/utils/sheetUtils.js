import {ALPHABET, expandAddrRange, getAddrFromCoor, absoluteRange} from './coordinateUtils';

export const canCoerceToNumber = n => !isNaN(parseFloat(n)) && isFinite(n);

export const coerceToNumber = n => (canCoerceToNumber(n) ? parseFloat(n) : n);

export const isFormula = value => (
  typeof value === 'string' && value.charAt(0) === '='
);

export const canInsertCellRefAfterChar = char => {
  return /[+\-*/()=,]/.test(char);
};

export const capitalizeExpression = expr => (
  expr.replace(/sum|average|[a-z]\d{1,2}/gi, match => match.toUpperCase())
);

export const sanitizeExpression = expr => {
  return expr
    
    .replace(/[^+\-*/().,:\dA-Z]/g, '')
    
    .replace(/[A-Z]{2,}/g, v => (['SUM', 'AVERAGE'].includes(v) ? v : ''))
    
    .replace(/[A-Z]\d{1,2}:[A-Z]\d{1,2}/g, v => expandAddrRange(v));
};

export const computeSheet = sheet => {
  
  const cellMap = sheet.reduce((acc, row, rowIndex) => (
    row.reduce((acc, cell, cellIndex) => {
      acc['_' + getAddrFromCoor([rowIndex, cellIndex])] = cell.get('raw');
      return acc;
    }, acc)
  ), {});

  cellMap.SUM = (...values) => values.reduce((a, v) => a + v, 0);
  cellMap.AVERAGE = (...values) => values.reduce((a, v) => a + v, 0) / values.length;

  const evalFunc = new Function('obj', 'expr', 'with (obj) {return eval(expr)}');

  let isComputingFormula = false;

  Object.keys(cellMap).forEach(cellKey => {
    Object.defineProperty(cellMap, cellKey.substring(1), {
      get: () => {
        const cellVal = cellMap[cellKey];

        if (isFormula(cellVal)) {
          if (cellVal.length === 1) {
            throw new Error('Empty formula');
          }
          
          const expr = sanitizeExpression(cellVal.substring(1));
          const newCellVal = evalFunc(cellMap, expr);

          if (typeof newCellVal === 'undefined') {
            throw new Error('Bad formula');
          }

          return newCellVal;
        }

        if (isComputingFormula && typeof cellVal === 'string') {
          return 0;
        }

        return cellVal;
      },
    });
  });

  const newSheet = sheet.map((row, rowIndex) => {
    return row.map((cell, cellIndex) => {
      let computedVal;

      isComputingFormula = isFormula(cell.get('raw'));

      try {
        computedVal = cellMap[getAddrFromCoor([rowIndex, cellIndex])];
      } catch (error) {
        computedVal = '#ERROR!';
      }

      isComputingFormula = false;

      return cell.set('val', computedVal.toString());
    });
  });

  return newSheet;
};

export const autofillSheet = (sheet, range) => {
  const originCoor = range[0];
  const originValue = sheet.getIn([...range[0], 'raw']);
  const originStyle = sheet.getIn([...range[0], 'style']);
  const pRange = absoluteRange(range);
  let newSheet = sheet;

  for (let rowIndex = pRange[0][0]; rowIndex <= pRange[1][0]; rowIndex++) {
    for (let cellIndex = pRange[0][1]; cellIndex <= pRange[1][1]; cellIndex++) {
      const offset = [
        rowIndex - originCoor[0],
        cellIndex - originCoor[1],
      ];

      let newValue;
      if (isFormula(originValue)) {
        newValue = originValue.replace(/([A-Z])(\d{1,2})/g, (match, colAddr, rowAddr) => {
          // TODO: we can use getAddrFromCoor here
          const newColAddr = ALPHABET[ALPHABET.indexOf(colAddr) + offset[1]];
          const newRowAddr = (parseInt(rowAddr) + offset[0]);
          return newColAddr + newRowAddr;
        });
      } else {
        newValue = originValue;
      }

      newSheet = newSheet.setIn([rowIndex, cellIndex, 'raw'], newValue);
      newSheet = newSheet.setIn([rowIndex, cellIndex, 'style'], originStyle);
    }
  }

  return newSheet;
};


export const getSheetExtent = sheetData => {
  const maxRows = sheetData.size - 1;
  const maxCols = sheetData.get(0).size - 1;
  return [[0, 0], [maxRows, maxCols]];
};
