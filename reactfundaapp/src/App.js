import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Student from './pages/Student';
import Addstudent from './pages/Addstudent';



function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Student />}></Route>
          <Route path="/add-student" element={<Addstudent />}></Route>
        </Routes>
    </BrowserRouter>
  );
}



export default App;