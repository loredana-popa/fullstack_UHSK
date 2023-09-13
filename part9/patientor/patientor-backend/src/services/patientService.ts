import patientsData from '../../data/patients';
import {
	NonSensitivePatientData,
	Patient,
	NewPatient,
	Entry,
	EntryWithoutId,
} from '../types';
import { v1 as uuid } from 'uuid';

const patients: Patient[] = patientsData;
const id = uuid();

const getNonSensitivePatientData = (): NonSensitivePatientData[] => {
	return patients.map(
		({ id, name, dateOfBirth, gender, occupation, entries }) => ({
			id,
			name,
			dateOfBirth,
			gender,
			occupation,
			entries,
		})
	);
};

const addPatient = (entry: NewPatient): Patient => {
	const newPatientEntry = {
		id: id,
		entries: [],
		...entry,
	};
	patients.push(newPatientEntry);
	return newPatientEntry;
};

const findById = (id: string): Patient | undefined => {
	const entry = patients.find((d) => d.id === id);
	return entry;
};

const addEntryToPatient = (patientID: string, entry: EntryWithoutId): Entry => {
	const patient = patients.find((p) => p.id === patientID);
	const newEntry = {
		id: id,
		...entry,
	};

	patient?.entries.push(newEntry);

	return newEntry;
};

export default {
	getNonSensitivePatientData,
	addPatient,
	findById,
	addEntryToPatient,
};
