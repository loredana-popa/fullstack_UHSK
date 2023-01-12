import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'

import Blog from './Blog'

const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'loredana',
    url: 'www.testcomponent.com',
    likes : 0,
    user : {
        id: '638f75db991b15bbb58a9a4c',
        name: 'Arto Hellas',
        username: 'hellas'
    }
}


describe('<Blog />', () => {
    let container

    beforeEach(() => {
        container = render(
            <Blog blog={blog} loggedUser='hellas'/>
        ).container
    })

    test('the component renders the title and author of a blog', () => {
        const div = container.querySelector('.blog-summary')

        expect(div).toHaveTextContent('Component testing is done with react-testing-library loredana')
    })

    test('at start the blog details (url,likes) are not displayed', () => {
        const div = container.querySelector('.blog-details')

        expect(div).toHaveStyle('display: none')
    })

    test('after clicking the view details button the blog details (url,likes) appear', async () => {
        const user = userEvent.setup()
        const button = container.querySelector('.view-bttn')
        await user.click(button)

        const div =container.querySelector('.blog-details')
        expect(div).not.toHaveStyle('display: none')
    })

})

