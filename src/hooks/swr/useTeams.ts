import useSWR from 'swr'
import { useEffect } from 'react'
import { Team } from '@/types/api'
import useSelectedTeamStore from '@/store/selectedTeam'

const useTeams = (): {
	isLoading: boolean
	teams: Team[] | null
	selectedTeam: string | null
	setSelectedTeam: (teamId: string) => void
} => {
	const { data: teams, isLoading } = useSWR('/auth/teams')
	const { selectedTeam, setSelectedTeam } = useSelectedTeamStore()

	useEffect(() => {
		if (selectedTeam || !teams) return

		setSelectedTeam(teams[0].id)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedTeam, teams])

	return {
		teams,
		isLoading,
		selectedTeam,
		setSelectedTeam,
	}
}

export default useTeams
