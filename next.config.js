/** @type {import('next').NextConfig} */
const nextConfig = {
	redirects: async () => {
		return [
			{ source: '/', destination: 'https://tally.so/r/waOVMy', permanent: false },
			{
				source: '/widget.js',
				destination: 'https://unpkg.com/clippy-widget@latest/build/clippy.js',
				permanent: false,
			},
		]
	},
}

module.exports = nextConfig
