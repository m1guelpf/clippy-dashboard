import { fetcher } from './swr'
import dayjs, { Dayjs } from 'dayjs'
import { SyntheticEvent } from 'react'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export const wait = (ms: number): Promise<void> => {
	return new Promise(resolve => setTimeout(resolve, ms))
}

export const api = <Response = any>(
	path: string,
	method: string = 'GET',
	body?: Record<string, unknown>
): Promise<Response> => {
	return fetcher(path, {
		method,
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: body ? JSON.stringify(body) : null,
	})
}

export const classNames = (...classes: unknown[]): string => {
	return classes.filter(Boolean).join(' ')
}

export const withPreventDefault = (fn: () => unknown) => (event: SyntheticEvent) => {
	event.preventDefault()
	fn()
}

export const random = (min: number, max: number): number => {
	return Math.floor(Math.random() * (max - min + 1)) + min
}

export const toHumanTime = (date: Date | string): string => {
	return dayjs(date).fromNow()
}

export const getFirstName = (name?: string): string | undefined => {
	return name?.split(' ')?.[0]
}
