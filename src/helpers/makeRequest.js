import { instance } from './../api/axios';

export const makeRequest = async (method, url, params) => {
  try {
    const response = await instance({
      method: method,
      url: url,
      data: params
    })

    return response.data
  } catch (e) {
    return Promise.reject(e)
  }
}

