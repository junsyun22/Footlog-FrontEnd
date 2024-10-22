const SERVER_URL = 'http://192.168.0.12:8080';

export async function postMatchEnroll(data) {
  const MATCH_ENDPOINT = '/api/v1/matches';
  const url = SERVER_URL.concat(MATCH_ENDPOINT);
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
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

export async function getMatcheDetail(matchId) {
  const MATCH_ENDPOINT = `/api/v1/matches/${matchId}`;
  const url = SERVER_URL.concat(MATCH_ENDPOINT);
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Failed to fetch matches:', error);
    return null;
  }
}

export async function applyForMatch(matchId, enemyClubId) {
  try {
    const response = await fetch(
      `http://192.168.0.12:8080/api/v1/matches/${matchId}/application?enemyClubId=${enemyClubId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        credentials: 'include',
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Failed to apply for match:', error);
    throw error;
  }
}

export async function acceptMatch(matchId) {
  const ACCEPT_ENDPOINT = `/api/v1/matches/${matchId}/accept`;
  const url = SERVER_URL.concat(ACCEPT_ENDPOINT);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`, 
      },
      credentials: 'include', 
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const result = await response.json();
    return result; 
  } catch (error) {
    console.error('Failed to accept the match:', error);
    return null;
  }
}

export async function rejectMatch(matchId) {
  const REJECT_ENDPOINT = `/api/v1/matches/${matchId}/reject`;
  const url = SERVER_URL.concat(REJECT_ENDPOINT);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`, 
      },
      credentials: 'include', 
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const result = await response.json();
    return result; 
  } catch (error) {
    console.error('Failed to reject the match:', error);
    return null;
  }
}
