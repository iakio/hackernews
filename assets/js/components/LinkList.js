import React from "react"
import Link from "./Link"
import gql from "graphql-tag"
import { Query } from "react-apollo"

const FEED_QUERY = gql`
  {
    feed {
      links {
        id
        url
        description
        postedBy {
          name
        }
        votes {
          id
        }
      }
    }
  }
`

function updateCacheAfterVote(store, createdVote, linkId) {
  const data = store.readQuery({
    query: FEED_QUERY
  })
  const voteLink = data.feed.links.find(link => link.id === linkId)
  voteLink.votes = createdVote.link.votes
  store.writeQuery({ query: FEED_QUERY, data })
}

export default function LinkList() {
  return (
    <div className="bg-orange-100 px-4 py-2">
      <Query query={FEED_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching</div>
          if (error) return <div>Error</div>

          const linksToRender = data.feed.links

          return linksToRender.map((link, index) =>
            <Link key={link.id}
              link={link}
              index={index}
              updateStoreAfterVote={updateCacheAfterVote} />
          )
        }}
      </Query>
    </div>
  )
}

