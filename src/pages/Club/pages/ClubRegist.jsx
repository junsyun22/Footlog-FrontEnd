import useClubStore from '@/hooks/useClubStore'; // zustand store import
import { useState, useEffect } from 'react';
import styles from './ClubRegist.module.css'; // 외부 CSS 파일로 스타일을 관리.
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위한 useNavigate 사용
import api from '@/config/axiosConfig';  // api 대신 axiosConfig를 직접 import

function ClubRegist() {
  const navigate = useNavigate(); // 페이지 이동을 위한 훅
  
  const { clubName, clubCode, setClubInfo } = useClubStore(); // 상태 업데이트 함수 불러오기

  // zustand에 저장된 값을 컴포넌트의 로컬 상태에 설정
  const [name, setName] = useState(clubName || '');
  const [code, setCode] = useState(clubCode || '');
  const [nameError, setNameError] = useState('');  // 이름 중복 여부 에러 메시지
  const [codeError, setCodeError] = useState('');  // 코드 중복 여부 에러 메시지
  const [nameValid, setNameValid] = useState(true);  // 이름 유효성 여부
  const [codeValid, setCodeValid] = useState(true);  // 코드 유효성 여부

  // 유효성 검사 패턴 (공백을 허용하지 않도록 수정)
  const clubCodePattern = /^[a-zA-Z0-9]+$/; // 영문과 숫자만 허용, 공백 허용 안 함
  const clubNamePattern = /^[가-힣a-zA-Z0-9]+$/; // 한글, 영문, 숫자만 허용, 공백 허용 안 함

  useEffect(() => {
    // 만약 zustand에 값이 있으면 로컬 상태에 설정
    if (clubName) setName(clubName);
    if (clubCode) setCode(clubCode);
  }, [clubName, clubCode]);

  // 서버 중복 확인 함수 (구단 이름)
  const checkNameDuplicate = async () => {
    try {
      const response = await api.get(`/api/clubs/check-name?name=${name}`);
      if (response.data === true) {
        setNameError('이미 사용 중인 구단 이름입니다.');
        setNameValid(false);
      } else {
        setNameError('');
        setNameValid(true);
      }
    } catch (error) {
      console.error('서버와의 통신 오류:', error);
      setNameError('구단 이름 중복 확인 중 오류가 발생했습니다.');
      setNameValid(false);
    }
  };

  // 서버 중복 확인 함수 (구단 코드)
  const checkCodeDuplicate = async () => {
    try {
      const response = await api.get(`/api/clubs/check-code?code=${code}`);
      if (response.data === true) {
        setCodeError('이미 사용 중인 구단 코드입니다.');
        setCodeValid(false);
      } else {
        setCodeError('');
        setCodeValid(true);
      }
    } catch (error) {
      console.error('서버와의 통신 오류:', error);
      setCodeError('구단 코드 중복 확인 중 오류가 발생했습니다.');
      setCodeValid(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 유효성 검사
    if (!name) {
      setNameError('구단 이름을 입력하세요.');
      return;
    }

    if (name.length < 2 || name.length > 20) {
      setNameError('구단 이름은 2자 이상 20자 이하로 입력하세요.');
      return;
    }

    if (!clubNamePattern.test(name)) {
      setNameError('구단 이름은 한글, 영문, 숫자만 사용할 수 있으며, 공백은 허용되지 않습니다.');
      return;
    }

    if (!code) {
      setCodeError('구단 코드를 입력하세요.');
      return;
    }

    if (!clubCodePattern.test(code)) {
      setCodeError('구단 코드는 영문과 숫자로만 구성되어야 하며, 공백은 허용되지 않습니다.');
      return;
    }

    // 중복 여부가 유효할 때만 다음 단계로 이동
    await checkNameDuplicate(); // 중복 체크 먼저 수행
    await checkCodeDuplicate();

    if (nameValid && codeValid) {
      setClubInfo(name, code); // zustand 상태 업데이트
      navigate('/club/regist/schedule'); // 다음 페이지로 이동
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mt-6 ml-6 mr-6">
          <label className="block text-muted-foreground">구단 이름(2자 이상 20자 이하)</label>
          <input
            type="text"
            className={`border ${nameError ? 'border-red-500' : 'border-primary'} rounded-lg p-2 w-full`}
            placeholder="구단 이름을 입력하세요"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={checkNameDuplicate}  // 포커스가 벗어났을 때 중복 확인
          />
          {nameError && <p className="text-red-500 text-sm mt-2">{nameError}</p>} {/* 에러 메시지 표시 */}
        </div>

        <div className="mt-4 ml-6 mr-6">
          <label className="block text-muted-foreground">구단 코드(영문과 숫자로만 구성)</label>
          <input 
            type="text" 
            className={`border ${codeError ? 'border-red-500' : 'border-primary'} rounded-lg p-2 w-full`}
            placeholder="구단 코드를 입력하세요" 
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onBlur={checkCodeDuplicate}  // 포커스가 벗어났을 때 중복 확인
          />
          {codeError && <p className="text-red-500 text-sm mt-2">{codeError}</p>} {/* 에러 메시지 표시 */}
        </div>
        
        <p className="mt-4 ml-6 mr-6 text-sm text-muted-foreground">
          구단 URL 구단페이지 주소로 사용돼요<br />
          http://www.footlog.com/club/{code} {/* 구단 코드가 입력될 때마다 URL에 표시 */}
        </p>
        <div className='mt-4 ml-10 mr-6 text-sm text-muted-foreground w-full'>
        <button type="submit" className={styles.submitBtn}>다음</button>
        </div>
      </form>
    </>
  );
}

export default ClubRegist;
