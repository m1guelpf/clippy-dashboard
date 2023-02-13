const USE_DEV_API = true

export const IS_PROD = process.env.NODE_ENV === 'production'
export const API_URL = IS_PROD || !USE_DEV_API ? 'https://api.clippy.help' : 'http://localhost:8000'
