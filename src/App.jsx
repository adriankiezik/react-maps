import styles from "./app.module.scss";
import { Routes, Route } from "react-router-dom";
import MapPage from "./pages/MapPage/MapPage";
import HomePage from "./pages/HomePage/HomePage";

const App = () => {
  return (
    <div className={styles["app"]}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/map" element={<MapPage />} />
      </Routes>
    </div>
  );
};

export default App;
