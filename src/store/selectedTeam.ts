import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type SelectedTeamStore = {
	selectedTeam: string
	setSelectedTeam: (teamId: string) => void
}

const useSelectedTeamStore = create<SelectedTeamStore>()(
	persist(
		set => ({
			selectedTeam: '',
			setSelectedTeam: selectedTeam => set({ selectedTeam }),
		}),
		{ name: 'selectedTeam' }
	)
)

export default useSelectedTeamStore
