import '@/styles/styles.css'
import { SWRConfig } from 'swr'
import { AppProps } from 'next/app'
import { fetcher } from '@/lib/swr'
import { FC, Suspense } from 'react'
import { Toaster } from 'react-hot-toast'

const App: FC<AppProps> = ({ Component, pageProps }) => {
	return (
		<>
			<Toaster />
			<SWRConfig
				value={{
					fetcher,
					shouldRetryOnError: false,
					revalidateOnFocus: false,
				}}
			>
				<Suspense fallback={null}>
					<Component {...pageProps} />
				</Suspense>
			</SWRConfig>
		</>
	)
}

export default App
