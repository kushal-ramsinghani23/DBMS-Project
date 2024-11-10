// src/App.jsx
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import './components/Dashboard.css';
// import Personnel from './components/Personnel';
// import Sidebar from './components/Sidebar';
// import Unit from './components/Unit';
// import Training from './components/Training';
// import Vehicle from './components/Vehicle';
// import Operation from './components/Operation';
// import Mission from './components/Mission';
// import MedicalRecord from './components/medical_record';
// import Logistics from './components/logistics';
// import Equipment from './components/equipment';
// import Deployment from './components/deployment';
// import IntelligenceReport from './components/intelligence_report';


// function App() {
//     return (
//         <Router>
//             <div className="dashboard-container">
//                 <Sidebar />

//                 <div className="content">
//                     <Routes>
//                         <Route path="/" element={<Home />} />
//                         <Route path="/personnel" element={<Personnel />} />
                        
//                         {/* Add more routes for other components (tables) as needed */}
//                     </Routes>
//                 </div>
//             </div>
//         </Router>
//     );
// }

// function Home() {
//     return (
//         <div className="main-card">
//             <h2 >Military DashBoard</h2>
//             <div className="table-container">
//                 <Personnel />
//             </div>

//             <div className="table-container">
//                 <Unit />
//             </div>

//             <div className="table-container">
//                 <Training />
//             </div>

//             <div className="table-container">
//                 <Vehicle />
//             </div>

//             <div className="table-container">
//                 <Operation />
//             </div>

//             <div className="table-container">
//                 <Mission />
//             </div>

//             <div className="table-container">
//                 <MedicalRecord />
//             </div>

//             <div className="table-container">
//                 <Logistics />
//             </div>

//             <div className="table-container">
//                 <Equipment />
//             </div>

//             <div className="table-container">
//                 <Deployment />
//             </div>

//             <div className="table-container">
//                 <IntelligenceReport />
//             </div>
//         </div>
//     );
// }

// export default App;


// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './index';
import Logistics from './components/logistics';
import Equipment from './components/equipment';
import Deployment from './components/deployment';
import IntelligenceReport from './components/intelligence_report';
import MedicalRecord from './components/medical_record';
import Mission from './components/Mission';
import Operation from './components/Operation';
import Training from './components/Training';
import Vehicle from './components/Vehicle';
import Personnel from './components/Personnel';
import Unit from './components/Unit';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/logistics" element={<Logistics />} />
        <Route path="/equipment" element={<Equipment />} />
        <Route path="/deployment" element={<Deployment />} />
        <Route path="/intelligence-report" element={<IntelligenceReport />} />
        <Route path="/medical-record" element={<MedicalRecord />} />
        <Route path="/mission" element={<Mission />} />
        <Route path="/operation" element={<Operation />} />
        <Route path="/personnel" element={<Personnel />} />
        <Route path="/training" element={<Training />} />
        <Route path="/unit" element={<Unit />} />
        <Route path="/vehicle" element={<Vehicle />} />
    
      </Routes>
    </Router>
  );
}

export default App;
