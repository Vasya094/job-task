import { takeLatest, put, call, fork, all } from "redux-saga/effects"
import {
  loadEventsSuccess,
  loadEventsError,
  loadMoreResoursesSucceed,
  loadMoreResoursesFailed,
} from "./actions"
import { loadEventsApi, loadMoreEventsApi } from "./api"
import { LOAD_EVENTS_START, LOAD_RESOURCES_START } from "./actionTypes"
import { AxiosResponse } from "axios"
import { formatEventsToRender } from "../helpers"

export function* onLoadEventsStartAsync() {
  try {
    const response: AxiosResponse = yield call(loadEventsApi)
    if (response.status === 200) {
      yield put(loadEventsSuccess(formatEventsToRender(response.data.items)))
    }
  } catch (error: any) {
    yield put(loadEventsError(error))
  }
}

export function* onLoadEvents() {
  yield takeLatest(LOAD_EVENTS_START, onLoadEventsStartAsync)
}

export function* onLoadResourcesStartAsync(action: {
  type: string
  payload?: string[]
}) {
  try {
    if (action.payload) {
      const response: AxiosResponse = yield call(
        loadMoreEventsApi,
        action.payload
      )
      if (response.status === 200) {
        yield put(loadMoreResoursesSucceed(response.data.items))
      }
    }
  } catch (error: any) {
    yield put(loadMoreResoursesFailed(error))
  }
}

export function* onLoadResources() {
  yield takeLatest(LOAD_RESOURCES_START, onLoadResourcesStartAsync)
}

const eventSagas = [fork(onLoadEvents), fork(onLoadResources)]

export default function* rootSaga() {
  yield all([...eventSagas])
}
