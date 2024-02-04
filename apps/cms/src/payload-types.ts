import { GeneratedTypes } from 'payload'

import {
	Course,
	Media,
	PayloadMigration,
	PayloadPreference,
	PendingUpload,
	Problem,
	ProblemList,
	Source,
	Student,
	Submission,
	Tag,
	Upload,
	User,
} from 'core/payload-types'

export type CollectionType = GeneratedTypes['collections'][keyof GeneratedTypes['collections']]

// needs to be kept in sync with core/payload-types/generated.ts because I can't find a way to bring module augmentation from core to cms package yet.
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
			'pending-uploads': PendingUpload
			users: User
			'payload-preferences': PayloadPreference
			'payload-migrations': PayloadMigration
		}
	}
}
