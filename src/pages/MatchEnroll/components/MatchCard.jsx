import { useNavigate } from 'react-router-dom';
import ClubLevelBadge from './badge/ClubLevelBadge';
import MatchStatusBadge from './badge/MatchStatusBadge';
import { getCardBackgroundStyles } from '../utils';

function MatchCard({ match }) {
  const navigate = useNavigate();

  let {
    matchId,
    matchEnrollUserId,
    matchApplyUserId,
    myClub: {
      clubName: myClubName,
      clubIntroduction: myClubIntroduction,
      clubLevel: myClubLevel,
      stadiumName: myClubStadium,
      city: myClubCity,
      region: myClubRegion,
    },
    enemyClub,
    matchPhoto,
    matchIntroduce,
    matchSchedule: { matchDate, matchStartTime, matchEndTime },
    matchPlayerQuantity,
    quarterQuantity,
    fieldLocation,
    matchCost,
    pro: { isPro, proQuantity },
    clubLevel,
    matchGender,
    matchStatus,
  } = match;

  let { clubName: enemyClubName = '상대가 아직 없습니다.' } = enemyClub || {};

  const handleClick = () => {
    navigate(`/match/${matchId}`);
  };

  return (
    <div
      className={`max-w-[400px] w-full rounded overflow-hidden shadow-lg ${getCardBackgroundStyles(matchStatus)} mb-4 hover:cursor-pointer`}
      onClick={handleClick}
    >
      <div className="w-full p-4">
        <div className="font-bold text-xl mb-2">
          {myClubName} vs {enemyClubName}
        </div>

        <p className="text-gray-700 text-base mb-2">{matchIntroduce}</p>

        <p className="text-sm text-gray-600">📍 {fieldLocation}</p>

        <p className="text-sm text-gray-600">
          ⏰ {matchStartTime.toLocaleString()} - {matchEndTime.toLocaleString()}
        </p>

        <p className="text-sm text-gray-600">
          👥 플레이어: {matchPlayerQuantity}
        </p>
        <p className="text-sm text-gray-600">⚽️ 쿼터수: {quarterQuantity}</p>
      </div>

      <div className="p-4 flex flex-wrap items-center space-x-2">
        <div className="bg-blue-200 text-blue-700 rounded-full px-2 py-1 text-sm font-semibold flex items-center space-x-1">
          <span>Cost: {matchCost} 만원</span>
        </div>
        <ClubLevelBadge level={clubLevel} />
        <MatchStatusBadge status={matchStatus} />
      </div>
    </div>
  );
}

export default MatchCard;
