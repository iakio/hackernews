import React from "react"
import { Link } from "react-router-dom"
import { withRouter } from "react-router"

const AUTH_TOKEN = 'auth-token'

function Header() {
  const authToken = localStorage.getItem(AUTH_TOKEN)

  return (
    <div className="bg-orange-500">
      <div className="flex flex-row">
        <div className="mx-2 font-bold">Hacker News</div>
        <Link className="hover:underline" to="/">new</Link>
        {authToken && (
          <div>
            <div className="mx-2">|</div>
            <Link className="hover:underline" to="/create">submit</Link>
          </div>
        )}
        <div className="mx-2 flex-auto text-right">
          {authToken ? (
            <div>
              Logout  
            </div>
          ) : (
            <div>
              <Link className="hover:underline" to="/login">login</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default withRouter(Header)
