import { classNames } from '@/lib/utils'

const LoadingDots = ({ className = '' }) => (
	<span className={classNames(className, 'inline-flex items-center space-x-1')}>
		<span className="w-1 h-1 rounded-full inline-block bg-current animate-blink" />
		<span className="w-1 h-1 rounded-full inline-block bg-current animate-blink [animation-delay:200ms]" />
		<span className="w-1 h-1 rounded-full inline-block bg-current animate-blink [animation-delay:400ms]" />
	</span>
)

export default LoadingDots
