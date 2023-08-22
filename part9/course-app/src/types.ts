export interface Part {
	name: string;
	exerciseCount: number;
}

export interface CoursePartBase {
	name: string;
	exerciseCount: number;
}

interface CoursePartDescr extends CoursePartBase {
	description: string;
}

interface CoursePartBasic extends CoursePartDescr {
	kind: 'basic';
}

interface CoursePartGroup extends CoursePartBase {
	groupProjectCount: number;
	kind: 'group';
}

interface CoursePartBackground extends CoursePartDescr {
	backgroundMaterial: string;
	kind: 'background';
}

interface CoursePartSpecial extends CoursePartDescr {
	requirements: string[];
	kind: 'special';
}

export type CoursePart =
	| CoursePartBasic
	| CoursePartGroup
	| CoursePartBackground
	| CoursePartSpecial;
