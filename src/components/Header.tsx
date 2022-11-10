import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Link, useLocation } from "react-router-dom"
import { resetAllData } from "../redux/actions"

export const Header = () => {
  let location = useLocation()
  const dispatch = useDispatch()

  useEffect(() => {
    if (location.pathname === "/") {
      dispatch(resetAllData())
    }
  }, [location])

  return (
    <header className='main-header'>
      <Link
        className={`main-header_link ${
          location.pathname === "/" ? "cur-page" : ""
        }`}
        to='/'
      >
        Home
      </Link>
      <Link
        className={`main-header_link ${
          location.pathname === "/history" ? "cur-page" : ""
        }`}
        to='/history'
      >
        History
      </Link>
    </header>
  )
}
