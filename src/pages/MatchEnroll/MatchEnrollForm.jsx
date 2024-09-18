import { useState } from 'react';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { postMatchEnroll } from './services/match';
import { FormContainer, Button } from './components/Basic';
import { InputField, SelectField, CheckboxField } from './components/FormField';
import KakaoMap from './components/KakaoMap';

const SearchFieldLocation = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%; /* Ensure full width for the search field container */
  margin: 0 auto; /* Center the container */
  box-sizing: border-box; /* Include padding and border in element's width */
`;

export const SearchButton = styled.button`
  flex-grow: 1;
  padding: 10px 5px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 5px;

  &:hover {
    background-color: #0056b3;
  }
`;

const SearchResults = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  max-height: 300px;
`;

const SearchResultItem = styled.li`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const PLAYER_COUNT_OPTIONS = ['11', '10', '9'];
const MATCH_GENDER_OPTIONS = ['MALE', 'FEMALE', 'MIXED'];

function MatchEnrollForm() {
  const [fieldLocation, setFieldLocation] = useState('');
  const [mapData, setMapData] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  const validateDate = (day) => {
    const selectedDate = new Date(day);
    const today = new Date();
    selectedDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    return selectedDate > today || '등록일은 오늘 이후여야 합니다.';
  };

  const onSubmit = (data) => {
    postMatchEnroll(data);
    console.log(data);
  };

  const searchPlace = () => {
    if (!fieldLocation.trim()) return;
    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(fieldLocation, (data, status) => {
      if (status === kakao.maps.services.Status.OK) {
        setSearchResults(data);
        setMapData(data);
      } else {
        console.error('No results found');
        setSearchResults([]);
      }
    });
  };

  const handleResultClick = (place) => {
    setMapData([place]);
    setFieldLocation([place.place_name]);
  };

  return (
    <FormContainer>
      <h2>Football Enrollment Form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          id="matchTitle"
          label="경기제목"
          placeholder="경기 제목을 지어주세요."
          register={register('matchTitle', {
            required: '경기제목은 필수입니다.',
          })}
          error={errors.matchTitle?.message}
        />
        <InputField
          id="description"
          label="경기소개"
          placeholder="경기를 소개해주세요."
          register={register('description', {
            required: '경기를 소개해주세요.',
          })}
          error={errors.description?.message}
        />
        <InputField
          id="matchDay"
          label="경기등록일"
          type="date"
          register={register('matchDay', {
            required: 'Date is required',
            validate: validateDate,
          })}
          error={errors.matchDay?.message}
        />
        <InputField
          id="matchCost"
          label="회비입력"
          type="number"
          placeholder="회비를 입력해주세요."
          register={register('matchCost', {
            required: 'match cost is required',
          })}
          error={errors.matchCost?.message}
        />
        <InputField
          id="playTime"
          label="경기시간"
          type="number"
          placeholder="경기 러닝타임을 입력해주세요."
          register={register('playTime', {
            required: 'playtime is required',
            min: 2,
          })}
          error={errors.playTime?.message}
        />
        <SearchFieldLocation>
          <InputField
            id="fieldLocation"
            label="경기장위치"
            placeholder="경기장 위치를 작성해주세요."
            value={fieldLocation}
            onChange={(e) => {
              setFieldLocation(e.target.value);
            }}
            register={register('fieldLocation', {
              required: 'fieldLocation is required',
            })}
            error={errors.fieldLocation?.message}
          />
          <SearchButton type="button" onClick={searchPlace}>
            장소 검색
          </SearchButton>
        </SearchFieldLocation>
        <SearchResults>
          {searchResults.slice(0, 5).map((place) => (
            <SearchResultItem
              key={place.id}
              onClick={() => handleResultClick(place)}
            >
              {place.place_name}
            </SearchResultItem>
          ))}
        </SearchResults>

        <KakaoMap mapData={mapData} />

        <SelectField
          id="playerCount"
          label="몇 대 몇?"
          options={PLAYER_COUNT_OPTIONS}
          register={register('playerCount', {
            required: 'Please select the number of playerCount',
          })}
          error={errors.playerCount?.message}
        />
        <SelectField
          label="matchGender"
          options={MATCH_GENDER_OPTIONS}
          register={register('matchGender', {
            required: 'Please select match gender',
          })}
          error={errors.matchGender?.message}
        />
        <CheckboxField
          label="선수출신이 있나요?"
          register={register('isPro')}
        />
        <Button type="submit">경기등록하기.</Button>
      </form>
    </FormContainer>
  );
}

export default MatchEnrollForm;
