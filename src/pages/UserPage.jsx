import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import axios from '../api/axios'

import ProjectCard from "../components/ProjectCard"



const UserPage = () => {

	const { userID } = useParams()

	const [user, setUser] = useState(null)
	const [projects, setProjects] = useState(null)

	useEffect(() => {
		const getUser = async () => {

			try {
				const response = await axios.get(`/users/${userID}`)
				console.log(response.data)
				setUser(response.data)

			} catch (err) {
				console.log(err)
			}
		}
		getUser()


		const getUserProjects = async () => {

			try {
				const response = await axios.get(`/users/${userID}/projects`)
				console.log(response.data)
				setProjects(response.data)

			} catch (err) {
				console.log(err)
			}
		}
		getUserProjects()

	}, [])


	const projectElements = projects?.map(project => (
		<ProjectCard key={project.id} project={project} />
	))

	
	return (
		<div>
			{user && <h1>User: {user.username}</h1>}

			<h1 className="text-3xl font-bold">Projects</h1>
			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-4">
				{projectElements}
			</div>
		</div>
	)
}

export default UserPage