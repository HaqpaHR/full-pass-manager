export interface currentUser {
    id: string,
    email: string
}

export interface User {
    currentUser: currentUser,
    isAuth: boolean,
}

export interface Passwords {
    data: IPassword[]
}

export interface IPassword {
    _id: string,
    user: string,
    name: string,
    password: string,
}

export interface reduxStore {
    user: User,
    passwords: Passwords
}