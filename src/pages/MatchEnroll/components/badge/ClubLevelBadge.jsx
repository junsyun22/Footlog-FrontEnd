function ClubLevelBadge({ level }) {
  const getClubLevelStyles = (level) => {
    switch (level) {
      case '입문자':
        return 'bg-teal-100 text-teal-800';
      case '아마추어':
        return 'bg-purple-100 text-purple-800';
      case '세미프로':
        return 'bg-orange-100 text-orange-800';
      case '프로':
        return 'bg-indigo-100 text-indigo-800';
      case '월드클래스':
        return 'bg-pink-100 text-pink-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-sm font-semibold ${getClubLevelStyles(level)}`}
    >
      {level}
    </span>
  );
}

export default ClubLevelBadge;
