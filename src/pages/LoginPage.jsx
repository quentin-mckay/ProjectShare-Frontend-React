import { useState, useEffect, useRef, useContext } from "react"
import AuthContext from "../context/AuthProvider"

import axios from '../api/axios'
import { useNavigate } from "react-router-dom"
// const LOGIN_URL = '/auth'

const LoginPage = () =>  {
	const { setAuth } = useContext(AuthContext) // only need `setAuth` in the Login, not `auth`

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

			const response = await axios.post('/auth/login', {username, password})
			
			console.log(response?.data)

			const token = response?.data?.token // 'access_token' name set by Flask
			const userID = response?.data?.id
			// const roles = response?.data?.roles // an array of roles (number assigned different roles on backend)

			if (token) {

				setAuth({ username, token, userID, isAuthenticated: true }) // saved in global AuthContext
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
	}
	
	return (
		<section className="max-w-lg mx-auto">
			<p ref={errRef}>{errMsg}</p>

			<h1 className="text-3xl font-bold text-center">Log In</h1>

			<form onSubmit={handleSubmit}>
				<div className="mt-4">
					<label htmlFor="username" className="input-label">Username: </label>
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

				<div className="mt-4">
					<label htmlFor="password" className="input-label">Password: </label>
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

				<button className="px-4 py-2 mt-4 bg-green-200 bg-opacity-50 border border-gray-400 rounded hover:bg-opacity-100">
					Log In
				</button>
			</form>

		</section>
	)
}

export default LoginPage