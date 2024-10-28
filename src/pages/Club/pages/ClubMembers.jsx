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
      fetchMembers(); // 목록 새로고침
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

  // 역할 변경
  const handleRoleChange = async (userId, newRole) => {
    try {
      await api.put(`/api/club-members/${clubId}/${userId}/role?role=${newRole}`);
      alert('구단원 역할이 변경되었습니다.');
      fetchMembers(); // 목록 새로고침
    } catch (error) {
      alert('역할 변경에 실패했습니다.');
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

    checkPermission();
    fetchMembers();
    setLoading(false);
  }, [clubId]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.container}>
      <h2>구단원 관리</h2>
      
      {hasPermission && joinRequests.length > 0 && (
        <div className={styles.requestsSection}>
          <h3>가입 요청</h3>
          {joinRequests.map(request => (
            <div key={request.id} className={styles.requestItem}>
              <span>{request.userName}</span>
              <div className={styles.actions}>
                <button onClick={() => handleApprove(request.id)}>승인</button>
                <button onClick={() => handleReject(request.id)}>거절</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className={styles.membersSection}>
        <h3>구단원 목록</h3>
        {members.map(member => (
          <div key={member.id} className={styles.memberItem}>
            <span>{member.name}</span>
            {hasPermission && (
              <select
                value={member.role}
                onChange={(e) => handleRoleChange(member.id, e.target.value)}
                disabled={member.role === 'OWNER'}
              >
                {Object.entries(roleMap).map(([key, value]) => (
                  <option key={key} value={key}>{value}</option>
                ))}
              </select>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ClubMembers;
