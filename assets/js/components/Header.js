import React from "react"
import { Link } from "react-router-dom"
import { withRouter } from "react-router"
function Header() {
  return (
    <div className="bg-orange-500">
      <div className="flex flex-row">
        <div className="mx-2 font-bold">Hacker News</div>
        <Link className="hover:underline" to="/">new</Link>
        <div className="mx-2">|</div>
        <Link className="hover:underline" to="/create">submit</Link>
      </div>
    </div>
  )
}

export default withRouter(Header)
