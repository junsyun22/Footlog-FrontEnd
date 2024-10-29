import { useEffect, useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Login.css';
import KakaoLoginButton from '@/components/ui/KakaoLoginButton';
import styled from '@emotion/styled';
import checkIcon from '@/assets/check-button.svg';
import mascotIcon from '@/assets/mascot.svg';

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 5vh 1vw;
  background-color: #fff;
`;

const MascotImage = styled.img`
  width: clamp(120px, 24vh, 180px);
  height: auto;
  margin-bottom: 4vh;
`;

const Title = styled.h2`
  font-size: clamp(18px, 5vw, 24px);
  font-weight: bold;
  margin-bottom: 2vh;
  text-align: center;
`;

const Subtitle = styled.p`
  font-size: clamp(12px, 3vw, 16px);
  color: #666;
  margin-bottom: 4vh;
  /*text-align: center;*/
`;

const ServiceList = styled.ul`
  display: block;
  justify-content: baseline;
  list-style-type: none;
  padding: 0;
  margin-bottom: 4vh;
  width: 100%;
  max-width: min(280px, 90vw);
`;

const ServiceItem = styled.li`
  display: flex;
  align-items: center;
  margin-left: 5vw;
  margin-right: 1vw;
  margin-bottom: 2vh;
  font-size: clamp(12px, 3vw, 16px);
`;

const CheckIcon = styled.img`
  width: clamp(16px, 4vw, 20px);
  height: auto;
  margin-right: 2vw;
`;

const StyledKakaoButton = styled(KakaoLoginButton)`
  width: 100%;
  max-width: min(280px, 90vw);
`;


const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  // 백엔드로 인가 코드를 전달하여 엑세스 토큰을 받아오는 함수
  const exchangeCodeForToken = useCallback(async (code) => {
    try {
      // GET 요청으로 인가 코드를 백엔드에 전달
      const response = await fetch(`http://localhost:8080/api/auth/kakao/login?code=${code}`, {
        method: 'GET',
        credentials: 'include'  // 쿠키 포함해서 요청
      });
      
      // JSON 응답에서 토큰 정보 추출
      const data = await response.json();

      // 엑세스 토큰을 로컬 스토리지에 저장
      localStorage.setItem('accessToken', data.accessToken);

      // /match 페이지로 리다이렉트
      navigate('/match');
    } catch (error) {
      console.error('토큰 교환 실패:', error);
      setIsLoading(false);
    }
  }, [navigate]);

  // 카카오에서 받은 인가 코드를 확인하고 백엔드로 전달
  useEffect(() => {
    const code = new URLSearchParams(location.search).get('code');
    if (code) {
      // 인가 코드가 있으면 백엔드로 전송
      exchangeCodeForToken(code);
    } else {
      // 인가 코드가 없으면 토큰 발급 요청을 하지 않고 로딩 중지
      setIsLoading(false);
    }
  }, [location, exchangeCodeForToken]);
  
  

   // 카카오 로그인 버튼 클릭 시 인증 요청
  const handleKakaoLogin = () => {
    window.location.href = 'https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=262c56061ee06d4004d2f9b94db133a4&redirect_uri=http://192.168.0.35:3000/login';  // 클라이언트로 리다이렉트 설정
  };
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <LoginContainer>
      <MascotImage src={mascotIcon} alt="Mascot" />
      <Title>
        로그인하고 <span role="img" aria-label="soccer ball">⚽</span>을 차러 가볼까요?
      </Title>
      <Subtitle>로그인이 필요한 서비스에요.</Subtitle>
      <ServiceList>
        <ServiceItem>
          <CheckIcon src={checkIcon} alt="check" />
          경기 상대 모집하기
        </ServiceItem>
        <ServiceItem>
          <CheckIcon src={checkIcon} alt="check" />
          용병 모집/신청하기
        </ServiceItem>
        <ServiceItem>
          <CheckIcon src={checkIcon} alt="check" />
          구단 관리/합류하기
        </ServiceItem>
      </ServiceList>
      <StyledKakaoButton onClick={handleKakaoLogin} />
    </LoginContainer>
  );
};

export default Login;