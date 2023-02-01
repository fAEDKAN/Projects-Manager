import axios from "axios";

//baseURL nos lo provée axios, y para traerlo se debe usar import.meta.env.NOMBRE DE LA VAR DE ENTORNO
export const clientAxios = axios.create({
    baseURL: `${import.meta.env.VITE_URL_BACKEND}`,
});
