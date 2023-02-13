import { API_URL } from './consts'

export class SWRError extends Error {
	status: number

	constructor(message: string, status: number) {
		super(message)
		this.status = status
	}
}

export const fetcher = async <JSON = any>(input: RequestInfo, init?: RequestInit): Promise<JSON> => {
	const res = await fetch(`${API_URL}${input}`, { ...init, credentials: 'include' })

	if (!res.ok) {
		const json = await res.json().catch(() => ({}))

		if (json.error) throw new SWRError(json.error, res.status)
		throw new SWRError('Something went wrong!', 500)
	}

	return res.json()
}
