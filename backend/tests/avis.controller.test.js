import { describe, it, expect, vi } from 'vitest';
import { getAvisPublics } from '../controllers/avis.controller.js';

const mockAvis = vi.hoisted(() => [{ _id: '1', commentaire: 'Top' }]);

vi.mock('../models/index.js', () => {
  const mockQuery = {
    populate: vi.fn().mockReturnThis(),
    sort: vi.fn().mockReturnThis(),
    limit: vi.fn().mockReturnThis(),
    skip: vi.fn().mockResolvedValue(mockAvis)
  };

  return {
    Avis: {
      find: vi.fn(() => mockQuery),
      countDocuments: vi.fn().mockResolvedValue(1)
    },
    Cours: {},
    Utilisateur: {},
    Notification: {}
  };
});

const createRes = () => {
  const res = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
};

describe('avis.controller getAvisPublics', () => {
  it('returns a list of public avis', async () => {
    const req = { query: { limit: '50', page: '1' } };
    const res = createRes();

    await getAvisPublics(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        count: mockAvis.length,
        data: mockAvis
      })
    );
  });
});
