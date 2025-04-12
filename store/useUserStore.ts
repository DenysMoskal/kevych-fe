import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  User,
  UserCredentials,
  RegisterData,
  LoginResponse,
  RegisterResponse,
} from '@/types/user';
import api from '@/api/axios';
import axios from 'axios';

interface UserState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  token: string | null;
  _hasHydrated?: boolean;

  // Actions
  login: (credentials: UserCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  setHasHydrated?: (state: boolean) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      error: null,
      isAuthenticated: false,
      token: null,
      _hasHydrated: false,

      setHasHydrated: (state) => {
        set({
          _hasHydrated: state,
        });
      },

      login: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.post<LoginResponse>(
            '/auth/login',
            credentials
          );

          const { user, access_token } = response.data;

          set({
            user,
            token: access_token,
            isLoading: false,
            isAuthenticated: true,
          });
        } catch (error: unknown) {
          let errorMessage = 'Failed to login';

          if (axios.isAxiosError(error)) {
            errorMessage = error.response?.data?.message || errorMessage;
          } else if (error instanceof Error) {
            errorMessage = error.message;
          }

          set({
            error: errorMessage,
            isLoading: false,
          });
          throw error;
        }
      },

      register: async (data) => {
        set({ isLoading: true, error: null });
        try {
          if (data.password !== data.confirmPassword) {
            throw new Error('Passwords do not match');
          }

          const response = await api.post<RegisterResponse>('/auth/register', {
            email: data.email,
            password: data.password,
            confirmPassword: data.confirmPassword,
          });

          const { user, access_token } = response.data;

          set({
            user,
            token: access_token,
            isLoading: false,
            isAuthenticated: true,
          });
        } catch (error: unknown) {
          let errorMessage = 'Failed to register';

          if (axios.isAxiosError(error)) {
            errorMessage = error.response?.data?.message || errorMessage;
          } else if (error instanceof Error) {
            errorMessage = error.message;
          }

          set({
            error: errorMessage,
            isLoading: false,
          });
          throw error;
        }
      },

      logout: () => {
        api.defaults.headers.common['Authorization'] = '';
        set({ user: null, token: null, isAuthenticated: false });
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: 'user-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        token: state.token,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHasHydrated?.(true);
        }
      },
    }
  )
);
