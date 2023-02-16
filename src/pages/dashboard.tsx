import Image from 'next/image'
import Layout from '@/components/Layout'
import useTeam from '@/hooks/swr/useTeam'
import useAuth from '@/hooks/swr/useAuth'
import { getFirstName } from '@/lib/utils'
import Balancer from 'react-wrap-balancer'
import DotsHorizontal from '@/components/icons/DotsHorizontal'

const DashboardPage = () => {
	const { team } = useTeam()
	const { user } = useAuth()

	return (
		<Layout pageTitle="Projects">
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
						className="bg-gradient-to-br from-gray-100 via-white to-white py-4 px-5 shadow-sm border rounded-xl flex items-center space-x-4 max-w-4xl"
					>
						<div className="flex-shrink-0 flex items-center justify-center">
							<Image
								alt={project.name}
								src={project.imageUrl}
								width={32}
								height={32}
								className="rounded-full"
							/>
						</div>
						<div className="flex-1">
							<p className="text-black">{project.name}</p>
							<p className="text-black/40">{project.origins.join(', ')}</p>
						</div>
						<button className=" inline-flex items-center justify-center rounded hover:bg-gray-text/10 transition">
							<DotsHorizontal className="w-8 h-8 text-gray-text" />
						</button>
					</div>
				))}
				<button className="w-full text-left hover:bg-gradient-to-br from-gray-100 via-white to-white py-4 px-5 hover:shadow-sm border border-dashed hover:border-solid rounded-xl max-w-4xl transition-all">
					<p className="text-black">Feels empty?</p>
					<p className="text-black/40">Let&apos;s add a new project</p>
				</button>
			</div>
		</Layout>
	)
}

export default DashboardPage
