import { EventType, EventTypeWithResource, ResourceType } from "../interfaces"

export const getIds = (events: EventType[], page: number): string[] => {
  return events
    .slice((page - 1) * 15, page * 15 + 15)
    .map((evs) => `${evs.resource}/${evs.id}`)
}

export const sortByTime = (a: EventType, b: EventType) => {
  const c = new Date(a.date).getTime()
  const d = new Date(b.date).getTime()
  return d - c
}

export const theSameJustDate = (a: string, b: string): boolean => {
  const date1 = new Date(a)
  const date2 = new Date(b)
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  )
}

export const theSameTime = (a: string, b: string): boolean => {
  const date1 = new Date(a)
  const date2 = new Date(b)
  return (
    date1.getHours() === date2.getHours() &&
    date1.getMinutes() === date2.getMinutes() &&
    date1.getSeconds() === date2.getSeconds()
  )
}

export const sortChildGroups = (childs: EventType[]) => {
  const sameTypesArray: {
    [key: string]: EventType[]
  } = {}
  childs.forEach((cld) => {
    if (
      sameTypesArray[cld.name + cld.date.split("T")[0]] &&
      sameTypesArray[cld.name + cld.date.split("T")[0]].length
    ) {
      if (
        theSameJustDate(
          sameTypesArray[cld.name + cld.date.split("T")[0]][0].date,
          cld.date
        )
      ) {
        sameTypesArray[cld.name + cld.date.split("T")[0]].push(cld)
      }
    } else {
      sameTypesArray[cld.name + cld.date.split("T")[0]] = [cld]
    }
  })
  return Object.values(sameTypesArray)
    .sort((a, b) => {
      const c = new Date(a[a.length - 1].date).getTime()
      const d = new Date(b[b.length - 1].date).getTime()
      return d - c
    })
    .map((itm) => [{ ...itm[0], noFirst: true }, ...itm.slice(1)])
    .flat(1)
}

export const formatEventsToRender = (events: EventType[]): EventType[] => {
  const result = []
  const Appointments = events
    .filter((itm) => !itm.appointmentId)
    .map((itm) => ({ ...itm, noFirst: true }))
    .sort(sortByTime)
  const subAppointments = events.filter((itm) => itm.appointmentId)
  for (let i = 0; i < Appointments.length; i++) {
    const childsOfParent = subAppointments
      .filter((itm) => itm.appointmentId === Appointments[i].id)
      .sort(sortByTime)

    const rigthSortedChilds = sortChildGroups(childsOfParent)
    if (rigthSortedChilds.length) {
      result.push(Appointments[i], ...rigthSortedChilds)
    } else {
      result.push(Appointments[i])
    }
  }

  return result
}

export const formatDate = (dateStr: string) => {
  let d = new Date(dateStr)
  let ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d)
  let mo = new Intl.DateTimeFormat("en", { month: "short" }).format(d)
  let da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d)
  return `${mo} ${da}, ${ye}`
}

export const connectResourceInfoWithEvents = (
  someEvents: EventType[],
  resources: ResourceType[]
): EventTypeWithResource[] => {
  const result: Array<EventTypeWithResource> = []
  resources.forEach((resource) => {
    const myEv = someEvents.find(
      (ev) => resource.id === `${ev.resource}/${ev.id}`
    )
    result.push({ ...(myEv as EventType), myResource: resource || null })
  })
  return result
}
