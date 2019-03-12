import axios from 'axios';

const callApi = async (credential, url, call) => {
  try {
    const response = await axios({
      method: call,
      url: `https://express-training.herokuapp.com/api/${url}`,
      data: {
        email: credential.emailAddress,
        password: credential.password,
      },
    });

    return response;
  } catch (err) {
    return (err);
  }
};
export default callApi;
