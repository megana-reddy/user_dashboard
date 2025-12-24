// stores backend end points and avoids repeating url everywhere
const BASE_URL = "http://localhost:5000/api/users";

export const fetchUsers = async () => {
    const response = await fetch(BASE_URL); // sends GET request

    // handles HTTP errors (404, 500)
    if(!response.ok){
        throw new Error("Failed to fetch users");
    }

    return response.json(); // converts JSON -> JS object
};