import styles from './sheetTable.css';

import React, {PropTypes} from 'react';

import {isMatchingCoors, isCoorInRange, absoluteRange} from '../../utils/coordinateUtils';
import handleKeys, {isModifierKey} from '../../utils/handleKeys';
import SheetCell from './sheetCell';

class SheetTable extends React.Component {
  constructor(props) {
    super(props);

    this.onDocumentMouseUp = this.onDocumentMouseUp.bind(this);
    this.addRow = this.addRow.bind(this);
    this.handleKeyEvent = handleKeys({
      'enter': props.tableKeyEnter,
      'shift+enter': props.tableKeyShiftEnter,
      'tab': {callback: props.tableKeyTab, preventDefault: true},
      'shift+tab': {callback: props.tableKeyShiftTab, preventDefault: true},
      'backspace': {callback: props.tableKeyDelete, preventDefault: true},
      'del': props.tableKeyDelete,
      'esc': props.tableKeyEsc,
      'up': props.tableKeyUp,
      'shift+up': props.tableKeyShiftUp,
      'mod+up': props.tableKeyCmdUp,
      'mod+shift+up': props.tableKeyCmdShiftUp,
      'down': props.tableKeyDown,
      'shift+down': props.tableKeyShiftDown,
      'mod+down': props.tableKeyCmdDown,
      'mod+shift+down': props.tableKeyCmdShiftDown,
      'left': props.tableKeyLeft,
      'shift+left': props.tableKeyShiftLeft,
      'mod+left': {callback: props.tableKeyCmdLeft, preventDefault: true},
      'mod+shift+left': props.tableKeyCmdShiftLeft,
      'right': props.tableKeyRight,
      'shift+right': props.tableKeyShiftRight,
      'mod+right': {callback: props.tableKeyCmdRight, preventDefault: true},
      'mod+shift+right': props.tableKeyCmdShiftRight,
      'mod+a': {callback: props.tableSelectAll, preventDefault: true},
      'mod+z': props.tableUndo,
      'mod+shift+z': props.tableRedo,
      'b+meta': props.cellBold,
      'i+meta': props.cellItalic,
      'u+meta': props.cellUnderline,
    });
  }

  componentDidMount() {
    document.addEventListener('mouseup', this.onDocumentMouseUp);
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', this.onDocumentMouseUp);
  }

  onDocumentMouseUp() {
    this.props.documentMouseUp();
  }

  addRow(){
    this.props.addRow();
  }

  addColumn(){
    this.props.addColumn();
  }

  exportCSV(){
    this.props.exportCSV();
  }

  exportJSON(){
    this.props.exportJSON();
  }

  clearData(){
    this.props.clearData();
  }

  render() {
    const props = this.props;

    return (
      <div>
      <div className={styles.buttonContainer}>
        <button className={styles.sheetButtons} onClick={()  => this.addRow()}>
          Add Row</button>
        <button className={styles.sheetButtons} onClick={()  => this.addColumn()}>
          Add Column</button>
        <button className={styles.sheetButtons} onClick={()  => this.exportCSV()}>
          ExportCSV</button>
        <button className={styles.sheetButtons} onClick={()  => this.exportJSON()}>
          ExportJSON</button>
        <button className={styles.sheetButtons} onClick={()  => this.clearData()}>
          Reset Sheet</button>
      </div>

      <table
        tabIndex="0"
        className={styles.sheetTable}
        onKeyDown={event => {
          // If the key combo wasn't handled by the hotkeys, and it's not a solo modifier key,
          // then start quick editing the cell
          if (
            !this.handleKeyEvent(event) &&
            !isModifierKey(event) &&
            !event.metaKey &&
            !event.ctrlKey &&
            event.key !== 'Escape'
          ) {
            props.tableKeyOther();
          }
        }}
        ref={table => {
          // If we're not in edit more then focus the table, which will allow the hotkeys to work
          if (table && props.sheet.get('editMode') === 'none') {
            table.focus();
          }
        }}
      >
        
          <thead>
          <tr>
            <th></th>
            {
              props.rowHeaderData.map((cell, cellIndex) => (
                <th scope="col" key={cellIndex}>{cell}</th>
              ))
            }
          </tr>
          </thead>
        
          <tbody>
          {
            props.sheet.get('data').map((row, rowIndex) => (
              <tr key={rowIndex}>
                <th scope="row">{props.colHeaderData.get(rowIndex)}</th>
                {
                  row.map((cellData, cellIndex) => {
                    const cellCoor = [rowIndex, cellIndex];
                    return (
                      <SheetCell
                        key={cellIndex}
                        cellData={cellData}
                        cellCoor={cellCoor}
                        isPrimaryCell={isMatchingCoors(cellCoor, props.sheet.get('primarySelectedCoor').toJS())}
                        isEditing={isMatchingCoors(cellCoor, props.sheet.get('editCoor').toJS())}
                        isInRange={isCoorInRange(cellCoor, absoluteRange(props.sheet.get('selectedRange').toJS()))}
                        selectionMode={props.sheet.get('selectionMode')}
                        selectedRange={props.sheet.get('selectedRange')}
                        editMode={props.sheet.get('editMode')}
                        editValue={props.sheet.get('editValue')}
                        isEditValueDirty={props.sheet.get('isEditValueDirty')}

                        cellMouseDown={props.cellMouseDown}
                        cellMouseOver={props.cellMouseOver}
                        cellMouseUp={props.cellMouseUp}
                        cellShiftMouseDown={props.cellShiftMouseDown}
                        cellDoubleClick={props.cellDoubleClick}
                        autofillMouseDown={props.autofillMouseDown}
                        autofillMouseUp={props.autofillMouseUp}
                        updatedEditValue={props.updatedEditValue}
                        updatedEditValueCaretPos={props.updatedEditValueCaretPos}
                        updatedEditStyleValue={props.updatedEditStyleValue}
                      />
                    );
                  })
                }
              </tr>
            ))
          }
        </tbody>
      </table>
      </div>
    );
  }
}

export default SheetTable;
