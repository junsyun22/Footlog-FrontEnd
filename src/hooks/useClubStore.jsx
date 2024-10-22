// src/hooks/useClubStore.js
import { create } from 'zustand';

const initialState = {
  club: null, // 클럽 정보 상태 추가
  clubName: '',
  clubCode: '',
  schedule: { days: [], times: [] },
  location: { stadiumName: '', city: '', region: '' },
  ageGender: { ageGroup: '', gender: '' },
  clubLevel: { level: '', gauge: 0 },
};

const useClubStore = create((set) => ({
  ...initialState,  // 초기 상태를 상수로 분리하여 사용

  // 상태 업데이트 함수
  setClubInfo: (name, code) => {
      // 유효성 검사 추가 가능
      if (name && code) {
          set({ clubName: name, clubCode: code });
      }
  },

  setSchedule: (days, times) => {
      if (Array.isArray(days) && Array.isArray(times)) {
          set({ schedule: { days, times } });
      }
  },

  setLocation: (stadiumName, city, region) => {
      if (stadiumName && city && region) {
          set({ location: { stadiumName, city, region } });
      }
  },

  setAgeGender: (ageGroup, gender) => {
      if (ageGroup && gender) {
          set({ ageGender: { ageGroup, gender } });
      }
  },

  setClubLevel: (level, gauge) => {
      if (level && typeof gauge === 'number') {
          set({ clubLevel: { level, gauge } });
      }
  },

  // 클럽 데이터 설정 함수
  setClub: (clubData) => set({ club: clubData }),

  // 클럽 정보 리셋 함수
  reset: () => set(initialState),

  // 서버에서 클럽 정보를 가져오는 함수
  fetchClub: async (clubId) => {
      try {
          const response = await fetch(`http://192.168.0.12:8080/api/clubs/${clubId}`);
          const data = await response.json();
          set({ club: data }); // 클럽 데이터 저장
      } catch (error) {
          console.error('Error fetching club:', error);
      }
  },
}));

export default useClubStore;
