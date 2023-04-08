import { useState, useEffect, useRef, useContext } from "react"
import AuthContext from "../context/AuthProvider"

import axios from '../api/axios'
import { useNavigate } from "react-router-dom"
import AnimatedPage from "../components/AnimatedPage"
// const LOGIN_URL = '/auth'

const RegisterPage = () =>  {
	const { auth, setAuth } = useContext(AuthContext) // only need `setAuth` in the Login, not `auth`

	const usernameRef = useRef()
	const errRef = useRef()

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	
	const [errMsg, setErrMsg] = useState('')
	const [success, setSuccess] = useState(false)

	const navigate = useNavigate()

	// focus the username field when component loads
	useEffect(() => {
		usernameRef.current.focus()
	}, [])

	// clear error message when user starts entering username or password
	useEffect(() => {
		setErrMsg('')
	}, [username, password])

	const handleSubmit = async (event) => {
		event.preventDefault()

		try {

			const response = await axios.post('/auth/register', {username, password})
			
			console.log(response?.data)

			const token = response?.data?.token
			const userID = response?.data?.id
			// const roles = response?.data?.roles // an array of roles (number assigned different roles on backend)

			console.log(`userID: ${userID}`)

			if (token) {

				console.log('token received')

				setAuth({ username, userID, token, isAuthenticated: true }) // saved in global AuthContext
				localStorage.setItem('token', token)

			}
			else {
				console.log('no token received')
			}

			navigate('/')

			// setUsername('')
			// setPassword('')
			// setSuccess(true)

		} catch (error) {
			if (!error.response) {
				setErrMsg('No Server Response')
			} else if (error.response.status === 400) { // Bad Request
				setErrMsg('Missing username or password')
			} else if (error.response.status === 401) { // Unauthorized
				setErrMsg('Unauthorized')
			} else {
				setErrMsg('Login Failed')
			}

			errRef.current.focus() // so screen reader can read info (aria-live attribute and set to 'assertive')
		}

		// unlike fetch, axios throws an error if there's an error 
			// (we don't need to check if the response is OK)
			// (we also don't have to convert the response to JSON with response.json())

			// const response = await axios.post('/auth/test', 
			// 	JSON.stringify({username, password}),
			// 	{
			// 		headers: { 'Content-Type': 'application/json' },
			// 		// withCredentials: true
			// 	}
			// )
		
	}
	
	return (
		<AnimatedPage>
			<section className="max-w-lg mx-auto">
				<h1 className="text-3xl font-light text-center mt-[16vh]">Sign Up</h1>
				<form onSubmit={handleSubmit} className="mt-8 bg-secondary-bg p-6 rounded-xl shadow-md flex flex-col gap-6">
					<div className="">
						{/* <label htmlFor="username" className="input-label">Username: </label> */}
						<input
							type="text"
							id="username"
							ref={usernameRef}
							autoComplete='off'
							onChange={(e) => setUsername(e.target.value)}
							value={username}
							required
							placeholder="Username"
							className="input-field"
						/>
					</div>
					<div className="">
						{/* <label htmlFor="password" className="input-label">Password: </label> */}
						<input
							type="password"
							id="password"
							onChange={(e) => setPassword(e.target.value)}
							value={password}
							required
							placeholder="Password"
							className="input-field"
						/>
					</div>
					<button className="w-full px-5 py-2.5 bg-primary-accent bg-opacity-90 text-light-text rounded hover:bg-opacity-100">
						Sign Up
					</button>
					{errMsg && <p ref={errRef} className="bg-red-200 px-4 py-2 rounded">{errMsg}</p>}
				</form>
			</section>
		</AnimatedPage>
	)
}

export default RegisterPage