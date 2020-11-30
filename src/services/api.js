import axios from "axios";
import { getToken } from "./auth";

require("dotenv").config();

const api = axios.create({
	baseURL: "http://localhost:8000/",
});

//api.defaults.headers.post['Content-Type'] = 'application/json';

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
