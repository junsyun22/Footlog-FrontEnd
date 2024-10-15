import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 사용
import useClubStore from '@/hooks/useClubStore'; 


function RegistAgeGender() {
    const navigate = useNavigate();

    
    // zustand에서 상태 가져오기
    const { ageGender, setAgeGender } = useClubStore();
    
    // 가져온 zustand 상태를 컴포넌트가 마운트될 때만 초기 상태로 설정
    const [selectedAgeGroup, setSelectedAgeGroup] = useState('');
    const [selectedGender, setSelectedGender] = useState('');

    const ageGroups = ['10대', '20대', '30대', '40대', '50대', '60대 이상'];
    const genders = ['남자', '여자', '남녀 모두'];
    
   // zustand 상태를 한 번만 초기화 (이 부분은 처음 로드될 때 한 번만 실행)
    useEffect(() => {
        if (ageGender.ageGroup) setSelectedAgeGroup(ageGender.ageGroup);
        if (ageGender.gender) setSelectedGender(ageGender.gender);
    }, [ageGender]);


    const handleAgeGroupClick = (ageGroup) => {
        setSelectedAgeGroup(ageGroup);
    };


    const handleGenderClick = (gender) => {
        setSelectedGender(gender);
    };

    const handleSubmit = () => {
        setAgeGender(selectedAgeGroup, selectedGender); // zustand 상태 업데이트
        navigate('/club/regist/club-level'); // 다음 페이지로 이동
    };

    const goBack = () => {
        navigate('/club/regist/location'); // 이전 페이지로 이동
    };


    return (
        <div className="mt-6 ml-6 mr-6">
            <h2 className="text-lg font-bold">어떤 사람들이 모여있나요?</h2>

            {/* 나이대 선택 */}
            <div className="mt-4">
                <label className="block text-muted-foreground">주요 나이대</label>
                <div className="flex flex-wrap">
                    {ageGroups.map((ageGroup) => (
                        <button
                            key={ageGroup}
                            onClick={() => handleAgeGroupClick(ageGroup)}
                            className={`m-2 p-4 rounded-lg border ${
                                selectedAgeGroup === ageGroup
                                    ? 'border-[#16C79A] text-[#16C79A]'
                                    : 'border-primary text-black'
                            }`}
                        >
                            {ageGroup}
                        </button>
                    ))}
                </div>
            </div>

            {/* 성별 선택 */}
            <div className="mt-4">
                <label className="block text-muted-foreground">성별</label>
                <div className="flex flex-wrap">
                    {genders.map((gender) => (
                        <button
                            key={gender}
                            onClick={() => handleGenderClick(gender)}
                            className={`m-2 p-4 rounded-lg border ${
                                selectedGender === gender
                                    ? 'border-[#16C79A] text-[#16C79A]'
                                    : 'border-primary text-black'
                            }`}
                        >
                            {gender}
                        </button>
                    ))}
                </div>
            </div>

            <div className="mt-6 flex justify-between">
                <button
                    className="p-2 rounded-lg w-1/2 mr-2"
                    onClick={goBack}
                    style={{
                        backgroundColor: 'rgb(235, 248, 245)', // '뒤로' 버튼 배경색
                        color: 'rgb(92, 196, 157)', // '뒤로' 버튼 글자색
                    }}
                >
                    뒤로
                </button>
                <button
                    className="p-2 rounded-lg w-1/2 ml-2"
                    onClick={handleSubmit}
                    style={{
                        backgroundColor: 'rgb(92, 196, 157)', // '다음' 버튼 배경색
                        color: 'rgb(235, 248, 245)', // '다음' 버튼 글자색
                    }}
                >
                    다음
                </button>
            </div>
        </div>
    );
}

export default RegistAgeGender;
