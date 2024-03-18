import { getCookie } from 'cookies-next'
import React, { useEffect, useState } from 'react'
import Router from 'next/router'
import axios from '@/axios.jsx'

function Commment({ id, content, userId, createdAt }) {
  const [commentUser, setCommentUser] = useState({})

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(`users/user/${userId}`)
      const data = await res.data
      setCommentUser(data.user)
    }

    fetchData()
  }, [])

  return (
    <div
      key={id}
      className="border border-gray-200 bg-gray-100 rounded-lg py-2 px-8 my-2"
    >
      <div className="flex items-center">
        <h3 className="font-semibold tracking-wider">{commentUser.name}</h3>
        &nbsp;
        <div className="h-[4px] w-[4px] bg-gray-400 rounded-full" />
        &nbsp;
        <p className="text-gray-400">
          {new Date(createdAt).toLocaleDateString('en-US')}
        </p>
      </div>
      <div className="py-1 rounded-lg">{content}</div>
    </div>
  )
}

export default Commment
