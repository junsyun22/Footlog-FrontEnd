import clubStyle from './ClubInfo.module.css';


// 로고 이미지 파일들을 import
import logo1 from '../images/logo1.png';
import logo2 from '../images/logo2.png';
import logo3 from '../images/logo3.png';
import logo4 from '../images/logo4.png';
import logo5 from '../images/logo5.png';
import logo6 from '../images/logo6.png';
import logo7 from '../images/logo7.png';
import logo8 from '../images/logo8.png';
import logo9 from '../images/logo9.png';
import logo10 from '../images/logo10.png';

// 로고를 배열로 관리(임시)
const logos = [logo1, logo2, logo3, logo4, logo5, logo6, logo7, logo8, logo9, logo10];

// 영어 enum 값을 한글로 변환하는 매핑 객체
const reverseLevelMap = {
  'BEGINNER': '입문자',
  'AMATEUR': '아마추어',
  'SEMI_PRO': '세미프로',
  'PRO': '프로',
  'WORLD_CLASS': '월드클래스',
};


function ClubInfo({ club, onClick }) {
  const statusClass =
    club.clubStatus === '모집 완료' ? clubStyle.statusClosed : clubStyle.statusOpen;

    // 클럽 ID를 기반으로 로고를 선택, 10개 이상 클럽이 있다면 clubId를 10으로 나눈 나머지를 사용해 로고 선택
  const logoIndex = (club.clubId - 1) % logos.length;
  const selectedLogo = logos[logoIndex];

  return (
    <div className={clubStyle.container} onClick={onClick}>
      <img src={selectedLogo} alt={club.clubName} className={clubStyle.logo} /> {/* 로고 렌더링 */}
      <div className={clubStyle.details}>
        <div className={clubStyle.header}>
          <span className={clubStyle.clubName}>{club.clubName}</span>  {/* 클럽 이름 표시 */}
          <span className={clubStyle.playerQuantity}>👥 회원수 : {club.memberCount}</span>  {/* 구단원 수 표시 */}
          <span className={`${clubStyle.clubStatus} ${statusClass}`}>
            {club.clubStatus}
          </span>
        </div>
        <div className={clubStyle.subInfo}>
          <span>🏃 지역 : {club.city} * 🏠 홈구장 : {club.stadiumName}</span>  {/* 활동 지역 및 경기장 */}
          <span>👫 성별 : {club.gender} * 🙂 연령대 : {club.ageGroup}</span>  {/* 성별, 종목, 연령대 */}
          <span>⏰ 활동 시간대 : {club.times} * 💪 실력 : {reverseLevelMap[club.clubLevel] || '정보 없음'}</span>  {/* 활동 시간대 및 실력 */}
        </div>
      </div>
    </div>
  );
}

export default ClubInfo;
