import Expense from "./Components/Expense/Expense";
import Limit from "./Components/Limit/Limit";
import WeekView from "./Components/Weekview/WeekView";
import View from "./Components/ViewData/View";
import { Route, Routes, BrowserRouter } from "react-router-dom";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Expense />} />
          <Route path="/limit" element={<Limit />} />
          <Route path="/history" element={<WeekView />} />
          <Route path="/view" element={<View />} />
        </Routes>
      </BrowserRouter>
      {/* <Limit />
      <Expense />
      <View />
      <WeekView /> */}
    </>
  );
}

export default App;
