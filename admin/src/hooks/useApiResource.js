import { useCallback, useEffect, useState } from 'react';
import { api } from '../services/api.js';

export function useApiResource(path, params = {}) {
  const [data, setData] = useState([]);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async (options = {}) => {
    if (options.showLoading !== false) setLoading(true);
    setError(null);
    try {
      const response = await api.get(path, { params });
      const payload = response.data.data;
      setData(payload.items || payload);
      setMeta(payload.meta || null);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  }, [path, JSON.stringify(params)]);

  useEffect(() => {
    load();
  }, [load]);

  return { data, meta, loading, error, reload: load };
}
