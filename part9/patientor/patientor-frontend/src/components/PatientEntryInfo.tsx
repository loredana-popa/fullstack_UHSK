import { Entry } from "../types"


interface PatientEntryInfoProps{
  entries: Entry[]
}

const PatientEntryInfo = (props: PatientEntryInfoProps) =>{
  const entries = props.entries
  if (entries){
    return(
        <div>
            {entries.map((e:Entry)=>(
              <div key={e.id}>

                <p>{e.date} <em>{e.description}</em></p>
                <ul>
                  {e.diagnosisCodes?.map((c,i)=>
                    <li key={i}>{c}</li>
                  )}
                </ul>
              </div>
          ))
          }
      </div>
    )} else {
      return <div>There are no entries for this patient</div>
    }

}

export default PatientEntryInfo
