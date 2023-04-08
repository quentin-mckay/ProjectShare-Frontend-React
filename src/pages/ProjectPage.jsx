import { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import axios from '../api/axios'
import AnimatedPage from '../components/AnimatedPage'
import AuthContext from '../context/AuthProvider'

import { FaGithub } from 'react-icons/fa'
import { BsBoxArrowUpRight } from 'react-icons/bs'

function ProjectPage() {
    const [project, setProject] = useState(null)
    const [comments, setComments] = useState([])
    const [commentMessage, setCommentMessage] = useState('')

    const { auth } = useContext(AuthContext)

    const { projectId } = useParams()

    useEffect(() => {
        const getProject = async () => {
            try {
                const response = await axios.get(`/projects/${projectId}`)
                setProject(response.data)

                // console.log(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        getProject()

        const getComments = async () => {
            try {
                const response = await axios.get(
                    `/projects/${projectId}/comments`
                )
                setComments(response.data.reverse())
            } catch (error) {
                console.log(error)
            }
        }
        getComments()
    }, [projectId])

    const handleCommentSubmit = async (event) => {
        event.preventDefault()

        try {
            const response = await axios.post(
                `/projects/${projectId}/comments`,
                { message: commentMessage },
                {
                    headers: { Authorization: `Bearer ${auth.token}` },
                }
            )

            setComments((prevComments) => [
                response.data.comment,
                ...prevComments,
            ])
            setCommentMessage('')
            // console.log(comments)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <AnimatedPage>
            <div>
                {project ? (
                        <div className='max-w-3xl mx-auto bg-secondary-bg shadow-md rounded-lg p-6'>
                            {/* IMAGE */}
                            {project.image_url?.length > 0 && (
                                <img
                                    className='w-full h-[40vh] object-cover rounded-lg shadow-md'
                                    src={project.image_url}
                                    alt='Project Image'
                                />
                            )}
                            <div className='my-6'>
                                <h1 className='text-2xl font-bold text-gray-800 '>
                                    {project.title}
                                </h1>
                                <p className='text-sm text-gray-700'>
                                    by{' '}
                                    <Link
                                        to={`/users/${project.user.id}`}
                                        className=' font-semibold'
                                    >
                                        {project.user.username}
                                    </Link>{' '}
                                    {/* on{' '}
                                    <span className='font-medium'>
                                        Mar 19, 2023
                                    </span> */}
                                </p>
                                <p className='mt-4 text-secondary-text'>
                                    {project.description}
                                </p>
                            </div>

                            {/* GITHUB and DEMO */}
                            <div className='my-6 grid grid-cols-1 gap-1 sm:grid-cols-2'>
                                <a
                                    href={project.github_url}
                                    target='_blank'
                                    className='flex items-center justify-center gap-2 text-center py-2 px-4 bg-blue-600 text-white font-normal rounded hover:bg-blue-500  duration-200'
                                >
                                    <span>View on GitHub</span>
                                    <FaGithub size={18}/>
                                </a>
                                <a
                                    href={project.demo_url}
                                    target='_blank'
                                    className='flex items-center justify-center gap-2 text-center py-2 px-4 bg-emerald-600 text-white font-normal rounded hover:bg-emerald-500'
                                >
                                    <span>View Demo</span>
                                    <BsBoxArrowUpRight size={18} />
                                </a>
                            </div>
                            {/* TAGS */}
                            <div className='my-6'>
                                <h2 className='text-lg font-bold text-gray-800 mb-2'>
                                    Tags:
                                </h2>
                                <ul className='flex flex-wrap'>
                                    {project.tags.map((tag) => (
                                        <Link
                                            to={`/tags/${tag.name}`}
                                            key={tag.id}
                                            className='inline-block border border-primary-accent rounded-full px-2 py-1 text-sm font-medium text-primary-accent mr-2 mb-2 hover:bg-primary-accent hover:bg-opacity-5 transition-colors'
                                        >
                                            {tag.name}
                                        </Link>
                                    ))}
                                </ul>
                            </div>

                            <div className='my-6'>
                                <h2 className='text-lg font-bold text-gray-800 mb-2'>
                                    Comments:
                                </h2>
                                <form onSubmit={handleCommentSubmit}>
                                    <label
                                        htmlFor='comment'
                                        className='sr-only'
                                    >
                                        Comment
                                    </label>
                                    <textarea
                                        id='comment'
                                        name='comment'
                                        className='w-full p-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-[#5469ff] focus:border-[#4649ff] outline-none'
                                        placeholder='Leave a comment'
                                        value={commentMessage}
                                        onChange={(e) =>
                                            setCommentMessage(e.target.value)
                                        }
                                    ></textarea>
                                    <button
                                        type='submit'
                                        className=' bg-primary-accent text-white font-bold py-2 px-4 mt-1 rounded hover:bg-primary-accent-hover transition'
                                    >
                                        Submit
                                    </button>
                                </form>

                                <div className='mt-8'>
                                    {comments.map((comment, index) => (
                                        <div key={index} className='flex items-center border-t border-gray-400 my-2 py-1'>
                                            {/* <img
                                                class='w-10 h-10 rounded-full mr-4'
                                                src='https://via.placeholder.com/150x150.png'
                                                alt='Avatar'
                                            /> */}
                                            <div>
                                                <h3 className='text-gray-800 font-bold'>
                                                    {comment.user.username}
                                                </h3>
                                                <p className='text-gray-700'>
                                                    {comment.message}
                                                </p>
                                                {/* <p class='text-gray-600 text-sm'>
                                                        Mar 19, 2023
                                                    </p> */}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </AnimatedPage>
    )
}

export default ProjectPage
