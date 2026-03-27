import axios from 'axios';
const LOST_URL='http://localhost:9595/lostfound/lost';
const ID_URL='http://localhost:9595/lostfound/lost-id';
const USR_URL='http://localhost:9595/lostfound/lost-user';

//@PostMapping("/lost")
	export const saveLostItem =  (lostItem) => {
		
		return axios.post(LOST_URL, lostItem, {
            withCredentials: true
         });
	}

	//@GetMapping("/lost")
	export const getAllLostItems = () => {
		return axios.get(LOST_URL, {
            withCredentials: true
         });
	}

//putmapping for update
export const updateLostItem = (lostItemId, lostItem) => {
    return axios.put(`${LOST_URL}/${lostItemId}`, lostItem, {
        withCredentials: true
    });
}

	//@GetMapping("/lost/{lostItemId}")
	export const getLostItemById = (lostItemId) => {
		return axios.get(`${LOST_URL}/${lostItemId}`, {
            withCredentials: true
         });
	}

	//@DeleteMapping("/lost/{lostItemId}")
	export const deleteLostItemById = (lostItemId) => {
		// TODO Auto-generated method stub
		return axios.delete(`${LOST_URL}/${lostItemId}`, {
            withCredentials: true
         });
	}

	//@GetMapping("/lost-id")
	export const generateLostItemId = () => {
		// TODO Auto-generated method stub
		//service class will generate the id
		return axios.get(ID_URL, {
            withCredentials: true
         });
	}

	//@GetMapping("/lost-user") 
	export const getLostItemsByUsername = () => {
		// TODO Auto-generated method stub
		return axios.get(USR_URL, {
            withCredentials: true
         });
	}
	