export const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export const createEmptyCoor = () => [undefined, undefined];

export const createEmptyRange = () => [[undefined, undefined], [undefined, undefined]];

export const isValidCoor = coor => (
  coor[0] !== undefined && coor[1] !== undefined
);

export const isValidRange = range => (
  isValidCoor(range[0]) && isValidCoor(range[1])
);


export const isMatchingCoors = (coorA, coorB) => (
  coorA[0] === coorB[0] && coorA[1] === coorB[1]
);


export const isCoorInRange = (coor, range) => (
  coor[0] >= range[0][0] &&
  coor[0] <= range[1][0] &&
  coor[1] >= range[0][1] &&
  coor[1] <= range[1][1]
);

export const getAddrFromCoor = coor => `${ALPHABET[coor[1]]}${coor[0] + 1}`;

export const getCoorFromAddr = addr => {
  const rowIndex = parseInt(addr.substring(1)) - 1;
  const cellIndex = ALPHABET.indexOf(addr.charAt(0)) > -1 ? ALPHABET.indexOf(addr.charAt(0)) : undefined;
  return [rowIndex, cellIndex];
};

export const absoluteRange = range => (
  [
    [Math.min(range[0][0], range[1][0]), Math.min(range[0][1], range[1][1])],
    [Math.max(range[0][0], range[1][0]), Math.max(range[0][1], range[1][1])],
  ]
);

export const rangeSize = range => {
  const absRange = absoluteRange(range);
  return (absRange[1][0] - absRange[0][0] + 1) * // Row size
         (absRange[1][1] - absRange[0][1] + 1);  // Col size
};

export const getAddrRangeFromCoorRange = coorRange => (
  rangeSize(coorRange) === 1
    ? getAddrFromCoor(coorRange[0])
    : getAddrFromCoor(coorRange[0]) + ':' + getAddrFromCoor(coorRange[1])
);

export const getCoorRangeFromAddrRange = addrRange => {
  if (addrRange.indexOf(':') === -1) {
    return [getCoorFromAddr(addrRange), getCoorFromAddr(addrRange)];
  }
  const [startAddr, endAddr] = addrRange.split(':');
  return [getCoorFromAddr(startAddr), getCoorFromAddr(endAddr)];
};

export const clampCoorToRange = (coor, range) => {
  const absRange = absoluteRange(range);
  return [
    Math.min(Math.max(coor[0], absRange[0][0]), absRange[1][0]),
    Math.min(Math.max(coor[1], absRange[0][1]), absRange[1][1]),
  ];
};

export const clampRangeToRange = (rangeA, rangeB) => (
  [
    clampCoorToRange(rangeA[0], rangeB),
    clampCoorToRange(rangeA[1], rangeB),
  ]
);

export const expandCoorRange = range => {
  const absRange = absoluteRange(range);
  const expandedRange = [];
  for (let rowIndex = absRange[0][0]; rowIndex <= absRange[1][0]; rowIndex++) {
    for (let cellIndex = absRange[0][1]; cellIndex <= absRange[1][1]; cellIndex++) {
      expandedRange.push([rowIndex, cellIndex]);
    }
  }
  return expandedRange;
};

export const expandAddrRange = addrRange => {
  const coorRange = getCoorRangeFromAddrRange(addrRange);
  const expandedRange = expandCoorRange(coorRange).map(coor => getAddrFromCoor(coor));
  return expandedRange.join(',');
};

export const isCoorAtTopEdgeOfRange = (coor, range) => (
  isCoorInRange(coor, range) && coor[0] === range[0][0]
);

export const isCoorAtBottomEdgeOfRange = (coor, range) => (
  isCoorInRange(coor, range) && coor[0] === range[1][0]
);

export const isCoorAtLeftEdgeOfRange = (coor, range) => (
  isCoorInRange(coor, range) && coor[1] === range[0][1]
);

export const isCoorAtRightEdgeOfRange = (coor, range) => (
  isCoorInRange(coor, range) && coor[1] === range[1][1]
);

export const translateCoor = (coorA, coorB) => (
  [coorA[0] + coorB[0], coorA[1] + coorB[1]]
);

export const translationIdentities = {
  up: [-1, 0],
  down: [1, 0],
  left: [0, -1],
  right: [0, 1],
};
