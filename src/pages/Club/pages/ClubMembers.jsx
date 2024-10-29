import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '@/config/axiosConfig';
import styles from './ClubMembers.module.css';

function ClubMembers() {
  const { clubId } = useParams();
  const [members, setMembers] = useState([]);
  const [joinRequests, setJoinRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasPermission, setHasPermission] = useState(false);

  // 역할 매핑
  const roleMap = {
    OWNER: '구단주',
    MANAGER: '매니저',
    MEMBER: '구단원'
  };

  // 구단원 목록 조회
  const fetchMembers = async () => {
    try {
      const response = await api.get(`/api/club-members/${clubId}/members`);
      setMembers(response.data);
    } catch (error) {
      setError('구단원 목록을 불러오는데 실패했습니다.');
      console.error('구단원 목록 조회 오류:', error);
    }
  };

  // 가입 요청 승인
  const handleApprove = async (requestId) => {
    try {
      await api.put(`/api/club-members/${clubId}/requests/${requestId}/approve`);
      alert('가입 요청이 승인되었습니다.');
      // 승인된 요청을 목록에서 제거하고 구단원 목록 업데이트
      setJoinRequests(prev => prev.filter(request => request.id !== requestId));
      fetchMembers(); // 구단원 목록 새로고침
    } catch (error) {
      alert('가입 요청 승인에 실패했습니다.');
      console.error('가입 요청 승인 오류:', error);
    }
  };

  // 가입 요청 거절
  const handleReject = async (requestId) => {
    try {
      await api.put(`/api/club-members/${clubId}/requests/${requestId}/reject`);
      alert('가입 요청이 거절되었습니다.');
      fetchMembers(); // 목록 새로고침
    } catch (error) {
      alert('가입 요청 거절에 실패했습니다.');
      console.error('가입 요청 거절 오류:', error);
    }
  };

 // 역할 변경 함수
const handleRoleChange = async (userId, newRole) => {
    try {
      // 서버와 일치하는 ENUM 값으로 변경 (대문자 변환)
      const formattedRole = newRole.toUpperCase(); // 역할 값이 예: "MANAGER", "MEMBER" 형식으로 전달되도록 함
  
      // 역할 수정 API 호출
      await api.put(`/api/club-members/${clubId}/${userId}/role?role=${formattedRole}`);
      alert('구단원 역할이 변경되었습니다.');
      fetchMembers(); // 목록 새로고침
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        alert(`역할 변경 실패: ${error.response.data.message}`);
      } else {
        alert('역할 변경에 실패했습니다.');
      }
      console.error('역할 변경 오류:', error);
    }
  };

  useEffect(() => {
    const checkPermission = async () => {
      try {
        const response = await api.get(`/api/club-members/${clubId}/permissions`);
        setHasPermission(response.data.hasPermission);
      } catch (error) {
        console.error('권한 확인 오류:', error);
      }
    };

    const fetchJoinRequests = async () => {
      try {
        const response = await api.get(`/api/club-members/${clubId}/requests`);
        setJoinRequests(response.data);
      } catch (error) {
        console.error('가입 요청 목록 조회 오류:', error);
      }
    };

    checkPermission();
    fetchMembers();
    if (hasPermission) {
      fetchJoinRequests();
    }
    setLoading(false);
  }, [clubId, hasPermission]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.mainTitle}>구단 관리</h1>
      
      {/* 가입 요청 섹션 - 구단주/매니저만 볼 수 있음 */}
      {hasPermission && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>가입 요청 목록</h2>
          {joinRequests.length === 0 ? (
            <p className={styles.emptyMessage}>가입 요청이 없습니다.</p>
          ) : (
            <div className={styles.list}>
              {joinRequests.map(request => (
                <div key={request.id} className={styles.item}>
                  <div className={styles.userInfo}>
                    <span className={styles.userName}>{request.member.name}</span>
                  </div>
                  <div className={styles.actions}>
                    <button 
                      className={styles.approveBtn} 
                      onClick={() => handleApprove(request.id)}
                    >
                      승인
                    </button>
                    <button 
                      className={styles.rejectBtn} 
                      onClick={() => handleReject(request.id)}
                    >
                      거절
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 구단원 목록 섹션 */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>구단원 목록</h2>
        {members.length === 0 ? (
          <p className={styles.emptyMessage}>등록된 구단원이 없습니다.</p>
        ) : (
          <div className={styles.list}>
            {members.map(member => (
              <div key={member.id} className={styles.item}>
                <div className={styles.userInfo}>
                  <span className={styles.userName}>{member.username}</span>
                </div>
                {hasPermission ? (
                  // 구단주/매니저인 경우
                  <>
                    {member.role === 'OWNER' ? (
                      // 구단주인 경우 select 없이 표시만
                      <span className={styles.roleDisplay}>{roleMap[member.role]}</span>
                    ) : (
                      // 구단주가 아닌 경우 select로 역할 변경 가능
                      <select
                        className={styles.roleSelect}
                        value={member.role}
                        onChange={(e) => handleRoleChange(member.userId, e.target.value)}
                      >
                        {Object.entries(roleMap)
                          .filter(([key]) => key !== 'OWNER')
                          .map(([key, value]) => (
                            <option key={key} value={key}>{value}</option>
                          ))}
                      </select>
                    )}
                  </>
                ) : (
                  // 일반 구단원인 경우 역할만 표시
                  <span className={styles.roleDisplay}>{roleMap[member.role]}</span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={styles.buttonContainer}>
        <button 
          className={styles['back-btn']} 
          onClick={() => window.history.back()}
        >
          뒤로 가기
        </button>
      </div>
    </div>
  );
}

export default ClubMembers;
