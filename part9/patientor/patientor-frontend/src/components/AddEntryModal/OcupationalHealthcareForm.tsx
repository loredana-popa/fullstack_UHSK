import { Button, FormControl, FormLabel, Grid, TextField } from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import { EntryType, OcupationalHealthcare } from '../../types';
import { BaseFormElements } from './formElements';
import { currentDate } from '../../constants';

interface Props {
	onClick: () => void;
	onSubmit: (values: FormValues) => void;
}

type FormValues = Omit<OcupationalHealthcare, 'id'>;

const OcupationalHealthcareForm = ({ onSubmit, onClick }: Props) => {
	const [newEntry, setNewEntry] = useState<FormValues>({
		date: currentDate,
		description: '',
		specialist: '',
		diagnosisCodes: [],
		type: EntryType.OccupationalHealthcare,
		employerName: '',
		sickLeave: {
			startDate: currentDate,
			endDate: currentDate,
		},
	});

	const addEntry = async (event: SyntheticEvent) => {
		event.preventDefault();
		onSubmit({ ...newEntry });
		setNewEntry({
			date: currentDate,
			description: '',
			specialist: '',
			diagnosisCodes: [],
			type: EntryType.OccupationalHealthcare,
			employerName: '',
			sickLeave: { startDate: currentDate, endDate: currentDate },
		});
	};

	const handleTextFieldChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	): void => {
		const { name, value } = e.currentTarget;
		if (name === 'startDate' || name === 'endDate') {
			setNewEntry((prev) => {
				return {
					...prev,
					sickLeave: { ...prev.sickLeave, [name]: value },
				};
			});
		} else {
			setNewEntry((prev) => {
				return { ...prev, [name]: value };
			});
		}
	};

	const handleMultipleSelection = (options: string[]) => {
		setNewEntry((prev) => {
			return { ...prev, diagnosisCodes: options };
		});
	};

	return (
		<div>
			<h3>New OccupationalHealthcare entry</h3>

			<form onSubmit={addEntry}>
				<BaseFormElements
					date={newEntry.date}
					description={newEntry.description}
					specialist={newEntry.specialist}
					diagnosisCodes={newEntry.diagnosisCodes}
					handleChange={handleTextFieldChange}
					handleMultipleSelection={handleMultipleSelection}
				/>

				<TextField
					name='employerName'
					label='EmployerName'
					fullWidth
					variant='standard'
					value={newEntry.employerName}
					onChange={handleTextFieldChange}
				/>

				<FormControl fullWidth>
					<FormLabel>Sick Leave</FormLabel>
					<TextField
						type='date'
						name='startDate'
						label='start'
						variant='standard'
						value={newEntry.sickLeave.startDate}
						onChange={handleTextFieldChange}
					/>
					<TextField
						type='date'
						name='endDate'
						label='end'
						variant='standard'
						value={newEntry.sickLeave.endDate}
						onChange={handleTextFieldChange}
					/>
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
							style={{
								float: 'right',
							}}
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

export default OcupationalHealthcareForm;
