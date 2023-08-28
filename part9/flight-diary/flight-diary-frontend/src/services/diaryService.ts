import axios from 'axios';
import { NewDiaryEntry, NonSensitiveDiaryEntry } from '../types';

const baseUrl = 'http://localhost:3009/api/diaries';

export const getAllDiaries = async () => {
	const { data } = await axios.get<NonSensitiveDiaryEntry[]>(`${baseUrl}`);
	return data;
};

export const addNewDiary = async (newObject: NewDiaryEntry) => {
	const response = await axios.post(baseUrl, newObject);
	console.log('a new diary was added to frontend: ', response.data);
	return response.data;
};
