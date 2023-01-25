import { useDispatch, useSelector } from "react-redux"
import { increaseVotesFor } from "../reducers/anecdoteReducer"

const Anecdote = ({ anecdote, handleClick }) => {
    return (
        <div>
            <div>{anecdote.content}</div>
            <div>
                has {anecdote.votes}
                <button onClick={handleClick}>vote</button>
            </div>


        </div>
    )

}

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state)
    console.log(anecdotes)

    return (
        <div>
            {anecdotes.map((anecdote) =>
                <Anecdote
                    key={anecdote.id}
                    anecdote={anecdote}
                    handleClick={() =>
                        dispatch(increaseVotesFor(anecdote.id))
                    }
                />
            )}

        </div>
    )
}

export default AnecdoteList