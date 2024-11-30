// src/services/authService.js
const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;                // Define our signin method. This is our Express API url.

const signup = async (formData) => {
try {
    const res = await fetch(`${BACKEND_URL}/users/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),                                      // JSON.stringify(formData) converts the JavaScript object formData into a JSON string.
    });
    const json = await res.json();
    console.log(json);

    if (json.err) {
        throw new Error(json.err);
    }

    if (json.token) {
        localStorage.setItem('token', json.token);                         // This line is to store the JWT token in localStorage.
        const user = JSON.parse(atob(json.token.split('.')[1]));
        console.log(user);
        return user;
    }

} catch (err) {
    console.log(err);
    throw err;
}
}

const signin = async (user) => {
    try {
        const res = await fetch(`${BACKEND_URL}/users/signin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        })
        const json = await res.json();
        console.log(json);

        if (json.error) {
            throw new Error(json.error);
        }
        if (json.token) {
            localStorage.setItem('token', json.token);                         // This line is to store the JWT token in localStorage. The first item is the name of the item, and then the second is what data we're saving to it(`value-of-item`).  
            const user = JSON.parse(atob(json.token.split('.')[1]));
            console.log(user);
            return user;
        }
    } catch (err) {
        console.log(err);
        throw err;
    }
}

const getUser = () => {                                                       // This function will check `localStorage` for a token. If one does not exist, `null` will be returned. If one does exist and it has a user, the `getUser` function will return that user. 
    const token = localStorage.getItem('token');
    if (!token) return null;
    const user = JSON.parse(atob(token.split('.')[1]));
    return user;
    console.log(user);
}

const signout = () => {                                                       // Method to signOut users.
    localStorage.removeItem('token');
}

export {
    signup,
    signin,
    getUser,
    signout
};