
import undoable, {includeAction} from 'redux-undo';
import Immutable from 'immutable';
import sheetReducer, {STARTED_EDITING_CELL} from './sheetReducer';

function combineImmutableReducers(reducers) {
  return (state = new Immutable.Map(), action) => (
    state.withMutations(tempState => {
      Object.keys(reducers).forEach(reducerName => {
        tempState.set(reducerName, reducers[reducerName](tempState.get(reducerName), action));
      });
    })
  );
}

const rootReducer = combineImmutableReducers({
  sheet: sheetReducer,
});

export default undoable(rootReducer, {
  filter: includeAction(STARTED_EDITING_CELL),
});

