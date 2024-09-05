
export default interface User {
    name: string | null | undefined;
    username: string | null | undefined;
    email: string | null | undefined;
    image: string | null | unknown;
    password: string | null | undefined;
    authProvider: string | null | undefined;
    phoneNumber?: string | null | undefined;
    role: string | "USER";

}