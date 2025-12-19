import { Injectable } from  '@angular/core';

export interface User {
    id: number;
    username: string;
    password: string;
}

@Injectable({
providedIn: 'root'
})

export  class  UserService {

    constructor() { }
    // Dummy users wich we can replace with actual api called users

    private baseUrl = 'http://localhost:3006/users';

    async fetchUsers(): Promise<User[]> {
        const response = await fetch(this.baseUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        return await response.json();
    }

    // users = [
    // { id: 1, username: 'johndoe', password: 'password' },
    // { id: 2, username: 'janedoe', password: 'password' },
    // ];

    // Returns all users

    getUsers() {
    // just for demo purposes - here we would perform an api call
        return  this.fetchUsers();
    }

    // Checks user credentials and returns a valid token or null
    async  login(username:  string, password:  string) {
        const users = await this.fetchUsers();
        let user = users.find((u) => u.username === username);
        if (!user || user.password !== password) {
            return null;
        }
        return user.id.toString();
    }
}