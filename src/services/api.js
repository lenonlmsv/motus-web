import axios from "axios";
import { getToken } from "./auth";

require("dotenv").config();

const api = axios.create({
	baseURL: "http://localhost:8000/",
});

<<<<<<< HEAD
//api.defaults.headers.post['Content-Type'] = 'application/json';
=======
api.defaults.headers.post["Content-Type"] = "application/json";
>>>>>>> 3bbfeda693b61fa8da470b925c54b6a099058aa6

api.interceptors.request.use(async (config) => {
	const token = getToken();
	if (token) {
		console.log("Tem token");
		config.headers.Authorization = `Bearer ${token}`;
	} else {
		console.log("Não tem token");
	}
	return config;
});

export default api;
