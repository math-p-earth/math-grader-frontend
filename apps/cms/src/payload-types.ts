import {
	Course,
	Media,
	PayloadMigration,
	PayloadPreference,
	Problem,
	ProblemList,
	Source,
	Student,
	Submission,
	Tag,
	Upload,
	User,
} from 'core/payload-types'

declare module 'payload' {
	export interface GeneratedTypes {
		collections: {
			courses: Course
			media: Media
			problems: Problem
			'problem-lists': ProblemList
			sources: Source
			students: Student
			submissions: Submission
			tags: Tag
			uploads: Upload
			users: User
			'payload-preferences': PayloadPreference
			'payload-migrations': PayloadMigration
		}
	}
}
