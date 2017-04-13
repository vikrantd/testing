import Immutable from 'immutable';

import {createReducer} from '../utils/reduxUtils';
import * as sheetUtils from '../utils/sheetUtils';
import * as coordinateUtils from '../utils/coordinateUtils';


var initialState = {};
if(window.localStorage.getItem('excel_data') != null){
  var json = JSON.parse(window.localStorage.getItem('excel_data'));
  initialState = Immutable.fromJS(json);
} 
else{
  initialState = Immutable.fromJS({
    data: [
      [{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''},{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''},{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}],
      [{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''},{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''},{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}],
      [{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''},{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''},{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}],
      [{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''},{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''},{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}],
      [{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''},{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''},{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}],
      [{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''},{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''},{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}],
      [{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''},{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''},{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}],
      [{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''},{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''},{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}],
      [{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''},{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''},{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}],
      [{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''},{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''},{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}],
      [{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''},{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''},{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}],
      [{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''},{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''},{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}],
      [{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''},{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''},{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}],
      [{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''},{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''},{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}],
      [{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''},{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''},{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}],
      [{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''},{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''},{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}],
      [{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''},{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''},{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}],
      [{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''},{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''},{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}],
      [{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''},{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''},{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}],
      [{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''},{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''},{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}],
    ],

    primarySelectedCoor: coordinateUtils.createEmptyCoor(),

    selectionMode: 'none',
    selectedRange: coordinateUtils.createEmptyRange(),
    isSelectingRange: false,

    editMode: 'none',
    editCoor: [null, null],
    editValue: '',
    editValueCaretPos: 0,
    isEditValueDirty: false,
    editStyleValue: 0,
    formulaValue: '',
    formulaValueInsertPos: 0,
  });  

}


export const CHANGED_PRIMARY_SELECTED_COOR = 'CHANGED_PRIMARY_SELECTED_COOR';
export const STARTED_SELECTING_RANGE = 'STARTED_SELECTING_RANGE';
export const STOPPED_SELECTING_RANGE = 'STOPPED_SELECTING_RANGE';
export const CHANGED_SELECTED_RANGE_START = 'CHANGED_SELECTED_RANGE_START';
export const CHANGED_SELECTED_RANGE_END = 'CHANGED_SELECTED_RANGE_END';
export const CHANGED_SELECTED_RANGE = 'CHANGED_SELECTED_RANGE';
export const STARTED_EDITING_CELL = 'STARTED_EDITING_CELL';
export const COMMITTED_EDIT_VALUE = 'COMMITTED_EDIT_VALUE';
export const DISCARDED_EDIT_VALUE = 'DISCARDED_EDIT_VALUE';
export const DELETED_RANGE = 'DELETED_RANGE';
export const UPDATED_EDIT_VALUE = 'UPDATED_EDIT_VALUE';
export const UPDATED_EDIT_VALUE_CARET_POS = 'UPDATED_EDIT_VALUE_CARET_POS';
export const UPDATED_EDIT_STYLE_VALUE = 'UPDATED_EDIT_STYLE_VALUE';
export const ADD_NEW_ROW = 'ADD_NEW_ROW';
export const ADD_NEW_COLUMN = 'ADD_NEW_COLUMN';
export const EXPORT_CSV_DATA = 'EXPORT_CSV_DATA';
export const EXPORT_JSON_DATA = 'EXPORT_JSON_DATA';
export const CLEAR_SHEET_DATA = 'CLEAR_SHEET_DATA';

export const changedPrimarySelectedCoor = coor => ({type: CHANGED_PRIMARY_SELECTED_COOR, coor});
export const startedSelectingRange = (mode, coor) => ({type: STARTED_SELECTING_RANGE, mode, coor});
export const stoppedSelectingRange = () => ({type: STOPPED_SELECTING_RANGE});
export const changedSelectedRangeStart = coor => ({type: CHANGED_SELECTED_RANGE_START, coor});
export const changedSelectedRangeEnd = coor => ({type: CHANGED_SELECTED_RANGE_END, coor});
export const changedSelectedRange = (mode, range) => ({type: CHANGED_SELECTED_RANGE, mode, range});
export const startedEditingCell = (mode, coor) => ({type: STARTED_EDITING_CELL, mode, coor});
export const committedEditValue = () => ({type: COMMITTED_EDIT_VALUE});
export const discardedEditValue = () => ({type: DISCARDED_EDIT_VALUE});
export const deletedRange = range => ({type: DELETED_RANGE, range});
export const updatedEditValue = value => ({type: UPDATED_EDIT_VALUE, value});
export const updatedEditValueCaretPos = pos => ({type: UPDATED_EDIT_VALUE_CARET_POS, pos});
export const updatedEditStyleValue = dta => ({type: UPDATED_EDIT_STYLE_VALUE, dta});
export const addNewRow = () => ({type: ADD_NEW_ROW});
export const addNewColumn = () => ({type: ADD_NEW_COLUMN});
export const exportCSVData = () => ({type: EXPORT_CSV_DATA});
export const exportJSONData = () => ({type: EXPORT_JSON_DATA});
export const clearSheetData = () => ({type: CLEAR_SHEET_DATA});


function setBasicRange(state, range) {
  return state
    .set('selectionMode', 'basic')
    .set('selectedRange', Immutable.fromJS(range));
}


function setAutofillRange(state, range) {
  
  const rangeMagnitude = [
    Math.abs(range[0][0] - range[1][0]),
    Math.abs(range[0][1] - range[1][1]),
  ];


  if (rangeMagnitude[1] > rangeMagnitude[0]) {
    range[1] = [
      range[0][0],
      range[1][1],
    ];
  } else {
    range[1] = [
      range[1][0],
      range[0][1],
    ];
  }

  return state
    .set('selectionMode', 'autofill')
    .set('selectedRange', Immutable.fromJS(range));
}

function setFormulaRange(state, range) {
  const caretPos = state.get('formulaValueInsertPos');
  let cellAddr;
  if (coordinateUtils.rangeSize(range) === 1) {
    cellAddr = coordinateUtils.getAddrFromCoor(range[0]);
  } else {
    cellAddr = coordinateUtils.getAddrRangeFromCoorRange(range);
  }
  const editingValue = state.get('formulaValue');
  const newValue = editingValue.substring(0, caretPos) + cellAddr + editingValue.substring(caretPos);

  return state
    .set('editValue', newValue)
    .set('selectionMode', 'formula')
    .set('selectedRange', Immutable.fromJS(range));
}

function setSelectedRange(state, mode, range) {
  const extent = sheetUtils.getSheetExtent(state.get('data'));
  const clampedRange = coordinateUtils.clampRangeToRange(range, extent);

  if (mode === 'basic') {
    return setBasicRange(state, clampedRange);
  } else if (mode === 'autofill') {
    return setAutofillRange(state, clampedRange);
  } else if (mode === 'formula') {
    return setFormulaRange(state, clampedRange);
  }

  return state;
}

function setCellValue(state, coor, value, style) {
  let data = state.get('data');
  let newValue = value;

  if (sheetUtils.isFormula(value)) {
    newValue = sheetUtils.capitalizeExpression(value);
  } else if (sheetUtils.canCoerceToNumber(value)) {
    newValue = sheetUtils.coerceToNumber(value);
  } else {
    newValue = value.trim();
  }

  data = data.setIn([...coor, 'raw'], newValue);
  console.log(...coor);
  data = sheetUtils.computeSheet(data);
  return state.set('data', data);
}

function stopEditing(state) {
  return state
    .set('editMode', 'none')
    .set('editCoor', Immutable.fromJS(coordinateUtils.createEmptyCoor()))
    .set('editValue', '')
    .set('isEditValueDirty', false);
}

export const actionHandlers = {
  CHANGED_PRIMARY_SELECTED_COOR(state, {coor}) {
    const extent = sheetUtils.getSheetExtent(state.get('data'));
    const newCoor = coordinateUtils.clampCoorToRange(coor, extent);
    return setBasicRange(state, [newCoor, newCoor])
      .set('primarySelectedCoor', Immutable.fromJS(newCoor));
  },

  STARTED_SELECTING_RANGE(state, {mode, coor}) {
    let newState = state;

    if (mode === 'formula') {
      
      newState = newState
        .set('formulaValue', newState.get('editValue'))
        .set('formulaValueInsertPos', newState.get('editValueCaretPos'));
    }

    return setSelectedRange(newState, mode, [coor, coor])
      .set('isSelectingRange', true)
      .set('selectionMode', mode);
  },

  STOPPED_SELECTING_RANGE(state) {
    let newState = state.set('isSelectingRange', false);

    if (newState.get('selectionMode') === 'autofill') {
      let data = newState.get('data');
      data = sheetUtils.autofillSheet(data, newState.get('selectedRange').toJS());
      data = sheetUtils.computeSheet(data);
      newState = setBasicRange(newState, newState.get('selectedRange').toJS())
        .set('data', data);
    }
    window.localStorage.setItem('excel_data', JSON.stringify(state.toJS()));
    return newState;
  },

  CHANGED_SELECTED_RANGE(state, {mode, range}) {
    return setSelectedRange(state, mode, range);
  },

  CHANGED_SELECTED_RANGE_START(state, {coor}) {
    return setSelectedRange(
      state,
      state.get('selectionMode'),
      [
        coor,
        state.getIn(['selectedRange', 1]).toJS(),
      ]
    );
  },

  CHANGED_SELECTED_RANGE_END(state, {coor}) {
    return setSelectedRange(
      state,
      state.get('selectionMode'),
      [
        state.getIn(['selectedRange', 0]).toJS(),
        coor,
      ]
    );
  },

  UPDATED_EDIT_STYLE_VALUE(state, {dta}){
      
      const style = dta.style;
      const pos = dta.pos;
      const index = dta.index;
      let data = state.get('data');
      var temp_style = data.toJS()[pos[0]][pos[1]].style;
      if(temp_style == '') temp_style = [];
      if(temp_style[index] == style){
        temp_style[index] = '';
        data = data.setIn([...pos, 'style'], temp_style);  
      }
      else{
        temp_style[index] = style; 
        data = data.setIn([...pos, 'style'], temp_style);
      }      
      data = sheetUtils.computeSheet(data);
      window.localStorage.setItem('excel_data', JSON.stringify(state.toJS()));
      return state.set('data', data);
  },

  STARTED_EDITING_CELL(state, {mode, coor}) {
    
    return setBasicRange(state, [coor, coor])
      .set('editMode', mode)
      .set('editCoor', new Immutable.List(coor))
      .set('editValue', state.getIn(['data', ...coor, 'raw']))
      .set('isEditValueDirty', false);
  },

  UPDATED_EDIT_VALUE(state, {value}) {
    return state
      .set('editValue', value)
      .set('isEditValueDirty', true);
  },

  UPDATED_EDIT_VALUE_CARET_POS(state, {pos}) {
    return state
      .set('editValueCaretPos', pos)
      .set('isEditValueDirty', true);
  },

  COMMITTED_EDIT_VALUE(state) {
    let newState = state;
    newState = setCellValue(newState, newState.get('editCoor'), newState.get('editValue'));
    newState = stopEditing(newState);
    window.localStorage.setItem('excel_data', JSON.stringify(state.toJS()));
    return newState;
  },

  DISCARDED_EDIT_VALUE(state) {
    return stopEditing(state);
  },

  DELETED_RANGE(state, {range}) {
    let data = state.get('data');
    coordinateUtils.expandCoorRange(range).forEach(coor => {
      data = data.setIn([...coor, 'raw'], '');
    });
    data = sheetUtils.computeSheet(data);
    window.localStorage.setItem('excel_data', JSON.stringify(state.toJS()));
    return state.set('data', data);
  },

  ADD_NEW_ROW(state) {
    let data = state.get('data');
    var temp_data = data.toJS();
    var length = temp_data[0].length;
    var arr = [];
    for(var i=0;i<length;i++){
      arr.push({raw:'',data:'',style:[]});
    }
    temp_data.push(arr);
    window.localStorage.setItem('excel_data', JSON.stringify(state.toJS()));
    return state.set('data', Immutable.fromJS(temp_data));
  },
  ADD_NEW_COLUMN(state) {
    let data = state.get('data');
    var temp_data = data.toJS();
    if(temp_data[0].length < 26){
      temp_data.forEach(function(d, index){
        temp_data[index].push({raw:'',data:'',style:[]});
      })
    }
    else{
      alert("Can't add more columns. Look for this feature in the next version");
    }
    window.localStorage.setItem('excel_data', JSON.stringify(state.toJS()));
    return state.set('data', Immutable.fromJS(temp_data));
  },
  EXPORT_CSV_DATA(state) {
    let data = state.get('data');
    var temp_data = data.toJS();
    var str = '';
    for (var i = 0; i < temp_data.length; i++) {
      for (var j = 0; j < temp_data[0].length; j++) {
        if(j == temp_data[0].length - 1){
          if(temp_data[i][j].val == undefined) str += ",";
          else str += temp_data[i][j].val;
        } 
        else{
          if(temp_data[i][j].val == undefined) str += ",";
          else str += temp_data[i][j].val + ",";
        } 
      }
      str += "\n";
    }
    window.open("data:application/octet-stream;filename=excel_data.csv,"+encodeURIComponent(str));
    return state.set('data', data);
  },
  EXPORT_JSON_DATA(state) {
    let data = state.get('data');
    var temp_data = data.toJS();
    window.open("data:application/octet-stream;filename=excel_data.json,"+encodeURIComponent(JSON.stringify(temp_data)));
    return state.set('data', data);
  },
  CLEAR_SHEET_DATA(state) {
    let data = state.get('data');
    const initialState = Immutable.fromJS({
      data: [
        [{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''},{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''},{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}],
        [{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''},{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''},{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}],
        [{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''},{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''},{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}],
        [{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''},{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''},{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}],
        [{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''},{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''},{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}],
        [{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''},{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''},{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}],
        [{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''},{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''},{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}],
        [{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''},{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''},{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}],
        [{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''},{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''},{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}],
        [{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''},{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''},{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}],
        [{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''},{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''},{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}],
        [{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''},{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''},{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}],
        [{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''},{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''},{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}],
        [{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''},{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''},{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}],
        [{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''},{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''},{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}],
        [{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''},{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''},{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}],
        [{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''},{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''},{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}],
        [{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''},{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''},{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}],
        [{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''},{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''},{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}],
        [{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''},{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''},{raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}, {raw: '', val: '', style: ''}],
      ],

      primarySelectedCoor: coordinateUtils.createEmptyCoor(),

      selectionMode: 'none',
      selectedRange: coordinateUtils.createEmptyRange(),
      isSelectingRange: false,

      editMode: 'none',
      editCoor: [null, null],
      editValue: '',
      editValueCaretPos: 0,
      isEditValueDirty: false,
      editStyleValue: 0,
      formulaValue: '',
      formulaValueInsertPos: 0,
    });  
    return initialState;
  },
};

export default createReducer(initialState, actionHandlers);
