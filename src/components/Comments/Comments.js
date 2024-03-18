import React, { useState, useEffect } from 'react'
import Comment from './Comment'
import Router, { useRouter } from 'next/router'
import axios from '@/axios.jsx'

function Comments() {
  const router = useRouter()
  const [comments, setComments] = useState([])

  const { id } = router.query

  useEffect(() => {
    if (id) {
      axios.get(`/comments/comment/${id}`).then((res) => {
        setComments(res.data.commentsById)
      })
    }
  }, [id])

  return (
    <div className="mx-4 py-4 border-t-2">
      <h1 className="text-2xl font-extrabold tracking-wider mb-4">Comments</h1>
      {comments.length === 0 ? (
        <p className="py-1 rounded-lg">No comments Yet</p>
      ) : (
        <div>
          {comments.map((comment) => {
            return (
              <Comment
                key={comment._id}
                id={comment._id}
                content={comment.content}
                userId={comment.userId}
                createdAt={comment.createdAt}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Comments
