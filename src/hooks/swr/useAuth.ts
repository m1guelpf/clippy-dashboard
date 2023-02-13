import useSWR from 'swr'
import { User } from '@/types/api'

const useAuth = (): { user: User | null; isLoading: boolean; isAuthenticated: boolean } => {
	const { data: user, error, isLoading } = useSWR('/auth/user')

	return {
		user,
		isLoading,
		isAuthenticated: !error && !isLoading,
	}
}

export default useAuth
