import notificationReducer from './notificationReducer'
import deepFreeze from 'deep-freeze'

describe('notificationReducer', () => {
  test('returns new state with action ADD', () => {
    const state = ''
    const action = {
      type: 'ADD',
      payload: 'a new blog was added',
    }
    deepFreeze(state)
    const newState = notificationReducer(state, action)

    expect(newState).toContain(action.payload)
  })
})
