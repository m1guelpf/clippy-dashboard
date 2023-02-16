import { FC, InputHTMLAttributes } from 'react'

type Props = { label: string; value: string; onChange: (value: string) => void } & Omit<
	InputHTMLAttributes<HTMLInputElement>,
	'onChange'
>

const InputWithLabel: FC<Props> = ({ label, id, value, onChange, type = 'text', ...props }) => (
	<div>
		<label htmlFor={id} className="block text-sm font-medium text-gray-700">
			{label}
		</label>
		<div className="mt-1">
			<input
				id={id}
				name={id}
				{...props}
				type={type}
				value={value}
				onChange={e => onChange(e.target.value)}
				className="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-600 focus:ring-gray-600 sm:text-sm"
			/>
		</div>
	</div>
)

export default InputWithLabel
