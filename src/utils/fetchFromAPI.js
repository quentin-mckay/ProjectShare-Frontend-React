// THIS FILE IS NOT USED IN THE FINAL VERSION

import axios from 'axios'

// const BASE_URL = 'https://youtube-v31.p.rapidapi.com'

const BASE_URL = 'http://127.0.0.1:5000'

const options = {
  url: BASE_URL,
  params: {
    maxResults: '50'
  },
  headers: {
    'X-RapidAPI-Key': import.meta.env.VITE_APP_RAPID_API_KEY,
    'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
  }
}

export const fetchFromAPI = async (url) => {
	// const { data } = await axios.get(`${BASE_URL}/${url}`, options)
	const response = await axios.get(`${BASE_URL}/${url}`)
	return response
}