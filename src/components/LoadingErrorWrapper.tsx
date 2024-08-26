import React from 'react';
import { LoadingAndError } from '@modules/home/components/Loading';

interface LoadingErrorWrapperProps {
  loading: boolean;
  error: string | null;
  children: React.ReactNode;
}

export const LoadingErrorWrapper = ({
  loading,
  error,
  children,
}: LoadingErrorWrapperProps) => {
  return (
    <>
      <LoadingAndError loading={loading} error={error} />
      {!loading && !error && children}
    </>
  );
};
