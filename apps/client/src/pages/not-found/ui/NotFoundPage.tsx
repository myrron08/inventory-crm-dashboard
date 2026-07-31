import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/shared/ui/Button/Button';

export const NotFoundPage = memo(function NotFoundPage() {
  return (
    <section className="page-section">
      <h1>404</h1>
      <p>Страница не найдена.</p>
      <Link to="/orders">
        <Button variant="primary">К приходам</Button>
      </Link>
    </section>
  );
});
