import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';


import AllEmployees from './components/AllEmployees';
import AddEmployee from './components/Addemployee';
import UpdateEmployee from './components/UpdateEmployee';
import DeleteEmployee from './components/DeleteEmployee'; 

import Login from './components/Login';

import AddLeave from './components/AddLeave';
import Allleaves from './components/Allleaves';
import UpdateLeaveRequest from './components/UpdateLeaveRequest';
import GetOneEmpLeave from './components/GetOneEmpLeave';



import EmployeeCheckIn from './components/EmployeeCheckIn';
import EmployeeCheckOut from './components/EmployeeCheckOut';
import AttendanceRecords from './components/AttendanceRecords';
import GetOneEmpAttendance from './components/GetOneEmpAttendance';

import CSOPortal from './components/CSOPortal';
import EmployeeDashboard from './components/EmployeeDashboard';
import EmpManDash from './components/EmpManDash';

import MainEmp from './components/MainEmp';


import SearchEmployee from './components/SearchEmployee';

import EmployeeAccrualRate from './components/EmployeeAccrualRate';

import LeaveBalance from './components/LeaveBalance';
import PendingLeaves from './components/PendingLeaves';
import ApprovedLeaves from './components/ApprovedLeaves';
import RejectedLeaves from './components/RejectedLeaves';

import DownloadEmployeePDF from'./components/DownloadEmployeePDF';










function App() {
  return (
    <Router>
      <div>
      <Header />
      <Footer />


      
      
        
        <Routes>
          <Route path="/all" element={<AllEmployees />} />
          <Route path="/add" element={<AddEmployee />} />
          <Route path="/update/:id" element={<UpdateEmployee />} />
          <Route path="/delete/:id" element={<DeleteEmployee />} />

          <Route path="/login" element={<Login />} />

          <Route path="/leaves/add" element={<AddLeave />} /> 
          

          <Route path="/leave/readall" element={<Allleaves />} />
          
          

          <Route path="/leaves/update1/:leave_id" element={<UpdateLeaveRequest />} />
          <Route path="/le" element={<GetOneEmpLeave />} />
          


          <Route path="/checkin" element={<EmployeeCheckIn />} /> 
          <Route path="/checkout" element={<EmployeeCheckOut />} />
          
          <Route path="/attendance" element={<AttendanceRecords />} /> 
          <Route path="/attone" element={<GetOneEmpAttendance />} />


          <Route path="/cso" element={<CSOPortal />} /> 
          <Route path="/emp" element={<EmployeeDashboard />} />
          <Route path="/man" element={<EmpManDash />} />

          <Route path="/home" element={<MainEmp />} /> 


          <Route path="/eid" element={<SearchEmployee />} /> 
          
          <Route path="/acc" element={<EmployeeAccrualRate />} />

          <Route path="/b" element={<LeaveBalance />} />

          <Route path="/pen" element={<PendingLeaves />} />
          <Route path="/app" element={<ApprovedLeaves />} />
          <Route path="/rej" element={<RejectedLeaves />} />
          <Route path="/pdf" element={<DownloadEmployeePDF />} />


          

          

          

          


         

          
        
          
          
        </Routes>
        
      </div>
    </Router>
  );
}

export default App;

