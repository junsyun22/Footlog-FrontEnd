import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useClubStore from '@/hooks/useClubStore';
import styles from './ClubRegist.module.css';
import api from '@/config/axiosConfig';

// 권한 에러 처리 함수
const handleAuthorizationError = (action) => {
  alert(`구단주나 매니저만 ${action}할 수 있습니다.`);
};

// 등록일 포맷 함수
const formatDate = (dateString) => {
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };
  const date = new Date(dateString);
  return date.toLocaleDateString('ko-KR', options);
};

function ClubDetail() {
  const { clubId } = useParams(); // URL 파라미터에서 clubId 추출
  const navigate = useNavigate();
  const { club, setClub } = useClubStore(); // Zustand에서 club 상태 및 setter 불러오기
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasPermission, setHasPermission] = useState(false); // 권한 확인 상태 추가
  const [isMember, setIsMember] = useState(false); // 이미 구단원인지 여부

  // 영어 enum 값을 한글로 변환하는 매핑 객체
  const reverseLevelMap = {
    BEGINNER: '입문자',
    AMATEUR: '아마추어',
    SEMI_PRO: '세미프로',
    PRO: '프로',
    WORLD_CLASS: '월드클래스',
  };

  // 구단 상세 정보를 가져오는 함수
  const fetchClubDetail = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get(`/api/clubs/${clubId}`);
      console.log("받아온 클럽 데이터:", data);  // 데이터 로깅
      setClub(data);

      // 구단원 여부 확인
      try {
        const memberResponse = await api.get(`/api/club-members/${clubId}/is-member`);
        setIsMember(memberResponse.data.isMember);
      } catch (memberError) {
        console.warn("구단원이 아닌 사용자입니다.");
        setIsMember(false); // 구단원이 아니더라도 화면을 보여주기 위해 false로 설정
      }

      // 권한 여부 확인
      try {
        const permissionResponse = await api.get(`/api/club-members/${clubId}/permissions`);
        setHasPermission(permissionResponse.data.hasPermission);
      } catch (permissionError) {
        console.warn("권한이 없는 사용자입니다.");
        setHasPermission(false); // 권한이 없더라도 정보는 보여주기 위해 false로 설정
      }

      setLoading(false);
    } catch (error) {
      console.error("구단 정보를 가져오는 중 오류:", error);
      setError("구단 정보를 가져오는 중 오류가 발생했습니다.");
      setLoading(false);
    }
  };

// 구단 가입요청 핸들러
const handleJoinClub = async () => {
  try {
    const { status, data } = await api.post(`/api/club-members/${clubId}/join`);
    if (status === 200) {
      alert('구단 가입 요청이 완료되었습니다. 구단주의 승인을 기다려주세요.');
    }
  } catch (error) {
    console.error('구단 가입 요청 중 오류:', error);
    alert(`구단 가입 요청에 실패했습니다. 사유: ${error.response?.data?.message || '서버에서 문제가 발생했습니다. 나중에 다시 시도해주세요.'}`);
  }
};

  // 구단 탈퇴 핸들러
  const handleLeaveClub = async () => {
    try {
      const { status } = await api.delete(`/api/club-members/${clubId}/leave`);
      if (status === 200) {
        alert('구단 탈퇴가 완료되었습니다.');
        setIsMember(false);
      }
    } catch (error) {
      console.error('구단 탈퇴 중 오류:', error);
      alert(`구단 탈퇴에 실패했습니다. 사유: ${error.response?.data?.message || '오류 발생'}`);
    }
  };

  // 삭제 핸들러
  const handleDelete = async () => {
    if (window.confirm('정말로 이 구단을 삭제하시겠습니까?')) {
      try {
        const { status } = await api.delete(`/api/clubs/${clubId}`);
        if (status === 200) {
          alert('구단이 삭제되었습니다.');
          navigate('/clublist');
        }
      } catch (error) {
        console.error('구단 삭제 중 오류:', error);
        if (error.response?.status === 403) {
          handleAuthorizationError('삭제');
        } else {
          alert('구단 삭제에 실패했습니다.');
        }
      }
    }
  };

  // 수정 핸들러
  const handleEdit = async () => {
    try {
      const { status } = await api.get(`/api/clubs/${clubId}/edit-check`);
      if (status === 200) {
        navigate(`/clubs/edit/${clubId}`);
      } else if (status === 403) {
        handleAuthorizationError('수정');
      }
    } catch (error) {
      console.error('구단 수정 권한 확인 중 오류:', error);
      alert('구단 수정 권한을 확인하는 중 오류가 발생했습니다.');
    }
  };

  // 컴포넌트가 처음 마운트될 때 구단 정보 로드
  useEffect(() => {
    fetchClubDetail();
  }, [clubId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles['club-detail-container']}>
      <h1 className={styles['club-title']}>{club?.clubName}</h1>
      <p className={styles['club-introduction']}><strong>구단 소개:</strong> {club?.clubIntroduction}</p>

      <div className={styles['club-info']}>
        <p><strong>구단 코드:</strong> {club?.club.clubCode || '정보 없음'}</p>
        <p><strong>등록일:</strong> {club?.club.createdAt ? formatDate(club.club.createdAt) : '정보 없음'}</p>
        <p><strong>주 활동구장:</strong> {club?.club.stadiumName || '정보 없음'}</p>
        <p><strong>도시:</strong> {club?.club.city || '정보 없음'}</p>
        <p><strong>지역:</strong> {club?.club.region || '정보 없음'}</p>
        <p><strong>활동 요일:</strong> {club?.club.days?.length ? club.club.days.join(', ') : '정보 없음'}</p>
        <p><strong>활동 시간대:</strong> {club?.club.times?.length ? club.club.times.join(', ') : '정보 없음'}</p>
        <p><strong>실력:</strong> {reverseLevelMap[club?.club.clubLevel] || '정보 없음'}</p>
      </div>

      <div className={styles['club-actions']}>
        {!isMember && <button className={styles['join-btn']} onClick={handleJoinClub}>구단 가입</button>}
        {isMember && !hasPermission && <button className={styles['leave-btn']} onClick={handleLeaveClub}>구단 탈퇴</button>}
        {hasPermission && (
          <>
            <button className={styles['edit-btn']} onClick={handleEdit}>수정</button>
            <button className={styles['delete-btn']} onClick={handleDelete}>삭제</button>
            <button className={styles['members-btn']} onClick={() => navigate(`/club/${clubId}/members`)}>구단원 관리</button>
          </>
        )}
        <button className={styles['back-btn']} onClick={() => navigate(`/clublist`)}>뒤로 가기</button>
      </div>
    </div>
  );
}

export default ClubDetail;
