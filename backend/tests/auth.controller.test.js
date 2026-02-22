import { describe, it, expect, vi } from 'vitest';
import { register } from '../controllers/auth.controller.js';

vi.mock('../models/index.js', () => ({
  Utilisateur: {
    findOne: vi.fn(),
    create: vi.fn()
  }
}));

const createRes = () => {
  const res = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
};

describe('auth.controller register', () => {
  it('returns 400 when required fields are missing', async () => {
    const req = { body: { email: 'test@example.com' } };
    const res = createRes();

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        message: expect.stringContaining('champs obligatoires')
      })
    );
  });
});
