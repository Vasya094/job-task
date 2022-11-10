import { EventType, EventTypeWithResource, ResourceType } from "../interfaces"

export const detIds = (events: EventType[], page: number): string[] => {
  return events
    .slice((page - 1) * 15, (page - 1) * 15 + 15)
    .map((evs) => `${evs.resource}/${evs.id}`)
}

export const formatEventsToRender = (events: EventType[]): EventType[] => {
  const Appointments = events
    .filter((itm) => !itm.appointmentId)
    .sort(function (a, b) {
      var c = new Date(a.date).getTime()
      var d = new Date(b.date).getTime()
      return d - c
    })
  const subAppointments = events.filter((itm) => itm.appointmentId)

  for (let i = 0; i < Appointments.length; i++) {
    //Do something
    const childsOfParent = subAppointments
      .filter((itm) => itm.appointmentId === Appointments[i].id)
      .sort(function (a, b) {
        var c = new Date(a.date).getTime()
        var d = new Date(b.date).getTime()
        return d - c
      })
      .map((itm, index) => ({ ...itm, noFirst: index !== 0 }))

      if (childsOfParent.length) {
      const parentIndex = Appointments.findIndex(
        (par) => par.id === childsOfParent[0].appointmentId
      )
      Appointments.splice(parentIndex + 1, 0, ...childsOfParent)
    }
  }

  return Appointments
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
  someEvents.forEach((event) => {
    const myRes = resources.find(
      (res) => res.id === `${event.resource}/${event.id}`
    )
    result.push({ ...event, myResource: myRes || null })
  })
  return result
}
