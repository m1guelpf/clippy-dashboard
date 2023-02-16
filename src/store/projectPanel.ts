import { mutate } from 'swr'
import { create } from 'zustand'
import { api } from '@/lib/utils'
import { Project } from '@/types/api'
import selectedTeamStore from './selectedTeam'

export type ProjectPanelState = {
	name: string
	setName: (name: string) => void

	imageUrl: string
	setImageUrl: (imageUrl: string) => void

	origins: string[]
	setOrigins: (origins: string[]) => void

	open: boolean
	loading: boolean
	reset: () => void
	projectId: string | null
	openFor: (projectId: string) => void
	onProjectLoaded: (project: Project) => void

	updateProject: () => void
	deleteProject: () => void
}

export const useProjectPanel = create<ProjectPanelState>((set, get) => ({
	name: '',
	setName: (name: string) => set({ name }),

	imageUrl: '',
	setImageUrl: (imageUrl: string) => set({ imageUrl }),

	origins: [],
	setOrigins: (origins: string[]) => set({ origins }),

	open: false,
	loading: false,
	projectId: null,
	reset: () => {
		if (get().loading) return

		set({ open: false, projectId: null, name: '', imageUrl: '', origins: [] })
	},
	openFor: (id: string) => {
		set({ open: true, projectId: id })
	},
	onProjectLoaded: (project: Project) => {
		set({ name: project.name, imageUrl: project.imageUrl, origins: project.origins })
	},
	deleteProject: async () => {
		set({ loading: true })

		await api(`/project/${get().projectId}`, 'DELETE')

		set({ loading: false })

		const teamId = selectedTeamStore.getState().selectedTeam
		await mutate(`/team/${teamId}`)
		get().reset()
	},
	updateProject: async () => {
		set({ loading: true })

		await api(`/project/${get().projectId}`, 'POST', {
			name: get().name,
			origins: get().origins,
			image_url: get().imageUrl,
		})

		set({ loading: false })

		const teamId = selectedTeamStore.getState().selectedTeam
		await mutate(`/team/${teamId}`)

		get().reset()
	},
}))

export const getOpenFor = (store: ProjectPanelState) => store.openFor
