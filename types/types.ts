// Trong types hoặc types.ts
import { DefaultSession, DefaultUser } from 'next-auth';

interface CustomUser extends DefaultUser {
    accessToken?: string;
    refreshToken?: string;
}

interface CustomSession extends DefaultSession {
    accessToken?: string;
    refreshToken?: string;
}
