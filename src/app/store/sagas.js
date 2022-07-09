import { take, put, select } from 'redux-saga/effects';
import uuid from 'uuid';
import axios from 'axios';
import * as mutations from './mutations';

const url = 'http://localhost:7777';

export function* taskCreationSaga() {
  while (true) {
    const { groupID } = yield take(mutations.REQUEST_TASK_CREATION);
    const ownerID = 'U1';
    const taskID = uuid();

    yield put(mutations.createTask(taskID, groupID, ownerID));

    const { res } = yield axios.post(url + '/task/new', {
      task: {
        id: taskID,
        name: 'New task from saga',
        group: groupID,
        owner: ownerID,
        isComplete: false,
      },
    });
    console.info('Got the response, ', res);
  }
}

export function* taskModificationSaga() {
  while (true) {
    const task = yield take([
      mutations.SET_TASK_COMPLETE,
      mutations.SET_TASK_GROUP,
      mutations.SET_TASK_NAME,
    ]);

    axios.post(url + '/task/update', {
      task: {
        id: task.taskID,
        group: task.groupID,
        name: task.name,
        isComplete: task.isComplete,
      },
    });
  }
}

export function* userAuthenticationSaga() {
  while (true) {
    const { userName, password } = yield take(
      mutations.REQUEST_AUTHENTICATE_USER
    );

    try {
      const { data } = axios.post(url + '/authenticate', {
        userName,
        password,
      });

      if (!data) {
        console.log('from here');
        throw new Error();
      }
    } catch (e) {
      console.log('Cannot Authenicate');
      yield put(mutations.processAuthenticateUser(mutations.NOT_AUTHENTICATED));
    }
  }
}
