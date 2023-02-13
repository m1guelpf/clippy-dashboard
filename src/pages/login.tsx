'use client'

import Link from 'next/link'
import toast from 'react-hot-toast'
import { SWRError } from '@/lib/swr'
import { motion } from 'framer-motion'
import { api, wait } from '@/lib/utils'
import { useRouter } from 'next/router'
import useAuth from '@/hooks/swr/useAuth'
import LoadingDots from '@/components/icons/LoadingDots'
import { FormEvent, useCallback, useEffect, useState } from 'react'

enum FormState {
	WaitingForInput,
	Loading,
	Success,
}

const LoginPage = () => {
	const router = useRouter()
	const { isAuthenticated } = useAuth()
	const [email, setEmail] = useState<string>('')
	const [formState, setFormState] = useState<FormState>(FormState.WaitingForInput)

	useEffect(() => {
		if (!isAuthenticated) return

		router.push('/dashboard')
	}, [isAuthenticated, router])

	const logIn = useCallback(
		async (event: FormEvent<HTMLFormElement>) => {
			event.preventDefault()

			setFormState(FormState.Loading)
			const timePromise = wait(800)

			try {
				await api('/auth/login', 'POST', { email })
				await timePromise
				setFormState(FormState.Success)
			} catch (error) {
				await timePromise
				toast.error((error as SWRError).message)
				setFormState(FormState.WaitingForInput)
			}
		},
		[email]
	)

	return (
		<div className="h-screen flex flex-col space-y-8 justify-center items-center bg-gradient-to-t from-pink-50 via-white to-white">
			<div className="flex flex-col space-y-6 w-full max-w-xl py-6 md:pt-6 px-4 sm:px-8 overflow-hidden align-middle transition-all transform bg-white md:shadow border md:rounded-2xl">
				<div>
					<h1 className="font-bold text-3xl text-pink-900 font-serif">Welcome back!</h1>
					<p className="text-pink-800 font-lg">
						We&apos;ll send you a link to log back into your Clippy account.
					</p>
				</div>
				{formState == FormState.Success ? (
					<div>
						<p className="text-pink-800">
							Your link is on its way! Make sure to check the spam folder if you don&apos;t see it in your
							inbox.
						</p>
					</div>
				) : (
					<form
						onSubmit={logIn}
						className="relative py-1 pr-1 shadow-inner bg-pink-50 flex items-stretch rounded-lg text-pink-900"
					>
						<input
							required
							id="email"
							type="email"
							value={email}
							placeholder="panic@thedis.co"
							onChange={event => setEmail(event.target.value)}
							className="w-full border-0 bg-transparent focus:outline-none focus:ring-0 rounded-lg placeholder-pink-800/60 text-pink-800 pr-24"
						/>
						<motion.button
							type="submit"
							layoutId="sign-in"
							transition={{ duration: 0.2 }}
							disabled={formState == FormState.Loading}
							className="whitespace-nowrap font-medium flex items-center justify-center py-2 px-4 rounded-md bg-gradient-to-t from-pink-50 via-white to-white shadow absolute inset-y-1 right-1 disabled:cursor-wait"
						>
							{formState == FormState.Loading ? <LoadingDots /> : 'Sign in'}
						</motion.button>
					</form>
				)}
			</div>
			<p className="text-gray-600 text-sm">
				Don&apos;t have an account?{' '}
				<Link className="text-gray-800 font-semibold" href="/">
					Join the waitlist
				</Link>
				!
			</p>
		</div>
	)
}

export default LoginPage
