import { SyntheticEvent, useState } from 'react';
import { EntryType, HospitalEntry } from '../../types';
import { TextField, Button, FormControl, FormLabel, Grid } from '@mui/material';
import { BaseFormElements } from './formElements';
import { currentDate } from '../../constants';

interface Props {
	onClick: () => void;
	onSubmit: (values: FormValues) => void;
}

type FormValues = Omit<HospitalEntry, 'id'>;
const HospitalEntryForm = ({ onSubmit, onClick }: Props) => {
	const [newEntry, setNewEntry] = useState<FormValues>({
		date: currentDate,
		type: EntryType.Hospital,
		specialist: '',
		description: '',
		diagnosisCodes: [],
		discharge: { date: currentDate, criteria: '' },
	});

	const addEntry = async (event: SyntheticEvent) => {
		event.preventDefault();
		onSubmit({ ...newEntry });
		setNewEntry({
			date: currentDate,
			type: EntryType.Hospital,
			specialist: '',
			description: '',
			diagnosisCodes: [],
			discharge: { date: currentDate, criteria: '' },
		});
	};

	const handleTextFieldChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	): void => {
		const { name, value } = e.currentTarget;
		if (name.includes('Discharge')) {
			const key = name.substring(0, name.indexOf('Discharge'));
			setNewEntry((prev) => {
				return {
					...prev,
					discharge: { ...prev.discharge, [key]: value },
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
			<h3>New Hospital entry</h3>

			<form onSubmit={addEntry}>
				<BaseFormElements
					date={newEntry.date}
					description={newEntry.description}
					specialist={newEntry.specialist}
					diagnosisCodes={newEntry.diagnosisCodes}
					handleChange={handleTextFieldChange}
					handleMultipleSelection={handleMultipleSelection}
				/>

				<FormControl fullWidth>
					<FormLabel>Discharge</FormLabel>
					<TextField
						type='date'
						name='dateDischarge'
						label='Date'
						variant='standard'
						value={newEntry.discharge.date}
						onChange={handleTextFieldChange}
					/>
					<TextField
						name='criteriaDischarge'
						label='Criteria'
						variant='standard'
						value={newEntry.discharge.criteria}
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

export default HospitalEntryForm;
