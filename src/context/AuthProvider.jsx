import { createContext, useEffect, useState } from 'react'

const AuthContext = createContext()

import axios from '../api/axios'

export const AuthProvider = ({ children }) => {
	// const [authToken, setAuthToken] = useState(localStorage.getItem('token'))

	// const isAuthenticated = Boolean(token) 

	// const [auth, setAuth] = useState({
	// 	username: null,
	// 	isAuthenticated: false,
	// 	token: authToken,
	// 	setToken: (token) => {
	// 		localStorage.setItem('token', token)
	// 		setAuthToken(token)
	// 	},
	// 	clearToken: () => {
	// 		localStorage.removeItem('token')
	// 		setAuthToken(null)
	// 	}
	// })  
	const [auth, setAuth] = useState({
		username: null,
		userID: null,
		isAuthenticated: false,
		token: localStorage.getItem('token'),
	})  

	useEffect(() => {
		if (auth.token) {
			const getUser = async () => {

				// console.log(auth)

				try {
					const response = await axios.post(`/auth/token`, {}, {
						headers: { Authorization: `Bearer ${auth.token}`}
					})

					// console.log(response.data)

					const userID = response.data.id
					const username = response.data.username
					// setUser(response.data)
					setAuth(prevAuth => ({
						...prevAuth,
						username,
						userID,
						isAuthenticated: true
					}))
	
				} catch (err) {
					console.log('Auth provider error: ', err)
				}
			}
			getUser()
		}
	}, [])


	// {
	// 	token: null,
	// 	isAuthenticated: false,
	// 	setToken: () => {},
	// 	clearToken: () => {}
	// }

	return (
		<AuthContext.Provider value={{ auth, setAuth }}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthContext