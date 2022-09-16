
interface IUser {
    id: number;
    name: string;
    email: string;
    picture: string;
}

export async function getUsers_OLD_URL() {
    let users: IUser[] = [];

    const usersFromLS = localStorage.getItem("users");

    if (usersFromLS) {
        const lastUpdated = new Date(JSON.parse(usersFromLS).lastUpdated);
        const diff = new Date().getTime() - lastUpdated.getTime();
        const seconds = Math.round(diff / 1000);
        if (seconds < import.meta.env.VITE_MAX_USERS_CACHE_AGE_SECONDS) {
            console.log(`Using cached users (less than ${seconds} seconds old)`);
            users = JSON.parse(usersFromLS).data;
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

export async function getUsers() {
    let users: IUser[] = [];

    const usersFromLS = localStorage.getItem("users");

    if (usersFromLS) {
        const lastUpdated = new Date(JSON.parse(usersFromLS).lastUpdated);
        const diff = new Date().getTime() - lastUpdated.getTime();
        const seconds = Math.round(diff / 1000);
        if (seconds < import.meta.env.VITE_MAX_USERS_CACHE_AGE_SECONDS) {
            console.log(`Using cached users (less than ${seconds} seconds old)`);
            users = JSON.parse(usersFromLS).data;
            return users;
        }
    }

    console.log("[ DEBUG ] Fetching users from API");
    const res = await fetch(import.meta.env.VITE_USERS_URL, {
        headers: { 'Content-type': 'application/json' },
    }).then(res => res.json()).then((response) => {
        console.log("[ DEBUG ] USERS", users);
        // Save to LocalStorage for now (no cookies (too much data), no database)
        console.log("[ DEBUG ] Saving users to LocalStorage");
        // change the data structure to match the old one (default task URL - jsonplaceholder.typicode.com/users)
        const usersToSave = response.results.map((user: any, index: number) => {
            return {
                id: index,
                name: user.name.first + " " + user.name.last,
                email: user.email,
                picture: user.picture.large
            }
        });
        users = usersToSave;
        localStorage.setItem("users", JSON.stringify({
            "lastUpdated": new Date().toString(),
            "data": usersToSave
        }));
        console.log("[ DEBUG ] Users saved to LocalStorage");

    }).catch((error) => {
        console.log('[ ERROR ] Error fetching users: \n', error);
    });

    return users;
}

function getScores() {
    interface IScore {
        name: string;
        wins: number;
    }
    let scores: Array<IScore> = [];

    console.log("[ DEBUG ] Fetching scores from LS");
    const scoresFromLS = localStorage.getItem("scores");
    if (scoresFromLS) {
        scores = JSON.parse(scoresFromLS);
        return scores;
    }

    console.log("[ DEBUG ] No scores yet... Play a game!");
    return scores;
}


// Fisher-Yates shuffle (https://www.webmound.com/shuffle-javascript-array/)
const shuffleArrayES6 = (array: any) => {
    array.reverse().forEach((item: any, index: number) => {
        const j = Math.floor(Math.random() * (index + 1));
        [array[index], array[j]] = [array[j], array[index]];
    });

    return array;
};

const shuffleObjects = (array: any) => {
    const newArray = [...array];

    newArray.reverse().forEach((item, index) => {
        const j = Math.floor(Math.random() * (index + 1));
        [newArray[index], newArray[j]] = [newArray[j], newArray[index]];
    });

    return newArray;
};

const shuffle = (array: any) => {
    return array.sort(() => 0.5 - Math.random());
};

export default getUsers;
export { shuffle, shuffleArrayES6, shuffleObjects, getScores };