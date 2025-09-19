let accesToken: string | null = null;

export const setStoredAccessToken = (token: string|null) => {
    accesToken = token;
}

export const getStoredAccessToken = () => {
    return accesToken;
}