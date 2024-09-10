// JSON 파일로부터 매치 정보를 가져와서 여러 가지 함수로 검색 및 필터링하는 모듈
import clubs from '../data/Club.json';

// 생성된 클럽 리스트 가져오기
export function getClubList() {

    return clubs;
}


// 클럽 코드가 같은 클럽 가져오기
export function getClub(clubCode) {
    console.log(clubs);

    return clubs.filter(club => club.Code === parseInt(clubCode))[0];
}