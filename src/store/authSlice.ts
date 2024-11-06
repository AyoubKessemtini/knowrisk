import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the shape of your Auth state
interface User {
  username: string;
  email: string;
  roles: string[];
  device_type: string;
  id: string;
}
interface AuthState {
  [x: string]: any;
  isLoggedIn: boolean;
  loading: boolean;
  
  errorLogin: string | null; // Change this line
  errorRegister: string | null; // New error for registration
  user: User | null; // Add the user property here
}

const initialState: AuthState = {
  isLoggedIn: false,
  loading: false,
  errorLogin: null,// Change this line
  errorRegister: null,// New error for registration
  user: null, // Add the user property here
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Login actions
    loginRequest: (
      state,
      action: PayloadAction<{ email: string; password: string }>,
    ) => {
      state.loading = true;
      state.errorLogin = null;
    },
    loginSuccess: (state) => {
      state.isLoggedIn = true;
      state.loading = false;
      // Do not set user here; it will be set separately
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.errorLogin = action.payload;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload; // Store user information when needed
    },
    // Registration actions
    registerRequest: (
      state,
      action: PayloadAction<{
        first_name: string;
        last_name: string;
        email: string;
        password: string;
        phone: string;
      }>,
    ) => {
      state.loading = true;
      state.errorRegister = null;
    },
    registerSuccess: (state) => {
      state.isLoggedIn = true; // or keep it false based on your logic
      state.loading = false;
    },
    registerFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.errorRegister = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null; // Clear user data
    },
    resetErrorLogin: (state) => {
      state.errorLogin = null; // Reset the error to null
    }, 
    resetErrorRegister: (state) => {
      state.errorRegister = null; // Reset the error to null
    },
  },
});

// Export actions
export const AuthActions = authSlice.actions;

// Export the reducer
export default authSlice.reducer;
