import { Team } from '@/types/api'
import { classNames } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import useTeams from '@/hooks/swr/useTeams'
import { FC, Fragment, useMemo } from 'react'
import LoadingDots from './icons/LoadingDots'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

const TeamSelector: FC<{}> = () => {
	const router = useRouter()
	const { teams, selectedTeam, setSelectedTeam } = useTeams()

	const team = useMemo<Team | undefined>(() => teams?.find(team => team.id === selectedTeam), [selectedTeam, teams])

	return (
		<Listbox value={team} onChange={team => setSelectedTeam(team.id)}>
			{({ open }) => (
				<>
					<Listbox.Label className="sr-only">Select team</Listbox.Label>
					<div className="relative mt-1">
						<Listbox.Button
							className={classNames(
								!team ? 'flex items-center justify-center py-4' : 'pr-10 pl-3',
								'relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2  text-left shadow-button focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500 sm:text-sm'
							)}
						>
							{!team ? <LoadingDots /> : <span className="block truncate">{team.name}</span>}
							<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
								<ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
							</span>
						</Listbox.Button>

						<Transition
							show={open}
							as={Fragment}
							leave="transition ease-in duration-100"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
								{teams?.map(team => (
									<Listbox.Option
										key={team.id}
										className={({ active }) =>
											classNames(
												active ? 'bg-gray-100' : 'text-gray-900',
												'relative cursor-default select-none py-2 pl-3 pr-9'
											)
										}
										value={team}
									>
										{({ selected, active }) => (
											<>
												<span
													className={classNames(
														selected ? 'font-medium' : 'font-normal',
														'block truncate'
													)}
												>
													{team.name}
												</span>

												{selected ? (
													<span
														className={classNames(
															'text-pink-600 absolute inset-y-0 right-0 flex items-center pr-4'
														)}
													>
														<CheckIcon className="h-5 w-5" aria-hidden="true" />
													</span>
												) : null}
											</>
										)}
									</Listbox.Option>
								))}
							</Listbox.Options>
						</Transition>
					</div>
				</>
			)}
		</Listbox>
	)
}

export default TeamSelector
