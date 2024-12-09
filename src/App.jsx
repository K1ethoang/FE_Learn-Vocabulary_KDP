import LibraryScreen from "./components/screens/LibraryScreen"
import LayoutPage from "./layouts/Layout"
import HomeScreen from "./components/screens/HomeScreen";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateTermsScreen from "./components/screens/CreateTermsScreen";
import StudyScreen from './components/screens/StudyScreen'
import NotFoundScreen from './components/exceptions/NotFoundScreen'
import FlashCardScreen from "./components/screens/FlashCardScreen";
import LearnTopic from "./components/screens/LearnTopic";
import PrivateRoute from "./routes/PrivateRoute";
import LoginScreen from "./auth/LoginScreen";
import RegisterScreen from "./auth/RegisterScreen";
import { AuthProvider } from "./providers/AuthProvider";


function App() {

//   return (
//     <Router>
//     <Routes>
//     {/* Routes without LayoutPage */}

//     <Route path="/flashcard/:id" element={<FlashCardScreen />} />
//     <Route path="/learn/:id" element={<LearnTopic />} />

//     {/* Routes with LayoutPage */}
//     <Route
//       path="*"
//       element={
//         <LayoutPage>
//           <Routes>
//             <Route path="/" element={<HomeScreen />} />
//             <Route path="/library" element={<LibraryScreen />} />
//             <Route path="/create-set" element={<CreateTermsScreen />} />
//             <Route path="/studies/:id" element={<StudyScreen />} />
//             <Route path="*" element={<NotFoundScreen />} />
//           </Routes>
//         </LayoutPage>
//       }
//     />
//   </Routes>
//     </Router>

//   )

    return(
        <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/flashcard/:id" element={<FlashCardScreen />} />
          <Route path="/learn/:id" element={<LearnTopic />} />

          {/* Protected Routes */}
          <Route
            path="*"
            element={
              <PrivateRoute>
                <LayoutPage>
                  <Routes>
                    <Route path="/" element={<HomeScreen />} />
                    <Route path="/library" element={<LibraryScreen />} />
                    <Route path="/create-set" element={<CreateTermsScreen />} />
                    <Route path="/studies/:id" element={<StudyScreen />} />
                    <Route path="*" element={<NotFoundScreen />} />
                  </Routes>
                </LayoutPage>
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
    )
}

export default App
