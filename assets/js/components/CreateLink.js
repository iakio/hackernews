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
export default function CreateLink() {
  const [url, setUrl] = useState("")
  const [description, setDescriptin] = useState("")
  return (
    <div>
      <div>
        <input
          value={description}
          onChange={e => setDescriptin(e.target.value)}
          type="text"
          placeholder="A description for the link"
          />
        <input
          value={url}
          onChange={e => setUrl(e.target.value)}
          type="text"
          placeholder="The URL for the link"
          />
      </div>
      <Mutation mutation={POST_MUTATION} variables={{ description, url }}>
        {postMutation => (
          <button onClick={postMutation}>Submit</button>
        )}
      </Mutation>
    </div>
  )
}