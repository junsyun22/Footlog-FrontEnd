import { useState, useEffect } from 'react';
import MatchCard from './components/MatchCard';
import EnrollMatchButton from './components/EnrollButton';
import { getMatchList } from './services/match';

function MatchListPage() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatches = async () => {
      setLoading(true);
      const data = await getMatchList();
      if (data) {
        setMatches(data);
      } else {
        setError('Failed to fetch matches');
      }
      setLoading(false);
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
    <div className="w-full flex flex-col items-center pb-20">
      <h2 className="font-bold text-2xl text-left">경기 목록 리스트</h2>
      {matches.map((match) => (
        <MatchCard key={match.matchId} match={match} />
      ))}
      <EnrollMatchButton />
    </div>
  );
}

export default MatchListPage;
