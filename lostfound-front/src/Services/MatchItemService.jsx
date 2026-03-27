import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';

const MATCH_URL = "http://localhost:9595/lostfound/match";

// save match
export const saveMatchItem = (matchItem) => {
  return axios.post(MATCH_URL, matchItem, {
    withCredentials: true
  });
};

// get all matches
export const getAllMatches = () => {
  return axios.get(MATCH_URL, {
    withCredentials: true
  });
};

// get matches by lost item id
export const getMatchByLostItem = (lostItemId) => {
  return axios.get(`${MATCH_URL}/${lostItemId}`, {
    withCredentials: true
  });
};