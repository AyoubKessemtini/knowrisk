import React, { ReactNode } from 'react';

interface ConditionalRendererProps {
  show: boolean;
  children: ReactNode;
}

export const ConditionalRenderer = ({
  show,
  children,
}: ConditionalRendererProps) => {
  if (!show) {
    return null;
  }

  return <>{children}</>;
};
