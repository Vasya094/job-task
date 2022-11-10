import { useEffect, useRef, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Footer } from "../components/Footer"
import { TableHeader } from "../components/TableHeader"
import { TableRow } from "../components/TableRow"
import { connectResourceInfoWithEvents, detIds } from "../helpers"
import { EventTypeWithResource, InitialState } from "../interfaces"
import { loadEventsStart, loadMoreResourses } from "../redux/actions"

function History() {
  const dispatch = useDispatch()

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsToRender, setItemsToRender] = useState<
    Array<EventTypeWithResource>
  >([])

  const tableBodyRef = useRef<HTMLDivElement>(null)

  const { events, loading, resources } = useSelector(
    (state: { data: InitialState }) => state.data
  )

  const getNextPage = () => {
    const ids = detIds(events, currentPage)
    dispatch(loadMoreResourses(ids))
  }

  useEffect(() => {
    dispatch(loadEventsStart())
  }, [])

  useEffect(() => {
    if (events && events.length && currentPage === 1) {
      getNextPage()
    }
  }, [events])

  useEffect(() => {
    const resultItems = connectResourceInfoWithEvents(
      events.slice((currentPage - 1) * 15, (currentPage - 1) * 15 + 15),
      resources
    )
    setItemsToRender((prevItems) => [...prevItems, ...resultItems])
  }, [resources])

  const onScroll = () => {
    if (tableBodyRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = tableBodyRef.current
      if (
        (scrollTop + clientHeight === scrollHeight - 0.5 ||
          scrollTop + clientHeight === scrollHeight) &&
        events.length / 15 > currentPage
      ) {
        getNextPage()
        setCurrentPage(currentPage + 1)
      }
    }
  }

  return (
    <>
      <div className='container' style={{ marginTop: "30px" }}>
        <div className='history-table'>
          <TableHeader />
          <div
            className='history-table__table-body-container'
            onScroll={onScroll}
            ref={tableBodyRef}
          >
            <div className='history-table__table-body'>
              {itemsToRender && itemsToRender.length
                ? itemsToRender.map((item, index) => (
                    <TableRow item={item} index={index} />
                  ))
                : null}
            </div>
          </div>
        </div>
      </div>
      <Footer pag={currentPage} loading={loading} />
    </>
  )
}

export default History
