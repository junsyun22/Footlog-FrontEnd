import { useState, useEffect } from 'react';
import MatchCard from './components/MatchCard';
import EnrollMatchButton from './components/EnrollButton';

function MatchListPage() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/matches');
        if (!response.ok) {
          throw new Error('네트워크 에러 확인하기.');
        }
        const data = await response.json();
        setMatches(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch matches:', error);
        setError(error);
        setLoading(false);
      }
    };
    fetchMatches();
  }, []);

  if (loading) {
    return <div>Loading matches...</div>;
  }

  if (error) {
    return <div>Error loading matches: {error.message}</div>;
  }

  return (
    <div className="w-full flex flex-col items-center">
      <h2 className="font-bold text-2xl text-left">경기 목록 리스트</h2>
      {matches.map((match) => (
        <MatchCard key={match.matchId} match={match} />
      ))}
      <EnrollMatchButton />
    </div>
  );
}

export default MatchListPage;
