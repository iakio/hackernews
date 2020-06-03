import React, { useState } from "react"
import gql from "graphql-tag"
import { Mutation } from "react-apollo"
const POST_MUTATION = gql`
  mutation PostMutation($description: String!, $url: String!) {
    post(description: $description, url: $url) {
      id
      url
      description
    }
  }
`
export default function CreateLink(props) {
  const [url, setUrl] = useState("")
  const [description, setDescriptin] = useState("")
  return (
    <div>
      <div className="flex flex-col">
        <input
          className="mt-2 px-2 border border-solid border-gray-600"
          value={description}
          onChange={e => setDescriptin(e.target.value)}
          type="text"
          placeholder="A description for the link"
          />
        <input
          className="mt-2 px-2 border border-solid border-gray-600"
          value={url}
          onChange={e => setUrl(e.target.value)}
          type="text"
          placeholder="The URL for the link"
          />
      </div>
      <Mutation
        mutation={POST_MUTATION}
        variables={{ description, url }}
        onCompleted={() => props.history.push("/")}>
        {postMutation => (
          <button className="border border-solid border-gray-600 px-4 py2 mt-2" onClick={postMutation}>Submit</button>
        )}
      </Mutation>
    </div>
  )
}