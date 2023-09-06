 import { useParams } from "react-router-dom"
 import axios from "axios"
 import patientService from '../services/patients'
 import { apiBaseUrl } from "../constants"
import { Patient } from "../types"

import PatientEntryInfo from "./PatientEntryInfo"
import { useEffect, useState } from "react"
 
type PatientParams ={
  id: string
}
const PatientInfo=()=>{
  const [patient, setPatient] = useState<Patient>()
  const {id}= useParams<PatientParams>()

  useEffect(()=>{
    void axios.get<void>(`${apiBaseUrl}/patients`);
    
    if (id){
      const fetchPatient = async () => {
        const  patient = await patientService.getOne(id);
        setPatient(patient);
      }

    void fetchPatient()
  }
  },[id])


  return(
    patient ?
    
      <div>
        <h2>{patient.name}</h2>

        <div>gender: {patient.gender}</div>
        <div>date of birth: {patient.dateOfBirth}</div>
        <div>ssn: {patient.ssn}</div>
        <div>occupation: {patient.occupation}</div> 

        <br></br>

        <h2>entries</h2>

        <PatientEntryInfo entries={patient.entries}></PatientEntryInfo>
      </div>
    :
      <div> There are no info about this patient </div>
  )
}

export default PatientInfo