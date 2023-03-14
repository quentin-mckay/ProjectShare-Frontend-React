import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "../api/axios";
import TagInput from '@eidellev/react-tag-input'
import FormField from "../components/FormField";
import imagePlaceholder from '../assets/image-placeholder.png'
import Loader from '../components/Loader'

function EditProjectPage() {
    const [form, setForm] = useState({
        title: "New project",
        description: "Blurb about my project",
        githubURL: "https://github.com/quentin-mckay/Base-Converter-PyScript",
        demoURL: "asdf",
        image: "",
		tags: ['React', 'Tailwind', 'Axios']
    });

	const [tags, setTags] = useState(['React', 'Tailwind'])

    const navigate = useNavigate();

	const [loading, setLoading] = useState(false)
	const [generatingDescription, setGeneratingDescription] = useState(false)
	const [generatingImage, setgeneratingImage] = useState(false)

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        });

        // console.log(form);
    };

	const generateDescription = async () => {
		setGeneratingDescription(true)

		try {
			const response = await axios.post('/openai/description', {githubURL: form.githubURL})
			// console.log(response.data)
			setForm({
				...form,
				description: response.data.description
			})
		} catch (error) {
			console.log(error)
		} finally {
			setGeneratingDescription(false)
		}
	}

	const generateImage = async () => {

		console.log('image')
		
		try {
			setgeneratingImage(true)
			const response = await axios.post('/openai/image', { githubURL: form.githubURL })
			console.log(response.data)
			setForm({ 
				...form, 
				image: `data:image/jpeg;base64,${response.data.image}`
			})
		} catch (error) {
			console.log(error)
		} finally {
			setgeneratingImage(false)
		}
	}

	const handleGenerateTags = async () => {
		try {
			const response = await axios.post('/openai/tags', { githubURL: form.githubURL })
			console.log(response.data)
			
		} catch (error) {
			console.log(error)
		}
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		
		try {
			// /projects doesn't work but /projects/ does ????
			const response = await axios.post('/projects/', form)
			// const response = await axios.post('/auth/register', {username: 'bob', password: 'yuio'})
			
			console.log(response?.data)

			// navigate('/')
		} catch (error) {
			console.log(error)
		}
	}

	// this empty function is necessary to stop a bug(?) where clicking the remove tag button triggers a form submission
	const onTagsClick = (e) => {
		// console.log('clicked') 
	}

	const handleChangeTags = (tags) => {	
		// setTags(tags)
		setForm({
			...form,
			tags
		})
		console.log(form)
	}

	useEffect(() => {

	}, [])

    return (
        <div className=''>
            <h1 className="text-xl font-bold">Create Project</h1>

            <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-5 mt-4">

					{/* GITHUB URL */}
					<FormField
						labelName="GitHub URL"
						type="text"
						name="githubURL"
						placeholder=""
						value={form.githubURL}
						handleChange={handleChange}
					/>

					{/* TITLE */}
                    <FormField
                        labelName="Title"
                        type="text"
                        name="title"
                        placeholder=""
                        value={form.title}
                        handleChange={handleChange}
                    />

					{/* DESCRIPTION */}
                    <div>

                        <div className="flex items-center gap-2 mb-2">
                            <label
                                htmlFor={name}
                                className="block text-sm font-medium text-gray-900"
                            >
                                Description
                            </label>

                            
							<button
								type="button"
								onClick={generateDescription}
								className="font-semibold text-xs bg-[#ECECF1] py-1 px-2 rounded-[5px] text-black border border-gray-500"
							>
								{generatingDescription ? 'Generating...' : 'Generate'}
							</button>
                            
                        </div>

                        <textarea
                            id='description'
                            name='description'
                            placeholder="Description"
							rows='3'
                            value={form.description}
                            onChange={handleChange}
                            className="w-full p-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-[#5469ff] focus:border-[#4649ff] outline-none"
                        />
                    </div>

					{/* DEMO URL */}
                    <FormField
                        labelName="Demo URL"
                        type="text"
                        name="demoURL"
                        placeholder=""
                        value={form.demoURL}
                        handleChange={handleChange}
                    />

					{/* TAGS */}
					<div>
						<label className="block text-sm font-medium text-gray-900 mb-2">
							Tags
						</label>
						<TagInput value={form.tags} onChange={handleChangeTags} colorize placeholder="New Tag" onClick={onTagsClick}/>
					</div>
                    
                </div>

				{/* GENERATE IMAGE BUTTON */}
				<div className="mt-4">
					<button
						type='button'
						onClick={generateImage}
						className='w-full px-4 py-2 text-white text-sm bg-green-700 font-medium rounded-md sm:w-auto text-center'
					>
						{generatingImage ? 'Generating Image...' : 'Generate Image'}
					</button>
				</div>

				{/* IMAGE PLACEHOLDER AND LOADER */}
				<div className="relative w-64 h-64 grid place-items-center bg-gray-50 border border-gray-300 rounded-lg overflow-hidden">
					{form.image ? (
						<img 
							src={form.image} 
							alt="cover image" 
							className="w-full h-full object-contain"
						/>
					) : (
						<img 
							src={imagePlaceholder} 
							alt='placeholder' 
							className="w-3/4 h-3/4 opacity-40 object-contain"
						/>
					)}

					{/* LOADER */}
					{generatingImage && (
						<div className="absolute inset-0 z-0 grid place-items-center bg-black bg-opacity-50 rounded-lg">
							<Loader />
						</div>
					)}
				</div>

				{/* SHARE BUTTON */}
				<div className="mt-2">
					{/* <p className='mt-2 text-[#666e75] text-[14px]'>Share it with others in the community</p> */}

					<button
						type='submit'
						className='w-full px-5 py-2.5 mt-3 text-white bg-[#6469ff] font-medium text-center rounded-md text-sm sm:w-auto'
					>
						{loading ? 'Sharing...' : 'Share with the community'}
					</button>
				</div>
				
            </form>
        </div>
    );
}

export default EditProjectPage;
