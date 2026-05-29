import axios from 'axios';

const API_BASE = 'http://localhost:3000';

export const fetchWorkflow = async (owner = 'gdorogoy', repo = 'api-gateway',num=0) => {
  const { data } = await axios.get(`${API_BASE}/artifacts/${owner}/${repo}/${num}`);
  return data;
};


export const fetchAllWorkflows= async(owner = 'gdorogoy', repo = 'api-gateway') => {
  const { data } = await axios.get(`${API_BASE}/artifacts/${owner}/${repo}`);
  return data;
};