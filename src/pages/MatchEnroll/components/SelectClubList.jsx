import { useEffect, useState } from 'react';
import { getMyClubList } from '../services/club';

function SelectClubList({ onSelect }) {
  const [clubList, setClubList] = useState(null);

  useEffect(() => {
    const fetchMyClubList = async () => {
      const result = await getMyClubList();
      setClubList(result);
    };
    fetchMyClubList();
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
