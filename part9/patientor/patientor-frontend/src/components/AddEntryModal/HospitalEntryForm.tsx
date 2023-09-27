
import { SyntheticEvent, useState } from "react"
import { EntryType, HospitalEntry} from "../../types"
import { TextField,Button, FormControl, FormLabel, Grid } from "@mui/material"

interface Props{
  onClick: () => void
  onSubmit: (values:FormValues) => void
}

type FormValues = Omit<HospitalEntry, 'id'>
const HospitalEntryForm=({onSubmit, onClick}:Props)=>{

  const[newEntry, setNewEntry] = useState<FormValues>({
   date:'',
   type: EntryType.Hospital,
   specialist:'',
   description:'',
   diagnosisCodes: [],
   discharge: {date:'', criteria:''}
    
  })


 const addEntry=async (event: SyntheticEvent)=>{
   event.preventDefault(); 
   onSubmit({...newEntry})
   setNewEntry({
    date:'',
    type: EntryType.Hospital,
    specialist:'',
    description:'',
    diagnosisCodes: [],
    discharge: {date:'',criteria:''}
   })  
 } 

 const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>):void => {
   const {name, value}  = e.currentTarget
   if(name==='diagnosisCodes'){
    setNewEntry(prev=>{
      return{...prev, [name]:[value] }
    })
   }else if(name.includes('Discharge')){
      const key = name.substring(0,name.indexOf('Discharge'))
      setNewEntry(prev=>{
        return{
          ...prev, discharge:{...prev.discharge, [key]:value}
        }
      })
    }  
   else{
    setNewEntry(prev => {
      return { ...prev, [name]: value }
    })
   }
 }
 

 return(
   <div>
     <h3>New Hospital entry</h3>
   
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


        <FormControl>
          <FormLabel >Discharge</FormLabel>
          <TextField
         name='dateDischarge'
         label="Date"
         placeholder="YYYY-MM-DD"
         fullWidth
         value= {newEntry.discharge.date}
         onChange={handleTextFieldChange}
       />
       <TextField
         name='criteriaDischarge'
         label="Criteria"
         fullWidth
         value={newEntry.discharge.criteria}
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

export default HospitalEntryForm