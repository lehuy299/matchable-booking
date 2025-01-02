import { useMutation, UseMutationResult } from '@tanstack/react-query';
import axios from 'axios';

// Define the expected structure of the data and the response
interface LoginData {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

export const useLoginMutation = () => {
  return useMutation<LoginResponse, Error, LoginData>(
    async (data: LoginData) => {
      const response = await axios.post<LoginResponse>('/auth/login', data);
      return response.data;
    }
  );
};
