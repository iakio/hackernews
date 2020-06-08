import React, { useState } from "react"

export default function Login() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [login, setLogin] = useState(false)
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
        <button className="px-4 mr-2 bg-gray-400 active:bg-gray-200">
          {login ? 'login' : 'create account'}
        </button>
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