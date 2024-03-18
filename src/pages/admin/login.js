import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from '../../../src/axios.jsx'

function setCookie(cname, cvalue, exdays) {
  var d = new Date()
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000)
  var expires = 'expires=' + d.toUTCString()
  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/'
}

function Login() {
  const router = useRouter()

  const [isAdmin, setIsAdmin] = React.useState(true)

  const handleLogin = async (e) => {
    e.preventDefault()

    const data = new FormData(e.target)

    const email = data.get('email')
    const password = data.get('password')

    try {
      const res = await axios.post('/users/admin/signIn', {
        email,
        password,
      })
      const data = await res.data
      if (data.accessToken === undefined || data.userId === undefined) {
        router.push('/admin/login')
      } else {
        setCookie('accessToken', data.accessToken, { maxAge: 3600 })
        setCookie('userId', data.userId, { maxAge: 3600 })
        router.push('/admin/allNews')
      }
    } catch (err) {
      setIsAdmin(false)
    }
  }

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-slate-950 p-4">
      <div className="w-full p-6 bg-slate-800 rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-bold text-center text-white">
          Admin Login
        </h1>
        <form onSubmit={handleLogin} className="mt-6">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-white"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

          {isAdmin ? (
            ''
          ) : (
            <div className="bg-red-400 p-2 mt-8 rounded-lg flex justify-center font-extrabold tracking-wider">
              You are NOT a Admin
            </div>
          )}

          <div className="mt-8">
            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-900 focus:outline-none focus:bg-gray-900">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login

Login.getLayout = function PageLayout(page) {
  return <>{page} </>
}
