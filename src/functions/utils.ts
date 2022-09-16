
interface IUser {
    id: number;
    name: string;
    email: string;
}

export async function getUsers() {
    let users: IUser[] = [];

    if (localStorage.getItem("users")) {
        const lastUpdated = new Date(JSON.parse(localStorage.getItem("users")).lastUpdated);
        const diff = new Date().getTime() - lastUpdated.getTime();
        const seconds = Math.round(diff / 1000);
        if (seconds < import.meta.env.VITE_MAX_USERS_CACHE_AGE_SECONDS) {
            console.log(`Using cached users (less than ${seconds} seconds old)`);
            users = JSON.parse(localStorage.getItem("users")).data;
            return users;
        }
    }

    console.log("[ DEBUG ] Fetching users from API");
    const res = await fetch(import.meta.env.VITE_USERS_URL, {
        headers: { 'Content-type': 'application/json' },
    }).then(res => res.json()).then((response) => {
        users = response;
        // Save to LocalStorage for now (no cookies (too much data), no database)
        console.log("[ DEBUG ] Saving users to LocalStorage");
        localStorage.setItem("users", JSON.stringify({
            "lastUpdated": new Date().toString(),
            "data": response
        }));
        console.log("[ DEBUG ] Users saved to LocalStorage");

    }).catch((error) => {
        console.log('[ ERROR ] Error fetching users: \n', error);
    });

    return users;
}


export default getUsers;
