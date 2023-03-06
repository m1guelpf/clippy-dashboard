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
	projectId: string | null

	reset: () => void
	setOpen: (open: boolean) => void
	openFor: (project: Project) => void

	updateProject: () => void
	deleteProject: () => void
	createProject: () => void
}

export const useProjectPanel = create<ProjectPanelState>((set, get) => ({
	name: '',
	setName: (name: string) => set({ name }),

	imageUrl: '',
	setImageUrl: (imageUrl: string) => set({ imageUrl }),

	origins: [],
	setOrigins: (origins: string[]) => set({ origins }),

	open: false,
	setOpen: (open: boolean) => set({ open }),

	loading: false,
	projectId: null,
	reset: () => {
		if (get().loading) return

		set({ open: false, projectId: null, name: '', imageUrl: '', origins: [] })
	},
	openFor: (project: Project) => {
		set({
			open: true,
			name: project.name,
			projectId: project.id,
			origins: project.origins,
			imageUrl: project.imageUrl,
		})
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
	createProject: async () => {
		set({ loading: true })

		const teamId = selectedTeamStore.getState().selectedTeam
		await api(`/team/${teamId}/projects`, 'POST', {
			name: get().name,
			origins: get().origins,
			image_url: get().imageUrl,
		})

		await mutate(`/team/${teamId}`)
		set({ loading: false })
		get().reset()
	},
}))

export const getOpen = (store: ProjectPanelState) => store.openFor
