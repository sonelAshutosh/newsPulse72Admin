import React from 'react'
import Link from 'next/link'
import Tick from '@/svg/Tick'
import Arrow from '@/svg/Arrow'

function NewsItem({ data }) {
  return (
    <div className="p-4 max-w-sm">
      <div className="flex rounded-lg h-full bg-gray-300 text-black font-semibold shadow-lg p-8 flex-col">
        <div className="flex items-center mb-3">
          <div className="w-full inline-flex items-center justify-center rounded-lg ltext-white flex-shrink-0">
            <img className="rounded-lg shadow-lg" src={data.imageURL} />
          </div>
        </div>
        <div className="flex flex-col justify-between flex-grow">
          <p className="leading-relaxed text-base ">{data.title}</p>
          <div className="border border-black p-1 w-full rounded-lg">
            {data.category}
          </div>
          <div className="flex justify-between place-items-center">
            <Link
              key={data._id}
              href={`allNews/${data._id}`}
              className="my-2 text-black hover:text-blue-800 inline-flex items-center cursor-pointer"
            >
              Read More
              <Arrow />
            </Link>
            <div
              className={data.isVerified ? 'text-green-500' : 'text-red-500'}
            >
              <Tick />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewsItem
