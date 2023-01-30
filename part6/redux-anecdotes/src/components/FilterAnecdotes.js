import React from "react";
import { useDispatch } from "react-redux";
import { filterReducer } from "../reducers/filterReducer";


const FilterAnecdots = () => {
  const dispatch = useDispatch()
  const handleChange = (e) => {
    const value = e.target.value
    dispatch(filterReducer(value))
  }
  
  return (
  
    <form>
      <label>filter:</label>
      <input 
        type='text'
        name='filter'
        onChange={handleChange} 
      />
      </form>
 

  )
}

export default FilterAnecdots