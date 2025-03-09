
export interface ISignUpForm {
    name: string;
    email: string;
    password: string;
    confirmPassword?: string;
    picture: File | undefined;
}