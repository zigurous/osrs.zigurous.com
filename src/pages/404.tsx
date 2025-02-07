import { navigate } from 'gatsby';
import { useEffect } from 'react';

export default function NotFoundPage() {
  useEffect(() => {
    /* @ts-ignore */
    navigate('/');
  }, []);
  return null;
}
