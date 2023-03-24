import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import axios from '../api/axios'
import AnimatedPage from "../components/AnimatedPage"

import ProjectCard from "../components/ProjectCard"

import AuthContext from '../context/AuthProvider'

const UserPage = () => {

	const { userID } = useParams()

	const { auth } = useContext(AuthContext)

	const [user, setUser] = useState(null)
	const [projects, setProjects] = useState(null)

	const handleDelete = async (projectID) => {

		// console.log(projectID)
		
		try {
			const response = await axios.post(`/projects/${projectID}`, {msg: 'hello'}, {
                headers: { Authorization: `Bearer ${auth.token}` },
            })
			console.log(response.data)
			getUserProjects()
		} catch (err) {
			// console.log(err)
		}
	}

	const getUserProjects = async () => {

		try {
			const response = await axios.get(`/users/${userID}/projects`)
			// console.log(response.data)
			setProjects(response.data)

		} catch (err) {
			console.log(err)
		}
	}

	useEffect(() => {
		const getUser = async () => {

			try {
				const response = await axios.get(`/users/${userID}`) // get the user by route userID param
				// console.log(response.data)
				setUser(response.data)

			} catch (err) {
				console.log(err)
			}
		}
		getUser()


		
		getUserProjects()

	}, [])


	const projectElements = projects?.map(project => (
		<ProjectCard key={project.id} project={project} userID={userID} handleDelete={handleDelete}/>
	))

	
	return (
		<AnimatedPage>
			<div className="max-w-3xl mx-auto">
				{user && <h1>User: {user.username}</h1>}
				<h1 className="text-3xl font-bold">Projects</h1>
				{/* <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-4"> */}
				<div className="grid gap-4 3 mt-4">
					{projectElements}
				</div>
			</div>
		</AnimatedPage>
	)
}

export default UserPage