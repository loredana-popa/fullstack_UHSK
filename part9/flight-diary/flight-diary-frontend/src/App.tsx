import { useEffect, useState } from 'react';
import { NonSensitiveDiaryEntry } from './types';
import Diary from './components/Diary';

import {getAllDiaries} from './services/diaryService'


const App=()=> {
  const [diaries, setDiaries]= useState<NonSensitiveDiaryEntry[]>([
  ])

  useEffect(()=>{
    getAllDiaries().then(data=>{
      console.log(data)
      setDiaries(data)
    })
  },[])


  console.log('Diaries are',diaries)
  

  return (
    <div className="App">
      <h2>Diary entries</h2>
      {diaries.map(d => 
      <Diary diary={d} key={d.id}/>
      )}
    </div>
  );
}

export default App;
