import React from "react"
import LinkList from "./LinkList"
import CreateLink from "./CreateLink"
import Header from "./Header"
import Login from "./Login"
import { Switch, Route } from "react-router"
export default function App() {
  return (
    <div>
      <Header />
      <div>
        <Switch>
          <Route exact path="/" component={LinkList} />
          <Route exact path="/create" component={CreateLink} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </div>
    </div>
  )
}
