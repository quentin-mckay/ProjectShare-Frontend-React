import React from 'react'

const FormField = ({ labelName, type, name, placeholder, value, handleChange, hasGenerate, handleGenerate }) => {
	return (
		<div>
			<div className="flex items-center gap-2 mb-2">
				<label 
					htmlFor={name}
					className='block text-sm font-medium text-gray-900'
				>
					{labelName}
				</label>

				{hasGenerate && (
					<button 
						type='button'
						onClick={handleGenerate}
						className='font-semibold text-xs bg-[#ECECF1] py-1 px-2 rounded-[5px] text-black'
					>
						Generate
					</button>
				)}
				
			</div>

			<input
				type={type} 
				id={name}
				name={name}
				placeholder={placeholder}
				value={value}
				onChange={handleChange}
				className='w-full p-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-primary-accent focus:border-primary-accent outline-none'
			/>
		</div>
	)
}

export default FormField