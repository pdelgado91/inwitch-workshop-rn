import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: `${process.env.EXPO_PUBLIC_BASE_URL}`,
  headers: {
    "Content-Type": "application/json",
    apikey: process.env.EXPO_PUBLIC_API_KEY,
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Error en la respuesta de la solicitud:", error);
    return Promise.reject(error);
  }
);

const AUTH_SERVICE_URL = process.env.EXPO_PUBLIC_API_AUTH_SERVICE
const USERNAME = process.env.EXPO_PUBLIC_AUTH_USER
const PASSWORD = process?.env?.EXPO_PUBLIC_AUTH_PASSWORD 
const HEADERS = {
	"Content-Type": "application/json",
}

export const getAccessToken = async () => {
	const body = {
		grant_type: 'password',
		username: USERNAME,
		password: PASSWORD,
		refresh_token: '<<token>>',
	}
	const response = await axiosInstance({
		method: 'POST',
		url: AUTH_SERVICE_URL,
		headers: HEADERS,
		data: body
	})
  return response?.data?.access_token;
};

export function getDarkColor() {
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += Math.floor(Math.random() * 10);
  }
  return color;
}