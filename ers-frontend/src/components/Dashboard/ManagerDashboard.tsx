// // src/components/Dashboard/ManagerDashboard.js
export {}

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './ManagerDashboard.css';  // Assicurati di avere un file CSS per gli stili

// const ManagerDashboard = () => {
//     const [requests, setRequests] = useState([]);

//     useEffect(() => {
//         const fetchRequests = async () => {
//             try {
//                 const response = await axios.get('http://localhost:8080/api/reimbursements');  // Aggiusta l'endpoint come necessario
//                 setRequests(response.data);
//             } catch (error) {
//                 console.error('Failed to fetch reimbursements', error);
//             }
//         };

//         fetchRequests();
//     }, []);

//     const handleApprove = async (id) => {
//         try {
//             await axios.post(`http://localhost:8080/api/reimbursements/approve/${id}`);
//             // Aggiorna la lista locale dei rimborsi o rifai la fetch dei dati
//             setRequests(requests.map(req => req.id === id ? { ...req, status: 'Approved' } : req));
//         } catch (error) {
//             console.error('Failed to approve reimbursement', error);
//         }
//     };

//     const handleDeny = async (id) => {
//         try {
//             await axios.post(`http://localhost:8080/api/reimbursements/deny/${id}`);
//             // Aggiorna la lista locale dei rimborsi o rifai la fetch dei dati
//             setRequests(requests.map(req => req.id === id ? { ...req, status: 'Denied' } : req));
//         } catch (error) {
//             console.error('Failed to deny reimbursement', error);
//         }
//     };

//     return (
//         <div className="manager-dashboard">
//             <h1>Dashboard del Manager</h1>
//             <ul>
//                 {requests.map(request => (
//                     <li key={request.id}>
//                         {request.description} - ${request.amount} - {request.status}
//                         <button onClick={() => handleApprove(request.id)}>Approve</button>
//                         <button onClick={() => handleDeny(request.id)}>Deny</button>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }

// export default ManagerDashboard;
