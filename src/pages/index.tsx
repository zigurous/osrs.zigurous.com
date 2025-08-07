import { navigate } from 'gatsby';
import { useEffect } from 'react';

export default function IndexPage() {
  useEffect(() => {
    navigate('/gear-progression', { replace: true });
  }, []);
  return null;
}
