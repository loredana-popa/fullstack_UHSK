import { useEffect, useState } from 'react';
import axios from 'axios';
import {
	FormControl,
	InputLabel,
	MenuItem,
	OutlinedInput,
	Select,
	SelectChangeEvent,
	TextField,
} from '@mui/material';
import { apiBaseUrl } from '../../constants';
import diagnosesService from '../../services/diagnoses';
import { Diagnosis } from '../../types';

interface DiagnosisCodesElementProps {
	handleDiagnosisSelection: (options: string[]) => void;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

const DiagnosisCodesElement = ({
	handleDiagnosisSelection,
}: DiagnosisCodesElementProps) => {
	const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
	const [options, setOptions] = useState<string[]>([]);

	useEffect(() => {
		void axios.get<void>(`${apiBaseUrl}/diagnoses`);

		const fetchDiagnoses = async () => {
			const diagnoses = await diagnosesService.getAll();
			setDiagnoses(diagnoses);
		};

		void fetchDiagnoses();
	}, []);

	const handleChange = (event: SelectChangeEvent<typeof options>) => {
		const {
			target: { value },
		} = event;
		setOptions(typeof value === 'string' ? value.split(',') : value);
		handleDiagnosisSelection(
			typeof value === 'string' ? value.split(',') : value
		);
	};

	return (
		<div>
			<FormControl fullWidth variant='standard'>
				<InputLabel id='multiple-diagnosis-label'>Diagnosis codes</InputLabel>
				<Select
					labelId='multiple-diagnosis-label'
					name='diagnosisCodes'
					multiple
					value={options}
					onChange={handleChange}
					input={<OutlinedInput label='Tag' />}
					MenuProps={MenuProps}
				>
					{diagnoses.map((d, i) => (
						<MenuItem key={i} value={d.code}>
							{d.code}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</div>
	);
};

interface BaseFormElementsProps {
	date: string;
	description: string;
	specialist: string;
	diagnosisCodes: string[];
	handleChange: (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => void;
	handleMultipleSelection: (options: string[]) => void;
}

export const BaseFormElements = ({
	date,
	description,
	specialist,
	handleMultipleSelection,
	handleChange,
}: BaseFormElementsProps) => {
	return (
		<div>
			<TextField
				variant='standard'
				name='date'
				label='Date'
				type='date'
				fullWidth
				value={date}
				onChange={handleChange}
			/>

			<TextField
				variant='standard'
				name='description'
				label='Description'
				fullWidth
				value={description}
				onChange={handleChange}
			/>

			<TextField
				variant='standard'
				name='specialist'
				label='Specialist'
				fullWidth
				value={specialist}
				onChange={handleChange}
			/>

			<DiagnosisCodesElement
				handleDiagnosisSelection={handleMultipleSelection}
			/>
		</div>
	);
};
