import { useRouter } from 'next/router'
import useAuth from '@/hooks/swr/useAuth'
import useTeam from '@/hooks/swr/useTeam'
import useTeams from '@/hooks/swr/useTeams'
import { useEffect, useLayoutEffect } from 'react'
import ProjectItem from '@/components/ProjectItem'
import TeamSelector from '@/components/TeamSelector'
import AppLayout, { NavItem } from '@/components/AppLayout'
import { DocumentPlusIcon, HomeIcon, UserGroupIcon } from '@heroicons/react/24/outline'

const DashboardPage = () => {
	const router = useRouter()
	const { team } = useTeam()
	const { selectedTeam } = useTeams()
	const { isAuthenticated } = useAuth()

	useEffect(() => {
		if (isAuthenticated) return

		router.push('/login')
	}, [router, isAuthenticated])

	useLayoutEffect(() => {
		document.body.classList.add('fixed')
		document.body.classList.add('md:static')
	}, [])

	return (
		<AppLayout
			fullBleed
			navSlot={
				<div className="mb-4 mx-3">
					<TeamSelector />
				</div>
			}
			nav={[
				{ name: 'Home', href: '/dashboard', icon: <HomeIcon /> },
				{
					name: 'Team Settings',
					href: `/teams/${selectedTeam}/settings`,
					icon: <UserGroupIcon />,
				},
			]}
		>
			<div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
				<div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
					<div className="ml-4 mt-2">
						<h3 className="text-lg font-medium leading-6 text-gray-900">Projects</h3>
						<p className="mt-1 text-sm text-gray-500">
							Projects help you organize your script, scenes, and inspiration.
						</p>
					</div>
				</div>
			</div>
			{team?.projects.length == 0 ? (
				<div className="text-center mt-10">
					<DocumentPlusIcon className="mx-auto h-12 w-12 text-gray-400" />
					<h3 className="mt-2 text-sm font-medium text-gray-900">No projects</h3>
					<p className="mt-1 text-sm text-gray-500">Get started by creating a new project.</p>
				</div>
			) : (
				<table className="divide-y divide-gray-300 w-full">
					<thead className="bg-gray-50">
						<tr>
							<th
								scope="col"
								className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"
							>
								Name
							</th>
							<th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
								Created
							</th>
							<th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
								Last Edited
							</th>
							<th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6 lg:pr-8">
								<span className="sr-only">Edit</span>
							</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-200 bg-white">
						{team?.projects?.map(project => (
							<ProjectItem key={project.id} project={project} />
						))}
					</tbody>
				</table>
			)}
		</AppLayout>
	)
}

export default DashboardPage
