'use client';

import { useState, useCallback } from 'react';

interface UseFetchResult<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
  execute: <R>(promise: Promise<R>) => Promise<R>;
  reset: () => void;
}

function useFetch<T>(initialData: T | null = null): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(initialData);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const reset = useCallback(() => {
    setData(initialData);
    setIsLoading(false);
    setError(null);
  }, [initialData]);

  const execute = useCallback(async <R>(promise: Promise<R>): Promise<R> => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await promise;
      if (result && typeof result === 'object' && 'data' in result) {
        setData(result.data as unknown as T);
      }
      return result;
    } catch (err) {
      const errorObject = err instanceof Error ? err : new Error(String(err));
      setError(errorObject);
      throw errorObject;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { data, isLoading, error, execute, reset };
}

export default useFetch;
