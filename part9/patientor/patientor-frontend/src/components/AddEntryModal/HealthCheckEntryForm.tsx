import { SyntheticEvent, useState } from 'react';
import { EntryType, EntryWithoutId, healthCheckRating } from '../../types';
import {
	Button,
	FormControl,
	FormLabel,
	RadioGroup,
	Radio,
	FormControlLabel,
	Grid,
} from '@mui/material';
import { BaseFormElements } from './formElements';
import { currentDate } from '../../constants';

interface Props {
	onClick: () => void;
	onSubmit: (values: EntryWithoutId) => void;
}

const HealthCheckEntryForm = ({ onSubmit, onClick }: Props) => {
	const [newEntry, setNewEntry] = useState<EntryWithoutId>({
		date: currentDate,
		type: EntryType.HealthCheck,
		specialist: '',
		description: '',
		diagnosisCodes: [],
		healthCheckRating: healthCheckRating.Healthy,
	});

	const addEntry = async (event: SyntheticEvent) => {
		event.preventDefault();
		onSubmit({ ...newEntry });
		setNewEntry({
			date: currentDate,
			type: EntryType.HealthCheck,
			specialist: '',
			description: '',
			diagnosisCodes: [],
			healthCheckRating: healthCheckRating.Healthy,
		});
	};

	const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
		const { name, value } = e.currentTarget;
		if (name === 'healthCheckRating') {
			setNewEntry((prev) => {
				return { ...prev, [name]: parseInt(value) };
			});
		} else {
			setNewEntry((prev) => {
				return { ...prev, [name]: value };
			});
		}
	};

	const handleTextFieldChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	): void => {
		const { name, value } = e.currentTarget;

		setNewEntry((prev) => {
			return { ...prev, [name]: value };
		});
	};

	const handleMultipleSelection = (options: string[]) => {
		setNewEntry((prev) => {
			return { ...prev, diagnosisCodes: options };
		});
	};

	return (
		<div>
			<h3>New HealthCheck entry</h3>

			<form onSubmit={addEntry}>
				<BaseFormElements
					date={newEntry.date}
					description={newEntry.description}
					specialist={newEntry.specialist}
					diagnosisCodes={newEntry.diagnosisCodes}
					handleChange={handleTextFieldChange}
					handleMultipleSelection={handleMultipleSelection}
				/>

				<FormControl>
					<FormLabel>Health Check Rating</FormLabel>
					<RadioGroup
						row
						aria-labelledby='controlled-radio-buttons-group'
						name='healthCheckRating'
						defaultValue={healthCheckRating.Healthy}
						onChange={handleChange}
					>
						<FormControlLabel
							value={healthCheckRating.Healthy}
							control={<Radio />}
							label='Healthy'
						/>
						<FormControlLabel
							value={healthCheckRating.LowRisk}
							control={<Radio />}
							label='Low Risk'
						/>
						<FormControlLabel
							value={healthCheckRating.HighRisk}
							control={<Radio />}
							label='High Risk'
						/>
						<FormControlLabel
							value={healthCheckRating.CriticalRisk}
							control={<Radio />}
							label='Critical Risk'
						/>
					</RadioGroup>
				</FormControl>

				<Grid>
					<Grid item>
						<Button
							color='secondary'
							variant='contained'
							style={{ float: 'left' }}
							type='button'
							onClick={onClick}
						>
							Cancel
						</Button>
					</Grid>
					<Grid item>
						<Button
							style={{ float: 'right' }}
							type='submit'
							variant='contained'
						>
							Add
						</Button>
					</Grid>
				</Grid>
			</form>
		</div>
	);
};

export default HealthCheckEntryForm;
