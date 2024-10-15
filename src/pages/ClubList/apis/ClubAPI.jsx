import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

export const getClubList = async () => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const response = await axios.get(`${API_BASE_URL}/api/clubs`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('클럽 리스트 가져오기 실패:', error);
    throw error;
  }
};
