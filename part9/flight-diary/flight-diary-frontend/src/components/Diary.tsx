import { NonSensitiveDiaryEntry } from "../types"

interface DiaryProps{
 diary: NonSensitiveDiaryEntry
}

const Diary=(props: DiaryProps)=>{
  return (
  <div>
    <h2>{props.diary.date}</h2>
    <div>visibility: {props.diary.visibility}</div>
    <div>weather: {props.diary.weather}</div>
  </div>
  )
}

export default Diary