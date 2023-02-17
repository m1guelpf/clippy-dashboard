import { ModelType } from '@/types/api'
import { classNames } from '@/lib/utils'
import { RadioGroup } from '@headlessui/react'
import { ProjectPanelState, useProjectPanel } from '@/store/projectPanel'

type Plan = { name: ModelType; description: string }

const models: Plan[] = [
	{ name: ModelType.METAL, description: 'The default model, with the best accuracy.' },
	{ name: ModelType.PLASTIC, description: 'A faster model, with slightly lower accuracy.' },
]

const getStore = (state: ProjectPanelState) => ({ modelType: state.model_type, setModelType: state.setModelType })

const ModelTypeSelector = () => {
	const { modelType, setModelType } = useProjectPanel(getStore)

	return (
		<RadioGroup value={modelType} onChange={setModelType}>
			<RadioGroup.Label className="block text-sm font-medium text-gray-700">Clippy Model</RadioGroup.Label>
			<div className="mt-1 space-y-4">
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
