import "./App.css";
import {Route,Router,Routes} from "react-router-dom";
import Home from "./page/Home"
import OpenRouter from "./components/auth/OpenRouter";
import Signup from "./page/Signup";
import Login from "./page/Login";
import UpdatePassword from "./page/UpdatePassword";
import Team from "./page/Team";
import Task from "./page/Task";
import MyProfile from "./components/hero/MyProfile";
import ForgotPassword from "./page/ForgotPassword";
import Error from "./page/Error"
import Start from "./page/Start";
import VerifyEmail from "./page/VerifyEmail";
import AdminHome from "./components/admin/progress/AdminHome";
function App() {
  return (
   <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
     <Routes>
     <Route path="/" element={<Start/>}/>
     <Route path="/open" element={<OpenRouter/>}/>
     <Route path="signup" element={<Signup/>}/>
     <Route path="login"  element={<Login/>}/>
     <Route path="verify-email" element={<VerifyEmail/>}/>
     <Route path="forget-password" element={<ForgotPassword/>}/>
     <Route path="*" element={<Error />} />
     <Route path="update-password/:id" element={<UpdatePassword/>}/>
     <Route  element={<Home/>}>
        <Route path="/dashboard/my-profile" element={<MyProfile/>}/>
        <Route path="/dashboard/team" element={<Team/>}/>
        <Route path="/dashboard/task" element={<Task/>}/>
     </Route>
     <Route path="/dashboard/my-pro" element={<AdminHome/>}>

     </Route>
     </Routes>
   </div>
  );
}

export default App;
