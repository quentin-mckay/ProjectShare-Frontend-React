import { useState, useContext } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
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

import { motion, AnimatePresence } from 'framer-motion'


const pageTransition = {
	duration: 0.5,
	ease: "easeInOut"
};
  



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

	const location = useLocation()

	return (
		<div className="h-screen bg-primary-bg text-primary-text grid grid-rows-[auto_1fr]">
		{/* <div className="bg-primary text-primary grid grid-rows-[auto-1fr]"> */}

			<header className='p-4 flex justify-between items-center bg-primary-bg text-primary-text shadow'>

				<Link to='/' className='flex items-center gap-2'>
					<img src={logo} className='w-8 h-8'	alt="" />
					<h1 className='text-2xl font-semibold'>
						ProjectShare
					</h1>
				</Link>

			
				

				{/* <p>{auth.isAuthenticated ? 'True' : 'False'}</p> */}

				<nav className='flex gap-2 text-sm'>
					{auth.isAuthenticated ? (
						<>
							<button 
								onClick={handleLogout}
								className='px-4 py-2'
							>
								Logout
							</button>
							<Link to='/create-project' element={<CreateProjectPage/>} className='px-4 py-2 bg-primary-accent text-white rounded-md'>
								Add Project
							</Link>
						</>
					) : ( 
						<>
							<Link to='/login' className='px-4 py-2 border border-primary-accent rounded-md text-primary-accent'>
								Log In
							</Link>
							<Link to='/register' className='px-4 py-2 border bg-primary-accent text-white rounded-md'>
								Sign Up
							</Link>
						</>
					)} 
					{auth.isAuthenticated && <Link to={`/users/${auth.userID}`} className='px-4 py-2 ml-2 border border-gray-500 rounded-full font-bold'>
						{auth.username}
					</Link>}
				</nav>
			</header>

			<main className='max-w-7xl p-6'>
				<AnimatePresence mode="wait">
					<Routes key={location.pathname} location={location}>
						<Route path='/' element={<HomePage/>} />
						<Route path="/projects/:projectId" element={<ProjectPage />} />
						<Route path="/create-project" element={<CreateProjectPage />} />
						<Route path="/edit-project/:projectID" element={<EditProjectPage />} />
					
						<Route path='/register' element={<RegisterPage/>} />
						<Route path='/login' element={<LoginPage/>} />
						<Route path='/users/:userID' element={<UserPage />} />
						<Route path='/tags/:tagName' element={<TagPage />} />
					</Routes>
				</AnimatePresence>
			</main>
		</div>
	)
}

