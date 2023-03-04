import { Routes, Route, Link } from 'react-router-dom'
import { Home, Login } from '../pages'

export default function App() {
	return (
		<div className="h-screen bg-gray-200 grid-rows-[auto-1fr]">
			<header className='p-4 flex justify-between bg-blue-200'>
				<Link to='/'>
					ProjectShare
				</Link>

				<nav>
					<Link to='/auth/login' className='px-4 py-2'>
						Log In
					</Link>
					<Link className='px-4 py-2 border border-gray-500 rounded'>
						Sign Up
					</Link>
				</nav>
			</header>

			<main>
				<Routes>
					<Route path='/' element={<Home/>} />
					<Route path='/auth/login' element={<Login/>} />
					
				</Routes>
			</main>
		</div>
	)
}

