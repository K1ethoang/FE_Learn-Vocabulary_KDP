import LibraryScreen from "./components/screens/LibraryScreen"
import LayoutPage from "./layouts/Layout"
import HomeScreen from "./components/screens/HomeScreen";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateTermsScreen from "./components/screens/CreateTermsScreen";




function App() {

  return (
      <Router>

        <LayoutPage>
          <Routes>
            <Route path="/" element={<HomeScreen />}  />
            <Route path="/library" element={<LibraryScreen />} />
            <Route path="/create-set" element={<CreateTermsScreen />} />
            <Route path="*" element={<HomeScreen />} />
          </Routes>
        </LayoutPage>

      </Router>

  )
}

export default App
