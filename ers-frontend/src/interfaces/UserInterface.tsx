export interface UserInterface {
    userId?: number;  // Optional because it might not be present when creating a new user
    username: string;
    password?: string;  // Optional because you might not always pass this around for security reasons
    role?: string;  // To distinguish between different types of users, e.g., employee, manager
}
