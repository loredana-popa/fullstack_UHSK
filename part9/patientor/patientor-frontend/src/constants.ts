export const apiBaseUrl = 'http://localhost:3000/api';

// current date formatting
const now = new Date();
const padTo2Digits = (num: number) => {
	return num.toString().padStart(2, '0');
};
const year = now.getFullYear();
const month = padTo2Digits(now.getMonth() + 1);
const day = padTo2Digits(now.getDate());
export const currentDate = `${year}-${month}-${day}`;
