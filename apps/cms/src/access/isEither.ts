import { Access } from 'payload/types'

import { CollectionType } from '../payload-types'
import { UserTypes } from './type'

/**
 * Returns an access function which returns the first non-false result of the access functions list. Orders matter. If all access functions return false, the result will be false.
 * @param accessFns List of access functions
 */
export const isEither: <T extends CollectionType>(...accessFns: Access<T, UserTypes>[]) => Access<T, UserTypes> = (
	...accessFns
) => {
	return async (args) => {
		for (const accessFn of accessFns) {
			const result = await accessFn(args)
			if (result !== false) {
				return true
			}
		}
		return false
	}
}
