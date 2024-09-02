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
      <h1>hey there </h1>
      <>
            <Router>
                <Routes>
                      <Route path="/" element={<RegistrationForm />} />
                      <Route path="/signin" element={<RegistrationForm />} />
                      <Route path="/signin/forms" element={<CustomisedSigninForm />} />
                      <Route path="/signout" element={<SignOut />} />
                      <Route path="/signup" element={<SignupForm />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="Main" element={<MainDashboard />} />
                      <Route path="Allrecords" element={<AllRecords />} />
                      <Route path="AttendaceSubj" element={<AttendSubj />} />
                      <Route path="MissedClasses" element={<MissedClasses/>} />
                </Routes>
          </Router>
       </>
      
      <Dashboard/>
      </>
    
  )
}

export default App
