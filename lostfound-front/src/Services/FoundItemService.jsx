import axios from 'axios';

const FOUND_URL = 'http://localhost:9595/lostfound/found';
const ID_URL = 'http://localhost:9595/lostfound/found-id';
const USR_URL = 'http://localhost:9595/lostfound/found-user';
const SEARCH_URL = 'http://localhost:9595/lostfound/found-id';

// @PostMapping("/found")
export const saveFoundItem = (foundItem) => {
    return axios.post(FOUND_URL, foundItem, {
        withCredentials: true
    });
}

// @GetMapping("/found")
export const getAllFoundItems = () => {
    return axios.get(FOUND_URL, {
        withCredentials: true
    });
}

// @PutMapping("/found/{foundItemId}")
export const updateFoundItem = (foundItemId, foundItem) => {
    return axios.put(`${FOUND_URL}/${foundItemId}`, foundItem, {
        withCredentials: true
    });
}

// @GetMapping("/found/{foundItemId}")
export const getFoundItemById = (foundItemId) => {
    return axios.get(`${FOUND_URL}/${foundItemId}`, {
        withCredentials: true
    });
}

// @DeleteMapping("/found/{foundItemId}")
export const deleteFoundItemById = (foundItemId) => {
    return axios.delete(`${FOUND_URL}/${foundItemId}`, {
        withCredentials: true
    });
}

// @GetMapping("/found-id")
export const generateFoundItemId = () => {
    return axios.get(ID_URL, {
        withCredentials: true
    });
}

// @GetMapping("/found-user")
export const getFoundItemsByUsername = () => {
    return axios.get(USR_URL, {
        withCredentials: true
    });
}

export const getFoundItemsByLostItem = (id) => {
    return axios.get(`${SEARCH_URL}/${id}`, {
        withCredentials: true
    });
}
