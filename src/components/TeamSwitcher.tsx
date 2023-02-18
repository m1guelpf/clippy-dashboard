import Avatar from './Avatar'
import toast from 'react-hot-toast'
import PlusIcon from './icons/PlusIcon'
import { classNames } from '@/lib/utils'
import { Listbox } from '@headlessui/react'
import useTeams from '@/hooks/swr/useTeams'
import ChevronUpIcon from './icons/ChevronUpIcon'
import { useCallback, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const MotionOptions = motion(Listbox.Options)

const TeamSwitcher = () => {
	const [open, setOpen] = useState(false)
	const { teams, selectedTeam, setSelectedTeam } = useTeams()

	const team = useMemo(() => teams?.find(team => team.id === selectedTeam), [teams, selectedTeam])

	const onChange = useCallback(
		(teamId: string) => {
			setSelectedTeam(teamId)
			setOpen(false)
		},
		[setSelectedTeam]
	)

	const onCreateTeam = useCallback(() => {
		toast.error('Coming soon!')
		setOpen(false)
	}, [])

	return (
		<Listbox value={selectedTeam} onChange={onChange}>
			<Listbox.Label className="sr-only">Current Team</Listbox.Label>
			<AnimatePresence mode="popLayout">
				{open && (
					<MotionOptions
						static
						initial={{ y: '100%' }}
						animate={{ y: 0 }}
						exit={{ y: '100%', opacity: 0, transition: { duration: 0.1 } }}
						transition={{ type: 'spring', damping: 30, stiffness: 300 }}
						className="text-base border-r focus:outline-none sm:text-sm z-0"
					>
						{teams?.map(team => (
							<Listbox.Option
								key={team.id}
								value={team.id}
								className="text-gray-900 relative cursor-default select-none py-2 pl-3 hover:bg-gray-50"
							>
								{({ selected }) => (
									<>
										<div className="flex items-center">
											<Avatar name={team?.name} />
											<span
												className={classNames(
													selected ? 'font-semibold' : 'font-normal',
													'ml-3 block truncate'
												)}
											>
												{team.name}
											</span>
										</div>
									</>
								)}
							</Listbox.Option>
						))}
						<button
							onClick={onCreateTeam}
							className="w-full text-gray-900 relative cursor-default select-none py-2 pl-3 hover:bg-gray-50"
						>
							<div className="flex items-center">
								<div className="w-9 h-9 flex items-center justify-center">
									<PlusIcon className="w-6 h-6 rounded-full" />
								</div>
								<span className={'ml-3 block truncate font-normal'}>Create Team</span>
							</div>
						</button>
					</MotionOptions>
				)}
			</AnimatePresence>
			<Listbox.Button
				onClick={() => setOpen(open => !open)}
				className="group flex items-center border-t border-r shadow-sm py-3 px-4 w-full z-10 relative bg-white"
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
					<ChevronUpIcon
						className={classNames(
							open && 'rotate-180',
							'w-5 h-5 text-gray-400 group-hover:text-gray-700 transition'
						)}
					/>
				</div>
			</Listbox.Button>
		</Listbox>
	)
}

export default TeamSwitcher
