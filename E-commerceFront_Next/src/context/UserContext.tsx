'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  registerCustomer,
  loginCustomer,
  logoutCustomer,
  getCurrentCustomer,
  updateCustomer as updateCustomerService,
  sendOtp as sendOtpService,
  verifyOtp as verifyOtpService,
  requestPasswordReset as requestPasswordResetService,
  updatePasswordWithToken as updatePasswordWithTokenService,
  type RegisterData,
  type LoginData,
  type CustomerData
} from '@/services/medusa';

export interface Address {
  id: string;
  label: string;
  street: string;
  city: string;
  country: string;
  isDefault: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  addresses: Address[];
  isLoggedIn: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface UserContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  sendOtp: (email: string) => Promise<void>;
  verifyOtp: (email: string, code: string) => Promise<{ verified: boolean }>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<Pick<User, 'firstName' | 'lastName' | 'phone'>>) => Promise<void>;
  addAddress: (address: Omit<Address, 'id'>) => void;
  removeAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  clearError: () => void;
  requestPasswordReset: (email: string) => Promise<void>;
  resetPassword: (email: string, token: string, password: string) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

/**
 * Convert Medusa CustomerData to User format
 */
function customerToUser(customer: CustomerData): User {
  return {
    id: customer.id,
    name: `${customer.first_name} ${customer.last_name}`,
    email: customer.email,
    phone: customer.phone || '',
    firstName: customer.first_name,
    lastName: customer.last_name,
    addresses: [], // TODO: Fetch addresses from Medusa
    isLoggedIn: true,
    createdAt: customer.created_at,
    updatedAt: customer.updated_at,
  };
}

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        setIsLoading(true);
        const customer = await getCurrentCustomer();

        if (customer) {
          setUser(customerToUser(customer));
        }
      } catch (err) {
        console.error('Session check failed:', err);
        // Don't set error for session check failures
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  const login = async (data: LoginData) => {
  try {
    setIsLoading(true);
    setError(null);

    const { customer, token } = await loginCustomer(data);

    // 🔥 Guardar token
    localStorage.setItem("auth_token", token);

    setUser(customerToUser(customer));
  } catch (err: any) {
    setError(err.message || "Error al iniciar sesión");
    throw err;
  } finally {
    setIsLoading(false);
  }
};


  const register = async (data: RegisterData) => {
    try {
      setIsLoading(true);
      setError(null);

      const customer = await registerCustomer(data);

      // After registration, login automatically
      await login({ email: data.email, password: data.password });
    } catch (err: any) {
      setError(err.message || 'Error al registrar usuario');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const sendOtp = async (email: string) => {
    try {
      setIsLoading(true);
      setError(null);
      await sendOtpService(email);
    } catch (err: any) {
      setError(err.message || 'Error al enviar código');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async (email: string, code: string) => {
    try {
      setIsLoading(true);
      setError(null);
      return await verifyOtpService(email, code);
    } catch (err: any) {
      setError(err.message || 'Código inválido');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };


  const logout = async () => {
    try {
      setIsLoading(true);
      setError(null);

      localStorage.removeItem("auth_token");
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (data: Partial<Pick<User, 'firstName' | 'lastName' | 'phone'>>) => {
    try {
      setIsLoading(true);
      setError(null);

      const updateData: any = {};
      if (data.firstName) updateData.first_name = data.firstName;
      if (data.lastName) updateData.last_name = data.lastName;
      if (data.phone !== undefined) updateData.phone = data.phone;

      const customer = await updateCustomerService(updateData);
      setUser(customerToUser(customer));
    } catch (err: any) {
      setError(err.message || 'Error al actualizar perfil');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Local address management (TODO: integrate with Medusa addresses)
  const addAddress = (address: Omit<Address, 'id'>) => {
    if (!user) return;

    const newAddress = { ...address, id: Math.random().toString(36).substr(2, 9) };
    setUser({
      ...user,
      addresses: [...user.addresses, newAddress]
    });
  };

  const removeAddress = (id: string) => {
    if (!user) return;

    setUser({
      ...user,
      addresses: user.addresses.filter(a => a.id !== id)
    });
  };

  const setDefaultAddress = (id: string) => {
    if (!user) return;

    setUser({
      ...user,
      addresses: user.addresses.map(a => ({
        ...a,
        isDefault: a.id === id
      }))
    });
  };

  const clearError = () => {
    setError(null);
  };

  const requestPasswordReset = async (email: string) => {
    try {
      setIsLoading(true);
      setError(null);

      await requestPasswordResetService(email);

    } catch (err: any) {
      // 🔒 Nunca exponemos si el correo existe
      setError("Si el correo existe, recibirás instrucciones para restablecer tu contraseña");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (email: string, token: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);

      await updatePasswordWithTokenService({
        email,
        token,
        password,
      });

    } catch (err: any) {
      setError(err.message || "No se pudo actualizar la contraseña");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <UserContext.Provider value={{
      user,
      isLoading,
      error,
      login,
      register,
      sendOtp,
      verifyOtp,
      logout,
      updateProfile,
      addAddress,
      removeAddress,
      setDefaultAddress,
      clearError,
      requestPasswordReset,
      resetPassword
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within a UserProvider');
  return context;
};

