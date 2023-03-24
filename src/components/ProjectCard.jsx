import { Link } from 'react-router-dom'

const ProjectCard = ({ project, userID, handleDelete }) => {
    const { title, description, github_url, demo_url, image_url, tags } = project

    const shortDescription = description.split('. ')[0]
	
    return (
        // <div className="grid grid-rows-[1fr_3fr]">
        // 	<div>
        // 		{image_url?.length > 0 && <img className="w-full" src={image_url} alt="" />}
        // 	</div>
        // 	<div className="p-4 flex flex-col justify-between space rounded overflow-hidden shadow-lg bg-gray-200">
        // 		{/* <img className="w-full" src={image_url} alt="" /> */}
        // 		<div className="">
        // 			<div className="font-bold text-xl">{title}</div>
        // 			<p className="font-semibold">by {project.user.username}</p>
        // 			<p className="text-gray-700 text-base">
        // 			{description}
        // 			</p>
        // 		</div>
        // {tags.length > 0 && <div className="">
        // 	{tags.map(tag => (
        // 		// <p>{tag.name}</p>
        // 		<span key={tag.id} className="inline-block bg-gray-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{tag.name}</span>
        // 	))}
        // </div>}
        // 		{
        // 		// tags.length > 0 &&
        // 		// 		(<div className="bg-white shadow rounded p-4 mx-auto mt-4 max-w-2xl">
        // 		// 			{/* <h2 className="text-lg font-bold text-gray-800 mb-2">Tags</h2> */}
        // 		// 			<ul className="flex flex-wrap">
        // 		// 				{project.tags.map(tag => (
        // 		// 					<li key={tag.id} className="mr-2 mb-2">
        // 		// 						<a href="#" className="px-2 py-1 bg-gray-200 rounded text-gray-600 hover:bg-gray-300 transition-colors duration-300">
        // 		// 							{tag.name}
        // 		// 						</a>
        // 		// 					</li>
        // 		// 				))}
        // 		// 			</ul>
        // 		// 		</div>)
        // 		}
        // 		<Link
        // 			to={`/projects/${project.id}`}
        // 			className="inline-block px-4 py-2 rounded bg-gray-700 text-white text-center"
        // 		>
        // 			View Project
        // 		</Link>
        // 	</div>
        // </div>

        <div className='grid grid-cols-[4fr_2fr] bg-secondary-bg rounded-lg shadow-md overflow-hidden'>
            <div className='p-6 flex flex-col items-start'>
                {tags.length > 0 && (
                    <div className='mb-4'>
                        {tags.map((tag) => (
                            // <p>{tag.name}</p>
                            <Link to={`/tags/${tag.name}`} key={tag.id}>
                                <span className='inline-block border border-primary-accent rounded-full px-2 py-1 text-xs font-semibold text-primary-accent mr-2 mb-2 hover:bg-gray-300 transition-colors duration-250'>
                                    {tag.name}
                                </span>
                            </Link>
                        ))}
                    </div>
                )}

                <p className='text-3xl font-semibold'>{title}</p>

                <p className='mt-2 text-secondary-text'>{shortDescription}</p>

                <p className='mt-12'>
                    by{' '}
                    <Link to={`/users/${project.user.id}`} className='font-semibold'>
                        {project.user.username}
                    </Link>
                </p>

                <Link
                    to={`/projects/${project.id}`}
                    className='text-sm bg-primary-accent text-light-text px-3 py-2 rounded-md mt-3'
                >
                    <span>View Project</span>
                </Link>
                {userID && (
                    <>
                        <Link
                            to={`/edit-project/${project.id}`}
                            className='text-sm bg-orange-500 text-light-text px-3 py-2 rounded-md mt-3'
                        >
                            Edit Project
                        </Link>
                        <button 
							onClick={() => handleDelete(project.id)}
							className='text-sm bg-red-500 text-light-text px-3 py-2 rounded-md mt-3'>
                            Delete
                        </button>
                    </>
                )}
            </div>

            <div className=''>
                {image_url?.length > 0 && (
                    <img className='object-cover h-full' src={image_url} alt='' />
                )}
            </div>
        </div>
        // <div className="grid grid-cols-3">
        // 	<div>

        // 	</div>
        // 	<div className="">
        // 		<img src="" alt="" />
        // 	</div>
        // </div>

        // <div className="dark:bg-gray-800 dark:text-gray-50">
        // 	<div className="container grid grid-cols-12 mx-auto dark:bg-gray-900">
        // 		<div className="bg-no-repeat bg-cover dark:bg-gray-700 col-span-full lg:col-span-4" style="background-image: url('https://source.unsplash.com/random/640x480'); background-position: center center; background-blend-mode: multiply; background-size: cover;"></div>
        // 		<div className="flex flex-col p-6 col-span-full row-span-full lg:col-span-8 lg:p-10">
        // 			<div className="flex justify-start">
        // 				<span className="px-2 py-1 text-xs rounded-full dark:bg-violet-400 dark:text-gray-900">Label</span>
        // 			</div>
        // 			<h1 className="text-3xl font-semibold">Lorem ipsum dolor sit.</h1>
        // 			<p className="flex-1 pt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, reprehenderit adipisci tempore voluptas laborum quod.</p>
        // 			<a rel="noopener noreferrer" href="#" className="inline-flex items-center pt-2 pb-6 space-x-2 text-sm dark:text-violet-400">
        // 				<span>Read more</span>
        // 				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
        // 					<path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
        // 				</svg>
        // 			</a>
        // 			<div className="flex items-center justify-between pt-2">
        // 				<div className="flex space-x-2">
        // 					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 dark:text-gray-400">
        // 						<path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd"></path>
        // 					</svg>
        // 					<span className="self-center text-sm">by Leroy Jenkins</span>
        // 				</div>
        // 				<span className="text-xs">3 min read</span>
        // 			</div>
        // 		</div>
        // 	</div>
        // </div>
    )
}

export default ProjectCard
