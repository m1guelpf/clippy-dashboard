import Image from 'next/image'
import Layout from '@/components/Layout'
import useTeam from '@/hooks/swr/useTeam'
import useAuth from '@/hooks/swr/useAuth'
import Balancer from 'react-wrap-balancer'
import { ProjectStatus } from '@/types/api'
import { classNames, getFirstName } from '@/lib/utils'
import ProjectPanel from '@/components/Panels/ProjectPanel'
import DotsHorizontal from '@/components/icons/DotsHorizontal'
import { getOpen, useProjectPanel } from '@/store/projectPanel'

const DashboardPage = () => {
	const { team } = useTeam()
	const { user } = useAuth()
	const updateProject = useProjectPanel(getOpen)

	return (
		<Layout pageTitle="Projects">
			<ProjectPanel />
			<h1 className="text-2xl text-black font-medium mb-2">
				Welcome back, {getFirstName(user?.displayName) ?? 'friend!'}
			</h1>
			<Balancer className="text-gray-700 text-lg font-light mb-7">
				Projects contain all the knowledge from your docs, and you can reuse them across multiple sites. Use
				this dashboard to customize the look and feel of the widget.
			</Balancer>
			<div className="space-y-4">
				{team?.projects?.map(project => (
					<div
						key={project.id}
						className={classNames(
							project.status == ProjectStatus.Pending
								? 'bg-gradient-to-br from-gray-200  to-white animate-pulse'
								: 'bg-gradient-to-br from-gray-100 via-white to-white',
							'py-4 px-5 shadow-sm border rounded-xl flex items-center space-x-4 max-w-4xl'
						)}
					>
						{project.imageUrl && (
							<div className="flex-shrink-0 flex items-center justify-center">
								<Image
									alt={project.name}
									src={project.imageUrl}
									width={32}
									height={32}
									className="rounded-full"
								/>
							</div>
						)}
						<div className="flex-1">
							<p className="text-black">{project.name}</p>
							<p className="text-black/40">{project.origins.join(', ')}</p>
						</div>
						<button
							onClick={() => updateProject(project)}
							className=" inline-flex items-center justify-center rounded hover:bg-gray-50 transition"
						>
							<DotsHorizontal className="w-8 h-8 text-gray-text" />
						</button>
					</div>
				))}
				<a
					target="_blank"
					rel="noreferrer"
					className="block w-full text-left hover:bg-gradient-to-br from-gray-100 via-white to-white py-4 px-5 hover:shadow-sm border border-dashed hover:border-solid rounded-xl max-w-4xl transition-all"
					href={`mailto:miguel@clippy.help?subject=${encodeURIComponent(
						'New Project'
					)}&body=${encodeURIComponent(
						'Project Name:\n\nDocumentation URL:\n\nDocumentation Source (only GitHub repos supported right now):'
					)}`}
				>
					<p className="text-black">Feels empty?</p>
					<p className="text-black/40">Let&apos;s add a new project</p>
				</a>
			</div>
		</Layout>
	)
}

export default DashboardPage
