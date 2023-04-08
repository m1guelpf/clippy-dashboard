/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				hostname: '**',
			},
		],
	},
	redirects: async () => [
		{ source: '/', destination: 'https://tally.so/r/waOVMy', permanent: false },
		{
			source: '/widget.js',
			destination: 'https://unpkg.com/clippy-widget@latest/build/clippy.js',
			permanent: false,
		},
	],
	rewrites: async () => [
		{
			source: '/.well-known/ai-plugin.json',
			destination: 'https://api.clippy.help/.well-known/ai-plugin.json',
		},
	],
}

module.exports = nextConfig
