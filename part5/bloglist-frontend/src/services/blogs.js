import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
	token = `bearer ${newToken}`
}

const getAll = () => {
	const request = axios.get(baseUrl)
	return request.then(response => response.data)
}

const create = async newObject => {
	const config = {
		headers: { Authorization: token },
	}

	const response = await axios.post(baseUrl, newObject, config)
	console.log(response.data)
	return response.data
}

const update = (id, newObject) => {
	const config = {
		headers: { Authorization: token },
	}
	const request = axios.put(`${baseUrl}/${id}`, newObject, config)
	return request.then(response => response.data)
}

const remove = (id, newObject) => {
	const request = axios.delete(`${baseUrl}/${id}`, {
		headers: { Authorization: token },
		data: { source: newObject },
	})
	return request.then(response => response.data)
}

const createComment = async (id, newComment) => {
	const config = {
		headers: { Authorization: token },
	}

	const response = await axios.post(
		`${baseUrl}/${id}/comments`,
		{ data: newComment },
		config
	)
	return response.data
}

export default { getAll, create, update, remove, createComment, setToken }
