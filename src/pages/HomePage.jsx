import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

// import axios from 'axios'
// import { fetchFromAPI } from "../utils/fetchFromAPI" // from javascriptmastery YouTube clone

import axios from '../api/axios'
import AnimatedPage from "../components/AnimatedPage"
import ProjectCard from "../components/ProjectCard"

export default function HomePage() {

	const [projects, setProjects] = useState([])

	useEffect(() => {
		
		const fetchUsers = async () => {
			
			try {
				const response = await axios.get('/projects')
				setProjects(response.data.reverse())
			} catch (error) {
				console.log(error)
			}
		}
		fetchUsers()
		
	}, [])

	const projectElements = projects.map(project => (
		<ProjectCard key={project.id} project={project} />
	))

	return (
		<AnimatedPage>
			<section className="max-w-3xl mx-auto">
			
				<h1 className="inline-block text-3xl font-light border-gray-600 my-2">All Projects</h1>
				{/* <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-4"> */}
				<div className="grid grid-cols-1 gap-8 mt-6">
					{projectElements}
				</div>
			
			</section>
		</AnimatedPage>
	)
}
