import LibraryScreen from "./components/screens/LibraryScreen"
import LayoutPage from "./layouts/Layout"
import HomeScreen from "./components/screens/HomeScreen";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateTermsScreen from "./components/screens/CreateTermsScreen";
import StudyScreen from './components/screens/StudyScreen'
import NotFoundScreen from './components/exceptions/NotFoundScreen'
import FlashCardScreen from "./components/screens/FlashCardScreen";



function App() {

  return (
      // <Router>

      //   <LayoutPage>
      //     <Routes>
      //       <Route path="/" element={<HomeScreen />}  />
      //       <Route path="/library" element={<LibraryScreen />} />
      //       <Route path="/create-set" element={<CreateTermsScreen />} />
      //       <Route path="/studies/:id" element={<StudyScreen />} />
      //       <Route path="/flashcard/:id" element={<FlashCardScreen />} />

      //       <Route path="*" element={<NotFoundScreen />} />
      //     </Routes>
      //   </LayoutPage>

      // </Router>


      <Router>
  <Routes>
    {/* Routes without LayoutPage */}

    <Route path="/flashcard/:id" element={<FlashCardScreen />} />

    {/* Routes with LayoutPage */}
    <Route
      path="*"
      element={
        <LayoutPage>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/library" element={<LibraryScreen />} />
            <Route path="/create-set" element={<CreateTermsScreen />} />
            <Route path="/studies/:id" element={<StudyScreen />} />
            <Route path="*" element={<NotFoundScreen />} />
          </Routes>
        </LayoutPage>
      }
    />
  </Routes>
</Router>

  )
}

export default App
