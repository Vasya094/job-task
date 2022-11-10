import { AxiosError } from "axios"
import { EventType, ResourceType } from "../interfaces"
import * as types from "./actionTypes"

export const loadEventsStart = () => ({
  type: types.LOAD_EVENTS_START,
})

export const loadEventsSuccess = (events: EventType[]) => ({
  type: types.LOAD_EVENTS_SUCCESS,
  payload: events,
})

export const loadEventsError = (error: AxiosError) => ({
  type: types.LOAD_EVENTS_ERROR,
  payload: error,
})

export function loadMoreResourses(payload: string[]) {
  return { type: types.LOAD_RESOURCES_START, payload }
}

export function loadMoreResoursesSucceed(payload: ResourceType[]) {
  return { type: types.LOAD_RESOURCES_SUCCESS, payload }
}

export function loadMoreResoursesFailed(error: AxiosError) {
  return { type: types.LOAD_RESOURCES_ERROR, payload: error }
}

export function resetAllData() {
  return { type: types.RESET_ALL_DATA }
}