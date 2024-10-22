import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MatchDetailCard from './components/MatchDetailCard';
import { getMatcheDetail, applyForMatch } from './services/match';

function MatchDetailPage() {
  const { matchId } = useParams();
  const [matchDetails, setMatchDetails] = useState(null);

  useEffect(() => {
    const fetchMatchDetails = async () => {
      const data = await getMatcheDetail(matchId);
      if (data) {
        setMatchDetails(data);
      }
    };
    if (matchId) {
      fetchMatchDetails();
    }
  }, [matchId]);

  const handleApplyClick = async () => {
    try {
      const result = await applyForMatch(matchId);
      if (result) {
        alert('참가 신청이 완료되었습니다.');
      }
    } catch (error) {
      console.error('Failed to apply for match:', error);
      alert('참가 신청에 실패했습니다.');
    }
  };

  if (!matchDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-2">
      <MatchDetailCard match={matchDetails} onApplyClick={handleApplyClick} />
    </div>
  );
}

export default MatchDetailPage;
