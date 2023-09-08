import axios from "axios";
import { useEffect, useState } from "react";
import diagnosesService from "../services/diagnoses";
import { Diagnosis, Entry } from "../types";
import { apiBaseUrl } from "../constants";
import EntryDetails from "./EntryDetails";

interface PatientEntryInfoProps {
  entries: Entry[];
}

const PatientEntryInfo = (props: PatientEntryInfoProps) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  const entries = props.entries;

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/diagnoses`);

    const fetchDiagnoses = async () => {
      const diagnoses = await diagnosesService.getAll();
      setDiagnoses(diagnoses);
    };

    void fetchDiagnoses();
  }, []);

  const findCodeDescription = (code: string) => {
    const codeElem = diagnoses.find((d) => d.code === code);
    return codeElem?.name;
  };

  if (entries.length > 0) {
    return (
      <div>
        {entries.map((e: Entry) => (
          <div key={e.id}>
            <hr></hr>
            <EntryDetails entry={e} />
          
          </div>

        ))}
      </div>
    );
  } else {
    return <div>There are no entries for this patient</div>;
  }
};

export default PatientEntryInfo;
