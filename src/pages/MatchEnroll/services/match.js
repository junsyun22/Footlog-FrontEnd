const SERVER_URL = 'http://localhost:8080';
const MATCH_ENDPOINT = '/api/v1/matches';

export async function postMatchEnroll(data) {
  const url = SERVER_URL.concat(MATCH_ENDPOINT);
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      },
      credentials: 'include',
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}
