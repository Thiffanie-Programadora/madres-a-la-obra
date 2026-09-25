import { obtenerTalleres, crearTaller, actualizarTaller, eliminarTaller } from '../services/talleresService';

global.fetch = jest.fn();

describe('talleresService Unit Tests', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('obtenerTalleres realiza la llamada GET a JSON Server', async () => {
    const mockTalleres = [{ id: '1', title: 'Costura Básica' }];
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockTalleres
    });

    const resultado = await obtenerTalleres();
    expect(fetch).toHaveBeenCalledWith('http://localhost:3001/talleres', expect.any(Object));
    expect(resultado).toEqual(mockTalleres);
  });

  test('crearTaller envía petición POST con datos del taller', async () => {
    const nuevoTaller = { title: 'Repostería Creativa', category: 'Repostería' };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: '2', ...nuevoTaller })
    });

    const resultado = await crearTaller(nuevoTaller);
    expect(fetch).toHaveBeenCalledWith('http://localhost:3001/talleres', expect.objectContaining({
      method: 'POST'
    }));
    expect(resultado.title).toBe('Repostería Creativa');
  });

  test('eliminarTaller realiza llamada DELETE con el ID correspondiente', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({})
    });

    await eliminarTaller('1');
    expect(fetch).toHaveBeenCalledWith('http://localhost:3001/talleres/1', expect.objectContaining({
      method: 'DELETE'
    }));
  });
});
