import React from "react"
import { AUTH_TOKEN } from "../constants"
import { Mutation } from "react-apollo"
import gql from "graphql-tag"

const VOTE_MUTATION = gql`
  mutation VoteMutation($linkId: ID!) {
    vote(linkId: $linkId) {
      id
      link {
        id
        votes {
          id
        }
      }
    }
  }
`

export default function Link(props) {
  const authToken = localStorage.getItem(AUTH_TOKEN)
  return (
    <div className="flex items-start mt-1">
      <div className="flex items-center">
        <div className="text-gray-600 w-6 text-right">{props.index + 1}.</div>
        {authToken && (
          <Mutation
            mutation={VOTE_MUTATION}
            variables={{ linkId: props.link.id }}
            update={(store, { data: { vote } }) => {
              props.updateStoreAfterVote(store, vote, props.link.id)
            }}>
            {voteMutation => (
              <div className="ml-1 text-gray-600 text-xs cursor-pointer" onClick={voteMutation}>
                ▲
              </div>
            )}
          </Mutation>
        )}
      </div>
      <div className="ml-2">
        <div>
          {props.link.description}
          <span className="ml-2 text-sm text-gray-600">
            (<a href={props.link.url} className="hover:underline">{props.link.url}</a>)
          </span>
        </div>
        <div className="text-sm text-gray-600 leading-none">
          {props.link.votes.length} votes{' '}
          by{' '}
          {props.link.postedBy ? props.link.postedBy.name : 'Unknown'}
        </div>
      </div>
    </div>
  )
}
