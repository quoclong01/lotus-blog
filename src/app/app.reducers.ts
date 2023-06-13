import { combineReducers } from 'redux';
import { usersReducer } from './pages/user/user.reducers';

const rootReducer = combineReducers({
  users: usersReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
