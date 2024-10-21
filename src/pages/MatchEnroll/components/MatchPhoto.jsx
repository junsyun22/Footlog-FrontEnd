function MatchPhoto({ matchPhoto }) {
  return (
    <div>
      {matchPhoto ? (
        <img
          className="w-full h-48 object-cover"
          src={match.matchPhoto}
          alt={`${match.myClub.clubName} vs ${match.enemyClub.clubName}`}
        />
      ) : (
        <img
          className="w-full h-48 object-cover"
          src="/path/to/default-image.jpg" // 기본 이미지 경로
          alt="default match"
        />
      )}
    </div>
  );
}

export default MatchPhoto;
