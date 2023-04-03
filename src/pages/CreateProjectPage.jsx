import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import axios from '../api/axios'
import TagInput from '@eidellev/react-tag-input'
import FormField from '../components/FormField'
import imagePlaceholder from '../assets/image-placeholder.png'
import Loader from '../components/Loader'

import AuthContext from '../context/AuthProvider'
import AnimatedPage from '../components/AnimatedPage'

function CreateProjectPage() {
    const { auth } = useContext(AuthContext)

    const [form, setForm] = useState({
        title: '',
        description: '',
        githubURL: '',
        demoURL: '',
        image: '',
        tags: [],
        // title: 'New project',
        // description: 'Blurb about my project',
        // githubURL: 'https://github.com/quentin-mckay/Pendulum-Wave',
        // demoURL: 'asdf',
        // image: '',
        // tags: ['React', 'Tailwind', 'Axios'],
    })

    // const [tags, setTags] = useState(['React', 'Tailwind'])

    const navigate = useNavigate()

    const [loading, setLoading] = useState(false) // for share button

    const [generatingDescription, setGeneratingDescription] = useState(false)
    const [generatingImagePrompt, setGeneratingImagePrompt] = useState(false)
    const [generatingImage, setgeneratingImage] = useState(false)

    const [imagePrompt, setImagePrompt] = useState('')

    const handleChange = (event) => {
        setForm((prevForm) => ({
            ...prevForm,
            [event.target.name]: event.target.value,
        }))

        // console.log(form);
    }

    const generateDescription = async () => {
        setGeneratingDescription(true)

        try {
            const response = await axios.post('/openai/description', {
                githubURL: form.githubURL,
            })
            // console.log(response.data)
            setForm({
                ...form,
                description: response.data.description,
            })
        } catch (error) {
            console.log(error)
        } finally {
            setGeneratingDescription(false)
        }
    }

    const generateImagePrompt = async () => {
        setGeneratingImagePrompt(true)

        try {
            const response = await axios.post('/openai/image_prompt', {
                githubURL: form.githubURL,
            })
            // console.log(response.data)
            setImagePrompt(response.data.image_prompt)
        } catch (error) {
            console.log(error)
        } finally {
            setGeneratingImagePrompt(false)
        }
    }

    const generateImage = async () => {
        // console.log('image')

        try {
            setgeneratingImage(true)
            const response = await axios.post('/openai/image', { imagePrompt })
            // console.log(response.data)
            setForm({
                ...form,
                image: `data:image/jpeg;base64,${response.data.image}`,
            })
        } catch (error) {
            console.log(error)
        } finally {
            setgeneratingImage(false)
        }
    }

    const handleGenerateTags = async () => {
        try {
            const response = await axios.post('/openai/tags', {
                githubURL: form.githubURL,
            })
            // console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log('Form submitted')

        try {
            // /projects doesn't work but /projects/ does ????
            const response = await axios.post('/projects/', form, {
                headers: { Authorization: `Bearer ${auth.token}` },
            })
            // const response = await axios.post('/auth/register', {username: 'bob', password: 'yuio'})

            // console.log(response?.data)

            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    // this empty function is necessary to stop a bug(?) where clicking the remove tag button triggers a form submission
    const onTagsClick = (e) => {
        // console.log('clicked')
    }

    const handleChangeTags = (newTags) => {
        // setTags(tags)
        // console.log(newTags)

        // Todo: Fix bug where updating form erases a tag

        setForm((prevForm) => ({
            ...prevForm,
            tags: newTags,
        }))
        // console.log(form)
    }

    const handleImagePromptChange = (e) => {
        setImagePrompt(e.target.value)
    }

    return (
        <AnimatedPage>
            <div className='max-w-3xl mx-auto'>
                <h1 className='inline-block text-3xl font-light border-gray-600 mt-2'>
                    Create Project
                </h1>

                {/* FORM */}
                <form
                    onSubmit={handleSubmit}
                    className='mt-8 bg-secondary-bg p-6 rounded-xl shadow-md flex flex-col gap-6'
                >
                    {/* <div className='flex flex-col gap-5 mt-4'> */}
                    {/* GITHUB URL */}
                    <FormField
                        labelName='GitHub URL (required)'
                        type='text'
                        name='githubURL'
                        placeholder=''
                        value={form.githubURL}
                        handleChange={handleChange}
                    />

                    {/* TITLE */}
                    <FormField
                        labelName='Title'
                        type='text'
                        name='title'
                        placeholder=''
                        value={form.title}
                        handleChange={handleChange}
                    />

                    {/* DESCRIPTION */}
                    <div>
                        <div className='flex items-center gap-2 mb-2'>
                            <label
                                htmlFor='description'
                                className='block text-sm font-medium text-gray-900'
                            >
                                Description
                            </label>

                            <button
                                type='button'
                                onClick={generateDescription}
                                className='q-generate-button flex items-center gap-2'
                            >
                                <span className=''>AI Generate</span>
                                {/* <div className='ml-2'>
                                        <Loader w='4' h='4' />
                                    </div> */}
                                {generatingDescription ? (
                                    <div className=''>
                                        <Loader w='4' h='4' />
                                    </div>
                                ) : (
                                    ''
                                )}
                            </button>
                        </div>
                        <textarea
                            id='description'
                            name='description'
                            // placeholder='Description'
                            rows='5'
                            value={form.description}
                            onChange={handleChange}
                            className='w-full p-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-primary-accent focus:border-primary-accent outline-none'
                        />
                    </div>

                    {/* DEMO URL */}
                    <FormField
                        labelName='Demo URL'
                        type='text'
                        name='demoURL'
                        placeholder=''
                        value={form.demoURL}
                        handleChange={handleChange}
                    />

                    {/* TAGS */}
                    <div>
                        <label className='block text-sm font-medium text-gray-900 mb-2'>
                            Tags
                        </label>
                        <TagInput
                            value={form.tags}
                            onChange={handleChangeTags}
                            colorize
                            // placeholder='Add Tag'
                            onClick={onTagsClick}
                        />
                    </div>
                    

                    {/* IMAGE PROMPT */}
                    <div>
                        <div className='flex items-center gap-2 mb-2'>
                            <label
                                htmlFor={imagePrompt}
                                className='block text-sm font-medium text-gray-900'
                            >
                                Image Prompt
                            </label>

                            <button
                                type='button'
                                onClick={generateImagePrompt}
                                className='q-generate-button flex items-center gap-2'
                            >
                                <span className=''>AI Generate Image Prompt</span>

                                {generatingImagePrompt ? (
                                    <div className='ml-2'>
                                        <Loader w='4' h='4' />
                                    </div>
                                ) : (
                                    ''
                                )}
                            </button>

                            <button
                                type='button'
                                onClick={generateImage}
                                className='q-generate-button flex items-center'
                            >
                                {generatingImage ? (
                                    'Generating...'
                                ) : (
                                    'Generate Image'
                                )}
                            </button>
                        </div>

                        <input
                            id='imagePrompt'
                            name='imagePrompt'
                            placeholder='Image Prompt'
                            value={imagePrompt}
                            onChange={handleImagePromptChange}
                            className='w-full p-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-primary-accent focus:border-primary-accent outline-none transition-colors'
                        />
                    </div>

                    {/* IMAGE PLACEHOLDER AND LOADER */}
                    <div className='relative mx-auto w-64 h-64 grid place-items-center bg-gray-50 border border-gray-300 rounded-lg overflow-hidden'>
                        {form.image ? (
                            <img
                                src={form.image}
                                alt='cover image'
                                className='w-full h-full object-contain'
                            />
                        ) : (
                            <img
                                src={imagePlaceholder}
                                alt='placeholder'
                                className='w-3/4 h-3/4 opacity-40 object-contain'
                            />
                        )}

                        {/* LOADER */}
                        {generatingImage && (
                            <div className='absolute inset-0 z-0 grid place-items-center bg-black bg-opacity-50 rounded-lg'>
                                <Loader w='10' h='10'/>
                            </div>
                        )}
                    </div>

                    {/* SHARE BUTTON */}

                    <button
                        type='submit'
                        className='px-8 py-4 text-white bg-primary-accent font-medium text-center rounded-md text-md hover:bg-primary-accent-hover transition'
                    >
                        {loading
                            ? 'Sharing...'
                            : 'Share project with the community!'}
                    </button>
                </form>
            </div>
        </AnimatedPage>
    )
}

export default CreateProjectPage
