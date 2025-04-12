'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Input, Button } from '@/components/ui';
import { useUserStore } from '@/store/useUserStore';

export const LoginForm = () => {
  const router = useRouter();
  const { login, isLoading, error, clearError } = useUserStore();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) clearError();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login(formData);
      router.push('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <>
      <div>
        <h3 className="text-center text-2xl font-bold text-gray-900">
          Sign in to your account
        </h3>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <Link
            href="/register"
            className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
          >
            register if you don&apos;t have an account
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
            autoComplete="current-password"
            required
            label="Password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div>
          <Button type="submit" fullWidth disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign in'}
          </Button>
        </div>
      </form>
    </>
  );
};
