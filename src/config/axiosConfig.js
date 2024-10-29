import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

// axios 인스턴스 생성
const api = axios.create({
  baseURL: API_BASE_URL,
});

// 요청 인터셉터: 엑세스 토큰을 요청 헤더에 포함
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터: 401 에러 발생 시 리프레시 토큰을 쿠키에서 가져와 엑세스 토큰 재발급 시도
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // 리프레시 토큰을 쿠키에서 가져와 엑세스 토큰 재발급
        const refreshResponse = await axios.post(
          `${API_BASE_URL}/api/auth/reissue`,
          {},
          { withCredentials: true }
        );
        const newAccessToken = refreshResponse.data.accessToken;

        // 새 엑세스 토큰을 로컬 스토리지에 저장하고, 기존 요청에 추가
        localStorage.setItem('accessToken', newAccessToken);
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        // 재발급 받은 토큰으로 원래 요청 재시도
        return api(originalRequest);
      } catch (refreshError) {
        console.error('리프레시 토큰 만료:', refreshError);
        localStorage.removeItem('accessToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
