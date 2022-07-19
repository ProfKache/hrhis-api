export interface UserInterface {
    id: number;
    name: string;
    username?: string;
    phone?: string;
    email?: string;
}

export interface CreateUserResponse {
    message: string;
    payload: UserInterface;
}