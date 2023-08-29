import { useEffect, useState } from 'react';
import { NewDiaryEntry, NonSensitiveDiaryEntry, Visibility, Weather } from './types';
import Diary from './components/Diary';

import {getAllDiaries, addNewDiary} from './services/diaryService'


const App=()=> {
  const [diaries, setDiaries]= useState<NonSensitiveDiaryEntry[]>([
  ])

  const [newDiary, setNewDiary] = useState<NewDiaryEntry>({
    date:'',
    weather: Weather.Sunny,
    visibility: Visibility.Good,
    comment:''
  })

const [notification, setNotification]=useState('')

  useEffect(()=>{
    getAllDiaries().then(data=>{
      // console.log(data)
      setDiaries(data)
    })
  },[])

  const handleChange = (e:React.FormEvent<HTMLInputElement>):void => {
		const { name, value } = e.currentTarget
		setNewDiary(prev => {
			return { ...prev, [name]: value }
		})
	}

  const createDiary=(event:React.SyntheticEvent)=>{
    event.preventDefault()
    const diaryToAdd ={
      date: newDiary.date,
      weather: newDiary.weather,
      visibility: newDiary.visibility,
      comment: newDiary.comment
    }
    try {
      addNewDiary(diaryToAdd)
      .then(data=>setDiaries(diaries.concat(data)))
      
    } catch (error) {
      console.error('Smth is wrong')
      
    }
      
  }


  return (
    <div className="App">
      <h2>Add new entry</h2>
      <div>{notification}</div>
      <form onSubmit={createDiary}>
        <div>
          <label>date 
            <input 
              type='date'
              name='date' 
              value={newDiary.date} 
              onChange={handleChange}
            />
          </label>
        </div>

        <div> weather
          <input 
          type='radio'
            name='weather' 
            value='sunny'
            onChange={handleChange}
          />
          <label>sunny</label>

          <input 
          type='radio'
            name='weather' 
            value='rainy'
            onChange={handleChange}
          />
          <label>rainy</label>

          <input 
          type='radio'
            name='weather' 
            value='windy'
            onChange={handleChange}
          />
          <label>windy</label>

          <input 
          type='radio'
            name='weather' 
            value='stormy'
            onChange={handleChange}
          />
          <label>stormy</label>
        
          <input 
          type='radio'
            name='weather' 
            value='cloudy'
            onChange={handleChange}
          />
          <label>cloudy</label>
        </div>
       

        <div> visibility
          <input 
          type='radio'
            name='visibility' 
            value='great'
            onChange={handleChange}
          />
          <label>great</label>

          <input 
          type='radio'
            name='visibility' 
            value='good'
            onChange={handleChange}
          />
          <label>good</label>

          <input 
          type='radio'
            name='visibility' 
            value='ok'
            onChange={handleChange}
          />
          <label>ok</label>

          <input 
          type='radio'
            name='visibility' 
            value='poor'
            onChange={handleChange}
          />
          <label>poor</label>
        
        </div>

        <div>
          <label>comment
            <input 
              type='text'
              name='comment' 
              value={newDiary.comment} 
              onChange={handleChange}
            />
          </label>
        </div>

        <button type='submit'>add</button>

      </form>

      <h2>Diary entries</h2>

      {diaries.map((d,i) => 
      <Diary diary={d} key={i}/>
      )}
    </div>
  );
}

export default App;
