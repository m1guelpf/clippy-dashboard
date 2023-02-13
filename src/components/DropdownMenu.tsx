'use client'

import { useRouter } from 'next/router'
import { classNames } from '@/lib/utils'
import { useCallback, useState } from 'react'
import { FC, ReactNode, SyntheticEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'

type MenuItem = {
	label: string
	href?: string
	execute?: () => void
	icon?: FC<{ className?: string }>
}

type Props = {
	items: MenuItem[]
	children: ReactNode | (({ open }: { open: boolean }) => ReactNode)
}

const DropdownMenu: FC<Props> = ({ items, children }) => {
	const router = useRouter()
	const [open, setOpen] = useState<boolean>(false)

	const executeItem = useCallback(
		({ execute, href }: Partial<MenuItem>) =>
			(event: SyntheticEvent) => {
				event.preventDefault()

				if (execute) execute()
				else if (href) router.push(href)
				else throw new Error('DropdownMenu: MenuItem must have either an execute or href prop')

				setOpen(false)
			},
		[router]
	)

	return (
		<div className="relative inline-block text-left">
			<DropdownMenuPrimitive.Root open={open} onOpenChange={setOpen}>
				<DropdownMenuPrimitive.Trigger asChild>
					{typeof children == 'function' ? children({ open }) : children}
				</DropdownMenuPrimitive.Trigger>

				<AnimatePresence>
					{open && (
						<DropdownMenuPrimitive.Portal forceMount>
							<DropdownMenuPrimitive.Content asChild align="end" sideOffset={5}>
								<motion.div
									initial={{ scale: 0.95, opacity: 0 }}
									animate={{ opacity: 1, scale: 1 }}
									exit={{ opacity: 0, scale: 0.95 }}
									transition={{ type: 'tween', duration: 0.2 }}
									className={classNames(
										'radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down',
										'w-48 rounded-lg px-1.5 py-1 shadow-md md:w-56',
										'bg-white dark:bg-gray-800'
									)}
								>
									{items.map(({ label, icon: Icon, execute, href }, i) => (
										<DropdownMenuPrimitive.Item asChild key={`${label}-${i}`}>
											<button
												onClick={executeItem({ execute, href })}
												className={classNames(
													'flex select-none items-center rounded-md px-2 py-2 text-sm outline-none w-full text-left',
													'text-gray-400 focus:bg-gray-50 dark:text-gray-500 dark:focus:bg-gray-900'
												)}
											>
												{/* @ts-ignore-next-line */}
												<Icon className="mr-2 h-4 w-4" />
												<span className="flex-grow text-gray-700 dark:text-gray-300">
													{label}
												</span>
											</button>
										</DropdownMenuPrimitive.Item>
									))}
								</motion.div>
							</DropdownMenuPrimitive.Content>
						</DropdownMenuPrimitive.Portal>
					)}
				</AnimatePresence>
			</DropdownMenuPrimitive.Root>
		</div>
	)
}

export default DropdownMenu
