const API_BASE_URL = 'http://localhost:3001';

export async function request(endpoint, options = {}) {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    ...options
  };

  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, config);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Error HTTP: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.warn(`JSON Server API (${endpoint}) unreachable. Operating fallback mode.`, error.message);
    return null;
  }
}
