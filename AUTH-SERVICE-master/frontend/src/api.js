// api.js
const BASE_URL = "http://localhost:9003/router";  // Ensure this URL is correct

// Function to handle the API response
const handleResponse = async (response) => {
    const contentType = response.headers.get("content-type");

    if (response.ok) {
        if (contentType && contentType.includes("application/json")) {
            return await response.json();
        }
        return await response.text();
    } else {
        const errorText = await response.text();
        throw new Error(errorText || "Erreur inconnue");
    }
};

// Function to handle logout
export const logout = async (userName) => {
    const url = `${BASE_URL}/logout/${userName}`;  // URL with dynamic userName

    try {
        const response = await fetch(url, {
            method: 'POST',  // POST method for logout
            headers: {
                'Content-Type': 'application/json',  // Content type header
            },
        });

        // Check if response is OK
        if (!response.ok) {
            throw new Error(`Erreur de déconnexion: ${response.statusText}`);
        }

        // Return response data
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erreur lors de la déconnexion:', error);
        throw error;
    }
};

// Login function to authenticate user
export const login = async (data) => {
    const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return await handleResponse(response);
};

// Signup function
export const signUp = async (data) => {
    const response = await fetch(`${BASE_URL}/signUp`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return await handleResponse(response);
};

// OTP validation function for signup
export const validateSignUpOTP = async (data) => {
    const response = await fetch(`${BASE_URL}/validateSignUpOTP`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return await handleResponse(response);
};

// Function for validating login OTP
export const validateLoginOTP = async (data) => {
    const response = await fetch(`${BASE_URL}/validateLoginOTP`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return await handleResponse(response);
};

// Function for password reset via OTP
export const resetPasswordWithOTP = async (data) => {
    const response = await fetch(`${BASE_URL}/resetPasswordWithOTP`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return await handleResponse(response);
};

// Forgot password function
export const forgotPassword = async (data) => {
    const response = await fetch(`${BASE_URL}/forgotPassword`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return await handleResponse(response);
};
