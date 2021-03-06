import {ActionCreators} from 'redux-undo';

import {isFormula, getSheetExtent} from '../utils/sheetUtils';
import {translateCoor, translationIdentities} from '../utils/coordinateUtils';
import {
  changedPrimarySelectedCoor,
  startedSelectingRange,
  stoppedSelectingRange,
  changedSelectedRange,
  changedSelectedRangeEnd,
  startedEditingCell,
  committedEditValue,
  deletedRange,
  updatedEditStyleValue,
  addNewRow,
  addNewColumn,
  exportCSVData,
  exportJSONData,
  clearSheetData
} from './sheetReducer';

export const cellMouseDown = coor => (dispatch, getState) => {
  const sheet = getState().present.getIn(['sheet']);
  if (sheet.get('editMode') !== 'none') {
    if (isFormula(sheet.get('editValue'))) {
      dispatch(startedSelectingRange('formula', coor));
      return;
    }
    dispatch(committedEditValue());
  }
  dispatch(startedSelectingRange('basic', coor));
  dispatch(changedPrimarySelectedCoor(coor));
};

export const cellMouseOver = coor => (dispatch, getState) => {
  const sheet = getState().present.getIn(['sheet']);
  if (sheet.get('isSelectingRange')) {
    dispatch(changedSelectedRangeEnd(coor));
  }
};

export const cellMouseUp = () => dispatch => {
  dispatch(stoppedSelectingRange());
};

export const cellShiftMouseDown = coor => dispatch => {
  dispatch(changedSelectedRangeEnd(coor));
};

export const cellDoubleClick = coor => dispatch => {
  dispatch(startedEditingCell('full', coor));
};

export const autofillMouseDown = coor => dispatch => {
  dispatch(startedSelectingRange('autofill', coor));
};

export const autofillMouseUp = () => dispatch => {
  dispatch(stoppedSelectingRange());
};

export const documentMouseUp = () => (dispatch, getState) => {
  if (getState().present.getIn(['sheet', 'isSelectingRange'])) {
    dispatch(stoppedSelectingRange());
  }
};

export const tableKeyEnter = shiftKey => (dispatch, getState) => {
  const sheet = getState().present.getIn(['sheet']);
  if (sheet.get('editMode') === 'none') {
    dispatch(startedEditingCell('full', sheet.get('primarySelectedCoor')));
  } else {
    const translationIdentity = shiftKey ? translationIdentities.up : translationIdentities.down;
    const newCoor = translateCoor(sheet.get('primarySelectedCoor').toJS(), translationIdentity);
    dispatch(committedEditValue());
    dispatch(changedPrimarySelectedCoor(newCoor));
  }
};

export const tableKeyShiftEnter = () => dispatch => {
  dispatch(tableKeyEnter(true));
};

export const tableKeyTab = shiftKey => (dispatch, getState) => {
  const sheet = getState().present.getIn(['sheet']);
  const translationIdentity = shiftKey ? translationIdentities.left : translationIdentities.right;
  const newCoor = translateCoor(sheet.get('primarySelectedCoor').toJS(), translationIdentity);
  if (sheet.get('editMode') === 'none') {
    dispatch(changedPrimarySelectedCoor(newCoor));
  } else {
    dispatch(committedEditValue());
    dispatch(changedPrimarySelectedCoor(newCoor));
  }
};

export const tableKeyShiftTab = () => dispatch => {
  dispatch(tableKeyTab(true));
};

export const tableKeyEsc = () => (dispatch, getState) => {
  const sheet = getState().present.getIn(['sheet']);
  if (sheet.get('editMode') !== 'none') {
    dispatch(ActionCreators.undo());
  }
};

export const tableKeyDelete = () => (dispatch, getState) => {
  const sheet = getState().present.getIn(['sheet']);
  dispatch(deletedRange(sheet.get('selectedRange').toJS()));
};

export const tableKeyArrow = direction => (dispatch, getState) => {
  const sheet = getState().present.getIn(['sheet']);
  if (sheet.get('editMode') === 'quick') {
    dispatch(committedEditValue());
  }
  if (sheet.get('editMode') !== 'full') {
    const currentCoor = sheet.get('primarySelectedCoor').toJS();
    const translationIdentity = translationIdentities[direction];
    const newCoor = translateCoor(currentCoor, translationIdentity);
    dispatch(changedPrimarySelectedCoor(newCoor));
  }
};

export const tableKeyUp = () => dispatch => {
  dispatch(tableKeyArrow('up'));
};

export const tableKeyDown = () => dispatch => {
  dispatch(tableKeyArrow('down'));
};

export const tableKeyLeft = () => dispatch => {
  dispatch(tableKeyArrow('left'));
};

export const tableKeyRight = () => dispatch => {
  dispatch(tableKeyArrow('right'));
};

export const tableKeyShiftArrow = direction => (dispatch, getState) => {
  const sheet = getState().present.getIn(['sheet']);
  if (sheet.get('editMode') === 'quick') {
    dispatch(committedEditValue());
  } else if (sheet.get('editMode') === 'none') {
    const currentEndCoor = sheet.getIn(['selectedRange', 1]).toJS();
    const translationIdentity = translationIdentities[direction];
    const newCoor = translateCoor(currentEndCoor, translationIdentity);
    dispatch(changedSelectedRangeEnd(newCoor));
  }
};

export const tableKeyShiftUp = () => dispatch => {
  dispatch(tableKeyShiftArrow('up'));
};

export const tableKeyShiftDown = () => dispatch => {
  dispatch(tableKeyShiftArrow('down'));
};

export const tableKeyShiftLeft = () => dispatch => {
  dispatch(tableKeyShiftArrow('left'));
};

export const tableKeyShiftRight = () => dispatch => {
  dispatch(tableKeyShiftArrow('right'));
};

export const tableSelectAll = () => (dispatch, getState) => {
  const sheet = getState().present.getIn(['sheet']);
  if (sheet.get('editMode') === 'none') {
    const extent = getSheetExtent(sheet.get('data'));
    dispatch(changedSelectedRange('basic', extent));
  }
};

export const tableKeyCmdUp = () => (dispatch, getState) => {
  const sheet = getState().present.getIn(['sheet']);
  const newCoor = sheet.get('primarySelectedCoor').set(0, 0).toJS();
  dispatch(changedPrimarySelectedCoor(newCoor));
};

export const tableKeyCmdDown = () => (dispatch, getState) => {
  const sheet = getState().present.getIn(['sheet']);
  const extent = getSheetExtent(sheet.get('data'));
  const newCoor = sheet.get('primarySelectedCoor').set(0, extent[1][0]).toJS();
  dispatch(changedPrimarySelectedCoor(newCoor));
};

export const tableKeyCmdLeft = () => (dispatch, getState) => {
  const sheet = getState().present.getIn(['sheet']);
  const newCoor = sheet.get('primarySelectedCoor').set(1, 0).toJS();
  dispatch(changedPrimarySelectedCoor(newCoor));
};

export const tableKeyCmdRight = () => (dispatch, getState) => {
  const sheet = getState().present.getIn(['sheet']);
  const extent = getSheetExtent(sheet.get('data'));
  const newCoor = sheet.get('primarySelectedCoor').set(1, extent[1][1]).toJS();
  dispatch(changedPrimarySelectedCoor(newCoor));
};

export const tableKeyCmdShiftUp = () => (dispatch, getState) => {
  const sheet = getState().present.getIn(['sheet']);
  const newEndCoor = sheet.getIn(['selectedRange', 1]).set(0, 0).toJS();
  dispatch(changedSelectedRangeEnd(newEndCoor));
};

export const tableKeyCmdShiftDown = () => (dispatch, getState) => {
  const sheet = getState().present.getIn(['sheet']);
  const extent = getSheetExtent(sheet.get('data'));
  const newEndCoor = sheet.getIn(['selectedRange', 1]).set(0, extent[1][0]).toJS();
  dispatch(changedSelectedRangeEnd(newEndCoor));
};

export const tableKeyCmdShiftLeft = () => (dispatch, getState) => {
  const sheet = getState().present.getIn(['sheet']);
  const newEndCoor = sheet.getIn(['selectedRange', 1]).set(1, 0).toJS();
  dispatch(changedSelectedRangeEnd(newEndCoor));
};

export const tableKeyCmdShiftRight = () => (dispatch, getState) => {
  const sheet = getState().present.getIn(['sheet']);
  const extent = getSheetExtent(sheet.get('data'));
  const newEndCoor = sheet.getIn(['selectedRange', 1]).set(1, extent[1][1]).toJS();
  dispatch(changedSelectedRangeEnd(newEndCoor));
};

export const tableKeyOther = () => (dispatch, getState) => {
  const sheet = getState().present.getIn(['sheet']);
  dispatch(startedEditingCell('quick', sheet.get('primarySelectedCoor').toJS()));
};

export const tableUndo = () => dispatch => {
  dispatch(ActionCreators.undo());
};

export const tableRedo = () => dispatch => {
  dispatch(ActionCreators.redo());
};
export const cellBold = () => (dispatch, getState) => {
  const sheet = getState().present.getIn(['sheet']);
  const pos = sheet.get('primarySelectedCoor').toJS();
  dispatch(updatedEditStyleValue({pos:pos,style:'bold',index:0}));
};
export const cellItalic = () => (dispatch, getState) => {
  const sheet = getState().present.getIn(['sheet']);
  const pos = sheet.get('primarySelectedCoor').toJS();
  dispatch(updatedEditStyleValue({pos:pos,style:'italic',index:1}));
};
export const cellUnderline = () => (dispatch, getState) => {
  const sheet = getState().present.getIn(['sheet']);
  const pos = sheet.get('primarySelectedCoor').toJS();
  dispatch(updatedEditStyleValue({pos:pos,style:'underline',index:2}));
};
export const addRow = () => (dispatch) => {
  dispatch(addNewRow());
};
export const addColumn = () => (dispatch) => {
  dispatch(addNewColumn());
};
export const exportCSV = () => (dispatch) => {
  dispatch(exportCSVData());
};
export const exportJSON = () => (dispatch) => {
  dispatch(exportJSONData());
};
export const clearData = () => (dispatch) => {
  dispatch(clearSheetData());
};