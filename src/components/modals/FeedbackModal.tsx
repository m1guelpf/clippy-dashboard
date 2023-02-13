'use client'

import BaseModal from './BaseModal'
import { motion } from 'framer-motion'
import { withPreventDefault } from '@/lib/utils'
import { XMarkIcon } from '@heroicons/react/20/solid'
import { KeyboardEvent, useCallback, useRef } from 'react'
import { SparklesIcon } from '@heroicons/react/24/outline'
import { FeedbackModalState, useFeedbackModal } from '@/store/feedbackModal'

const getParams = (store: FeedbackModalState) => ({
	open: store.open,
	reset: store.reset,
	feedback: store.feedback,
	setFeedback: store.setFeedback,
	submitFeedback: store.submitFeedback,
})

const FeedbackModal = () => {
	const focusRef = useRef<HTMLInputElement>(null)
	const { open, reset, submitFeedback, feedback, setFeedback } = useFeedbackModal(getParams)

	const handleKeyDown = useCallback(
		async (event: KeyboardEvent) => {
			if (event.key !== 'Enter' || !event.metaKey) return

			submitFeedback()
		},
		[submitFeedback]
	)

	return (
		<BaseModal isOpen={open} setOpen={reset} initialFocus={focusRef} panelProps={{ layoutId: 'feedback-modal' }}>
			<div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
				<button
					type="button"
					className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
					onClick={reset}
				>
					<span className="sr-only">Close</span>
					<XMarkIcon className="h-6 w-6" aria-hidden="true" />
				</button>
			</div>
			<form onSubmit={withPreventDefault(submitFeedback)} className="space-y-4">
				<div className="w-12 h-12 rounded-lg shadow-sm border inline-flex items-center justify-center">
					<SparklesIcon className="w-6 h-6 text-gray-600" />
				</div>
				<div>
					<h3 className="text-lg font-medium leading-6 text-gray-900">Help me make Clippy better!</h3>
					<p className="mt-1 text-sm text-gray-500">
						I work on Clippy every day, so if you find any bugs, or have any good ideas let me know!
					</p>
				</div>
				<div>
					<motion.label htmlFor="feedback" className="block text-sm font-medium text-gray-700">
						Feedback
					</motion.label>
					<div className="mt-1.5">
						<textarea
							id="feedback"
							required
							autoFocus
							value={feedback}
							onKeyDown={handleKeyDown}
							placeholder="Your feedback..."
							onChange={e => setFeedback(e.target.value)}
							className="block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm [resize:none]"
						/>
					</div>
				</div>
				<div className="mt-5 sm:mt-6">
					<button
						type="submit"
						className="inline-flex w-full justify-center rounded-md border border-transparent bg-pink-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
					>
						Submit
					</button>
				</div>
			</form>
		</BaseModal>
	)
}

export default FeedbackModal
