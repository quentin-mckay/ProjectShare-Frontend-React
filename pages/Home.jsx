import { useEffect, useState } from "react"
import { fetchFromAPI } from "../utils/fetchFromAPI"


import axios from 'axios'
axios.defaults.baseURL = 'https://127.0.0.1/5000';


export default function Home() {

	const [projects, setProjects] = useState([])

	useEffect(() => {
		fetchFromAPI(`users`)
		.then(response => {
			console.log(response.data)
			setProjects(response.data)
		})

		// const fetchUsers = async () => {
		// 	const response = await fetch('http://www.google.com/')
		// 	const result = await response.text()
		// 	console.log(result)
		// }

		// fetchUsers()
		
	}, [])

	const projectElements = projects.map(project => (
		<pre>{JSON.stringify(project, null, 2)}</pre>
	))

	return (
		<section>
			{projectElements}
		</section>
	)
}
