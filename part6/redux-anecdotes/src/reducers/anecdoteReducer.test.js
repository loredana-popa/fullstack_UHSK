import anecdoteReducer from './anecdoteReducer'
import deepFreeze from 'deep-freeze'

describe('anecdoteReducer', () => {
    const initState = [{
        content: 'If it hurts, do it more often',
        id: 24354,
        votes: 0
    }]
    test ('returns new state with action anecdotes/increaseVotesFor', () => {
        const state = initState

        const action = {
            type: 'anecdotes/increaseVotesFor',
            payload: 24354,
            
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

    test('returns new state with action anecdotes/createAnecdote', () => {

        const state = initState

        const action = {
            type: 'anecdotes/createAnecdote',
            payload: 'A new test anecdote is created'
            
        }

        deepFreeze(state)
        const newState = anecdoteReducer(state, action)

        expect(newState).toHaveLength(2)
        expect(newState.map(s => s.content)).toContainEqual(action.payload)

    })
})