export interface EventType {
  appointmentId?: string
  date: string
  id: string
  name: string
  resource: string
  noFirst: boolean
}

export interface ResourceType {
  id: string
  details: string
  values?: Array<string | { value: number; unit: string }>
  code: string
}

export interface EventTypeWithResource extends EventType {
  myResource: ResourceType | null
}

export interface InitialState {
  events: Array<EventType>
  itemsToRender: Array<EventTypeWithResource>
  resources: Array<ResourceType>
  loading: boolean
  currentPage: number
}
