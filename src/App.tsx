import { collection, DocumentData, getDocs, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/Home/HomePage';
import { db } from './service/firebaseSetup';
import { ThemeProvider } from "@mui/system";
import { createTheme } from "@mui/material/styles";
import LoginPage from './pages/Login/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import SettingsPage from './pages/SettingsPage/SettingsPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import FollowingPage from './pages/FollowingPage/FollowingPage';
import PostPage from './pages/PostPage/PostPage';
import CommentsPage from './pages/CommentsPage/CommentsPage';
import UploadPage from './pages/UploadPage/UploadPage';
import UploadStoryPage from './pages/UploadPage/UploadStoryPage';
import EditPage from './pages/EditPage/EditPage';
import MessagePage from './pages/MessagePage/MessagePage';
import FollowersPage from './pages/FollowersPage/FollowersPage';
import Logout from './pages/Logout/Logout';
import MobileMessagePage from './pages/MessagePage/MobileMessagePage';
import MessageRoom from './pages/MessagePage/MessageRoom';
import UploadFromDevice from './pages/UploadPage/UploadFromDevice';
import SearchPage from './pages/SearchPage/SearchPage';

const theme = createTheme({
  palette: {
    mode: "light"
  }
});

function App() {
  const [first, setfirst] = useState<DocumentData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, 'users'));
      const docsnap = await getDocs(q);
      setfirst(docsnap.docs);
    };
    fetchData();
  }, []);
  return (

    <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route path="/following/:id" element={<FollowingPage />} />
        <Route path="/followers/:id" element={<FollowersPage />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/comments/:id" element={<CommentsPage />} />
        <Route path="/upload/post" element={<UploadPage />} />
        <Route path="/upload/story" element={<UploadStoryPage />} />
        <Route path="/upload/fromDevice" element={<UploadFromDevice />} />
        <Route path="/editImage" element={<EditPage />} />
        <Route path="/messages" element={<MessagePage />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/mobile-chat" element={<MobileMessagePage />} />
        <Route path="/messageRoom/:id" element={<MessageRoom />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
