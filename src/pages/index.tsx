import { navigate } from 'gatsby';
import { useEffect } from 'react';

export default function IndexPage() {
  useEffect(() => {
    navigate('/grid-master', { replace: true });
  }, []);
  return null;
}
