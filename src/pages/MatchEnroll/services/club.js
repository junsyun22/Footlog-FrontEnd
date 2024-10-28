const SERVER_URL = 'http://localhost:8080';

export async function getMyClubList() {
  const CLUB_ENDPOINT = '/api/clubs/my-clubs';
  const url = SERVER_URL.concat(CLUB_ENDPOINT);

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error('Failed to fetch clubList:', error);
    return null;
  }
}
