import React, { useEffect, useState } from 'react'
import axios from '@/axios.jsx'
import NewsItem from '@/components/NewsItem.js'

function NotVerified() {
  const [news, setNews] = useState([])

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get('/news/notVerified/true')
      const news = await res.data

      setNews(news.news)
    }

    fetchData()
  }, [])

  return (
    <div className="flex flex-wrap justify-center py-10 px-5 bg-gray-100">
      {news.map((item, index) => {
        return <NewsItem key={index} data={item} />
      })}
    </div>
  )
}

export default NotVerified
