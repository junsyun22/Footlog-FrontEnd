import { useState, useEffect, useCallback } from 'react';
import ClubInfo from './ClubInfo';
import club from './ClubList.module.css';
import RegistClubButton from '@/pages/Club/components/RegistClubButton';
import styled from '@emotion/styled';
import api from '@/config/axiosConfig';
import { useNavigate } from 'react-router-dom'; 

const MatchContainer = styled.div`
    width: 100%;
    padding: 2vh 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  `;

function ClubList() {
  const navigate = useNavigate(); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [clubList, setClubList] = useState([]);
  const [userInfo, setUserInfo] = useState({});

  const checkLoginStatus = useCallback(async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        setIsLoggedIn(false);
        return;
      }
      const response = await api.get('/api/auth/status');
      const data = response.data;
      setIsLoggedIn(data.isLoggedIn);
      setUserInfo({
        email: data.email,
        authority: data.authority,
        name: data.name
      });
    } catch (error) {
      console.error("로그인 상태 확인 중 오류 발생:", error);
      setIsLoggedIn(false);
      localStorage.removeItem('accessToken');  // 토큰 제거
    }
  }, []);

  const fetchClubList = useCallback(async () => {
    try {
      const response = await api.get('/api/clubs');
      setClubList(response.data);
    } catch (error) {
      console.error("클럽 리스트 불러오기 오류:", error);

      if (error.response && error.response.status === 401) {
        try {
          // 엑세스 토큰 갱신
          const newAccessToken = await refreshAccessToken();
          if (newAccessToken) {
            // 새 토큰으로 클럽 리스트 다시 불러오기
            const clubList = await getClubList();
            setClubList(clubList);
          }
        } catch (refreshError) {
          console.error('토큰 갱신 및 클럽 리스트 불러오기 실패:', refreshError);
          localStorage.removeItem('accessToken');  // 토큰 제거 후 재로그인
          navigate('/login');
        }
      } else if (error.response && error.response.status === 403) {
        console.log("권한이 없습니다. 로그인 상태를 확인하세요.");
        setIsLoggedIn(false);  // 로그인 상태를 false로 설정
      }
    }
  }, [navigate]);

  useEffect(() => {
    checkLoginStatus();
    fetchClubList();
  }, [checkLoginStatus, fetchClubList]);

  const handleClubClick = (clubId) => {
    navigate(`/club/detail/${clubId}`);
  };

  return (
    <MatchContainer>
      <div className={club.container}>
        {isLoggedIn && <p>반갑습니다, {userInfo.name}님!</p>}
        {clubList.map((club) => (
          <ClubInfo
            key={club.clubId}
            club={club}
            onClick={() => handleClubClick(club.clubId)}
          />
        ))}
      </div>
      {isLoggedIn && <RegistClubButton />}
    </MatchContainer>
  );
}

export default ClubList;
