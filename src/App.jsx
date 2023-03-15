import { useState, useContext } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { 
	HomePage, 
	LoginPage, 
	RegisterPage, 
	ProjectPage, 
	CreateProjectPage, 
	EditProjectPage,
	UserPage,
	TagPage
} from './pages'

import AuthContext from "./context/AuthProvider"

import logo from './assets/logo1.png'

export default function App() {

	const { auth, setAuth } = useContext(AuthContext)

	const handleLogout = () => {
		localStorage.removeItem('token')
		setAuth({
			username: null,
			userID: null,
			token: null,
			isAuthenticated: false
		})
	}


	return (
		<div className="h-screen bg-primary-bg text-primary-text grid grid-rows-[auto_1fr]">
		{/* <div className="bg-primary text-primary grid grid-rows-[auto-1fr]"> */}

			<header className='p-4 flex justify-between items-center bg-primary-bg text-primary-text'>

				<Link to='/' className='flex items-center gap-2'>
					<img src={logo} className='w-8 h-8'	alt="" />
					<h1 className='text-2xl font-bold'>
						ProjectShare
					</h1>
				</Link>

			
				<Link to={`/users/${auth.userID}`}>
					<p>{auth.username}</p>
				</Link>

				<p>{auth.isAuthenticated ? 'True' : 'False'}</p>

				<nav className='text-sm '>
					{/* {auth.isAuthenticated ? ( */}
						<>
							<button 
								onClick={handleLogout}
								className='px-4 py-2'
							>
								Logout
							</button>
							<Link to='/create-project' element={<CreateProjectPage/>} className='px-4 py-2 border border-gray-500 rounded'>
								Add Project
							</Link>
						</>
					{/* ) : (  */}
						<>
							<Link to='/login' className='px-4 py-2'>
								Log In
							</Link>
							<Link to='/register' className='px-4 py-2 border border-gray-500 rounded'>
								Sign Up
							</Link>
						</>
					{/* )} */}
				</nav>
			</header>

			<main className='max-w-7xl p-6'>
				<Routes>
					<Route path='/' element={<HomePage/>} />
					<Route path="/projects/:projectId" element={<ProjectPage />} />

					<Route path="/create-project" element={<CreateProjectPage />} />
          			<Route path="/edit-project/:projectId" element={<EditProjectPage />} />
					
					<Route path='/register' element={<RegisterPage/>} />
					<Route path='/login' element={<LoginPage/>} />

					<Route path='/users/:userID' element={<UserPage />} />
					<Route path='/tags/:tagName' element={<TagPage />} />
				</Routes>
			</main>
		</div>
	)
}

