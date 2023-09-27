import {
	NewPatient,
	Gender,
	EntryWithoutId,
	Diagnosis,
	// EntryType,
	SickLeave,
	Discharge,
	HealthCheckRating,
} from './types';

const toNewPatientEntry = (object: unknown): NewPatient => {
	if (!object || typeof object !== 'object') {
		throw new Error('Incorrect or missing data');
	}
	if (
		'name' in object &&
		'dateOfBirth' in object &&
		'gender' in object &&
		'ssn' in object &&
		'occupation' in object
	) {
		const newEntry: NewPatient = {
			name: parseName(object.name),
			dateOfBirth: parseDate(object.dateOfBirth),
			gender: parseGender(object.gender),
			ssn: parseSsn(object.ssn),
			occupation: parseOccupation(object.occupation),
		};
		return newEntry;
	}

	throw new Error('Incorrect data: some fields are missing');
};

const isString = (str: unknown): str is string => {
	return typeof str === 'string' || str instanceof String;
};

const parseName = (name: unknown): string => {
	if (!isString(name)) {
		throw new Error('Incorrect or misssing name');
	}
	return name;
};

// check if the given date is of correct format
const isDate = (date: string): boolean => {
	return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
	if (!isString(date) || !isDate(date)) {
		throw new Error('Incorrect or missing date');
	}
	return date;
};

const parseOccupation = (occupation: unknown): string => {
	if (!isString(occupation)) {
		throw new Error('Incorrect or missing occupation');
	}
	return occupation;
};

const parseSsn = (ssn: unknown): string => {
	if (!isString(ssn)) {
		throw new Error('Incorrect or missing ssn');
	}
	return ssn;
};

const isGender = (param: string): param is Gender => {
	return Object.values(Gender)
		.map((v) => v.toString())
		.includes(param);
};

const parseGender = (gender: unknown): Gender => {
	if (!isString(gender) || !isGender(gender)) {
		throw new Error('Incorrect or missing gender: ' + gender);
	}
	return gender;
};

// functions for parsing patient's entries

export const toNewEntryToPatient = (object: unknown): EntryWithoutId => {
	if (!object || typeof object !== 'object') {
		throw new Error('Incorrect or missing data');
	}
	if (
		'date' in object &&
		'description' in object &&
		'specialist' in object &&
		'type' in object
	) {
		switch (object.type) {
			case 'OccupationalHealthcare':
				if ('employerName' in object && 'sickLeave' in object) {
					const newEntry: EntryWithoutId = {
						type: 'OccupationalHealthcare',
						date: parseDate(object.date),
						description: parseDescription(object.description),
						specialist: parseSpecialist(object.specialist),
						diagnosisCodes: parseDiagnosisCodes(object),
						// type: parseType(object.type),
						employerName: parseEmployerName(object.employerName),
						sickLeave: parseSickLeave(object.sickLeave),
					};

					return newEntry;
				}
				throw new Error(
					'Incorrect data: some fields for OccupationalHealthcare are missing'
				);

			case 'Hospital':
				if ('discharge' in object) {
					const newEntry: EntryWithoutId = {
						type: 'Hospital',
						date: parseDate(object.date),
						description: parseDescription(object.description),
						specialist: parseSpecialist(object.specialist),
						diagnosisCodes: parseDiagnosisCodes(object),
						discharge: parseDischarge(object.discharge),
					};
					return newEntry;
				}
				throw new Error('Incorrect data: some fields for Hospital are missing');

			case 'HealthCheck':
				if ('healthCheckRating' in object) {
					const newEntry: EntryWithoutId = {
						type: 'HealthCheck',
						date: parseDate(object.date),
						description: parseDescription(object.description),
						specialist: parseSpecialist(object.specialist),
						diagnosisCodes: parseDiagnosisCodes(object),
						healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
					};
					return newEntry;
				}
				throw new Error(
					'Incorrect data: some fields for HealthCheck are missing'
				);
		}
	}
	throw new Error('Incorrect data: some fields are missing');
};

// parsers for Basic Entry type
const parseDescription = (description: unknown): string => {
	if (!isString(description)) {
		throw new Error('Incorrect or misssing description');
	}
	return description;
};

const parseSpecialist = (specialist: unknown): string => {
	if (!isString(specialist)) {
		throw new Error('Incorrect or misssing specialist');
	}
	return specialist;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
	if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
		// we will just trust the data to be in correct form
		return [] as Array<Diagnosis['code']>;
	}

	return object.diagnosisCodes as Array<Diagnosis['code']>;
};

// const isType = (param: string): param is EntryType => {
// 	return Object.values(EntryType)
// 		.map((v) => v.toString())
// 		.includes(param);
// };

// const parseType = (type: unknown): EntryType => {
// 	if (!isString(type) || !isType(type)) {
// 		throw new Error('Incorrect or missing type: ' + type);
// 	}
// 	return type;
// };

// parsers for OcupationalHealthcare Entry type
const parseEmployerName = (employerName: unknown): string => {
	if (!isString(employerName)) {
		throw new Error('Incorrect or misssing employer');
	}
	return employerName;
};

const parseSickLeave = (object: unknown): SickLeave => {
	if (!object || typeof object !== 'object') {
		throw new Error('Incorrect or missing sickLeave data');
	}
	if ('startDate' in object && 'endDate' in object) {
		const leave = {
			startDate: parseDate(object.startDate),
			endDate: parseDate(object.endDate),
		};
		return leave;
	}
	throw new Error('Incorrect data: some fields are missing for sick leave');
};

// parsers for Hospital Entry type
const parseDischarge = (object: unknown): Discharge => {
	if (!object || typeof object !== 'object') {
		throw new Error('Incorrect or missing discharge data');
	}
	if ('date' in object && 'criteria' in object) {
		const discharge = {
			date: parseDate(object.date),
			criteria: parseCriteria(object.criteria),
		};
		return discharge;
	}
	throw new Error('Incorrect data: some fields are missing for discharge');
};

const parseCriteria = (criteria: unknown): string => {
	if (!isString(criteria)) {
		throw new Error('Incorrect or misssing criteria');
	}
	return criteria;
};

//parsers for HealthCheck Entry type

const isNumber = (nr: unknown): nr is number => {
	return typeof nr === 'number' || nr instanceof Number;
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
	return Object.values(HealthCheckRating)
		.map((v) => v)
		.includes(param);
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
	if (!isNumber(rating) || !isHealthCheckRating(rating)) {
		throw new Error('Incorrect or missing type healthCheckRating: ' + rating);
	}
	return rating;
};

export default toNewPatientEntry;
