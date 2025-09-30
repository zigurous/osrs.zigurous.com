import { navigate } from 'gatsby';
import { useEffect } from 'react';

export default function IndexPage() {
  useEffect(() => {
    navigate('/region-analyzer', { replace: true });
  }, []);
  return null;
}
