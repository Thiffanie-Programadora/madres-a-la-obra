export const INITIAL_WORKSHOPS = [
  {
    id: 1,
    title: "Confección y Costura Básica para Emprender",
    category: "Manualidades & Costura",
    facilitator: "Karla Mora",
    facilitatorRole: "Modista y Mamá de 2",
    facilitatorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    image: "https://images.unsplash.com/photo-1528458876861-544fd1761a91?w=800&auto=format&fit=crop&q=80",
    modality: "Virtual",
    schedule: "Mar y Jue (10:00 - 11:30 AM) - Horario Siesta",
    accessType: "Skill-Swap",
    spots: 12,
    spotsLeft: 3,
    accessibility: ["Intérprete LESCO", "Macrotipo", "Flexibilidad 100%"],
    description: "Aprende a patrones básicos, arreglos y confección de ropa infantil desde cero usando máquinas domésticas.",
    swapWanted: "Clases de Contabilidad o Finanzas Digitales",
    status: "Activo"
  },
  {
    id: 2,
    title: "Marketing Digital con Celular para Mamás",
    category: "Marketing Digital con Celular",
    facilitator: "Sofía Bermúdez",
    facilitatorRole: "Especialista en RRSS",
    facilitatorAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&auto=format&fit=crop&q=80",
    modality: "Virtual",
    schedule: "Lun y Mié (02:00 - 03:30 PM) - Jornada Escolar",
    accessType: "Gratuito",
    spots: 25,
    spotsLeft: 8,
    accessibility: ["Subtítulos Automáticos", "Material Grabado"],
    description: "Crea contenido atractivo, edita reels con Canva y CapCut solo utilizando tu teléfono inteligente.",
    swapWanted: "Gratuito por Alianza Comunitaria",
    status: "Activo"
  },
  {
    id: 3,
    title: "Postres y Repostería Creativa Económica",
    category: "Repostería & Panadería",
    facilitator: "Elena Rostova",
    facilitatorRole: "Chef Pastelera",
    facilitatorAvatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&auto=format&fit=crop&q=80",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&auto=format&fit=crop&q=80",
    modality: "Presencial",
    schedule: "Sábados (09:00 - 11:30 AM) - Taller Comunitario",
    accessType: "Skill-Swap",
    spots: 10,
    spotsLeft: 2,
    accessibility: ["Espacio Físico Accesible", "Intérprete LESCO"],
    description: "Recetas ricas, rápidas y de bajo costo para vender en el barrio o eventos infantiles.",
    swapWanted: "Diseño de Logotipos o Empaques",
    status: "Activo"
  },
  {
    id: 4,
    title: "Finanzas del Hogar y Presupuesto Emprendedor",
    category: "Finanzas del Hogar",
    facilitator: "Ana Lucía Vargas",
    facilitatorRole: "Contadora Pública",
    facilitatorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&auto=format&fit=crop&q=80",
    modality: "Virtual",
    schedule: "Viernes (10:00 - 11:30 AM) - Asincrónico",
    accessType: "Sustentable",
    spots: 30,
    spotsLeft: 15,
    accessibility: ["Macrotipo", "Guías imprimibles"],
    description: "Organiza el dinero de la casa y calcula los costos reales de tus productos para cobrar lo justo.",
    swapWanted: "Talleres de Manualidades o Tejido",
    status: "Activo"
  },
  {
    id: 5,
    title: "Cuidado Personal, Autoestima y Manejo de Estrés",
    category: "Belleza & Cuidados",
    facilitator: "Dra. Marcela Campos",
    facilitatorRole: "Psicóloga Familiar",
    facilitatorAvatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&auto=format&fit=crop&q=80",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&auto=format&fit=crop&q=80",
    modality: "Virtual",
    schedule: "Jueves (08:30 - 09:30 PM) - Madrugada Tranquila",
    accessType: "Gratuito",
    spots: 40,
    spotsLeft: 12,
    accessibility: ["Intérprete LESCO", "Audio Claro"],
    description: "Espacio de contención y herramientas prácticas de respiración y hábitos de autocuidado.",
    swapWanted: "Gratuito Comunitaria",
    status: "Activo"
  }
];

export const INITIAL_SWAP_REQUESTS = [
  {
    id: 101,
    offeredBy: "Marta Castro",
    offeredSkill: "Corte de Cabello Básico y Peinados Infantiles",
    requestedSkill: "Taller de Contabilidad y Presupuesto",
    date: "2026-09-23",
    status: "Pendiente",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: 102,
    offeredBy: "Lucía Fernández",
    offeredSkill: "Clases de Inglés Básico Conversacional",
    requestedSkill: "Repostería para Fiestas de Cumpleaños",
    date: "2026-09-22",
    status: "Aprobado",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: 103,
    offeredBy: "Beatriz Solís",
    offeredSkill: "Asesoría en Huertos Urbanos y Plantas",
    requestedSkill: "Edición de Videos Cortos para Instagram",
    date: "2026-09-21",
    status: "Aprobado",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80"
  }
];

export const CATEGORIES = [
  { id: 'all', name: 'Todas las Categorías', icon: 'Sparkles' },
  { id: 'costura', name: 'Manualidades & Costura', icon: 'Scissors' },
  { id: 'reposteria', name: 'Repostería & Panadería', icon: 'Cake' },
  { id: 'marketing', name: 'Marketing Digital con Celular', icon: 'Smartphone' },
  { id: 'belleza', name: 'Belleza & Cuidados', icon: 'Sparkles' },
  { id: 'finanzas', name: 'Finanzas del Hogar', icon: 'DollarSign' }
];
