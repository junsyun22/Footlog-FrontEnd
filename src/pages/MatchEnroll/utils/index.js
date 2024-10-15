export const convertPlayerQuantity = (quantity) => {
  // 문자열을 숫자로 변환하여 반환
  const quantityNumber = parseInt(quantity, 10);

  if (quantityNumber >= 4 && quantityNumber <= 11) {
    return quantityNumber;
  } else {
    throw new Error('Invalid match player quantity');
  }
};

export const convertMatchGender = (gender) => {
  switch (gender) {
    case 'MALE':
      return 'MALE';
    case 'FEMALE':
      return 'FEMALE';
    case 'MIX':
      return 'MIX';
    default:
      throw new Error('Invalid match gender');
  }
};

export const convertMatchStatus = (status) => {
  switch (status) {
    case 'WAITING':
      return 'WAITING';
    case 'IN_PROGRESS':
      return 'IN_PROGRESS';
    case 'FINISHED':
      return 'FINISHED';
    default:
      throw new Error('Invalid match status');
  }
};

export const calculateEndTime = (matchStartTime, matchTime) => {
  // 시작 시간을 "HH:mm" 형식의 문자열에서 시(hour)와 분(minute)을 분리합니다.
  const [startHour, startMinute] = matchStartTime.split(':').map(Number);

  // Date 객체를 사용하여 계산을 쉽게 할 수 있도록 합니다.
  const startDate = new Date();
  startDate.setHours(startHour);
  startDate.setMinutes(startMinute);

  // matchTime이 시간 단위로 주어졌으므로 이를 분으로 변환합니다.
  const matchTimeInMinutes = matchTime * 60; // 시간 단위 => 분 단위로 변환

  // 경기 시간을 분 단위로 더합니다.
  startDate.setMinutes(startDate.getMinutes() + matchTimeInMinutes);

  // 종료 시간의 시(hour)와 분(minute)을 추출하여 "HH:mm" 형식으로 반환합니다.
  const endHour = String(startDate.getHours()).padStart(2, '0');
  const endMinute = String(startDate.getMinutes()).padStart(2, '0');
  const result = `${endHour}:${endMinute}`;

  console.log(result);
  return result;
};
