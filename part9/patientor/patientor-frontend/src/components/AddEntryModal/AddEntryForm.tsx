import {  useState } from "react"
import { EntryWithoutId} from "../../types"
import HealthCheckEntryForm from "./HealthCheckEntryForm"
import HospitalEntryForm from "./HospitalEntryForm"
import OcupationalHealthcareForm from "./OcupationalHealthcareForm"
import {FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material"

interface NewEntryFormProps{
  onCancel:() => void
  onSubmit:(values: EntryWithoutId)=>void
}

const NewEntryForm=({onSubmit, onCancel}:NewEntryFormProps)=>{
  const[type, setType]= useState('')

  const handleChange = (e:React.FormEvent<HTMLInputElement>):void => {
		const  value  = e.currentTarget.value
		setType(value)
	}

  return(
    <div>
      <FormControl>
          <RadioGroup
            row
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="entryType"
            // defaultValue='HealthCheckEntry'
            onChange={handleChange}
          >
          <FormControlLabel value='HealthCheckEntry' control={<Radio />} label="HealthCheckEntry" />
          <FormControlLabel value='HospitalEntry' control={<Radio />} label="HospitalEntry" />
          <FormControlLabel value='OcupationalHealthcare' control={<Radio />} label="OcupationalHealthcare" />

          </RadioGroup>
      </FormControl>

      {(()=>{
        switch(type){
          case 'HospitalEntry':
            return <HospitalEntryForm onSubmit={onSubmit} onClick={onCancel}/>;
          case 'OcupationalHealthcare':
            return <OcupationalHealthcareForm onSubmit={onSubmit} onClick={onCancel}/>;
          case 'HealthCheckEntry':
            return <HealthCheckEntryForm onSubmit={onSubmit} onClick={onCancel}/>;
          default:
            return <div>Select an entry type</div>
  
      }})()}

    </div>
  )
}

export default NewEntryForm