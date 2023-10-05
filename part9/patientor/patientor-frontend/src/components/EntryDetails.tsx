import {
	Entry,
	OcupationalHealthcare,
	HospitalEntry,
	HealthCheckEntry,
	healthCheckRating,
} from '../types';
import {
	Work,
	LocalHospital,
	HealthAndSafety,
	Favorite,
} from '@mui/icons-material';

type HospitalEntryDetailsProps = Omit<HospitalEntry, 'id' | 'type'>;
type OccupationalHealthcareProps = Omit<OcupationalHealthcare, 'id' | 'type'>;
type HealthCheckEntryProps = Omit<HealthCheckEntry, 'id' | 'type'>;

const checkRating = (rating: healthCheckRating) => {
	switch (rating) {
		case healthCheckRating.Healthy:
			return <Favorite sx={{ color: 'green' }} />;
		case healthCheckRating.CriticalRisk:
			return <Favorite sx={{ color: 'red' }} />;
		case healthCheckRating.HighRisk:
			return <Favorite sx={{ color: 'orange' }} />;
		case healthCheckRating.LowRisk:
			return <Favorite sx={{ color: 'yellow' }} />;
	}
};

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
	throw new Error(
		`Unhandled discriminated union member: ${JSON.stringify(value)}`
	);
};

const HospitalEntryDetails = (props: HospitalEntryDetailsProps) => {
	return (
		<div>
			<div>
				{props.date} <LocalHospital />{' '}
			</div>
			<div>
				<em>{props.description}</em>
			</div>
			<ul>{props.diagnosisCodes?.map((c) => <li key={c}>{c}</li>)}</ul>
			<div>
				discharge:{props.discharge.date} {props.discharge.criteria}
			</div>
			<div>diagnose by {props.specialist}</div>
		</div>
	);
};

const OccupationalHealthcareEntryDetails = (
	props: OccupationalHealthcareProps
) => {
	return (
		<div>
			<div>
				{props.date} <Work /> {props.employerName}
			</div>
			<div>
				<em>{props.description}</em>
			</div>
			<ul>{props.diagnosisCodes?.map((c) => <li key={c}>{c}</li>)}</ul>
			<div>diagnose by {props.specialist}</div>
		</div>
	);
};

const HealthCheckEntryDetails = (props: HealthCheckEntryProps) => {
	return (
		<div>
			<div>
				{props.date} <HealthAndSafety />{' '}
			</div>
			<div>
				<em>{props.description}</em>
			</div>
			<div>{checkRating(props.healthCheckRating)}</div>

			<ul>{props.diagnosisCodes?.map((c) => <li key={c}>{c}</li>)}</ul>
			<div>diagnose by {props.specialist}</div>
		</div>
	);
};

interface EntryDetailsProps {
	entry: Entry;
}

const EntryDetails = (props: EntryDetailsProps) => {
	const entry = props.entry;
	switch (entry.type) {
		case 'Hospital':
			return <HospitalEntryDetails {...entry} />;
		case 'OccupationalHealthcare':
			return <OccupationalHealthcareEntryDetails {...entry} />;

		case 'HealthCheck':
			return <HealthCheckEntryDetails {...entry} />;
		default:
			return assertNever(entry);
	}
};
export default EntryDetails;
