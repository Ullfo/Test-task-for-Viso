import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./styles/globals.scss";
import MainPage from "./pages/MainPage/MainPage";
import MealPage from "./pages/MealPage/MealPage";

const App: React.FC = () => {
   return (
      <Router>
         <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/page" element={<MainPage />} />
            <Route path="/meal/:mealName" element={<MealPage />} />
         </Routes>
      </Router>
   );
};

export default App;
