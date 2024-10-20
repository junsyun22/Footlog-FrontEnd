function MatchStatusBadge({ status }) {
  const getStatusStyles = (status) => {
    switch (status) {
      case 'WAITING':
        return 'bg-gray-100 text-gray-800';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'ACCEPTED':
        return 'bg-green-100 text-green-800';
      case 'PLAYING':
        return 'bg-blue-100 text-blue-800';
      case 'FINISHED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-sm font-semibold ${getStatusStyles(status)}`}
    >
      {status}
    </span>
  );
}

export default MatchStatusBadge;
