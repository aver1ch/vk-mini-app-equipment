import axios from 'axios';

export const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_DOMAIN_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `VK ${btoa(window.location.search)}`
  }
})

instance.interceptors.response.use(
    response => {
        console.log(response.data);
      return response.data
    },
    error => {
      return Promise.reject(error)
    }
)