import ChangeTitleReducer from "../reducers/ChangeTitle.Reducer";
import abcReducer from "../reducers/AbcReducer";
import { createStore , combineReducers } from "redux";
import searchBarReducer from "../reducers/SearchBarReducer";


const store1 = combineReducers({ChangeTitleReducer,abcReducer,searchBarReducer});
const store = createStore(store1,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
// const store = createStore(ChangeTitleReducer);

export default store;