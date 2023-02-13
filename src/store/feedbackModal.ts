'use client'

import { create } from 'zustand'
import { api } from '@/lib/utils'
import toast from 'react-hot-toast'
import { SWRError } from '@/lib/swr'

export type FeedbackModalState = {
	open: boolean
	feedback: string
	loading: boolean
	reset: () => void
	submitFeedback: () => void
	setOpen: (open: boolean) => void
	setFeedback: (feedback: string) => void
}

export const useFeedbackModal = create<FeedbackModalState>((set, get) => ({
	open: false,
	feedback: '',
	loading: false,
	setOpen: open => set({ open }),
	setFeedback: feedback => set({ feedback }),
	reset: () => {
		if (get().loading) return

		set({ open: false, feedback: '' })
	},
	submitFeedback: async () => {
		set({ loading: true })

		try {
			await api(`/feedback`, 'POST', { feedback: get().feedback })

			set({ loading: false })
			toast.success('Thanks for the feedback!')

			get().reset()
		} catch (error) {
			set({ loading: false })
			toast.error((error as SWRError).message)
		}
	},
}))

export const getSubmitFeedback = (store: FeedbackModalState) => () => store.setOpen(true)
