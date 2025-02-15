import LibraryScreen from "./components/screens/LibraryScreen";
import LayoutPage from "./layouts/Layout";
import HomeScreen from "./components/screens/HomeScreen";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import CreateTermsScreen from "./components/screens/CreateTermsScreen";
import StudyScreen from "./components/screens/StudyScreen";
import NotFoundScreen from "./components/exceptions/NotFoundScreen";
import FlashCardScreen from "./components/screens/FlashCardScreen";
import LearnTopic from "./components/screens/LearnTopic";
import PrivateRoute from "./routes/PrivateRoute";
import LoginScreen from "./auth/LoginScreen";
import RegisterScreen from "./auth/RegisterScreen";
import { AuthProvider } from "./providers/AuthProvider";
import TestScreen from "./components/screens/TestScreen";
import ResultTestScreen from "./components/screens/ResultTestScreen";
import AdminScreen from "./components/screens/Admin/AdminScreen";
import StatisticScreen from "./components/screens/Admin/StatisticScreen";
import AdminLayout from "./components/screens/Admin/AdminLayout";
import SearchScreen from "./components/screens/SearchScreen";
import FolderScreen from "./components/screens/FolderScreen";
import ClassroomScreen from "./components/screens/ClassroomScreen";
import SettingScreen from "./components/screens/SettingScreen";
import PrivacyScreen from "./components/screens/PrivacyScreen";
import SupportScreen from "./components/screens/SupportScreen";
import EditSetScreen from "./components/screens/EditSetScreen";
import ChatBoxScreen from "./components/screens/ChatBoxScreen";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import SetsScreen from "./components/screens/SetsScreen";
import VocabularyScreen from "./components/screens/VocabularyScreen";
import { message } from "antd";
import ForgotPassword from "./components/modals/user/ForgotPassword";
import VerifyAccountScreen from "./auth/VerifyAccountScreen";
import ResetPassword from "./auth/ResetPassword";
import HistoryExamsScreen from "./components/screens/HistoryExamsScreen";
import SplashScreen from "./components/screens/SplashScreen";
import { useSelector } from "react-redux";

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const theme = useSelector((state) => state.theme.theme);
  console.log("App", theme);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        localStorage.clear();
        sessionStorage.clear();
        message.warning(
          "Phiên đăng nhập của bạn đã hết hạn. Vui lòng đăng nhập lại"
        );
        setTimeout(() => {
          window.location.href = "/login";
        }, 700);
      }

      // const splashTimer = setTimeout(() => {
      //   setShowSplash(false);
      // }, 1000);

      // return () => clearTimeout(splashTimer);
    }
  }, []);

  // Hiển thị Splash Screen
  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }
  const AuthLayout = () => {
    console.log("AuthLayout");
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    const role = decodedToken.scope;

    if (token && role === "ADMIN") {
      return (
        <AdminLayout>
          <Routes>
            <Route path="/" element={<Navigate to="/admin" />} />
            <Route path="/admin" element={<AdminScreen />} />
            <Route path="/admin/statistics" element={<StatisticScreen />} />
            {/* Add more admin-specific routes here */}
            <Route path="*" element={<NotFoundScreen />} />
          </Routes>
        </AdminLayout>
      );
    } else {
      return (
        <LayoutPage>
          <Routes>
            {/* User Routers */}
            <Route path="/" element={<HomeScreen />} />
            <Route path="/edit-set/:id" element={<EditSetScreen />} />
            <Route path="/search" element={<SearchScreen />} />
            <Route path="/sets" element={<SetsScreen />} />
            <Route path="/vocabulary" element={<VocabularyScreen />} />
            <Route path="/library" element={<LibraryScreen />} />
            <Route path="/setting" element={<SettingScreen />} />
            <Route path="/privacy" element={<PrivacyScreen />} />
            <Route path="/support" element={<SupportScreen />} />
            <Route path="/chat-bot" element={<ChatBoxScreen />} />
            <Route path="/create-set" element={<CreateTermsScreen />} />
            <Route path="/studies/:id" element={<StudyScreen />} />
            <Route path="/user/folders" element={<FolderScreen />} />
            <Route path="/user/classroom" element={<ClassroomScreen />} />
            <Route path="*" element={<NotFoundScreen />} />
          </Routes>
        </LayoutPage>
      );
    }
  };

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/verify-account" element={<VerifyAccountScreen />} />

          <Route path="/flashcard/:id" element={<FlashCardScreen />} />
          <Route path="/learn/:id" element={<LearnTopic />} />
          <Route path="/test/:id/exam" element={<TestScreen />} />
          <Route path="/test/result/:id" element={<ResultTestScreen />} />
          <Route
            path="/history/topic/:id/exams"
            element={<HistoryExamsScreen />}
          />

          {/* Protected Routes */}
          <Route
            path="*"
            element={
              <PrivateRoute>
                <AuthLayout />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
