import Link from 'next/link'
import Avatar from './Avatar'
import { User } from '@/types/api'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import Wordmark from './icons/Wordmark'
import DropdownMenu from './DropdownMenu'
import useAuth from '@/hooks/swr/useAuth'
import { api, classNames } from '@/lib/utils'
import FeedbackModal from './Modals/FeedbackModal'
import { FC, PropsWithChildren, ReactNode, useMemo } from 'react'
import { getSubmitFeedback, useFeedbackModal } from '@/store/feedbackModal'
import { UserIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid'

export type NavItem = { name: string; href: string; icon: ReactNode }

export type Props = PropsWithChildren<{
	nav?: NavItem[]
	aside?: ReactNode
	header?: ReactNode
	navSlot?: ReactNode
	fullBleed?: boolean
}>

const AppLayout: FC<Props> = ({ children, nav, aside, header, navSlot, fullBleed = false }) => {
	const { user } = useAuth()
	const router = useRouter()
	const submitFeedback = useFeedbackModal(getSubmitFeedback)

	const userNavigation = useMemo(
		() => [
			{ label: 'Your Profile', icon: UserIcon, href: '#' },
			{
				label: 'Sign out',
				icon: ArrowRightOnRectangleIcon,
				execute: async () => {
					await api('/auth/login', 'DELETE')

					router.reload()
				},
			},
		],
		[router]
	)

	return (
		<>
			<FeedbackModal />
			<div className="flex h-screen">
				{/* Narrow sidebar */}
				<div className="fixed overflow-y-auto max-w-[15rem] min-h-full hidden md:block">
					<div className="flex w-full flex-col items-center justify-center h-16">
						<Link
							href="/dashboard"
							className="flex justify-start flex-shrink-0 items-center space-x-1 text-pink-500"
						>
							<Wordmark className="h-8 w-8" />
							<p className="font-bold">Clippy</p>
						</Link>
					</div>
					<div className="mt-2 h-full">
						{navSlot}
						<div className="w-full flex-1 space-y-1 px-2">
							{nav?.map(item => (
								<Link
									key={item.name}
									href={item.href}
									className={classNames(
										router.asPath == item.href
											? 'bg-gray-100'
											: 'hover:bg-gray-100 hover:text-gray-900',
										item.name == 'All Projects' && '!mt-8',
										'text-gray-800 group w-full py-1 px-4 rounded-full flex space-x-3 items-center text-sm'
									)}
									aria-current={router.asPath == item.href ? 'page' : undefined}
								>
									<span
										className={classNames(
											router.asPath == item.href ? 'text-gray-500' : 'text-gray-300',
											'h-6 w-6'
										)}
										aria-hidden="true"
									>
										{item.icon}
									</span>
									<span
										className={classNames(
											router.asPath == item.href ? 'text-gray-800 font-medium' : 'text-gray-500',
											'whitespace-nowrap'
										)}
									>
										{item.name}
									</span>
								</Link>
							))}
						</div>
					</div>
				</div>

				{/* Content area */}
				<div className="flex flex-1 flex-col md:ml-60">
					<div className="w-full">
						<div className="relative z-10 flex h-16 flex-shrink-0">
							<div className="flex flex-1 md:justify-between space-x-4 md:space-x-0 pr-6">
								<Link
									href="/dashboard"
									className="flex justify-start flex-shrink-0 items-center space-x-1 text-pink-500 md:hidden ml-4"
								>
									<Wordmark className="h-8 w-8" />
									<p className="font-bold text-lg">Clippy</p>
								</Link>
								{header}
								<div className="flex items-center space-x-4 fixed right-4 md:right-8 top-4">
									<motion.button
										layout="position"
										layoutId="feedback-modal"
										onClick={submitFeedback}
										className="border py-1 px-4 rounded-xl text-sm bg-gray-50"
									>
										Feedback
									</motion.button>
									<div className="relative flex-shrink-0">
										<DropdownMenu items={userNavigation}>
											<button className="flex rounded-full bg-white text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2">
												<span className="sr-only">Open user menu</span>
												<Avatar name={user?.displayName} />
											</button>
										</DropdownMenu>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="flex flex-1">
						<main
							className={classNames(
								!fullBleed && 'p-6',
								aside && 'max-w-4xl 2xl:max-w-6xl',
								'flex-1 bg-white rounded-t-3xl shadow-panel border md:mr-8 h-full overflow-hidden'
							)}
						>
							{children}
						</main>
						<aside>{aside}</aside>
					</div>
				</div>
			</div>
		</>
	)
}

export default AppLayout
