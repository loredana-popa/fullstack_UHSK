import { Button, FormControl, FormLabel, Grid, TextField } from "@mui/material"
import { SyntheticEvent, useState } from "react"
import { EntryType, OcupationalHealthcare } from "../../types"

interface Props{
  onClick: () => void
  onSubmit: (values:FormValues) => void
}


type FormValues = Omit<OcupationalHealthcare, 'id'>

const OcupationalHealthcareForm=({onSubmit, onClick}:Props)=>{

const [newEntry, setNewEntry]= useState<FormValues>({
    date:'',
    description:'',
    specialist:'',
    diagnosisCodes:[],
    type:EntryType.OccupationalHealthcare,
    employerName:'',
    sickLeave:{
      startDate:'',
      endDate:''
    }
  })

  const addEntry=async (event: SyntheticEvent)=>{
    event.preventDefault(); 
    onSubmit({...newEntry})
    setNewEntry({
      date:'',
      description:'',
      specialist:'',
      diagnosisCodes:[],
      type:EntryType.OccupationalHealthcare,
      employerName:'',
      sickLeave:{startDate:'',endDate:''}
    })  
  } 

  const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>):void => {
    const {name, value}  = e.currentTarget
    if(name==='diagnosisCodes'){
      setNewEntry(prev=>{
        return{...prev, [name]:[value] }
      })
    }else if(name==='startDate' || name==='endDate'){
      setNewEntry(prev=>{
        return{
          ...prev, sickLeave:{...prev.sickLeave, [name]:value}
        }
      })
    }  

    else{
      setNewEntry(prev => {
       return { ...prev, [name]: value }
     })
    }
  }
 

  return (
  <div>
    <h3>New OccupationalHealthcare entry</h3>
   
   <form onSubmit={addEntry}>

     <TextField
       name='date'
       label="Date"
       placeholder="YYYY-MM-DD"
       fullWidth
       value= {newEntry.date}
       onChange={handleTextFieldChange}
     />

     <TextField
       name='description'
       label="Description"
       fullWidth
       value={newEntry.description}
       onChange={handleTextFieldChange}
     />

     <TextField
       name='specialist'
       label="Specialist"
       fullWidth
       value={newEntry.specialist}
       onChange={handleTextFieldChange}
     />

     <TextField
       name="diagnosisCodes"
       label="DiagnosisCodes"
       fullWidth
       value={newEntry.diagnosisCodes}
       onChange={handleTextFieldChange}
     />

    <TextField
       name='employerName'
       label="EmployerName"
       fullWidth
       value={newEntry.employerName}
       onChange={handleTextFieldChange}
     />

    <FormControl>
      <FormLabel >Sick Leave</FormLabel>
      <TextField
        name='startDate'
        label="Start Date"
        placeholder="YYYY-MM-DD"
        fullWidth
        value= {newEntry.sickLeave.startDate}
        onChange={handleTextFieldChange}
      />
      <TextField
        name='endDate'
        label="End Date"
        placeholder="YYYY-MM-DD"
        fullWidth
        value={newEntry.sickLeave.startDate}
        onChange={handleTextFieldChange}
      />
    </FormControl>

    <Grid>
      <Grid item>
        <Button
          color="secondary"
          variant="contained"
          style={{ float: "left" }}
          type="button"
          onClick={onClick}
        >
          Cancel
        </Button>
      </Grid>
      <Grid item>
        <Button
          style={{
            float: "right",
          }}
          type="submit"
          variant="contained"
        >
          Add
        </Button>
      </Grid>
        </Grid>



    </form>
  </div>
  )
}


export default OcupationalHealthcareForm