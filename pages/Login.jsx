import { useState, useEffect, useRef, useContext } from "react"
import AuthContext from "../context/AuthProvider"

const Login = () =>  {
	const { setAuth } = useContext(AuthContext) // only need `setAuth` in the Login, not `auth`

	const usernameRef = useRef()
	const errRef = useRef()

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	
	const [errMsg, setErrMsg] = useState('')
	const [success, setSuccess] = useState(false)

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
		console.log(username, password)
		setUsername('')
		setPassword('')
		setSuccess(true)
	}
	
	return (
		<section>
			<p ref={errRef}>{errMsg}</p>
			<h1>Sign In</h1>
			<form onSubmit={handleSubmit}>
				<label htmlFor="username">Username: </label>
				<input 
					type="text" 
					id="username"
					ref={usernameRef}
					autoComplete='off'
					onChange={(e) => setUsername(e.target.value)}
					value={username}
					required
					placeholder="Username"
				/>
				<label htmlFor="password">Password: </label>
				<input 
					type="password" 
					id="password"
					onChange={(e) => setPassword(e.target.value)}
					value={password}
					required
					placeholder="Password"
				/>
				<button>Sign In</button>
			</form>

		</section>
	)
}

export default Login