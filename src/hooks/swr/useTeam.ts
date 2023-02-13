import useSWR from 'swr'
import { TeamWithProjects } from '@/types/api'
import useSelectedTeamStore from '@/store/selectedTeam'

const useTeam = (): {
	team: TeamWithProjects | null
	isLoading: boolean
} => {
	const { selectedTeam } = useSelectedTeamStore()
	const { data: team, isLoading } = useSWR(() => selectedTeam && `/team/${selectedTeam}`)

	return {
		team,
		isLoading,
	}
}

export default useTeam
