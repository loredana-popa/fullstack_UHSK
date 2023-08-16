import patientsData from '../../data/patients';
import { NonSensitivePatientData, Patient } from '../types';

const patients: Patient[] = patientsData;

const getNonSensitivePatientData = (): NonSensitivePatientData[] => {
	return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
		id,
		name,
		dateOfBirth,
		gender,
		occupation,
	}));
};

export default {
	getNonSensitivePatientData,
};
