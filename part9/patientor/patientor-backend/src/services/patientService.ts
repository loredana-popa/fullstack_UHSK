import patientsData from '../../data/patients';
import { NonSensitivePatientData, Patient, NewPatient } from '../types';
import { v1 as uuid } from 'uuid';

const patients: Patient[] = patientsData;
const id = uuid();

const getNonSensitivePatientData = (): NonSensitivePatientData[] => {
	return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
		id,
		name,
		dateOfBirth,
		gender,
		occupation,
	}));
};

const addPatient = (entry: NewPatient): Patient => {
	const newPatientEntry = {
		id: id,
		...entry,
	};
	patients.push(newPatientEntry);
	return newPatientEntry;
};

export default {
	getNonSensitivePatientData,
	addPatient,
};
