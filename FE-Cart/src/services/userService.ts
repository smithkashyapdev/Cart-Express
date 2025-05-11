import { User } from "../model/user";


const USERS_KEY = "users";
const LOGGED_IN_USER_KEY = "loggedInUser";

/**
 * Fetches the users from the local JSON file or localStorage.
 */
export const getUsers = async (): Promise<User[]> => {
    try {
        const usersFromStorage = localStorage.getItem(USERS_KEY);
        if (usersFromStorage) {
            return JSON.parse(usersFromStorage);
        }
        const response = await fetch("/assets/creds.json");
        if (!response.ok) {
            throw new Error("Failed to load user data");
        }
        console.log('response', response.body);
        const data = await response.json();
        localStorage.setItem(USERS_KEY, JSON.stringify(data.user));
        return data.user;
    } catch (error) {
        throw error;
    }

};


/**
 * Saves a new user to localStorage.
 * @param newUser - User object containing fullname, email, password, phone
 */
export const saveUser = async (newUser: Omit<User, "id" | "cart" | "billing">): Promise<User> => {
    let users = await getUsers();

    if (users.some(user => user.email === newUser.email)) {
        throw new Error("User already exists!");
    }

    const newUserWithDefaults: User = {
        id: users.length + 1,
        ...newUser,
        cart: [],
        billing: { address: "", city: "", state: "", pincode: "" }
    };

    users.push(newUserWithDefaults);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));

    return newUserWithDefaults;
};

/**
 * Logs in a user by checking credentials and storing in localStorage.
 * @param email - User email
 * @param password - User password
 */
export const loginUser = async (email: string, password: string): Promise<User> => {
    let users = await getUsers();
    const user = users.find(user => user.email === email && user.password === password);

    if (!user) throw new Error("Invalid credentials");

    localStorage.setItem(LOGGED_IN_USER_KEY, JSON.stringify(user));
    return user;
};

/**
 * Retrieves the currently logged-in user.
 */
export const getLoggedInUser = (): User | null => {
    const user = localStorage.getItem(LOGGED_IN_USER_KEY);
    return user ? JSON.parse(user) : null;
};

/**
 * Logs out the current user by removing from localStorage.
 */
export const logoutUser = (): void => {
    localStorage.removeItem(LOGGED_IN_USER_KEY);
};