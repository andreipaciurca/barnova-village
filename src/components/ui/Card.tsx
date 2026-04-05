import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div className={cn('bg-card text-card-foreground border border-border/50 rounded-3xl shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-500', className)}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '' }: CardProps) {
  return <div className={cn('p-6 md:p-8', className)}>{children}</div>;
}

export function CardContent({ children, className = '' }: CardProps) {
  return <div className={cn('p-6 md:p-8 pt-0', className)}>{children}</div>;
}

export function CardFooter({ children, className = '' }: CardProps) {
  return <div className={cn('p-6 md:p-8 pt-0 flex items-center mt-auto', className)}>{children}</div>;
}
