import { navigate } from 'gatsby';
import { useEffect } from 'react';

export default function NotFoundPage() {
  useEffect(() => {
    navigate('/', { replace: true });
  }, []);
  return null;
}
