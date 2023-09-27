import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import patientService from "../services/patients"

import { apiBaseUrl } from "../constants";
import { Entry, EntryWithoutId, Patient } from "../types";

import PatientEntryInfo from "./PatientEntryInfo";
import AddEntryModal from "./AddEntryModal";
import { Button } from "@mui/material";

type PatientParams = {
  id: string;
};

const PatientInfo = () => {
  const [patient, setPatient] = useState<Patient>();
  const [entries, setEntries]=useState<Entry[]>([])
  const [error, setError]=useState<string>()
  const [modalOpen, setModalOpen] =useState<boolean>(false)

  const { id } = useParams<PatientParams>();

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/patients`);

    if (id) {
      const fetchPatient = async () => {
        const patient = await patientService.getOne(id);
        setPatient(patient);
        setEntries([...patient.entries])
      };

      void fetchPatient();
    }
  }, [id]);

  const openModal = (): void => setModalOpen(true)

  const closeModal = (): void =>{
    setModalOpen(false);
    setError(undefined)
  }

  const submitNewEntry = async (values: EntryWithoutId)=>{
    if(id){
    try {
      const entry= await patientService.createEntry(id, values)
      setEntries(entries.concat(entry))
      
    } catch (e:unknown) {

      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace(
            "Something went wrong. Error: ",
            "",
          );
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
      
    }}
  }

  console.log('error is',error)

  return patient ? (
    <div>
      <h2>{patient.name}</h2>

      <div>gender: {patient.gender}</div>
      <div>date of birth: {patient.dateOfBirth}</div>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>

      <br></br>

      <h2>entries</h2>

      <PatientEntryInfo entries={entries}></PatientEntryInfo>

      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      
      <Button variant="contained" onClick={() => openModal()}>
        Add New Entry
      </Button>

    </div>
  ) : (
    <div> There are no info about this patient </div>
  );
};

export default PatientInfo;
