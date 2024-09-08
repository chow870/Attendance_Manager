import AllRecords from "./pages/Dashboard/AllRecord"
import AttendSubj from "./pages/Dashboard/AttendSubj"
import MissedClasses from "./pages/Dashboard/ClassesMissed"
import Dashboard from "./pages/Dashboard/dashboard"
import MainDashboard from "./pages/Dashboard/MainDashBoard"
import SignOut from "./pages/Sign-out-up/signout"
import SignupForm from "./pages/Sign-out-up/signup"
import RegistrationForm from "./pages/SignIn/signin"
import CustomisedSigninForm from "./pages/SignIn/SigninForm"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {
  return (
    <>
      <>
            
                <Routes>
                      <Route path="/" element={<RegistrationForm />} />
                      {/* <Route path="/" element={<SignupForm />} /> */}
                      <Route path="/Signin" element={<RegistrationForm />} />
                      {/* <Route path="/signin/forms" element={<CustomisedSigninForm />} /> */}
                      {/* <Route path="/SignOut" element={<SignOut />} /> */}
                      <Route path="/Signup" element={<SignupForm />} />
                      <Route path="/dashboard" element={<Dashboard />}/>
                      <Route path="/allrecords" element={<AllRecords />} />
                      <Route path="/attendancesubj" element={<AttendSubj />} />
                      <Route path="/missedclasses" element={<MissedClasses />} />
                      
                </Routes>
         
       </>
      
      {/* <Dashboard/> */}
      </>
    
  )
}

export default App
