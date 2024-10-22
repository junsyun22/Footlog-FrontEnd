import { useEffect, useState } from 'react';

function SelectClubList({ onSelect }) {
  const [clubList, setClubList] = useState(null);

  useEffect(() => {
    const getClubList = async () => {
      try {
        const response = await fetch(
          'http://192.168.0.12:8080/api/clubs/my-clubs',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
            credentials: 'include',
          }
        );

        if (!response.ok) {
          throw new Error('요청 실패');
        }

        const result = await response.json();
        setClubList(result);
      } catch (error) {
        console.error('클럽 목록을 가져오는 중 에러 발생:', error);
      }
    };

    getClubList();
  }, []);

  const handleClubSelect = (e) => {
    const selectedClubId = e.target.value;
    onSelect(selectedClubId);
  };

  return (
    <>
      {clubList === null ? (
        <p>가입한 클럽 정보가 없습니다</p>
      ) : (
        <select id="club" required onChange={handleClubSelect}>
          <option value="">클럽을 선택해주세요</option>
          {clubList.map((club) => (
            <option key={club.clubId} value={club.clubId}>
              {club.clubName}
            </option>
          ))}
        </select>
      )}
    </>
  );
}

export default SelectClubList;
