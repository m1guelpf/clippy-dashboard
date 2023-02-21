import { Dialog, Transition } from '@headlessui/react'
import { motion, AnimatePresence } from 'framer-motion'
import { FC, FormEvent, Fragment, PropsWithChildren, ReactNode } from 'react'

type Props = PropsWithChildren<{
	open: boolean
	title: string
	subtitle?: string
	footer?: ReactNode | undefined
	onClose: (open: boolean) => void
	onSubmit?: (event: FormEvent<HTMLFormElement>) => void
}>

const MotionPanel = motion(Dialog.Panel)

const SlidePanel: FC<Props> = ({ open, onClose, title, subtitle, children, footer, onSubmit }) => {
	return (
		<Dialog as="div" className="relative z-10 pointer-events-none" open={open} onClose={onClose} static>
			<AnimatePresence>
				{open && (
					<motion.div
						exit={{ opacity: 0 }}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity pointer-events-auto"
					/>
				)}
			</AnimatePresence>

			<div className="fixed inset-0 overflow-hidden">
				<div className="absolute inset-0 overflow-hidden">
					<div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-6 md:pl-10">
						<AnimatePresence>
							{open && (
								<MotionPanel
									initial={{ x: '100%' }}
									animate={{ x: 0 }}
									transition={{ type: 'spring', stiffness: 500, damping: 50 }}
									exit={{ x: '100%', transition: { duration: 0.2 } }}
									onSubmit={onSubmit}
									as={onSubmit ? 'form' : 'div'}
									className="pointer-events-auto w-screen h-screen p-2 max-w-md"
								>
									<div className="flex h-full flex-col bg-white overflow-hidden rounded-xl shadow-xl">
										<div className="py-6 flex-1">
											<div className="px-4 sm:px-6 pb-6 border-b">
												<div className="flex items-start justify-between">
													<Dialog.Title className="text-2xl font-medium text-gray-900">
														{title}
													</Dialog.Title>
												</div>
												{subtitle && <p className="mt-1 text-gray-400">{subtitle}</p>}
											</div>
											<div className="relative mt-6 flex-1 px-4 sm:px-6">{children}</div>
										</div>
										{footer && <div className="bg-gray-50 py-4 px-6">{footer}</div>}
									</div>
								</MotionPanel>
							)}
						</AnimatePresence>
					</div>
				</div>
			</div>
		</Dialog>
	)
}

export default SlidePanel
