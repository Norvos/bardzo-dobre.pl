import { authenticationService } from '../services/AuthenticationService';

export function authHeader() {
    // return authorization header with jwt token
    const token = authenticationService.currentUserValue;
    if (token.user && token.accessToken) {
        return `Bearer ${token.accessToken}`;
    } else {
        return {};
    }
}