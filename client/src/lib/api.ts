import axios, { type AxiosRequestConfig } from "axios"
import { env } from "./env";

let tokenGetter: (() => Promise<string | null>) | null = null

export function setApiTokenGetter(getter: () => Promise<string | null>) {
    tokenGetter = getter
}

const api = axios.create({
    baseURL: env.backendUrl,
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: false,

})


api.interceptors.request.use(async (config) => {
    if (!tokenGetter) return config

    const token = await tokenGetter()

    if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

// export async function getApi<T>(url:string,config?:AxiosRequestConfig){
//     try {
//         const reponse=await api.get
//     } catch (error) {
        
//     }
// }




















