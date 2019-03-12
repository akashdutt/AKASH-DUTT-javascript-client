import axios from 'axios';

const callApi = async (credential, url, call) => {
  const { skip, limit } = credential;
  try {
    const response = await axios({
      method: call,
      baseURL: 'https://express-training.herokuapp.com/api',
      url,
      data: credential,
      params: {
        limit: limit || 10,
        skip: skip || 0,
      },
      headers: { Authorization: localStorage.getItem('loginToken') },
    });

    return response;
  } catch (err) {
    return (err);
  }
};
export default callApi;
