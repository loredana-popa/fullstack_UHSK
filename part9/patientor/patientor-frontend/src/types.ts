export interface Diagnosis {
	code: string;
	name: string;
	latin?: string;
}

export enum Gender {
	Male = 'male',
	Female = 'female',
	Other = 'other',
}

interface BaseEntry {
	id: string;
	description: string;
	date: string;
	specialist: string;
	diagnosisCodes: Array<Diagnosis['code']>;
}
export enum EntryType {
	HealthCheck = 'HealthCheck',
	Hospital = 'Hospital',
	OccupationalHealthcare = 'OccupationalHealthcare',
}

export enum healthCheckRating {
	Healthy = 0,
	LowRisk = 1,
	HighRisk = 2,
	CriticalRisk = 3,
}

export interface HealthCheckEntry extends BaseEntry {
	type: 'HealthCheck';
	healthCheckRating: healthCheckRating;
}

interface Discharge {
	date: string;
	criteria: string;
}
export interface HospitalEntry extends BaseEntry {
	type: 'Hospital';
	discharge: Discharge;
}

export interface sickLeave {
	startDate: string;
	endDate: string;
}

export interface OcupationalHealthcare extends BaseEntry {
	type: 'OccupationalHealthcare';
	employerName: string;
	sickLeave: sickLeave;
}

export type Entry = HospitalEntry | HealthCheckEntry | OcupationalHealthcare;

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown
	? Omit<T, K>
	: never;
// Define Entry without the 'id' property
export type EntryWithoutId = UnionOmit<Entry, 'id'>;

export interface Patient {
	id: string;
	name: string;
	occupation: string;
	gender: Gender;
	ssn: string;
	dateOfBirth?: string;
	entries: Entry[];
}

export type PatientFormValues = Omit<Patient, 'id' | 'entries'>;
