import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

// import axios from 'axios'
// import { fetchFromAPI } from "../utils/fetchFromAPI" // from javascriptmastery YouTube clone

import axios from '../api/axios'
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

	// let projectElements = projects.map(project => (
	// 	// JSON.stringify() converts a JavaScript object into a string
	// 	<div key={project.id} className='border border-purple-400 rounded'>

	// 		{project.image_url && <img src={project.image_url} className="w-64 h-64"/>}
			
	// 		<p className="">
	// 			{JSON.stringify(project, null, 2)}
	// 		</p> 

	// 		<Link 
	// 			to={`/project/${project.id}`}
	// 			className="inline-block px-4 py-2 rounded bg-gray-800 text-white"
	// 		>
	// 			View Project
	// 		</Link>
	// 	</div>
	// ))

	const projectElements = projects.map(project => (
		<ProjectCard key={project.id} project={project} />
	))

	return (
		<section className="max-w-3xl mx-auto">
			
			<h1 className="text-3xl font-bold text-center">All Projects</h1>
			{/* <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-4"> */}
			<div className="grid grid-cols-1 gap-6 mt-4">
				{projectElements}
			</div>
			
		</section>
	)
}
