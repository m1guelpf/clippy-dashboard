import { FC } from 'react'
import { classNames } from '@/lib/utils'
import { HTMLMotionProps, motion } from 'framer-motion'

const Button: FC<HTMLMotionProps<'button'>> = ({ className, ...props }) => (
	<motion.button
		className={classNames(
			className,
			'px-5 py-2 rounded-2xl text-lg outline outline-black/10',
			'text-gray-800/90 bg-gradient-to-b from-gray-50 to-gray-100/70 shadow-button',
			'active:outline-black/5 hover:to-white/70 active:from-gray-100/80 active:to-white/90'
		)}
		{...props}
	/>
)

export default Button
