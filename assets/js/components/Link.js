import React from "react"


export default function Link(props) {
  return (
    <div>
      {props.link.description}
      <span className="ml-2 text-sm text-gray-600">
        (<a href={props.link.url} className="hover:underline">{props.link.url}</a>)
      </span>
    </div>
  )
}
