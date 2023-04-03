import { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import axios from '../api/axios'
import AnimatedPage from '../components/AnimatedPage'
import AuthContext from '../context/AuthProvider'
//
function ProjectPage() {
    const [project, setProject] = useState(null)
    const [comments, setComments] = useState([])
    const [commentMessage, setCommentMessage] = useState('')

    const { auth } = useContext(AuthContext)

    const { projectId } = useParams()

    useEffect(() => {
        const getProject = async () => {
            try {
                const response = await axios.get(`/projects/${projectId}`)
                setProject(response.data)

                console.log(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        getProject()

        const getComments = async () => {
            try {
                const response = await axios.get(`/projects/${projectId}/comments`)
                setComments(response.data.reverse())
            } catch (error) {
                console.log(error)
            }
        }
        getComments()
    }, [projectId])

    const handleCommentSubmit = async (event) => {
        event.preventDefault()

        try {
            const response = await axios.post(
                `/projects/${projectId}/comments`,
                { message: commentMessage },
                {
                    headers: { Authorization: `Bearer ${auth.token}` },
                }
            )

            setComments((prevComments) => [response.data.comment, ...prevComments])
            setCommentMessage('')
            // console.log(comments)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <AnimatedPage>
            <div>
                {project ? (
                    <section>
                        {/* IMAGE */}
                        {project.image_url?.length > 0 && (
                            <div className='bg-white shadow rounded p-4 mx-auto max-w-2xl'>
                                <img
                                    src={project.image_url}
                                    alt='Project Image'
                                    className='w-full h-64 object-cover object-center rounded'
                                />
                            </div>
                        )}
                        {/* TITLE AND USERNAME */}
                        <div className='bg-white shadow rounded p-4 mx-auto mt-4 max-w-2xl'>
                            <h1 className='text-3xl font-bold text-gray-800 mb-2'>{project.title}</h1>
                            <p className='text-gray-500'>by {project.user.username}</p>
                        </div>

                        <p>{project.description}</p>

                        {/* LINKS TO GITHUB AND DEMO */}
                        <div className='bg-white shadow rounded p-4 mx-auto mt-4 max-w-2xl'>
                            <a href={project.github_url} className='text-blue-500 underline mr-4'>
                                GitHub Repository
                            </a>
                            {project.demo_url?.length !== 0 && (
                                <a href={project.demo_url} className='text-blue-500 underline'>
                                    Demo
                                </a>
                            )}
                        </div>
                        {/* TAGS (check if tags is not empty) */}
                        {project.tags.length > 0 && (
                            <div className='bg-white shadow rounded p-4 mx-auto mt-4 max-w-2xl'>
                                {/* <h2 className="text-lg font-bold text-gray-800 mb-2">Tags</h2> */}
                                <ul className='flex flex-wrap'>
                                    {project.tags.map((tag) => (
                                        <Link
                                            to={`/tags/${tag.name}`}
                                            key={tag.id}
                                            className='mr-2 mb-2 px-2 py-1 bg-gray-200 rounded text-gray-600 hover:bg-gray-300 transition-colors duration-300'
                                        >
                                            {tag.name}
                                        </Link>
                                    ))}
                                </ul>
                            </div>
                        )}
                        {/* <!-- Comments Section --> */}
                        <div className='bg-white shadow rounded p-4 mx-auto mt-4 max-w-2xl'>
                            {/* <h2 className="text-lg font-bold text-gray-800 mb-2">Comments</h2> */}
                            <form className='mb-4' onSubmit={handleCommentSubmit}>
                                <div className='flex flex-col mb-4'>
                                    <label className='mb-2 font-bold text-gray-800' htmlFor='comment'>
                                        Comment
                                    </label>
                                    <textarea
                                        id='comment'
                                        name='comment'
                                        rows='3'
                                        placeholder='Enter your comment here...'
                                        className='px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent'
                                        value={commentMessage}
                                        onChange={(e) => setCommentMessage(e.target.value)}
                                    ></textarea>
                                </div>
                                <button
                                    type='submit'
                                    className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300'
                                >
                                    Post Comment
                                </button>
                            </form>
                            {/* COMMENTS LIST */}
                            {comments.map((comment) => (
                                <div key={comment.id} className='border-t border-gray-200 pt-4'>
                                    <div className='flex items-center'>
                                        <div>
                                            <h3 className='font-bold text-gray-800'>
                                                {comment.user.username}
                                            </h3>
                                            {/* <p className="text-gray-500 text-sm">3 hours ago</p> */}
                                        </div>
                                    </div>
                                    <p className='mt-2 text-gray-800'>{comment.message}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </AnimatedPage>
    )
}





export default ProjectPage

// function PostPage() {
// 	const [post, setPost] = useState(null);
// 	const [comments, setComments] = useState([]);
// 	const [commentText, setCommentText] = useState('');
// 	const auth = React.useContext(AuthContext);
// 	const { postId } = useParams();

// 	useEffect(() => {
// 	  // Fetch the post data
// 	  axios.get(`${API_BASE_URL}/posts/${postId}`).then((response) => {
// 		setPost(response.data);
// 	  });

// 	  // Fetch the comments data
// 	  axios.get(`${API_BASE_URL}/posts/${postId}/comments`).then((response) => {
// 		setComments(response.data);
// 	  });
// 	}, [postId]);

// 	const handleCommentSubmit = (event) => {
// 	  event.preventDefault();
// 	  axios
// 		.post(
// 		  `${API_BASE_URL}/posts/${postId}/comments`,
// 		  { text: commentText },
// 		  { headers: { Authorization: `Bearer ${auth.token}` } }
// 		)
// 		.then((response) => {
// 		  setComments([...comments, response.data]);
// 		  setCommentText('');
// 		});
// 	};

// 	return (
// 	  <div classNameName="post-page">
// 		{post ? (
// 		  <>
// 			<h2>{post.title}</h2>
// 			<p>{post.content}</p>
// 			{auth.isAuthenticated && (
// 			  <form onSubmit={handleCommentSubmit}>
// 				<label>
// 				  Comment:
// 				  <input type="text" value={commentText} onChange={(event) => setCommentText(event.target.value)} />
// 				</label>
// 				<button type="submit">Submit</button>
// 			  </form>
// 			)}
// 			<h3>Comments</h3>
// 			<ul>
// 			  {comments.map((comment) => (
// 				<li key={comment.id}>{comment.text}</li>
// 			  ))}
// 			</ul>
// 		  </>
// 		) : (
// 		  <p>Loading...</p>
// 		)}
// 	  </div>
// 	);
//   }
