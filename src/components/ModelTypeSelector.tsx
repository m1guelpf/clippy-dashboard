import { ModelType } from '@/types/api'
import { classNames } from '@/lib/utils'
import { useEffect, useRef } from 'react'
import { RadioGroup } from '@headlessui/react'
import { ProjectPanelState, useProjectPanel } from '@/store/projectPanel'

type Plan = { name: ModelType; description: string }

const models: Plan[] = [
	{ name: ModelType.Metal, description: 'The default model, with the best accuracy.' },
	{ name: ModelType.Plastic, description: 'A faster model, with slightly lower accuracy.' },
]

const getStore = (state: ProjectPanelState) => ({ modelType: state.model_type, setModelType: state.setModelType })

const ModelTypeSelector = () => {
	const inputRef = useRef<HTMLInputElement>(null)
	const { modelType, setModelType } = useProjectPanel(getStore)

	useEffect(() => {
		if (!inputRef.current) return

		if (modelType) inputRef.current.setCustomValidity('')
		else inputRef.current.setCustomValidity('Please select a model type.')
	}, [modelType])

	return (
		<RadioGroup className="relative" name="model" value={modelType} onChange={setModelType}>
			<input
				type="text"
				name="model"
				ref={inputRef}
				onChange={() => {}}
				value={modelType ?? ''}
				className="absolute opacity-0 w-0 h-0"
			/>
			<RadioGroup.Label className="block text-sm font-medium text-gray-700">Clippy Model</RadioGroup.Label>
			<div className="mt-2 space-y-2">
				{models.map(model => (
					<RadioGroup.Option
						key={model.name}
						value={model.name}
						className={({ checked }) =>
							classNames(
								checked ? 'border-gray-600 ring-2 ring-gray-600' : 'border-gray-300',
								'relative block cursor-pointer rounded-lg border bg-white px-6 py-4 shadow-sm focus:outline-none sm:flex sm:justify-between'
							)
						}
					>
						<span className="flex items-center">
							<span className="flex flex-col text-sm">
								<RadioGroup.Label as="span" className="font-medium text-gray-900">
									{model.name}
								</RadioGroup.Label>
								<RadioGroup.Description as="span" className="text-gray-500">
									{model.description}
								</RadioGroup.Description>
							</span>
						</span>
					</RadioGroup.Option>
				))}
			</div>
		</RadioGroup>
	)
}

export default ModelTypeSelector
