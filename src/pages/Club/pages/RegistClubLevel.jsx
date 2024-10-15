import { useNavigate } from 'react-router-dom'; // useNavigate 훅 사용
import { useState, useEffect } from 'react';
import useClubStore from '@/hooks/useClubStore';
import api from '@/config/axiosConfig';  // axios import 추가

// 한글 레벨과 영어 enum 값을 매핑하는 객체
const levelMap = {
  '입문자': 'BEGINNER',
  '아마추어': 'AMATEUR',
  '세미프로': 'SEMI_PRO',
  '프로': 'PRO',
  '월드클래스': 'WORLD_CLASS',
};

const reverseLevelMap = {
  'BEGINNER': '입문자',
  'AMATEUR': '아마추어',
  'SEMI_PRO': '세미프로',
  'PRO': '프로',
  'WORLD_CLASS': '월드클래스',
};

function RegistClubLevel() {
  const navigate = useNavigate();
  const { clubName, clubCode, schedule, location, ageGender, clubLevel = {}, setClubLevel, reset } = useClubStore(); // zustand 상태 불러오기
  const [selectedLevel, setSelectedLevel] = useState(reverseLevelMap[clubLevel.level] || '');
  const [gauge, setGauge] = useState(clubLevel.gauge || 0);

  const levels = ['입문자', '아마추어', '세미프로', '프로', '월드클래스'];
  const descriptions = {
    '입문자': '이제 축구를 시작해 기초부터 배우는 중',
    '아마추어': '축구를 시작한 지 얼마 안 돼 서툰 기본기',
    '세미프로': '일반인 에이스, 안정적인 공격과 수비',
    '프로': '고등학교 이상 또는 대학 선수 실력',
    '월드클래스': '프로 선수 실력'
  };

  useEffect(() => {
    if (clubLevel?.level) {
      setSelectedLevel(reverseLevelMap[clubLevel.level]);
      setGauge(clubLevel.gauge);
    }
  }, [clubLevel]);

  const handleLevelClick = (level, gaugeValue) => {
    setSelectedLevel(level);
    setGauge(gaugeValue);
  };

  const handleSubmit = async () => {
    if (selectedLevel) {
      setClubLevel(levelMap[selectedLevel], gauge);

      const data = {
        clubName,
        clubCode,
        erollDate: new Date().toISOString(),
        days: schedule.days,
        times: schedule.times,
        clubLevel: levelMap[selectedLevel],
        stadiumName: location.stadiumName,
        city: location.city,
        region: location.region,
        ageGroup: ageGender.ageGroup,
        gender: ageGender.gender
      };

      try {
        const response = await api.post('/api/clubs', data);

        if (response.status === 200 || response.status === 201) {
          reset();
          navigate('/club/regist/success');
        } else {
          console.error('서버 오류:', response.statusText);
          alert('등록에 실패했습니다. 다시 시도해주세요.');
        }
      } catch (error) {
        console.error('요청 실패:', error);
        if (error.response && error.response.status === 401) {
          alert('인증이 만료되었습니다. 다시 로그인해주세요.');
          navigate('/login');
        } else {
          alert('서버와 통신 중 오류가 발생했습니다.');
        }
      }
    } else {
      alert('실력을 선택해주세요.');
    }
  };

  return (
    <div className="mt-6 ml-6 mr-6">
      <h2 className="text-lg font-bold">구단 실력을 선택해주세요</h2>
      <p className="text-sm text-muted-foreground">정확하지 않아도 돼요. 나중에 수정할 수 있어요</p>

      <div className="mt-4">
        <div className="flex justify-between">
          {levels.map((level, index) => (
            <button
              key={level}
              onClick={() => handleLevelClick(level, (index + 1) * 2)}
              className={`m-2 p-4 rounded-lg border ${selectedLevel === level ? 'border-[#16C79A] text-[#16C79A]' : 'border-primary text-black'}`}
            >
              {level}
            </button>
          ))}
        </div>

        <div className="flex mt-6">
          {[...Array(10)].map((_, index) => (
            <div
              key={index}
              className={`w-8 h-8 m-1 ${index < gauge ? 'bg-[#16C79A]' : 'bg-gray-300'}`}
            ></div>
          ))}
        </div>

        {selectedLevel && (
          <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <p><strong>{selectedLevel}</strong></p>
            <p>{descriptions[selectedLevel]}</p>
          </div>
        )}
      </div>

      <div className="mt-6 flex justify-between">
        <button
          className="p-2 rounded-lg w-1/2 mr-2"
          onClick={() => navigate('/club/regist/age-gender')}
          style={{ backgroundColor: 'rgb(235, 248, 245)', color: 'rgb(92, 196, 157)' }}
        >
          뒤로
        </button>
        <button
          className="p-2 rounded-lg w-1/2 ml-2"
          onClick={handleSubmit}
          style={{ backgroundColor: 'rgb(92, 196, 157)', color: 'rgb(235, 248, 245)' }}
        >
          등록하기
        </button>
      </div>
    </div>
  );
}

export default RegistClubLevel;
