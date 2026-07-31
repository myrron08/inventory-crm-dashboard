import { memo, type ButtonHTMLAttributes, type ReactNode } from 'react';
import './Button.scss';

type ButtonVariant = 'primary' | 'ghost' | 'danger' | 'icon';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: ReactNode;
}

function cn(...parts: Array<string | undefined>): string {
  return parts.filter(Boolean).join(' ');
}

export const Button = memo(function Button({
  variant = 'primary',
  className,
  children,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn('ui-button', `ui-button--${variant}`, className)}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
});
