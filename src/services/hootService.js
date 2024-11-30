// src/services/hootService.js

const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/hoots`;

const index = async () => {
    try {
        const res = await fetch(BASE_URL, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}`},         // The headers property is an object containing any headers that need to be sent along with the request.
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
}


export { index };