const blogForm = ({ onChange, onSubmit}) => {
    return (
        <form onSubmit={onSubmit}>
            <div>title: 
                <input
                type="text"
                name="title"
                onChange={onChange}
                />
            </div>

            <div>author: 
                <input
                type="text"
                name="author"
                onChange={onChange}
                />
            </div>

            <div>url:
                <input
                type="text"
                name="url"
                onChange={onChange}
                />
            </div>
            <button type='submit'>create</button>
        </form>
    )
}

export default blogForm