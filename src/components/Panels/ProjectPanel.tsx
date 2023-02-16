import Button from '../Button'
import { useEffect } from 'react'
import SlidePanel from '../SlidePanel'
import OriginManager from '../OriginManager'
import InputWithLabel from '../InputWithLabel'
import useProject from '@/hooks/swr/useProject'
import { withPreventDefault } from '@/lib/utils'
import TrashIcon from '@/components/icons/TrashIcon'
import { ProjectPanelState, useProjectPanel } from '@/store/projectPanel'

const getStore = (state: ProjectPanelState) => ({
	open: state.open,
	name: state.name,
	origins: state.origins,
	setOrigins: state.setOrigins,
	onClose: state.reset,
	imageUrl: state.imageUrl,
	setImageUrl: state.setImageUrl,
	setName: state.setName,
	projectId: state.projectId,
	onProject: state.onProjectLoaded,
	updateProject: state.updateProject,
	deleteProject: state.deleteProject,
})

const ProjectPanel = () => {
	const { name, setName, open, onClose, projectId, onProject, imageUrl, setImageUrl, updateProject, deleteProject } =
		useProjectPanel(getStore)
	const { project } = useProject(projectId)

	useEffect(() => {
		if (!project || !open) return

		onProject(project)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [open, project])

	return (
		<SlidePanel
			open={open}
			onClose={onClose}
			onSubmit={withPreventDefault(updateProject)}
			title="Project Settings"
			subtitle="Update your project's name, where it'll show up and the look and feel of the widget."
			footer={
				<div className="flex items-center justify-between">
					<button
						type="button"
						onClick={deleteProject}
						className="px-3 py-2 hover:bg-red-100 text-red-500 rounded-lg transition flex items-center space-x-1"
					>
						<TrashIcon className="w-5 h-5" />
						<span>Delete</span>
					</button>
					<div className="flex items-center space-x-2">
						<button
							type="button"
							onClick={onClose}
							className="px-4 py-2 hover:bg-gray-200/50 rounded-lg transition"
						>
							Cancel
						</button>
						<Button type="submit">Update</Button>
					</div>
				</div>
			}
		>
			<div className="space-y-6">
				<InputWithLabel label="Name" id="name" value={name} onChange={setName} required />
				<InputWithLabel label="Image URL" type="url" id="image-url" value={imageUrl} onChange={setImageUrl} />
				<OriginManager />
			</div>
		</SlidePanel>
	)
}

export default ProjectPanel
