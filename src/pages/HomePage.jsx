import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

// import axios from 'axios'
// import { fetchFromAPI } from "../utils/fetchFromAPI" // from javascriptmastery YouTube clone

import axios from '../api/axios'
import AnimatedPage from "../components/AnimatedPage"
import ProjectCard from "../components/ProjectCard"

import Loader from "../components/Loader"

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

	const projectElements = projects.map(project => (
		<ProjectCard key={project.id} project={project} />
	))

	return (
		<AnimatedPage>
			<section className="max-w-3xl mx-auto w-">
			
				<h1 className="inline-block text-3xl font-light border-gray-600 my-2">All Projects</h1>
				{/* <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-4"> */}
				{loadingProjects ? (
					<div className="mt-48 flex justify-center">
						<div className="w-48 h-48">
							<Loader w='48' h='48'/>
						</div>
					</div>
				) :
				(<div className="grid grid-cols-1 gap-8 mt-6">
					{projectElements}
				</div>)}
			
			</section>
		</AnimatedPage>
	)
}
