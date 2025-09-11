declare global {
    namespace Express {
        interface User {
            id: string;
            username?: string;
            isLeader?: boolean;
        }
    }
}

declare module 'remult' {
    interface UserInfo {
        isLeader?: boolean;
    }
}

export { };

