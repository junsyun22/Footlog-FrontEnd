const SERVER_URL = 'http://localhost:8080';
const CLUB_INFO_ENDPOINT = '/api/club-members/my';

export async function getMyClubList() {
  const url = SERVER_URL.concat(CLUB_INFO_ENDPOINT);
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
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
