import Button from './Button'
import { toast } from 'sonner'
import PlusIcon from './icons/PlusIcon'
import TrashIcon from './icons/TrashIcon'
import InputWithLabel from './InputWithLabel'
import { withPreventDefault } from '@/lib/utils'
import { ProjectPanelState, useProjectPanel } from '@/store/projectPanel'
import { FormEvent, useCallback, useEffect, useRef, useState } from 'react'

const getStore = (store: ProjectPanelState) => ({ origins: store.origins, setOrigins: store.setOrigins })

const OriginManager = () => {
	const inputRef = useRef<HTMLInputElement>(null)
	const [origin, setOrigin] = useState('')
	const { origins, setOrigins } = useProjectPanel(getStore)

	const addOrigin = useCallback(() => {
		if (!origin) return
		if (!origin.match(/^(?:[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]\.)+[a-zA-Z]{2,}$/)) {
			throw toast.error('Invalid origin')
		}

		setOrigin('')
		setOrigins([...origins, origin])
	}, [origin, origins, setOrigins])

	useEffect(() => {
		if (!inputRef.current) return

		if (origins.length === 0) inputRef.current.setCustomValidity('You must add at least one origin.')
		else inputRef.current.setCustomValidity('')
	}, [origins])

	return (
		<div>
			<div>
				<label className="block text-sm font-medium text-gray-700">Origins</label>
				<p className="text-sm text-gray-400">The domains your widget can show up on.</p>
			</div>
			<div className="mt-2">
				{origins.map((origin, index) => (
					<div
						key={index}
						className="flex items-center justify-between px-3 py-2 bg-gray-100/50 rounded-lg mt-2"
					>
						<span>{origin}</span>
						<button
							type="button"
							onClick={() => setOrigins(origins.filter((_, i) => i !== index))}
							className="text-gray-300 hover:text-red-500 rounded-lg transition"
						>
							<TrashIcon className="w-5 h-5" />
						</button>
					</div>
				))}
				<div className="flex items-center justify-between mt-2 relative group">
					<input
						ref={inputRef}
						type="text"
						value={origin}
						placeholder="docs.hop.io"
						onChange={e => setOrigin(e.target.value)}
						className="px-3 py-2 w-full border-gray-300 rounded-lg shadow-sm focus:border-gray-600 focus:ring-gray-600"
						onKeyDown={e => {
							if (e.key === 'Enter' && origin) {
								e.preventDefault()
								addOrigin()
							}
						}}
					/>
					<button
						type="button"
						onClick={withPreventDefault(addOrigin)}
						className="absolute inset-y-0 right-3 text-gray-300 group-hover:text-gray-500 rounded-lg transition"
					>
						<PlusIcon className="w-5 h-5" />
					</button>
				</div>
			</div>
		</div>
	)
}

export default OriginManager
