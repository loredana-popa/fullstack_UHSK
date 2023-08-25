import axios from 'axios';
import { NonSensitiveDiaryEntry } from '../types';

const baseUrl = 'http://localhost:3009/api/diaries';

export const getAllDiaries = async () => {
	const { data } = await axios.get<NonSensitiveDiaryEntry[]>(`${baseUrl}`);
	return data;
};
