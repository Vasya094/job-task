import { connectResourceInfoWithEvents } from "../helpers"
import { EventType, InitialState, ResourceType } from "../interfaces"
import * as types from "./actionTypes"

const initialState: InitialState = {
  events: [],
  resources: [],
  itemsToRender: [],
  loading: false,
  currentPage: 1,
}

const eventsReducers = (
  state = initialState,
  action: { type: string; payload: EventType[] | ResourceType[] }
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
      const { itemsToRender, resources, events } = state
      const formatedItems = connectResourceInfoWithEvents(
        events,
        newResources as ResourceType[]
      )
      return {
        ...state,
        resources: [...resources, ...newResources],
        itemsToRender: [...itemsToRender, ...formatedItems],
        loading: false,
      }
    case types.LOAD_RESOURCES_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case types.INCREASE_CURRENT_PAGE:
      return {
        ...state,
        currentPage: state.currentPage + 1,
      }
    case types.RESET_ALL_DATA:
      return {
        events: [],
        resources: [],
        itemsToRender: [],
        loading: false,
      }
    default:
      return state
  }
}

export default eventsReducers
