import { createStore, applyMiddleware, combineReducers } from "redux";
import notificationsReducer from "./reducers/notificationsReducer";
import blogsReducer from "./reducers/blogsReducer";
import sessionReducer from "./reducers/sessionReducer";
import thunk from "redux-thunk";

const reducer = combineReducers({
  notification: notificationsReducer,
  blogs: blogsReducer,
  session: sessionReducer,
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
