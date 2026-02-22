import { describe, it, expect, vi } from 'vitest';
import { getForfaitsPublics } from '../services/forfaitService.js';

vi.mock('../services/api.js', () => {
  return {
    default: {
      get: vi.fn(() => Promise.resolve({ data: { data: [] } }))
    }
  };
});

import api from '../services/api.js';

describe('forfaitService', () => {
  it('requests public forfaits with default filters', async () => {
    await getForfaitsPublics();

    expect(api.get).toHaveBeenCalledWith('/forfaits', {
      params: { estActif: true, estVisible: true }
    });
  });
});
