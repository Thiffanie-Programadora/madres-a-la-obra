import dbData from '../../db.json';

export const INITIAL_WORKSHOPS = dbData.talleres || [];
export const INITIAL_SWAP_REQUESTS = dbData.skillswap || dbData.solicitudes || [];

export const CATEGORIES = [
  { id: 'all', name: 'Todas las Categorías', icon: 'Sparkles' },
  { id: 'costura', name: 'Manualidades & Costura', icon: 'Scissors' },
  { id: 'reposteria', name: 'Repostería & Panadería', icon: 'Cake' },
  { id: 'marketing', name: 'Marketing Digital con Celular', icon: 'Smartphone' },
  { id: 'belleza', name: 'Belleza & Cuidados', icon: 'Sparkles' },
  { id: 'finanzas', name: 'Finanzas del Hogar', icon: 'DollarSign' }
];

export const DEFAULT_USERS = [...(dbData.usuarios || [])];


