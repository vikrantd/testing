import styles from './app.css';

import {connect} from 'react-redux';
import React from 'react';

import * as sheetActions from '../../reducers/sheetReducer';
import * as sheetThunks from '../../reducers/sheetReducerThunks';
import SheetTable from '../../components/sheetTable/sheetTable';
import {createSelector} from 'reselect';

const ALPHABET = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

const sheetSelector = sheet => sheet;

const rowHeaderSelector = createSelector(
  [sheetSelector],
  sheet => sheet.getIn(['data', 0]).map((cell, cellIndex) => ALPHABET[cellIndex])
);

const colHeaderSelector = createSelector(
  [sheetSelector],
  sheet => sheet.get('data').map((row, rowIndex) => (rowIndex + 1).toString())
);


const App = props => {
  return (
    <div className={styles.container}>
      <SheetTable {...props} />
    </div>
  );
};

const mapStateToProps = state => ({
  sheet: state.present.get('sheet'),
  rowHeaderData: rowHeaderSelector(state.present.get('sheet')),
  colHeaderData: colHeaderSelector(state.present.get('sheet')),
});

// TODO: look into bindActionCreators to reduce the size of this
const mapDispatchToProps = {
  cellMouseDown: sheetThunks.cellMouseDown,
  cellMouseOver: sheetThunks.cellMouseOver,
  cellMouseUp: sheetThunks.cellMouseUp,
  cellShiftMouseDown: sheetThunks.cellShiftMouseDown,
  cellDoubleClick: sheetThunks.cellDoubleClick,
  autofillMouseDown: sheetThunks.autofillMouseDown,
  autofillMouseUp: sheetThunks.autofillMouseUp,
  documentMouseUp: sheetThunks.documentMouseUp,

  tableKeyEnter: sheetThunks.tableKeyEnter,
  tableKeyShiftEnter: sheetThunks.tableKeyShiftEnter,
  tableKeyTab: sheetThunks.tableKeyTab,
  tableKeyShiftTab: sheetThunks.tableKeyShiftTab,
  tableKeyEsc: sheetThunks.tableKeyEsc,
  tableKeyDelete: sheetThunks.tableKeyDelete,

  tableKeyUp: sheetThunks.tableKeyUp,
  tableKeyDown: sheetThunks.tableKeyDown,
  tableKeyLeft: sheetThunks.tableKeyLeft,
  tableKeyRight: sheetThunks.tableKeyRight,

  tableKeyShiftUp: sheetThunks.tableKeyShiftUp,
  tableKeyShiftDown: sheetThunks.tableKeyShiftDown,
  tableKeyShiftLeft: sheetThunks.tableKeyShiftLeft,
  tableKeyShiftRight: sheetThunks.tableKeyShiftRight,

  tableKeyCmdUp: sheetThunks.tableKeyCmdUp,
  tableKeyCmdDown: sheetThunks.tableKeyCmdDown,
  tableKeyCmdLeft: sheetThunks.tableKeyCmdLeft,
  tableKeyCmdRight: sheetThunks.tableKeyCmdRight,
  tableKeyCmdShiftUp: sheetThunks.tableKeyCmdShiftUp,
  tableKeyCmdShiftDown: sheetThunks.tableKeyCmdShiftDown,
  tableKeyCmdShiftLeft: sheetThunks.tableKeyCmdShiftLeft,
  tableKeyCmdShiftRight: sheetThunks.tableKeyCmdShiftRight,
  addRow: sheetThunks.addRow,
  addColumn: sheetThunks.addColumn,
  exportCSV: sheetThunks.exportCSV,
  exportJSON: sheetThunks.exportJSON,
  clearData: sheetThunks.clearData,
  cellBold: sheetThunks.cellBold,
  cellItalic: sheetThunks.cellItalic,
  cellUnderline: sheetThunks.cellUnderline,

  tableKeyOther: sheetThunks.tableKeyOther,

  tableSelectAll: sheetThunks.tableSelectAll,
  tableUndo: sheetThunks.tableUndo,
  tableRedo: sheetThunks.tableRedo,

  updatedEditValue: sheetActions.updatedEditValue,
  updatedEditValueCaretPos: sheetActions.updatedEditValueCaretPos,
  updatedEditStyleValue: sheetActions.updatedEditStyleValue,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
