import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import RedirectLink from "../pages/redirectLink/RedirectLink";
import NotFoundLink from "../pages/NotFoundLink/NotFoundLink";

function RoutesConfigs() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/redirect" element={<RedirectLink />} />
        <Route path="*" element={<NotFoundLink />} />
      </Routes>
    </Router>
  );
}

export default RoutesConfigs;
