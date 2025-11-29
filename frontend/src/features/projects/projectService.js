import axios from 'axios';

const API_URL = 'http://localhost:5001/api/projects/';

const getToken = (getState) => {
  const { auth } = getState();
  return auth.user?.token;
};

const getProjects = async (thunkAPI) => {
  const token = getToken(thunkAPI.getState);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

const projectService = {
  getProjects,
};

export default projectService;