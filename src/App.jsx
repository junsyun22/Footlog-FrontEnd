import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import GlobalStyles from './theme/GlobalStyles';
import theme from './theme/theme';

// Layout components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import AppContainer from './components/layout/AppContainer/AppContainer';

// Page components
import Landing from './pages/Landing';
import Login from './pages/Login/Login';
import Match from './pages/Match/Match';
import MatchDetail from './pages/Match/MatchDetail';
import MatchEnrollForm from './pages/MatchEnroll/MatchEnrollForm';
import ChatRoomListPage from './pages/Chat/ChatRoomListPage';
import ClubList from './pages/ClubList/pages/ClubList';
import ChatRoomPage from './pages/Chat/ChatRoomPage'; 
import Settings from './pages/Settings/Settings';
import ClubRegist from './pages/Club/pages/ClubRegist';
import RegistSchedule from './pages/Club/pages/RegistSchedule';
import RegistLocation from './pages/Club/pages/RegistLocation';
import RegistAgeGender from './pages/Club/pages/RegistAgeGender';
import RegistClubLevel from './pages/Club/pages/RegistClubLevel';
import RegistrationSuccess from './pages/Club/pages/RegistSuccess';
import ClubDetail from './pages/Club/pages/ClubDetail';
import ClubEdit from './pages/Club/pages/ClubEdit';


// Mercenary related components
import Mercenary from './pages/Mercenary/pages/MercenaryChoice';
import MercenaryAppList from './pages/Mercenary/pages/MercenaryApp/MercenaryAppList';
import MercenaryRecList from './pages/Mercenary/pages/MercenaryRec/MercenaryRecList';

import Profile from './pages/Profile/Profile';
import EnrollMercenaryApp from './pages/Mercenary/pages/EnrollMercenaryApp/EnrollMercenaryApp';
import EnrollMercenaryRec from './pages/Mercenary/pages/EnrollMercenaryRec/EnrollMercenaryRec';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <AppContainer>
          <Header />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            
            {/* Match related routes */}
            <Route path="/match" element={<Match />} />
            <Route path="/match/:matchCode" element={<MatchDetail />} />
            <Route path="/match/enroll" element={<MatchEnrollForm />} />
            
            {/* Profile related routes */}
            <Route path="/profile" element={<Profile />} />
            
            {/* Mercenary related routes */}
            <Route path="/mercenary" element={<Mercenary />} />
            <Route path="/mercenary/app-list" element={<MercenaryAppList />} />
            <Route path="/mercenary/rec-list" element={<MercenaryRecList />} />
            <Route path="/mercenary/enroll-app" element={<EnrollMercenaryApp />} />
            <Route path="/mercenary/enroll-rec" element={<EnrollMercenaryRec />} />
            
            <Route path="/clublist" element={<ClubList />} />
            <Route path="/chat" element={<ChatRoomListPage />} />
            <Route path="/chat/:id" element={<ChatRoomPage />} />
            <Route path="/settings" element={<Settings />} />
            
            {/* Uncomment these routes when components are ready */}
            <Route exact path="/club/regist" element={<ClubRegist />} />
            <Route exact path="/club/regist/schedule" element={<RegistSchedule />} />
            <Route exact path="/club/regist/location" element={<RegistLocation />} />
            <Route exact path="/club/regist/age-gender" element={<RegistAgeGender />} />
            <Route exact path="/club/regist/club-level" element={<RegistClubLevel />} />
            <Route exact path="/club/regist/success" element={<RegistrationSuccess />} />
            <Route exact path="/club/detail/:clubId" element={<ClubDetail />} />
            <Route exact path="/clubs/edit/:clubId" element={<ClubEdit />} />



          </Routes>
        </AppContainer>
        <Footer />
      </Router>
    </ThemeProvider>
  );
};

export default App;