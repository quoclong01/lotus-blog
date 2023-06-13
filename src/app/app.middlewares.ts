import { all } from 'redux-saga/effects';
import { watchUser } from './pages/user/user.middlewares';

export default function* appMiddleware() {
  yield all([watchUser()]);
}
