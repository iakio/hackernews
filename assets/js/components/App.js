import React from "react"
import LinkList from "./LinkList"
import CreateLink from "./CreateLink"
import Header from "./Header"
import { Switch, Route } from "react-router"
export default function App() {
  return (
    <div>
      <Header />
      <div>
        <Switch>
          <Route exact path="/" component={LinkList} />
          <Route exact path="/create" component={CreateLink} />
        </Switch>
      </div>
    </div>
  )
}
