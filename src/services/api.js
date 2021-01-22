import axios from "axios";
import { getToken } from "./auth";
import { login } from "./auth";

require("dotenv").config();

const api = axios.create({
	//baseURL: process.env.REACT_APP_API_ENDPOINT
	//baseURL: "http://localhost:8000/",
	baseURL: "http://ec2-23-22-2-171.compute-1.amazonaws.com:8000/",
});

export const APILogin = (json) => {
	api.defaults.headers.post["Content-Type"] = "application/json";

	api.post("/api/service/login", json).then((response) => {
		const string = response.data.split(" ");
		const token = string[1]; //Get token
		login(token); //Store token
	});
};

api.interceptors.request.use(async (config) => {
	const token = getToken();
	if (token) {
		////console.log("Tem token");
		config.headers.Authorization = `Bearer ${token}`;
	} else {
		////console.log("Não tem token");
	}
	return config;
});

export default api;
