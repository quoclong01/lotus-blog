import { AxiosResponse } from 'axios';
import { all, put, takeLatest } from 'redux-saga/effects';
import {
  getUserInfoError,
  getUserInfoSuccess,
} from './user.actions';
import { UserService } from '../../core/serivces/user.service';
import * as TYPES from '../../shared/constants/types';

const userService = new UserService();
export function* getUserInfo({ payload }: any) {
  try {
    const res: AxiosResponse<any> = yield userService.getUserInfo(payload.id);
    yield put(getUserInfoSuccess(res));
  } catch (error) {
    yield put(getUserInfoError(error));
  }
}

export function* watchUser() {
  yield all([
    takeLatest(TYPES.GET_USER_INFO, getUserInfo)
  ]);
}
