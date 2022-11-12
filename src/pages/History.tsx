import { useEffect, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Footer } from "../components/Footer"
import { TableHeader } from "../components/TableHeader"
import { TableRow } from "../components/TableRow"
import { getIds } from "../helpers"
import { InitialState } from "../interfaces"
import {
  increaseCurrentPage,
  loadEventsStart,
  loadMoreResourses,
} from "../redux/actions"

function History() {
  const dispatch = useDispatch()

  const tableBodyRef = useRef<HTMLDivElement>(null)

  const { events, loading, itemsToRender, currentPage } = useSelector(
    (state: { data: InitialState }) => state.data
  )

  const getNextPage = () => {
    const ids = getIds(events, currentPage)
    dispatch(loadMoreResourses(ids))
    dispatch(increaseCurrentPage())
  }

  useEffect(() => {
    dispatch(loadEventsStart())
  }, [])

  useEffect(() => {
    if (events && events.length) {
      getNextPage()
    }
  }, [events])

  const onScroll = () => {
    if (tableBodyRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = tableBodyRef.current
      if (
        (scrollTop + clientHeight === scrollHeight - 0.5 ||
          scrollTop + clientHeight === scrollHeight) &&
        events.length / 15 > currentPage
      ) {
        getNextPage()
        dispatch(increaseCurrentPage())
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
                    <TableRow
                      key={item.id + index.toString()}
                      item={item}
                      index={index}
                    />
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
