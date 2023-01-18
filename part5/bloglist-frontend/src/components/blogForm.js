import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
    const [newBlog, setNewBlog] =  useState({ title: '', author: '', url: '' })

    const handleChange = (e) => {
        const { name, value } = e.target
        setNewBlog( (prev) => {
          return { ...prev, [name]: value }
        })
      }

    const addBlog = (e) => {
        e.preventDefault()
        createBlog({ ...newBlog })
        setNewBlog({
            title: '',
            author: '',
            url: ''
          })

    }

    return (
        <form onSubmit={addBlog}>
            <label>title:
                <input
                    type="text"
                    name="title"
                    value= {newBlog.title}
                    onChange={handleChange}
                    className='title-input'
                    />
            </label>

            <label>author:
                <input
                type="text"
                name="author"
                value= {newBlog.author}
                onChange={handleChange}
                className='auth-input'
                />
            </label>

            <label>url:
                <input
                type="text"
                name="url"
                value= {newBlog.url}
                onChange={handleChange}
                className='url-input'
                />
            </label>
            <button id='addBlog-btn' type='submit'>create</button>
        </form>
    )
}

export default BlogForm