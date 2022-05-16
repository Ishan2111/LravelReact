import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Student from './pages/Student';
import Addstudent from './pages/Addstudent';
import Editstudent from './pages/Editstudent';


function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Student />} ></Route>
          <Route path="/add-student" element={<Addstudent />}></Route>
            <Route
              path="/edit-student/:id"
              render={({ match }) => <Editstudent id={match.params.id} />}
            />
          {/* <Route path="/edit-student/:id" element={<Editstudent/>}></Route> */}
        </Routes>
    </BrowserRouter>
  );
}



export default App;