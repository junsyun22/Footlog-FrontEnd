
import { Map } from 'react-kakao-maps-sdk';

import { useState, useEffect } from 'react';
import { Map } from 'react-kakao-maps-sdk';
import { getMatchDetail } from './apis/MatchAPI';
import styled from '@emotion/styled';
import ImageSlider from './ImageSlider';

// 매치 정보의 스타일 정의
const MatchBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2vh 2vw; /* 상하 좌우 패딩 */
  margin: auto;
`;

const MatchInfo = styled.div`
  width: 100%;
  margin-top: 2vh;
  ul {
    list-style: none;
    padding: 0;
  }
  li {
    margin-bottom: 1vh;
    font-size: 16px;
  }
`;

const MatchDescription = styled.div`
  width: 100%;
  margin-top: 2vh;
  text-align: center;
  p {
    font-size: 14px;
    line-height: 1.5;
  }
`;

const JoinButton = styled.button`
  background-color: #16c79a;
  color: white;
  border: none;
  padding: 1vh 2vw;
  border-radius: 20px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 3vh;

  &:hover {
    background-color: #13a682;
  }
`;

const MapContainer = styled.div`
  width: 100%;
  height: 400px;
  margin-top: 2vh;
  border-radius: 10px;
  overflow: hidden;
`;

const MatchDetail = () => {
  const matchCode = 1;

  const [match, setMatch] = useState({
    matchCode: matchCode,
    myClub: {},
    enemyClub: {},
    matchName: '',
    matchPhoto: '',
    matchIntroduce: '',
    matchSchedule: {},
    matchPlayerQuantity: 0,
    quarterQuantity: 1,
    fieldLocation: '',
    matchCost: 0,
    clubLevel: '',
    pro: 0,
    gender: ''
  });

  useEffect(() => {
    const fetchMatchDetail = async () => {
      try {
        const matchData = await getMatchDetail(matchCode);
        setMatch(matchData);
      } catch (error) {
        console.error('Failed to fetch match details:', error);
      }
    };

    fetchMatchDetail();
  }, [matchCode]);

  const slides = match.myClub.preSet || [];

  const containerStyles = {
    width: "100%",
    height: "280px",
    margin: "0 auto"
  };

  return (
    <MatchBox>
      <h3>{match.myClub.clubName}와(과) {match.enemyClub.clubName}의 경기</h3>
      <img src={match.matchPhoto} alt={`Image${matchCode}`} style={{ width: '100%', borderRadius: '10px' }} />

      <h3>{match.myClub.clubName}의 매치 설명</h3>
      <MatchDescription>
        <p>{match.matchIntroduce}</p>
      </MatchDescription>

      <h3>매치 정보</h3>
      <MatchInfo>
        <ul>
          <li><h3>구단 이름 : {match.myClub.clubName}</h3></li>
          <li><h3>경기 날짜/시간 : {match.matchSchedule.matchDate} {match.matchSchedule.matchStartTime} ~ {match.matchSchedule.matchEndTime}</h3></li>
          <li><h3>경기 인원 : {match.matchPlayerQuantity}명</h3></li>
          <li><h3>쿼터 수 : {match.matchSchedule.matchTime / 30}</h3></li>
          <li><h3>구장 정보 : {match.fieldLocation}</h3></li>
          <li>
            <MapContainer>
              <Map
                center={{ lat: 33.5563, lng: 126.79581 }}
                style={{ width: '100%', height: '100%' }}
                level={3}
              />
            </MapContainer>
          </li>
          <li><h3>매치 비용 : {match.matchCost}원</h3></li>
          <li><h3>구단 실력 : {match.clubLevel}</h3></li>
          <li><h3>선출 수 : {match.pro}</h3></li>
          <li><h3>성별: {match.gender}</h3></li>
        </ul>
      </MatchInfo>

      <h3>{match.myClub.clubName}의 라인업</h3>
      <div style={containerStyles}>
        <ImageSlider slides={slides} />
      </div>

    return (
        <div className={matchStyle.MatchBox}>
            {/* 경기 정보 */}
            <h3>{match.myClub.clubName}와(과) {match.enemyClub.clubName}의 경기</h3>
            <img src={match.matchPhoto} alt={`Image${matchCode}`} /> {/* 경기 사진 표시 */}

            {/* 매치 설명 */}
            <h3>{match.myClub.clubName}의 매치 설명</h3>
            <div className={matchStyle.matchDescription}>
                <p>{match.matchIntroduce}</p>
            </div>

            {/* 매치 정보 */}
            <h3>매치 정보</h3>
            <div className={matchStyle.MatchInfo}>
                <ul>
                    <li><h3>구단 이름 : {match.myClub.clubName}</h3></li>
                    <li><h3>경기 날짜/시간 : {match.matchSchedule.matchDate} {match.matchSchedule.matchStartTime} ~ {match.matchSchedule.matchEndTime}</h3></li>
                    <li><h3>경기 인원 : {match.matchPlayerQuantity}명</h3></li>
                    <li><h3>쿼터 수 : {match.matchSchedule.matchTime / 30}</h3></li>
                    <li><h3>구장 정보 : {match.fieldLocation}</h3></li>

                    <Map
                        center={{ lat: 33.5563, lng: 126.79581 }}   // 지도의 중심 좌표
                        style={{ width: '100%', height: '400px' }} // 지도 크기
                        level={3}                                   // 지도 확대 레벨
                    >
                    </Map>

                    <li><h3>매치 비용 : {match.matchCost}원</h3></li>
                    <li><h3>구단 실력 : {match.clubLevel}</h3></li>
                    <li><h3>선출 수 : {match.pro}</h3></li>
                    <li><h3>성별: {match.gender}</h3></li>
                </ul>
            </div>

            {/* 클럽 라인업 */}
            <h3>{match.myClub.clubName}의 라인업</h3>
            <div style={containerStyles}>
                <ImageSlider slides={slides} /> {/* 라인업 슬라이더 */}
            </div>

            {/* 참가하기 버튼 */}
            <div>
                <button className={matchStyle.joinButton}>참가하기</button>
            </div>
        </div>
    );
}

export default MatchDetail;
