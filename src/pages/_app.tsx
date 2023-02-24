import '@/styles/styles.css'
import { SWRConfig } from 'swr'
import { Toaster } from 'sonner'
import { AppProps } from 'next/app'
import { fetcher } from '@/lib/swr'
import { FC, Suspense } from 'react'

const App: FC<AppProps> = ({ Component, pageProps }) => {
	return (
		<>
			<Toaster richColors position="top-center" />
			<SWRConfig value={{ fetcher, shouldRetryOnError: false, revalidateOnFocus: false }}>
				<Suspense fallback={null}>
					<Component {...pageProps} />
				</Suspense>
			</SWRConfig>
		</>
	)
}

export default App
