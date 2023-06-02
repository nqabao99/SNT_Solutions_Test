import HomePage from "./pages/HomePage";

import Consents from "./pages/ConsentsPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./commons/Header";

function App() {
  const listRouter = [
    { path: "/", page: <HomePage /> },
    { path: "/consents", page: <Consents /> },
  ];

  return (
    <BrowserRouter>
      <Routes>
        {listRouter.map((item) => (
          <Route
            key={item.path}
            path={item.path}
            element={<Header>{item.page}</Header>}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
