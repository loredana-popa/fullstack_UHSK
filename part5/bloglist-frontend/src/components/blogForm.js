import { useState} from 'react'

const BlogForm = ({ createBlog }) => {
    const [newBlog, setNewBlog] =  useState({title: '', author: '', url: ''})

    const handleChange = (e) => {
        const {name, value} = e.target
        setNewBlog( (prev) => {
          return { ...prev, [name]: value}
        })
      }

    const addBlog = (e) => {
        e.preventDefault()
        createBlog({...newBlog})
        setNewBlog({
            title: '',
            author: '',
            url: ''
          })
  
    }

    return (
        <form onSubmit={addBlog}>
            <div>title: 
                <input
                type="text"
                name="title"
                value= {newBlog.title}
                onChange={handleChange}
                />
            </div>

            <div>author: 
                <input
                type="text"
                name="author"
                value= {newBlog.author}
                onChange={handleChange}
                />
            </div>

            <div>url:
                <input
                type="text"
                name="url"
                value= {newBlog.url}
                onChange={handleChange}
                />
            </div>
            <button type='submit'>create</button>
        </form>
    )
}

export default BlogForm