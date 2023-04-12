import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import axios from '../api/axios'
import AnimatedPage from '../components/AnimatedPage'
import ProjectCard from '../components/ProjectCard'

import Loader from '../components/Loader'
import { ThreeDots } from 'react-loader-spinner'

export default function HomePage() {
    const [projects, setProjects] = useState([])

    const [loadingProjects, setLoadingProjects] = useState(false)

    useEffect(() => {
        const fetchUsers = async () => {
            setLoadingProjects(true)

            try {
                const response = await axios.get('/projects')
                setProjects(response.data.reverse())
            } catch (error) {
                console.log(error)
            } finally {
                setLoadingProjects(false)
            }
        }
        fetchUsers()
    }, [])

    const projectElements = projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
    ))

    return (
        <AnimatedPage>
            <section className='max-w-3xl mx-auto'>
                {loadingProjects ? (
                    // <p>Loading...</p>
                    <div className='mt-[25vh] grid place-items-center'>
                        <ThreeDots
                            height='120'
                            width='120'
                            color='gray'
                            ariaLabel='bars-loading'
                            wrapperStyle={{}}
                            wrapperClass=''
                            visible={true}
                        />
                    </div>
                ) : (
                    <>
                        <h1 className='text-3xl font-light border-gray-600 my-2'>
                            All Projects
                        </h1>
                        <div className='grid grid-cols-1 gap-8 mt-6'>
                            {projectElements}
                        </div>
                    </>
                )}
            </section>
        </AnimatedPage>
    )
}
