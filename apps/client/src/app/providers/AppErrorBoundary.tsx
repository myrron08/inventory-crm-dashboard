import { Component, type ErrorInfo, type ReactNode } from 'react';
import { EmptyState } from '@/shared/ui/EmptyState/EmptyState';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class AppErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('UI error boundary:', error, info.componentStack);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <EmptyState
          title="Что-то пошло не так"
          description="Обновите страницу или вернитесь позже."
        />
      );
    }
    return this.props.children;
  }
}
