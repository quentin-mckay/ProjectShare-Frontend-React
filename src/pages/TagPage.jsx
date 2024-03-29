import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import axios from '../api/axios'
import AnimatedPage from '../components/AnimatedPage'
import ProjectCard from '../components/ProjectCard'


const TagPage = () => {

	const [projects, setProjects] = useState([])

	const { tagName } = useParams()

	useEffect(() => {
		const fetchProjectsByTag = async () => {
			
			try {
				const response = await axios.get('/projects/tag', {
					params: {
						tag: tagName
					}
				})
				setProjects(response.data)
				// console.log(response.data)
			} catch (error) {
				console.log(error)
			}
		}
		fetchProjectsByTag()
	}, [])

	const projectElements = projects.map(project => (
		<ProjectCard key={project.id} project={project} />
	))

	return (
		<AnimatedPage>
			<section className="max-w-3xl mx-auto">
				<h1 className='inline-block text-3xl font-light border-gray-600 my-2'>
					Tag: {tagName}
				</h1>
				<div className="grid grid-cols-1 gap-6 mt-6">
					{projectElements}
				</div>
			</section>
		</AnimatedPage>
	)
}

export default TagPage