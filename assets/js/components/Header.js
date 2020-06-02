import React from "react"
import { Link } from "react-router-dom"
import { withRouter } from "react-router"
function Header() {
  return (
    <div>
      <div>
        <div>Hacker News</div>
        <Link to="/">new</Link>
        <div>|</div>
        <Link to="/create">submit</Link>
      </div>
    </div>
  )
}

export default withRouter(Header)
