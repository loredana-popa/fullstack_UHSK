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
  // const [date, setDate] = useState('')
  // const[ weather, setWeather] = useState<Weather>(Weather.Sunny)
  // const[visibility, setVisibility]= useState<Visibility>(Visibility.Good)
  // const[comment, setComment]=useState('smth')

  useEffect(()=>{
    getAllDiaries().then(data=>{
      console.log(data)
      setDiaries(data)
    })
  },[])

  const handleChange = (e:React.FormEvent<HTMLInputElement>):void => {
		const { name, value } = e.currentTarget
    console.log(e.currentTarget.nodeName)
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

      addNewDiary(diaryToAdd)

  }

  console.log('Diaries are',diaries)
  

  return (
    <div className="App">
      <h2>Add new entry</h2>
      <form onSubmit={createDiary}>
        <div>
          <label>date 
            <input 
              type='text'
              name='date' 
              value={newDiary.date} 
              onChange={handleChange}
            />
          </label>
        </div>
        
        <div>
          <label>weather
            <input 
              name='weather' 
              value={newDiary.weather} 
              onChange={handleChange}
            />
          </label>
        </div>
       
       <div>
         <label>visibility 
            <input 
              name='visibility' 
              value={newDiary.visibility} 
              onChange={handleChange}
            />
          </label>
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

      {diaries.map(d => 
      <Diary diary={d} key={d.id}/>
      )}
    </div>
  );
}

export default App;
