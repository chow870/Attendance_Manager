import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'; // Import BrowserRouter
import './index.css';
import AllRecords from "./pages/Dashboard/AllRecord"
import AttendSubj from "./pages/Dashboard/AttendSubj"
import MissedClasses from "./pages/Dashboard/ClassesMissed"
import Dashboard from "./pages/Dashboard/dashboard"
import MainDashboard from "./pages/Dashboard/MainDashBoard"
import SignOut from "./pages/Sign-out-up/signout"
import SignupForm from "./pages/Sign-out-up/signup"
import RegistrationForm from "./pages/SignIn/signin"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/homePage/HomePage.jsx';
import MainhomePage from './pages/homePage/MainHomePage.jsx';
import 'flowbite';
import 'flowbite/dist/flowbite.min.css';

const router = createBrowserRouter(
  createRoutesFromElements(<>
  <Route path="/dashboard" element={<Dashboard/>}>
    <Route path="" element={<MainDashboard/>} />
    <Route path="allrecords" element={<AllRecords />} />
    <Route path="attendancesubj" element={<AttendSubj />} />
    <Route path="missedclasses" element={<MissedClasses />} />
    <Route path="signout" element={<SignOut />} />
    

</Route>
<Route path="/" element={<HomePage/>}>
    <Route path="" element={<MainhomePage/>} />
    <Route path="allrecords" element={<AllRecords />} />
    <Route path="signin" element={<SignupForm/>} />
    <Route path="signup" element={<RegistrationForm />} />
</Route>
<Route path='*' element ={<HomePage/>}>
</Route>
</>
    
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
);
