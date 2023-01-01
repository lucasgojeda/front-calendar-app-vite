

export const getEnvironmets = () => {

    return {
        VITE_REACT_APP_API_URL: import.meta.env.VITE_REACT_APP_API_URL,
        VITE_MODE: import.meta.env.VITE_MODE,
    }
} 