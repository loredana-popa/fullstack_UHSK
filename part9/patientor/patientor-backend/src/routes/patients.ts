import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils';
import { toNewEntryToPatient } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
	res.send(patientService.getNonSensitivePatientData());
});

router.get('/:id', (req, res) => {
	const patient = patientService.findById(req.params.id);

	if (patient) {
		res.send(patient);
	} else {
		res.sendStatus(404);
	}
});

router.post('/', (req, res) => {
	try {
		const newPatientEntry = toNewPatientEntry(req.body);

		const addedEntry = patientService.addPatient(newPatientEntry);
		res.json(addedEntry);
	} catch (error: unknown) {
		let errorMessage = 'Something went wrong';
		if (error instanceof Error) {
			errorMessage += ' Error: ' + error.message;
		}
		res.status(400).send(errorMessage);
	}
});

router.post('/:id/entries', (req, res) => {
	try {
		console.log('action: add entry to patient');
		const patientID = req.params.id;
		const newEntryToPatient = toNewEntryToPatient(req.body);
		console.log('req body', newEntryToPatient);

		const addedEntryToPatient = patientService.addEntryToPatient(
			patientID,
			newEntryToPatient
		);
		res.json(addedEntryToPatient);
	} catch (error: unknown) {
		let errorMessage = 'Something went wrong';
		if (error instanceof Error) {
			errorMessage += ' Error: ' + error.message;
		}
		res.status(400).send(errorMessage);
		console.log(errorMessage);
	}
});
export default router;
