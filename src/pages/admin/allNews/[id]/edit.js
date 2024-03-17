import { useRouter } from 'next/router'
import axios from '@/axios.jsx'
import React, { useState, useEffect } from 'react'

function Edit() {
  const router = useRouter()
  const id = router.query.id

  const [news, setNews] = useState({
    title: '',
    content: '',
    summary: '',
    category: '',
    isVerified: '',
  })

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [summary, setSummary] = useState('')
  const [category, setCategory] = useState('')
  const [isVerified, setIsVerified] = useState('')

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }

  const handleContentChange = (e) => {
    setContent(e.target.value)
  }

  const handleSummaryChange = (e) => {
    setSummary(e.target.value)
  }

  const handleCategoryChange = (e) => {
    setCategory(e.target.value)
  }

  const handleIsVerifiedChange = (e) => {
    setIsVerified(e.target.value)
  }

  const handleUpdate = async (e) => {
    e.preventDefault()

    const data = new FormData(e.target)

    const title = data.get('title')
    const content = data.get('content')
    const summary = data.get('summary')
    const category = data.get('category')
    const isVerified = data.get('isVerified')

    await axios
      .put(`/news/update/${id}`, {
        title,
        content,
        summary,
        category,
        isVerified,
      })
      .then((res) => {
        if (res.status === 200) {
          router.push('/admin/allNews')
        }
      })
  }

  useEffect(() => {
    if (id) {
      // Only fetch data if id is available
      async function fetchData() {
        try {
          const res = await axios.get(`/news/${id}`)
          const data = await res.data

          setNews(data.news)
          setTitle(data.news.title)
          setContent(data.news.content)
          setSummary(data.news.summary)
          setCategory(data.news.category)
          setIsVerified(data.news.isVerified)
        } catch (err) {
          console.log(err)
        }
      }

      fetchData()
    }
  }, [id]) // Fetch data whenever id changes

  return (
    <div className="p-10">
      <form onSubmit={handleUpdate} method="POST">
        <div className="flex flex-col">
          <label htmlFor="title" className="text-lg font-semibold p-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            className="border border-black rounded-md p-2"
            onChange={handleTitleChange}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="content" className="text-lg font-semibold p-2">
            Content
          </label>
          <textarea
            name="content"
            id="content"
            cols="30"
            rows="20"
            value={content}
            className="border border-black rounded-md p-2"
            onChange={handleContentChange}
          ></textarea>
        </div>
        <div className="flex flex-col">
          <label htmlFor="summary" className="text-lg font-semibold p-2">
            Summary
          </label>
          <textarea
            name="summary"
            id="summary"
            cols="30"
            rows="10"
            value={summary}
            className="border border-black rounded-md p-2"
            onChange={handleSummaryChange}
          ></textarea>
        </div>
        <div className="flex flex-col">
          <label htmlFor="isVerified" className="text-lg font-semibold p-2">
            isVerified
          </label>
          <select
            name="isVerified"
            id="isVerified"
            className="border border-black rounded-md p-2"
            value={isVerified}
            onChange={handleIsVerifiedChange}
          >
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="category" className="text-lg font-semibold p-2">
            Category
          </label>
          <select
            name="category"
            id="category"
            value={category}
            className="border border-black rounded-md p-2"
            onChange={handleCategoryChange}
          >
            <option value="politics">Politics</option>
            <option value="Business">Business</option>
            <option value="Technology">Technology</option>
            <option value="Science">Science</option>
            <option value="Health">Health</option>
            <option value="Sports">Sports</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Environment">Environment</option>
            <option value="Education">Education</option>
            <option value="Travel">Travel</option>
            <option value="Crime and Justice">Crime and Justice</option>
            <option value="Weather">Weather</option>
          </select>
        </div>
        <div className="flex justify-center my-4">
          <button
            type="submit"
            className="bg-gray-400 font-bold text-black p-4 rounded-lg shadow-lg active:bg-gray-600 hover:bg-gray-500 flex place-items-center"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  )
}

export default Edit
