import anecdoteReducer from './anecdoteReducer'
import deepFreeze from 'deep-freeze'

describe('anecdoteReducer', () => {
    const initState = [{
        content: 'If it hurts, do it more often',
        id: 24354,
        votes: 0
    }]
    test ('returns new state with action VOTE', () => {
        const state = initState

        const action = {
            type: 'VOTE',
            data: {
                id: 24354,
            }
        }

        deepFreeze(state)
        const newState = anecdoteReducer(state, action)
        
        expect(newState).toHaveLength(1)

        expect(newState).toContainEqual({
            content: 'If it hurts, do it more often',
            id: 24354,
            votes: 1
        })
    })

    test('returns new state with action NEW_ANECDOTE', () => {

        const state = initState

        const action = {
            type: 'NEW_ANECDOTE',
            data: {
                content: 'A new test anecdote is created'
            }
        }

        deepFreeze(state)
        const newState = anecdoteReducer(state, action)

        expect(newState).toHaveLength(2)
        expect(newState).toContainEqual(action.data)

    })
})