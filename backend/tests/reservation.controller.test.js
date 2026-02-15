import { describe, it, expect, vi } from 'vitest';
import { getMesReservations } from '../controllers/reservation.controller.js';

const mockReservations = vi.hoisted(() => [
  { _id: '1', statut: 'confirmee' },
  { _id: '2', statut: 'en_attente' }
]);

vi.mock('../models/index.js', () => {
  const mockQuery = {
    populate: vi.fn().mockReturnThis(),
    sort: vi.fn().mockReturnThis(),
    limit: vi.fn().mockResolvedValue(mockReservations)
  };

  return {
    Reservation: {
      find: vi.fn(() => mockQuery)
    },
    Cours: {},
    Utilisateur: {},
    Forfait: {},
    Notification: {}
  };
});

const createRes = () => {
  const res = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
};

describe('reservation.controller getMesReservations', () => {
  it('returns reservations for the current user', async () => {
    const req = {
      user: { _id: 'user-1' },
      query: { limit: '50' }
    };
    const res = createRes();

    await getMesReservations(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        count: mockReservations.length,
        data: mockReservations
      })
    );
  });
});
