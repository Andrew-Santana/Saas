export interface User {
    id: string;
    name: string;
    email: string;
}
export interface AuthState {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    error: string | null;
    isAuthenticated: boolean;
}
export declare const loginUser: import("@reduxjs/toolkit").AsyncThunk<unknown, {
    email: string;
    password: string;
}, import("@reduxjs/toolkit").AsyncThunkConfig>;
export declare const logoutUser: import("@reduxjs/toolkit").AsyncThunk<unknown, void, import("@reduxjs/toolkit").AsyncThunkConfig>;
export declare const clearError: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"auth/clearError">, setCredentials: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    user: User;
    token: string;
}, "auth/setCredentials">;
declare const _default: Reducer<State>;
export default _default;
