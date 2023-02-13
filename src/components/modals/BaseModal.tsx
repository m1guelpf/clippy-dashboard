'use client'

import { classNames } from '@/lib/utils'
import { Dialog } from '@headlessui/react'
import { PropsWithChildren, RefObject } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

type Props = PropsWithChildren<{
	isOpen: boolean
	setOpen: (open: boolean) => void
	initialFocus?: RefObject<HTMLElement>
	panelProps?: {}
}>

const BaseModal = ({ isOpen, setOpen, children, initialFocus, panelProps = {} }: Props) => {
	return (
		<Dialog as="div" static open={isOpen} onClose={setOpen} className="relative z-10" initialFocus={initialFocus}>
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.3 }}
						exit={{ opacity: 0, transition: { duration: 0.2 } }}
						className="fixed inset-0 bg-gray-500 bg-opacity-75"
					/>
				)}
			</AnimatePresence>

			<div className={classNames(!isOpen && 'pointer-events-none', 'fixed inset-0 z-10 overflow-y-auto')}>
				<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
					<AnimatePresence>
						{isOpen && (
							<Dialog.Panel
								as={motion.div}
								transition={{ duration: 0.3 }}
								animate={{ opacity: 1, scale: 1 }}
								initial={{ opacity: 0, scale: 0.95 }}
								exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
								className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl sm:my-8 sm:w-full sm:max-w-md sm:p-6"
								{...panelProps}
							>
								{children}
							</Dialog.Panel>
						)}
					</AnimatePresence>
				</div>
			</div>
		</Dialog>
	)
}

export default BaseModal
