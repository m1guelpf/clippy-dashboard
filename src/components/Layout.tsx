import Link from 'next/link'
import Avatar from './Avatar'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import Wordmark from './icons/Wordmark'
import MenuIcon from './icons/MenuIcon'
import { classNames } from '@/lib/utils'
import UsersIcon from './icons/UsersIcon'
import useAuth from '@/hooks/swr/useAuth'
import useTeam from '@/hooks/swr/useTeam'
import BookmarkIcon from './icons/BookmarkIcon'
import ChevronUpIcon from './icons/ChevronUpIcon'
import FeedbackModal from './modals/FeedbackModal'
import { FC, PropsWithChildren, useEffect } from 'react'

export type Props = PropsWithChildren<{ pageTitle: string }>

const Layout: FC<Props> = ({ pageTitle, children }) => {
	const router = useRouter()
	const { team } = useTeam()
	const { isAuthenticated } = useAuth()

	useEffect(() => {
		if (isAuthenticated) return

		router.push('/login')
	}, [router, isAuthenticated])

	return (
		<>
			<FeedbackModal />
			<div className="bg-gray-100 min-h-screen">
				<div className="hidden md:fixed md:inset-y-0 md:flex md:w-[17.3rem] md:flex-col bg-white">
					<div className="flex min-h-0 flex-1 flex-col border-r py-8 px-9">
						<div className="flex flex-1 flex-col overflow-y-auto pb-4">
							<div className="flex flex-shrink-0 items-center px-4 space-x-2 text-black">
								<Wordmark className="h-6 w-auto" />
								<p className="font-semibold text-lg tracking-wider">clippy</p>
							</div>
							<nav className="mt-10 flex-1 space-y-1 px-2">
								{[
									{ label: 'Your Projects', icon: BookmarkIcon, href: '/dashboard' },
									{ label: 'Team Settings', icon: UsersIcon, href: '/team/settings' },
								].map(item => (
									<a
										key={item.label}
										href={item.href ?? undefined}
										className={classNames(
											item.href == router.asPath
												? 'text-black'
												: 'text-gray-700/50 hover:text-gray-700/70',
											'group flex items-center px-2 py-2 text-sm font-semibold rounded-md transition cursor-pointer'
										)}
									>
										<item.icon
											className={classNames(
												item.href == router.asPath
													? 'text-black'
													: 'text-gray-700/50 group-hover:text-gray-700/70',
												'mr-3 flex-shrink-0 h-6 w-6 transition'
											)}
											aria-hidden="true"
										/>
										{item.label}
									</a>
								))}
							</nav>
						</div>
					</div>
					<div className="pb-2 border-r text-center">
						<a
							href="mailto:miguel@clippy.help?subject=Clippy+Feedback"
							className="text-gray-400 text-sm hover:underline"
						>
							Have some feedback?
						</a>
					</div>
					<button
						onClick={() => toast.error('Coming soon!')}
						className="group flex items-center border-t border-r shadow-sm py-3 px-4"
					>
						<div>
							<Avatar name={team?.name} />
						</div>
						<div className="ml-3 min-w-0 flex-1 text-left">
							<p className="text-sm font-medium text-gray-700 group-hover:text-gray-900 whitespace-nowrap truncate">
								{team?.name}
							</p>
							<p className="text-xs text-gray-400/80 group-hover:text-gray-400 transition">
								Click to change team
							</p>
						</div>
						<div>
							<ChevronUpIcon className="w-5 h-5 text-gray-400 group-hover:text-gray-700 transition" />
						</div>
					</button>
				</div>
				<div className="flex flex-1 flex-col md:pl-64">
					<main className="flex-1 md:pl-6 lg:pl-32 md:mt-11">
						<div className="md:hidden flex items-center justify-between mx-4 my-5 md:my-0">
							<div className="flex items-center space-x-2">
								<Link href="/dashboard" className="flex items-center space-x-1 text-black">
									<Wordmark className="h-6 w-auto" />
									<p className="font-semibold text-lg tracking-wider">clippy</p>
								</Link>
								<span>/</span> <span className="text-black font-medium">{pageTitle}</span>
							</div>
							<button onClick={() => toast.error('Coming soon!')} className="p-1 rounded">
								<MenuIcon className="w-6 h-6 text-gray-400" aria-hidden="true" />
							</button>
						</div>
						<div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 mb-11 hidden md:block">
							<h1 className="text-gray-400">
								<Link href="/dashboard">Clippy</Link> <span className="mx-1">/</span>{' '}
								<span className="text-black font-medium">{pageTitle}</span>
							</h1>
						</div>
						<div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">{children}</div>
					</main>
				</div>
			</div>
		</>
	)
}

export default Layout
