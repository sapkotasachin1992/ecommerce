//by this way you can use env in multiple places 
export const env = {
    backendUrl: import.meta.env.VITE_BACKEND_URL ?? "http://localhost:5000"
}