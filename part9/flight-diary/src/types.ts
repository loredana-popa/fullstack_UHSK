export type Weather = 'sunny' | 'rainy' | 'windy' | 'stormy' | 'cloudy';

export type Visibility = 'great' | 'good' | 'ok' | 'poor';

export interface DiaryEntry {
	id: number;
	date: string;
	weather: Weather;
	visibility: Visibility;
	comment: string;
}

export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>;
