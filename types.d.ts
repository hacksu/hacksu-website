declare namespace Express {
    export interface User {
        id: string;
        username?: string;
        isLeader?: boolean;
    }
}