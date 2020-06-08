import React, { useState } from "react"
import gql from "graphql-tag"
import { Mutation } from "react-apollo"
import { AUTH_TOKEN } from "../constants"

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`


export default function Login(props) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [login, setLogin] = useState(false)

  async function _confirm(data) {
    const { token } = login ? data.login : data.signup
    localStorage.setItem(AUTH_TOKEN, token)
    props.history.push(`/`)
  }
  return (
    <div className="bg-orange-100 px-4 py-2">
      <h4 className="text-lg font-black">{login ? 'Login' : 'Sign Up'}</h4>
      <div className="flex-col">
        {!login && (
          <input
            value={name}
            className="flex w-full mt-1 px-2 border border-solid border-gray-600"
            onChange={e => setName(e.target.value)}
            type="text"
            placeholder="Your name" />
        )}
        <input
          value={email}
          className="flex w-full mt-1 px-2 border border-solid border-gray-600"
          onChange={e => setEmail(e.target.value)}
          type="text"
          placeholder="Your email address" />
        <input
          value={password}
          className="flex w-full mt-1 px-2 border border-solid border-gray-600"
          onChange={e => setPassword(e.target.value)}
          type="password"
          placeholder="Choose a safe password" />
      </div>
      <div className="my-4 flex-row">
        <Mutation
          mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
          variables={{ email, password, name }}
          onCompleted={data => _confirm(data)}
        >
          {mutation => (
            <button className="px-4 mr-2 bg-gray-400 active:bg-gray-200" onClick={mutation}>
              {login ? 'login' : 'create account'}
            </button>
          )}
        </Mutation>
        <button
          className="px-4 mr-2 bg-gray-400 active:bg-gray-200"
          onClick={() => setLogin(!login)}>
          {login
            ? 'need to create an account?'
            : 'already have an account?'}
        </button>
      </div>
    </div>
  )
}

