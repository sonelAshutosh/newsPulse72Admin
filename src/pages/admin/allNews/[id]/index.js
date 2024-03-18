import Arrow from '@/svg/Arrow.js'
import axios from '../../../../axios.jsx'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import Tick from '@/svg/Tick.js'
import Link from 'next/link.js'
import Comments from '@/components/Comments/Comments.js'

function Index() {
  const router = useRouter()
  const { id } = router.query

  const [oneNews, setOneNews] = useState({})

  useEffect(() => {
    if (id) {
      // Only fetch data if id is available
      async function fetchData() {
        try {
          const res = await axios.get(`/news/${id}`)
          const data = res.data
          setOneNews(data.news)
        } catch (err) {
          console.log(err)
        }
      }

      fetchData()
    }
  }, [id]) // Fetch data whenever id changes

  // console.log(oneNews)

  return (
    <div className="flex flex-col flex-wrap justify-center p-10 bg-gray-200">
      <img
        className="w-full rounded-lg shadow-lg mb-8"
        src={oneNews.imageURL}
      />
      <h1 className="font-extrabold text-xl text-justify text-black">
        {oneNews.title}
      </h1>

      <div>
        {oneNews.category?.map((item, index) => (
          <span
            className="text-sm font-semibold text-zinc-500 tracking-wider"
            key={index}
          >
            {item.toUpperCase()}
          </span>
        ))}
      </div>

      <hr className="border border-black" />

      <p className="text-justify text-md mt-8 mb-2">{oneNews.content}</p>

      <hr className="border border-black" />
      <span className="text-lg font-medium mt-8">Summary : </span>
      <p className="text-justify text-md">{oneNews.summary}</p>

      <span className="flex my-2 mt-8 font-medium">
        Date Created :{' '}
        <p className="mx-2">{new Date(oneNews.createdAt).toLocaleString()}</p>
      </span>

      <span className="flex my-2 mb-8 font-medium">
        Date Posted :{' '}
        <p className="mx-2">{new Date(oneNews.createdAt).toLocaleString()}</p>
      </span>

      <div className="flex justify-evenly">
        <span className="flex">
          Likes : <p className="mx-2">{oneNews.likes?.length}</p>
        </span>

        <span className="flex">
          Dislikes :<p className="mx-2">{oneNews.disLikes?.length}</p>
        </span>
      </div>

      <div className="flex items-center justify-center my-4 py-4 rounded-lg border-2 border-black">
        <p
          className={
            oneNews.isVerified ? 'text-green-500 mx-4' : 'text-red-500 mx-4'
          }
        >
          <Tick />
        </p>
        {oneNews.isVerified ? 'Verified' : 'Unverified'}
        <Link
          className="mx-8 bg-gray-500 p-4 px-8 rounded-lg shadow-lg active:bg-gray-600 hover:bg-gray-600 flex place-items-center text-white"
          href={`${oneNews._id}/edit`}
        >
          Edit
        </Link>
      </div>

      <Link
        href={oneNews.sourceURL || '/'}
        target="_blank"
        className="bg-gray-400 font-bold text-black p-4 rounded-lg shadow-lg active:bg-gray-600 hover:bg-gray-500 flex place-items-center"
      >
        View Source
        <Arrow />
      </Link>
      <div>
        <Comments />
      </div>
    </div>
  )
}

export default Index
