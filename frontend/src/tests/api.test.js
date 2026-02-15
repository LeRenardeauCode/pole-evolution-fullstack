import { describe, it, expect, vi } from 'vitest';

describe('api config', () => {
  it('uses VITE_API_URL when provided', async () => {
    const previousUrl = import.meta.env.VITE_API_URL;
    import.meta.env.VITE_API_URL = 'http://example.test/api';

    vi.resetModules();
    const { default: api } = await import('../services/api.js');

    expect(api.defaults.baseURL).toBe('http://example.test/api');

    import.meta.env.VITE_API_URL = previousUrl;
  });
});
