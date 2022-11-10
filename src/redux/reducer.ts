import { EventType, InitialState } from "../interfaces"
import * as types from "./actionTypes"

const initialState: InitialState = {
  events: [],
  resources: [],
  loading: false,
}

const eventsReducers = (
  state = initialState,
  action: { type: string; payload: EventType[] }
) => {
  switch (action.type) {
    case types.LOAD_EVENTS_START:
      return {
        ...state,
        loading: true,
      }
    case types.LOAD_EVENTS_SUCCESS:
      return {
        ...state,
        events: action.payload,
        loading: false,
      }
    case types.LOAD_EVENTS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case types.LOAD_RESOURCES_START:
      return {
        ...state,
        loading: true,
      }
    case types.LOAD_RESOURCES_SUCCESS:
      const newResources = action.payload
      const { resources } = state
      return {
        ...state,
        resources: [...resources, ...newResources],
        loading: false,
      }
    case types.LOAD_RESOURCES_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case types.RESET_ALL_DATA:
      return {
        events: [],
        resources: [],
        loading: false,
      }
    default:
      return state
  }
}

export default eventsReducers
