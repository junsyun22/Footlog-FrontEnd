import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/config/axiosConfig';
import './Settings.css';

const Settings = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('테스트 유저');
  const [notifications, setNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 여부 상태 관리

  const checkLoginStatus = async () => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      setIsLoggedIn(false); // 엑세스 토큰이 없으면 로그인 상태가 아님
      return;
    }

    try {
      // 엑세스 토큰으로 로그인 상태 확인 요청
      const response = await api.get('/api/auth/status');

      const data = response.data;
      setIsLoggedIn(data.isLoggedIn); // 로그인 상태 설정
    } catch (error) {
      console.error('엑세스 토큰으로 로그인 상태 확인 중 오류 발생:', error);

      // 엑세스 토큰이 만료된 경우 리프레시 토큰으로 재발급 시도
      if (error.response && error.response.status === 401) {
        console.log('Access token expired, trying to refresh...');
        try {
          const newAccessToken = await refreshAccessToken(); // 리프레시 토큰으로 엑세스 토큰 갱신
          const response = await api.get('/api/auth/status');
          const data = response.data;
          console.log('토큰 갱신 후 로그인 상태:', data);
          setIsLoggedIn(data.isLoggedIn);
          console.log('토큰 갱신 후 isLoggedIn 설정:', data.isLoggedIn);
        } catch (refreshError) {
          console.error('로그인 상태 확인 및 토큰 갱신 실패:', refreshError);
          setIsLoggedIn(false); // 토큰 갱신 실패 시 로그아웃 상태로 설정
          localStorage.removeItem('accessToken'); // 만료된 엑세스 토큰 제거
          navigate('/login'); // 로그인 페이지로 이동
        }
      } else {
        console.log('토큰 만료와 관련 없는 오류 발생:', error);
        setIsLoggedIn(false); // 다른 오류일 경우에도 로그아웃 상태로 간주
      }
    }
  };

  useEffect(() => {
    checkLoginStatus(); // 컴포넌트가 마운트될 때 로그인 상태 확인
  }, [navigate]);

  const handleSave = () => {
    alert('변경 사항이 저장되었습니다!');
  };

  const handleLogout = () => {
    if (isLoggedIn) {
      api.post('/api/auth/logout', {}, { withCredentials: true })
        .then(() => {
          alert('로그아웃되었습니다!');
          setIsLoggedIn(false);  // 로그아웃 상태로 설정
          localStorage.removeItem('accessToken'); // 로컬 스토리지에서 엑세스 토큰 삭제
          navigate('/login'); // 로그인 페이지로 이동
        })
        .catch(error => {
          console.error('로그아웃 중 오류 발생:', error);
          alert('로그아웃에 실패했습니다. 다시 시도해주세요.');
        });
    } else {
      // 로그인 화면으로 이동
      navigate('/login');
    }
  };
  

  return (
    <div className="settings-page">
      {/* 닉네임 변경 */}
      <div className="setting-item">
        <h3>닉네임 변경</h3>
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="새로운 닉네임을 입력하세요."
        />
      </div>

      {/* 1대1 문의 */}
      <div className="setting-item">
        <h3>1대1 문의</h3>
        <button className="inquiry-button" onClick={() => alert('1대1 문의로 이동합니다!')}>문의하기</button>
      </div>

      {/* 알림 설정 */}
      <div className="setting-item">
        <h3>알림</h3>
        <div className="toggle-buttons">
          <button
            className={notifications ? 'active' : ''}
            onClick={() => setNotifications(true)}
          >
            켜짐
          </button>
          <button
            className={!notifications ? 'active' : ''}
            onClick={() => setNotifications(false)}
          >
            꺼짐
          </button>
        </div>
      </div>

      {/* 다크 모드 설정 */}
      <div className="setting-item">
        <h3>다크 모드</h3>
        <div className="toggle-buttons">
          <button
            className={darkMode ? 'active' : ''}
            onClick={() => setDarkMode(true)}
          >
            켜짐
          </button>
          <button
            className={!darkMode ? 'active' : ''}
            onClick={() => setDarkMode(false)}
          >
            꺼짐
          </button>
        </div>
      </div>

      {/* 저장 및 로그인/로그아웃 버튼 */}
      <div className="save-button-container">
        <button className="logout-button" onClick={handleLogout}>
          {isLoggedIn ? '로그아웃' : '로그인'}
        </button>
        <button className="save-button" onClick={handleSave}>저장</button>
      </div>
    </div>
  );
};

export default Settings;
