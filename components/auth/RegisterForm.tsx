'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Input, Button } from '@/components/ui';
import { useUserStore } from '@/store/useUserStore';

export const RegisterForm = () => {
  const router = useRouter();
  const { register, isLoading, error, clearError } = useUserStore();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) clearError();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await register(formData);
      router.push('/dashboard');
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <>
      <div>
        <h3 className="text-center text-2xl font-bold text-gray-900">
          Create a new account
        </h3>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <Link
            href="/login"
            className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
          >
            sign in if you already have an account
          </Link>
        </p>
      </div>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="text-sm text-red-700">{error}</div>
          </div>
        )}
        <div className="space-y-4">
          <Input
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            required
            label="Email address"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
          />
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            label="Password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />
          <Input
            id="confirm-password"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            required
            label="Confirm Password"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>

        <div className="mt-6">
          <Button type="submit" fullWidth disabled={isLoading}>
            {isLoading ? 'Creating account...' : 'Register'}
          </Button>
        </div>
      </form>
    </>
  );
};
