import { FC, useMemo } from 'react'
import { randomFromVal } from '@/lib/random'

export const BACKGROUND_COLORS = [
	'F7F9FC',
	'EEEDFD',
	'FFEBEE',
	'FDEFE2',
	'E7F9F3',
	'EDEEFD',
	'ECFAFE',
	'F2FFD1',
	'FFF7E0',
	'FDF1F7',
	'EAEFE6',
	'E0E6EB',
	'E4E2F3',
	'E6DFEC',
	'E2F4E8',
	'E6EBEF',
	'EBE6EF',
	'E8DEF6',
	'D8E8F3',
	'ECE1FE',
]

export const TEXT_COLORS = [
	'060A23',
	'4409B9',
	'BD0F2C',
	'C56511',
	'216E55',
	'05128A',
	'1F84A3',
	'526E0C',
	'935F10',
	'973562',
	'69785E',
	'2D3A46',
	'280F6D',
	'37364F',
	'363548',
	'4D176E',
	'AB133E',
	'420790',
	'222A54',
	'192251',
]

const Avatar: FC<{ name: string }> = ({ name }) => {
	const userInitials = useMemo<string>(() => {
		if (!name) return ''
		if (!name.includes(' ')) return name.slice(0, 2)

		return name
			.split(' ')
			.map(word => word[0])
			.join('')
	}, [name])

	const colorKey = useMemo<number>(
		() => randomFromVal({ min: 0, max: BACKGROUND_COLORS.length - 1, value: name }),
		[name]
	)

	return (
		<div
			className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center shadow"
			style={{ backgroundColor: `#${BACKGROUND_COLORS[colorKey]}` }}
		>
			<p className="font-medium text-xs" style={{ color: `#${TEXT_COLORS[colorKey]}` }}>
				{userInitials}
			</p>
		</div>
	)
}

export default Avatar
