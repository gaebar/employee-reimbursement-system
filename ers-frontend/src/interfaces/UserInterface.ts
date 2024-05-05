// User interface to define the shape of the user object

export interface UserInterface {
    userId?: number;
    username: string;
    password?: string;
    role?: string;
    firstName?: string;
    lastName?: string;
    confirmPassword?: string;  // Only for use in the Registration form for validation
}
