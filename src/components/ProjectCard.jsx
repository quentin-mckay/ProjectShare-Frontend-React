import { useContext } from 'react'
import { Link } from 'react-router-dom'

import AuthContext from '../context/AuthProvider'

const ProjectCard = ({ project, userID, handleDelete }) => {
    const { title, description, github_url, demo_url, image_url, tags, date } =
        project

    const { auth } = useContext(AuthContext)

    const shortDescription = description.split('. ')[0]

    

    

    const formatDate = (date) => {
        const dateObj = new Date(date)
        const options = { year: 'numeric', month: 'long', day: 'numeric' }

        let  d = dateObj.toLocaleDateString('en-AU', options)

        d = d.split('')
        d.splice(d.length - 5, 0, ',')
        d.join('')

        return d
    }

    const formattedDate = formatDate(date)

    return (
        <div className='grid grid-cols-[5fr_3fr] bg-secondary-bg rounded-lg shadow-md overflow-hidden'>
            <div className='p-6 flex flex-col'>
                {/* Date and Tags */}
                <div className='flex justify-between items-center'>
                    <span className='font-light text-gray-600'>
                        {formattedDate}
                    </span>
                    {/* <span class="font-light text-gray-600"></span> */}

                    <div>
                        {tags.length > 0 && (
                            <div className='space-x-2'>
                                {tags.map((tag) => (
                                    <Link to={`/tags/${tag.name}`} key={tag.id}>
                                        <span className='inline-block border border-primary-accent rounded-full px-2 py-1 text-xs font-semibold text-primary-accent hover:bg-primary-accent hover:bg-opacity-5 transition-colors duration-250'>
                                            {tag.name}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Title and Description */}
                <div className='mt-2'>
                    <p className='text-2xl text-gray-700 font-bold'>{title}</p>

                    <p className='mt-2 text-gray-600'>{shortDescription}</p>
                </div>

                {/* Buttons and Username */}
                <div className='flex justify-between items-center mt-auto'>
                    <div className='space-x-1'>
                        <Link
                            to={`/projects/${project.id}`}
                            className='text-sm bg-primary-accent text-light-text px-3 py-2 rounded-md hover:bg-primary-accent-hover'
                        >
                            <span>View Project</span>
                        </Link>
                        {project.user.username === auth.username && (
                            <>
                                <Link
                                    to={`/edit-project/${project.id}`}
                                    className='inline-block text-sm bg-orange-500 text-light-text px-3 py-2 rounded-md hover:bg-orange-600'
                                >
                                    Edit Project
                                </Link>
                                <button
                                    onClick={() => handleDelete(project.id)}
                                    className='text-sm bg-red-500 text-light-text px-3 py-2 rounded-md hover:bg-red-600'
                                >
                                    Delete
                                </button>
                            </>
                        )}
                    </div>

                    {/* USERNAME */}
                    <span className=''>
                        by{' '}
                        <Link
                            to={`/users/${project.user.id}`}
                            className='text-gray-700 font-bold hover:text-gray-900'
                        >
                            {project.user.username}
                        </Link>
                    </span>
                </div>
            </div>

            <div className='p-2'>
                {image_url?.length > 0 && (
                    <img
                        className='object-contain h-full max-h-72 mx-auto rounded-lg'
                        src={image_url}
                        alt=''
                    />
                )}
            </div>
        </div>
    )
}

export default ProjectCard
