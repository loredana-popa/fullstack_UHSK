 import { useParams } from "react-router-dom"
import { Patient } from "../types"
 
 interface PatientInfoProps{
  patients : Patient[]
 }

const PatientInfo=(props: PatientInfoProps)=>{
  const id= useParams().id
  const patient = props.patients.find(p=> p.id === id)

  return(
    patient ?
    
      <div>
        <h2>{patient.name}</h2>
        <div>gender: {patient.gender}</div>
        <div>date of birth: {patient.dateOfBirth}</div>
        <div>ssn:{patient.ssn}</div>
        <div>occupation: {patient.occupation}</div> 
             
      </div>
    :
      <div> There are no info about this patient </div>
  )
}

export default PatientInfo