import useSWR from 'swr'
import { Project } from '@/types/api'

const useProject = (
	id: string | null
): {
	project: Project | null
	isLoading: boolean
} => {
	const { data: project, isLoading } = useSWR(() => id && `/project/${id}`)

	return {
		project,
		isLoading,
	}
}

export default useProject
