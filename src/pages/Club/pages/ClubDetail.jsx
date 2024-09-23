import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useClubStore from '@/hooks/useClubStore';  // Zustand 훅
import styles from './ClubRegist.module.css'; // 외부 CSS 파일로 스타일을 관리.

function ClubDetail() {
    const { clubId } = useParams();  // URL 파라미터에서 clubId 추출
    const navigate = useNavigate();
    const { club, setClub } = useClubStore();  // Zustand에서 club 상태 및 setter 불러오기
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 구단 상세 정보를 가져오는 함수
    const fetchClubDetail = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/clubs/${clubId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            
            if (!response.ok) {
                throw new Error('구단 정보를 가져오지 못했습니다.');
            }

            const data = await response.json();
            setClub(data);  // Zustand 상태에 저장
            setLoading(false);
        } catch (error) {
            console.error(error);
            setError('구단 정보를 가져오는 중 오류가 발생했습니다.');
            setLoading(false);
        }
    };




    // 삭제 핸들러
    const handleDelete = async () => {
        const confirmDelete = window.confirm('정말로 이 구단을 삭제하시겠습니까?');
        if (confirmDelete) {
            try {
                const response = await fetch(`http://localhost:8080/api/clubs/${clubId}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    alert('구단이 삭제되었습니다.');
                    navigate('/clubs');  // 삭제 후 클럽 목록으로 이동
                } else {
                    throw new Error('구단 삭제에 실패했습니다.');
                }
            } catch (error) {
                console.error(error);
                alert('삭제 중 오류가 발생했습니다.');
            }
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
            <p className={styles['club-introduction']}>{club?.clubIntroduction}</p>

            <div className={styles['club-info']}>
                <p><strong>구단 코드:</strong> {club?.clubCode}</p>
                <p><strong>등록일:</strong> {new Date(club?.erollDate).toLocaleDateString()}</p>
                <p><strong>활동 요일:</strong> {club?.days.join(', ')}</p>
                <p><strong>활동 시간대:</strong> {club?.times.join(', ')}</p>
            </div>

            <div className={styles['club-actions']}>
                <button className={styles['edit-btn']} onClick={() => navigate(`/clubs/edit/${clubId}`)}>수정</button>
                <button className={styles['delete-btn']} onClick={handleDelete}>삭제</button>
            </div>
        </div>
    );
}

export default ClubDetail;