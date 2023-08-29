import axios from 'axios';
import { NewDiaryEntry, NonSensitiveDiaryEntry } from '../types';

const baseUrl = 'http://localhost:3009/api/diaries';

export const getAllDiaries = async () => {
	const { data } = await axios.get<NonSensitiveDiaryEntry[]>(`${baseUrl}`);
	return data;
};

interface ValidationError {
	message: string;
	errors: Record<string, string[]>;
}
// export const addNewDiary = async (newObject: NewDiaryEntry) => {
// 	try {
// 		const response = await axios.post<NonSensitiveDiaryEntry>(
// 			baseUrl,
// 			newObject
// 		);
// 		return response.data;
// 	} catch (error: unknown) {
// 		if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
// 			if (typeof error.response?.data === 'string') {
// 				console.log('err message', error.response.data);
// 				return error.response.data;
// 			} else {
// 				return 'Smth went wrong';
// 			}
// 		}
// 	}
// };

export const addNewDiary = (newObject: NewDiaryEntry) => {
	return axios
		.post(baseUrl, newObject)
		.then((response) => response.data)
		.catch((err) => {
			console.log('Oops!!', err.response.data);
			const message = err.response.data;
			return message;
		});
};
