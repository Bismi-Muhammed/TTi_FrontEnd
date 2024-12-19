


// import React, { useState, useEffect } from "react";
// import "../assets/styles.css";
// import sampleData from "../data/sampleData";

// const TravelTimeIndexTable = () => {
//   const { amPeakData, pmPeakData, avgTravelTimeIndex } = sampleData;

//   // State for filters
//   const [selectedRoad, setSelectedRoad] = useState("All");
//   const [selectedRoute, setSelectedRoute] = useState("All");
//   const [selectedDate, setSelectedDate] = useState("All");

//   // Extract unique values for filters
//   const uniqueRoads = [
//     "All",
//     ...new Set([...amPeakData, ...pmPeakData].map((item) => item.road)),
//   ];
//   const uniqueRoutes = [
//     "All",
//     ...new Set([...amPeakData, ...pmPeakData].map((item) => item.route)),
//   ];
//   const uniqueDates = [
//     "All",
//     ...new Set([...amPeakData, ...pmPeakData].map((item) => item.date)),
//   ];

//   // Filtered data based on selected filters
//   const filteredAmPeakData = amPeakData.filter((row) => {
//     return (
//       (selectedRoad === "All" || row.road === selectedRoad) &&
//       (selectedRoute === "All" || row.route === selectedRoute) &&
//       (selectedDate === "All" || row.date === selectedDate)
//     );
//   });

//   const filteredPmPeakData = pmPeakData.filter((row) => {
//     return (
//       (selectedRoad === "All" || row.road === selectedRoad) &&
//       (selectedRoute === "All" || row.route === selectedRoute) &&
//       (selectedDate === "All" || row.date === selectedDate)
//     );
//   });

//   return (
//     <div>
//       <div className="nav-bar">
//         <h1>PDP - Travel Time Index Daily</h1>
//         <div className="nav-images">
//           <img
//             src="https://via.placeholder.com/50"
//             alt="Sample 1"
//             className="nav-image"
//           />
//           <img
//             src="https://via.placeholder.com/50"
//             alt="Sample 2"
//             className="nav-image"
//           />
//         </div>
//       </div>
//       <div className="tti-container">
//         <div className="tti-tables">
//           <div className="tti-filters">
//             <label>
//               Road:
//               <select
//                 onChange={(e) => setSelectedRoad(e.target.value)}
//                 value={selectedRoad}
//               >
//                 {uniqueRoads.map((road, index) => (
//                   <option key={index} value={road}>
//                     {road}
//                   </option>
//                 ))}
//               </select>
//             </label>
//             <label>
//               Route:
//               <select
//                 onChange={(e) => setSelectedRoute(e.target.value)}
//                 value={selectedRoute}
//               >
//                 {uniqueRoutes.map((route, index) => (
//                   <option key={index} value={route}>
//                     {route}
//                   </option>
//                 ))}
//               </select>
//             </label>
//             <label>
//               Date:
//               <select
//                 onChange={(e) => setSelectedDate(e.target.value)}
//                 value={selectedDate}
//               >
//                 {uniqueDates.map((date, index) => (
//                   <option key={index} value={date}>
//                     {date}
//                   </option>
//                 ))}
//               </select>
//             </label>
//           </div>

//           <h3>AM Peak</h3>
//           <div className="scrollable-table">
//             <table>
//               <thead>
//                 <tr>
//                   <th>SL</th>
//                   <th>Date</th>
//                   <th>Road</th>
//                   <th>Length (KM)</th>
//                   <th>Route</th>
//                   <th>Travel Time</th>
//                   <th>Free Flow Time</th>
//                   <th>TTI</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredAmPeakData.map((row, index) => (
//                   <tr key={index}>
//                     <td>{index + 1}</td>
//                     <td>{row.date}</td>
//                     <td>{row.road}</td>
//                     <td>{row.length}</td>
//                     <td>{row.route}</td>
//                     <td>{row.amTravelTime}</td>
//                     <td>{row.freeFlowTime}</td>
//                     <td className={`tti-${getTTIClass(row.amTTI)}`}>
//                       {row.amTTI}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           <h3>PM Peak</h3>
//           <div className="scrollable-table">
//             <table>
//               <thead>
//                 <tr>
//                   <th>SL</th>
//                   <th>Date</th>
//                   <th>Road</th>
//                   <th>Length (KM)</th>
//                   <th>Route</th>
//                   <th>Travel Time</th>
//                   <th>Free Flow Time</th>
//                   <th>TTI</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredPmPeakData.map((row, index) => (
//                   <tr key={index}>
//                     <td>{index + 1}</td>
//                     <td>{row.date}</td>
//                     <td>{row.road}</td>
//                     <td>{row.length}</td>
//                     <td>{row.route}</td>
//                     <td>{row.pmTravelTime}</td>
//                     <td>{row.freeFlowTime}</td>
//                     <td className={`tti-${getTTIClass(row.pmTTI)}`}>
//                       {row.pmTTI}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         <div className="tti-summary">
//           <h2>Average Travel Time Index</h2>
//           <div className="avg-tti-box">
//             <div>
//               <p>AM Peak TTI</p>
//               <h3>{avgTravelTimeIndex.amPeakTTI}</h3>
//             </div>
//             <div>
//               <p>PM Peak TTI</p>
//               <h3>{avgTravelTimeIndex.pmPeakTTI}</h3>
//             </div>
//           </div>
//           {/* New Card for Definitions and TTI Ranges */}
//           <div className="tti-definitions-card">
//             <h3>Definitions</h3>
//             <p>
//               <strong>AM Peak:</strong> 08:00 to 09:00
//             </p>
//             <p>
//               <strong>PM Peak:</strong> 18:30 to 19:30
//             </p>
//             <p>
//               <strong>Free Flow:</strong> 02:00 to 03:00
//             </p>
//             <h3>TTI Ranges</h3>
//             <div className="tti-ranges">
//               <p>
//                 <strong>0.00  TTI ≤ 1.4</strong> - GOOD STATUS: Normal Traffic
//                 Flow
//               </p>
//               <p>
//                 <strong>1.4  TTI ≤ 1.8</strong> - MINOR DELAYS: Below Expected
//                 Flow
//               </p>
//               <p>
//                 <strong>1.8  TTI</strong> - SEVERE DELAYS: Significant
//                 Congestion
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const getTTIClass = (tti) => {
//   if (tti <= 1.4) return "good";
//   if (tti <= 1.8) return "minor";
//   return "severe";
// };

// export default TravelTimeIndexTable;



























// import React, { useState, useEffect } from "react";
// import "../assets/styles.css";

// const TravelTimeIndexTable = () => {
//   // State for data fetched from API
//   const [amPeakData, setAmPeakData] = useState([]);
//   const [pmPeakData, setPmPeakData] = useState([]);
//   const [avgTravelTimeIndex, setAvgTravelTimeIndex] = useState({});
  
//   // State for filters
//   const [selectedRoad, setSelectedRoad] = useState("All");
//   const [selectedRoute, setSelectedRoute] = useState("All");
//   const [selectedDate, setSelectedDate] = useState("All");

//   // Fetch data from API on component mount
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch("http://localhost:3000/data/today"); // Update with your API endpoint
//         const data = await response.json();

//         console.log(data);
        
        
//         // Assuming your API returns data in this structure:
//         const { A_SPEED_PDP_DLY, D_PDP_Operations, avgTravelTimeIndex } = data;

//         // Format the data as needed for AM/PM peak
//         setAmPeakData(D_PDP_Operations.filter(item => item.peak === "AM"));
//         setPmPeakData(D_PDP_Operations.filter(item => item.peak === "PM"));
//         setAvgTravelTimeIndex(avgTravelTimeIndex);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []); // Empty array ensures it only runs once when the component mounts

//   // Extract unique values for filters
//   const uniqueRoads = [
//     "All",
//     ...new Set([...amPeakData, ...pmPeakData].map((item) => item.road)),
//   ];
//   const uniqueRoutes = [
//     "All",
//     ...new Set([...amPeakData, ...pmPeakData].map((item) => item.route)),
//   ];
//   const uniqueDates = [
//     "All",
//     ...new Set([...amPeakData, ...pmPeakData].map((item) => item.date)),
//   ];

//   // Filtered data based on selected filters
//   const filteredAmPeakData = amPeakData.filter((row) => {
//     return (
//       (selectedRoad === "All" || row.road === selectedRoad) &&
//       (selectedRoute === "All" || row.route === selectedRoute) &&
//       (selectedDate === "All" || row.date === selectedDate)
//     );
//   });

//   const filteredPmPeakData = pmPeakData.filter((row) => {
//     return (
//       (selectedRoad === "All" || row.road === selectedRoad) &&
//       (selectedRoute === "All" || row.route === selectedRoute) &&
//       (selectedDate === "All" || row.date === selectedDate)
//     );
//   });

//   return (
//     <div>
//       <div className="nav-bar">
//         <h1>PDP - Travel Time Index Daily</h1>
//         <div className="nav-images">
//           <img
//             src="https://via.placeholder.com/50"
//             alt="Sample 1"
//             className="nav-image"
//           />
//           <img
//             src="https://via.placeholder.com/50"
//             alt="Sample 2"
//             className="nav-image"
//           />
//         </div>
//       </div>
//       <div className="tti-container">
//         <div className="tti-tables">
//           <div className="tti-filters">
//             <label>
//               Road:
//               <select
//                 onChange={(e) => setSelectedRoad(e.target.value)}
//                 value={selectedRoad}
//               >
//                 {uniqueRoads.map((road, index) => (
//                   <option key={index} value={road}>
//                     {road}
//                   </option>
//                 ))}
//               </select>
//             </label>
//             <label>
//               Route:
//               <select
//                 onChange={(e) => setSelectedRoute(e.target.value)}
//                 value={selectedRoute}
//               >
//                 {uniqueRoutes.map((route, index) => (
//                   <option key={index} value={route}>
//                     {route}
//                   </option>
//                 ))}
//               </select>
//             </label>
//             <label>
//               Date:
//               <select
//                 onChange={(e) => setSelectedDate(e.target.value)}
//                 value={selectedDate}
//               >
//                 {uniqueDates.map((date, index) => (
//                   <option key={index} value={date}>
//                     {date}
//                   </option>
//                 ))}
//               </select>
//             </label>
//           </div>

//           <h3>AM Peak</h3>
//           <div className="scrollable-table">
//             <table>
//               <thead>
//                 <tr>
//                   <th>SL</th>
//                   <th>Date</th>
//                   <th>Road</th>
//                   <th>Length (KM)</th>
//                   <th>Route</th>
//                   <th>Travel Time</th>
//                   <th>Free Flow Time</th>
//                   <th>TTI</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredAmPeakData.map((row, index) => (
//                   <tr key={index}>
//                     <td>{index + 1}</td>
//                     <td>{row.date}</td>
//                     <td>{row.road}</td>
//                     <td>{row.length}</td>
//                     <td>{row.route}</td>
//                     <td>{row.amTravelTime}</td>
//                     <td>{row.freeFlowTime}</td>
//                     <td className={`tti-${getTTIClass(row.amTTI)}`}>
//                       {row.amTTI}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           <h3>PM Peak</h3>
//           <div className="scrollable-table">
//             <table>
//               <thead>
//                 <tr>
//                   <th>SL</th>
//                   <th>Date</th>
//                   <th>Road</th>
//                   <th>Length (KM)</th>
//                   <th>Route</th>
//                   <th>Travel Time</th>
//                   <th>Free Flow Time</th>
//                   <th>TTI</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredPmPeakData.map((row, index) => (
//                   <tr key={index}>
//                     <td>{index + 1}</td>
//                     <td>{row.date}</td>
//                     <td>{row.road}</td>
//                     <td>{row.length}</td>
//                     <td>{row.route}</td>
//                     <td>{row.pmTravelTime}</td>
//                     <td>{row.freeFlowTime}</td>
//                     <td className={`tti-${getTTIClass(row.pmTTI)}`}>
//                       {row.pmTTI}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         <div className="tti-summary">
//           <h2>Average Travel Time Index</h2>
//           <div className="avg-tti-box">
//             <div>
//               <p>AM Peak TTI</p>
//               <h3>avgTravelTimeIndex.amPeakTTI</h3>
//             </div>
//             <div>
//               <p>PM Peak TTI</p>
//               <h3>avgTravelTimeIndex.pmPeakTTI</h3>
//             </div>
//           </div>
//           {/* New Card for Definitions and TTI Ranges */}
//           <div className="tti-definitions-card">
//             <h3>Definitions</h3>
//             <p>
//               <strong>AM Peak:</strong> 08:00 to 09:00
//             </p>
//             <p>
//               <strong>PM Peak:</strong> 18:30 to 19:30
//             </p>
//             <p>
//               <strong>Free Flow:</strong> 02:00 to 03:00
//             </p>
//             <h3>TTI Ranges</h3>
//             <div className="tti-ranges">
//               <p>
//                 <strong>0.00  TTI ≤ 1.4</strong> - GOOD STATUS: Normal Traffic
//                 Flow
//               </p>
//               <p>
//                 <strong>1.4  TTI ≤ 1.8</strong> - MINOR DELAYS: Below Expected
//                 Flow
//               </p>
//               <p>
//                 <strong>1.8  TTI</strong> - SEVERE DELAYS: Significant
//                 Congestion
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const getTTIClass = (tti) => {
//   if (tti <= 1.4) return "good";
//   if (tti <= 1.8) return "minor";
//   return "severe";
// };

// export default TravelTimeIndexTable;














// WORKING CODE - 16/12/2024 11:36

// import React, { useState, useEffect } from "react";
// import "../assets/styles.css";

// const TravelTimeIndexTable = () => {
//   const [amPeakData, setAmPeakData] = useState([]);
//   const [pmPeakData, setPmPeakData] = useState([]);
//   const [avgTravelTimeIndex, setAvgTravelTimeIndex] = useState({});
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [selectedRoad, setSelectedRoad] = useState("All");
//   const [selectedRoute, setSelectedRoute] = useState("All");
//   const [selectedDate, setSelectedDate] = useState("today");

//   useEffect(() => {
//     const fetchData = async () => {
//       let url = "";

//       // Check for selected date range
//       if (selectedDate === "today") {
//         url = "http://localhost:3000/data/tti/today";
//       } else if (selectedDate === "lastWeek") {
//         url = "http://localhost:3000/data/tti/last-week";
//       } else if (selectedDate === "last2Weeks") {
//         url = "http://localhost:3000/data/tti/last-2-weeks";
//       } else if (selectedDate === "last3Weeks") {
//         url = "http://localhost:3000/data/tti/last-3-weeks";
//       } else if (selectedDate === "last4Weeks") {
//         url = "http://localhost:3000/data/tti/last-4-weeks";
//       }

//       try {
//         const response = await fetch(url);
//         const data = await response.json();

//         const { D_PDP_Operations, avgTravelTimeIndex, totalPages } = data;

//         setAmPeakData(data.filter(item => item.Peak === "AM"));
//         setPmPeakData(data.filter(item => item.Peak === "PM"));
//         setAvgTravelTimeIndex(avgTravelTimeIndex);
//         setTotalPages(totalPages);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, [selectedDate, page]);

//   const uniqueRoads = [
//     "All",
//     ...new Set([...amPeakData, ...pmPeakData].map((item) => item.Road)),
//   ];
//   const uniqueRoutes = [
//     "All",
//     ...new Set([...amPeakData, ...pmPeakData].map((item) => item.Predefined_path)),
//   ];

//   const filteredAmPeakData = amPeakData.filter((row) => {
//     return (
//       (selectedRoad === "All" || row.Road === selectedRoad) &&
//       (selectedRoute === "All" || row.Predefined_path === selectedRoute)
//     );
//   });

//   const filteredPmPeakData = pmPeakData.filter((row) => {
//     return (
//       (selectedRoad === "All" || row.Road === selectedRoad) &&
//       (selectedRoute === "All" || row.Predefined_path === selectedRoute)
//     );
//   });



//   return (
//     <div>
//       <div className="nav-bar">
//         <h1>PDP - Travel Time Index Daily</h1>
//         <div className="nav-images">
//           <img src="https://via.placeholder.com/50" alt="Sample 1" className="nav-image" />
//           <img src="https://via.placeholder.com/50" alt="Sample 2" className="nav-image" />
//         </div>
//       </div>

//       <div className="tti-container">
//         <div className="tti-tables">
//           <div className="tti-filters">
//             <label>
//               Road:
//               <select onChange={(e) => setSelectedRoad(e.target.value)} value={selectedRoad}>
//                 {uniqueRoads.map((road, index) => (
//                   <option key={index} value={road}>
//                     {road}
//                   </option>
//                 ))}
//               </select>
//             </label>

//             <label>
//               Route:
//               <select onChange={(e) => setSelectedRoute(e.target.value)} value={selectedRoute}>
//                 {uniqueRoutes.map((route, index) => (
//                   <option key={index} value={route}>
//                     {route}
//                   </option>
//                 ))}
//               </select>
//             </label>

//             <label>
//               Date:
//               <select onChange={(e) => setSelectedDate(e.target.value)} value={selectedDate}>
//                 <option value="today">Today</option>
//                 <option value="lastWeek">Last Week</option>
//                 <option value="last2Weeks">Last 2 Weeks</option>
//                 <option value="last3Weeks">Last 3 Weeks</option>
//                 <option value="last4Weeks">Last 4 Weeks</option>
//               </select>
//             </label>
//           </div>

//           <h3>AM Peak</h3>
//           <div className="scrollable-table">
//             <table>
//               <thead>
//                 <tr>
//                   <th>SL</th>
//                   <th>Date</th>
//                   <th>Road</th>
//                   <th>Length (KM)</th>
//                   <th>Route</th>
//                   <th>Travel Time</th>
//                   <th>Free Flow Time</th>
//                   <th>TTI</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredAmPeakData.map((row, index) => (
//                   <tr key={index}>
//                     <td>{index + 1}</td>
//                     <td>{row.event_date}</td>
//                     <td>{row.Road}</td>
//                     <td>{row.Length_KM}</td>
//                     <td>{row.Predefined_path}</td>
//                     <td>{row.am_peak_avg_travel_time.toFixed(2)}</td>
//                     <td>{row.free_flow_avg_travel_time.toFixed(2)}</td>
//                     <td className={getTTIClass(row.am_peak_avg_travel_time)}>
//                       {(row.am_peak_avg_travel_time/row.free_flow_avg_travel_time).toFixed(2)}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           <h3>PM Peak</h3>
//           <div className="scrollable-table">
//             <table>
//               <thead>
//                 <tr>
//                   <th>SL</th>
//                   <th>Date</th>
//                   <th>Road</th>
//                   <th>Length (KM)</th>
//                   <th>Route</th>
//                   <th>Travel Time</th>
//                   <th>Free Flow Time</th>
//                   <th>TTI</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredPmPeakData.map((row, index) => (
//                   <tr key={index}>
//                     <td>{index + 1}</td>
//                     <td>{row.event_date}</td>
//                     <td>{row.Road}</td>
//                     <td>{row.Length_KM}</td>
//                     <td>{row.Predefined_path}</td>
//                     <td>{row.pm_peak_avg_travel_time.toFixed(2)}</td>
// <td>{row.free_flow_avg_travel_time.toFixed(2)}</td>
// <td className={getTTIClass(row.pm_peak_avg_travel_time)}>
//   {(row.pm_peak_avg_travel_time/row.free_flow_avg_travel_time).toFixed(2)}
// </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         <div className="tti-summary">
//           <h2>Average Travel Time Index</h2>
//           <div className="avg-tti-box">
//             <div>
//               <p>AM Peak TTI</p>
//               <h3>avgTravelTimeIndex.amPeakTTI</h3>
//             </div>
//             <div>
//               <p>PM Peak TTI</p>
//               <h3>avgTravelTimeIndex.pmPeakTTI</h3>
//             </div>
//           </div>
//         </div>


//         <div className="tti-definitions-card">
//           <h3>Definitions</h3>
//           <p><strong>AM Peak:</strong> 08:00 to 09:00</p>
//           <p><strong>PM Peak:</strong> 18:30 to 19:30</p>
//           <p><strong>Free Flow:</strong> 02:00 to 03:00</p>
//           <h3>TTI Ranges</h3>
//           <div className="tti-ranges">
//             <p><strong>0.00 TTI ≤ 1.4</strong> - GOOD STATUS: Normal Traffic Flow</p>
//             <p><strong>1.4 TTI ≤ 1.8</strong> - MINOR DELAYS: Below Expected Flow</p>
//             <p><strong>1.8 TTI</strong> - SEVERE DELAYS: Significant Congestion</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const getTTIClass = (tti) => {
//   if (tti <= 1.4) return "good";
//   if (tti <= 1.8) return "minor";
//   return "severe";
// };

// export default TravelTimeIndexTable;

import React, { useState, useEffect } from "react";
import "../assets/styles.css";
import * as XLSX from "xlsx";  

const TravelTimeIndexTable = () => {
  const [amPeakData, setAmPeakData] = useState([]);
  const [pmPeakData, setPmPeakData] = useState([]);
  const [avgTravelTimeIndex, setAvgTravelTimeIndex] = useState({});
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedRoad, setSelectedRoad] = useState("All");
  const [selectedRoute, setSelectedRoute] = useState("All");
  const [selectedDate, setSelectedDate] = useState("today");

  useEffect(() => {
    const fetchData = async () => {
      let url = "";

      // Check for selected date range
      if (selectedDate === "today") {
        url = "http://localhost:3000/data/tti/today";
      } else if (selectedDate === "lastWeek") {
        url = "http://localhost:3000/data/tti/last-week";
      } else if (selectedDate === "last2Weeks") {
        url = "http://localhost:3000/data/tti/last-2-weeks";
      } else if (selectedDate === "last3Weeks") {
        url = "http://localhost:3000/data/tti/last-3-weeks";
      } else if (selectedDate === "last4Weeks") {
        url = "http://localhost:3000/data/tti/last-4-weeks";
      }

      try {
        const response = await fetch(url);
        const data = await response.json();

        const { D_PDP_Operations, avgTravelTimeIndex, totalPages } = data;

        setAmPeakData(data.filter(item => item.Peak === "AM"));
        setPmPeakData(data.filter(item => item.Peak === "PM"));
        setAvgTravelTimeIndex(avgTravelTimeIndex);
        setTotalPages(totalPages);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedDate, page]);

  const uniqueRoads = [
    "All",
    ...new Set([...amPeakData, ...pmPeakData].map((item) => item.Road)),
  ];
  const uniqueRoutes = [
    "All",
    ...new Set([...amPeakData, ...pmPeakData].map((item) => item.Predefined_path)),
  ];

  const filteredAmPeakData = amPeakData.filter((row) => {
    return (
      (selectedRoad === "All" || row.Road === selectedRoad) &&
      (selectedRoute === "All" || row.Predefined_path === selectedRoute)
    );
  });

  const filteredPmPeakData = pmPeakData.filter((row) => {
    return (
      (selectedRoad === "All" || row.Road === selectedRoad) &&
      (selectedRoute === "All" || row.Predefined_path === selectedRoute)
    );
  });

  // Calculate AM Peak TTI (Sum of Travel Time / Sum of Free Flow Time)
  const totalAmTravelTime = filteredAmPeakData.reduce((acc, row) => acc + row.am_peak_avg_travel_time, 0);
  const totalAmFreeFlowTime = filteredAmPeakData.reduce((acc, row) => acc + row.free_flow_avg_travel_time, 0);
  const amPeakTTI = totalAmFreeFlowTime !== 0 ? totalAmTravelTime / totalAmFreeFlowTime : 0;

  console.log({totalAmTravelTime,totalAmFreeFlowTime});
  

  // Calculate PM Peak TTI (Sum of Travel Time / Sum of Free Flow Time)
  const totalPmTravelTime = filteredPmPeakData.reduce((acc, row) => acc + row.pm_peak_avg_travel_time, 0);
  const totalPmFreeFlowTime = filteredPmPeakData.reduce((acc, row) => acc + row.free_flow_avg_travel_time, 0);
  const pmPeakTTI = totalPmFreeFlowTime !== 0 ? totalPmTravelTime / totalPmFreeFlowTime : 0;

  // Function to download data in Excel
  const downloadExcel = () => {
    // Prepare AM peak data
    const amPeakSheet = XLSX.utils.json_to_sheet(filteredAmPeakData.map((row, index) => ({
      SL: index + 1,
      Date: row.event_date,
      Road: row.Road,
      "Length (KM)": row.Length_KM,
      Route: row.Predefined_path,
      "Peak Travel Time": row.am_peak_avg_travel_time.toFixed(2),
      "Free Flow Time": row.free_flow_avg_travel_time.toFixed(2),
      "Peak TTI": (row.am_peak_avg_travel_time / row.free_flow_avg_travel_time).toFixed(2),
    })));

    // Prepare PM peak data
    const pmPeakSheet = XLSX.utils.json_to_sheet(filteredPmPeakData.map((row, index) => ({
      SL: index + 1,
      Date: row.event_date,
      Road: row.Road,
      "Length (KM)": row.Length_KM,
      Route: row.Predefined_path,
      "Peak Travel Time": row.pm_peak_avg_travel_time.toFixed(2),
      "Free Flow Time": row.free_flow_avg_travel_time.toFixed(2),
      "Peak TTI": (row.pm_peak_avg_travel_time / row.free_flow_avg_travel_time).toFixed(2),
    })));

    // Create a workbook and append both sheets
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, amPeakSheet, "AM Peak");
    XLSX.utils.book_append_sheet(wb, pmPeakSheet, "PM Peak");

    // Export the workbook
    XLSX.writeFile(wb, "Travel_Time_Index_Data.xlsx");
  };

  return (
    <div>
      <div className="nav-bar">
        <h1>PDP - Travel Time Index Daily   <button disabled className="button" onClick={downloadExcel} title="Application is in Development">
      Development
    </button></h1>
        <div className="nav-images">
          <img src="/dubaigovt-rta-combined-logo.png" alt="Sample 2" className="nav-image" />
        </div>
      </div>

      <div className="tti-container">
        <div className="tti-tables">
          <div className="tti-filters">
            <label>
              Road:
              <select onChange={(e) => setSelectedRoad(e.target.value)} value={selectedRoad}>
                {uniqueRoads.map((road, index) => (
                  <option key={index} value={road}>
                    {road}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Route:
              <select onChange={(e) => setSelectedRoute(e.target.value)} value={selectedRoute}>
                {uniqueRoutes.map((route, index) => (
                  <option key={index} value={route}>
                    {route}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Date:
              <select onChange={(e) => setSelectedDate(e.target.value)} value={selectedDate}>
                <option value="today">Today</option>
                <option value="lastWeek">Last Week</option>
                <option value="last2Weeks">Last 2 Weeks</option>
                <option value="last3Weeks">Last 3 Weeks</option>
                <option value="last4Weeks">Last 4 Weeks</option>
              </select>
            </label>

            {/* <button class="button-4"  onClick={downloadExcel}>Download Excel</button> */}
            <button className="button-4" onClick={downloadExcel} title="Click to download the Excel file">
      <span className="material-icons" style={{ fontSize: '14px' }}>file_download</span> Download
    </button>
          </div>

          <h3>AM Peak</h3>
          <div className="scrollable-table">
            <table>
              <thead>
                <tr>
                  <th>SL</th>
                  <th>Date</th>
                  <th>Road</th>
                  <th>Length (KM)</th>
                  <th>Route</th>
                  <th>Peak Travel Time</th>
                  <th>Free Flow Time</th>
                  <th>Peak TTI</th>
                </tr>
              </thead>
              <tbody>
                {filteredAmPeakData.map((row, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{row.event_date}</td>
                    <td>{row.Road}</td>
                    <td>{row.Length_KM}</td>
                    <td>{row.Predefined_path}</td>
                    <td>{row.am_peak_avg_travel_time.toFixed(2)}</td>
                    <td>{row.free_flow_avg_travel_time.toFixed(2)}</td>
                    <td className={getTTIClass((row.am_peak_avg_travel_time / row.free_flow_avg_travel_time).toFixed(2))}>
                      {(row.am_peak_avg_travel_time / row.free_flow_avg_travel_time).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3>PM Peak</h3>
          <div className="scrollable-table">
            <table className="table_bottm">
              <thead>
                <tr>
                  <th>SL</th>
                  <th>Date</th>
                  <th>Road</th>
                  <th>Length (KM)</th>
                  <th>Route</th>
                  <th>Peak Travel Time</th>
                  <th>Free Flow Time</th>
                  <th>Peak TTI</th>
                </tr>
              </thead>
              <tbody>
                {filteredPmPeakData.map((row, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{row.event_date}</td>
                    <td>{row.Road}</td>
                    <td>{row.Length_KM}</td>
                    <td>{row.Predefined_path}</td>
                    <td>{row.pm_peak_avg_travel_time.toFixed(2)}</td>
                    <td>{row.free_flow_avg_travel_time.toFixed(2)}</td>
                    <td className={getTTIClass((row.pm_peak_avg_travel_time / row.free_flow_avg_travel_time).toFixed(2))}>
                      {(row.pm_peak_avg_travel_time / row.free_flow_avg_travel_time).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="tti-summary">
          <h2>Average Travel Time Index</h2>
          <div className="avg-tti-box">
            <div>
              <p>AM Peak TTI</p>
              <h3>{amPeakTTI.toFixed(2)}</h3>
            </div>
            <div>
              <p>PM Peak TTI</p>
              <h3>{pmPeakTTI.toFixed(2)}</h3>
            </div>
            <div style={{ textAlign: 'left' }}>
              <b>Definitions</b>
              <p style={{ fontSize: "12px" }}>
                <strong style={{ color: "#fff" }}>AM Peak:</strong><br /> 08:00 to 09:00
              </p>
              <p style={{ fontSize: "12px" }}>
                <strong style={{ color: "#fff" }}>PM Peak:</strong><br /> 18:30 to 19:30
              </p>
              <p style={{ fontSize: "12px" }}>
                <strong style={{ color: "#fff" }}>Free Flow:</strong><br /> 02:00 to 03:00
              </p>
            </div>
          </div>

          <div className="tti-definitions-card">
            <h3>TTI Ranges</h3>
            <div className="tti-ranges">
              <p><strong>0.00 TTI ≤ 1.4</strong> - GOOD STATUS: Normal Traffic Flow</p>
              <p><strong>1.4 TTI ≤ 1.8</strong> - MINOR DELAYS: Below Expected Flow</p>
              <p><strong>1.8 TTI</strong> - SEVERE DELAYS: Significant Congestion</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const getTTIClass = (tti) => {
  if (tti <= 1.4) return "good";
  if (tti <= 1.8) return "minor";
  return "severe";
};

export default TravelTimeIndexTable;


// import React, { useState, useEffect } from "react";
// import "../assets/styles.css";
// // import * as XLSX from "xlsx";

// const TravelTimeIndexTable = () => {
//   const [amPeakData, setAmPeakData] = useState([]);
//   const [pmPeakData, setPmPeakData] = useState([]);
//   const [avgTravelTimeIndex, setAvgTravelTimeIndex] = useState({});
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [selectedRoad, setSelectedRoad] = useState("All");
//   const [selectedRoute, setSelectedRoute] = useState("All");
//   const [selectedDate, setSelectedDate] = useState("today");

//   useEffect(() => {
//     const fetchData = async () => {
//       let url = "";

//       // Check for selected date range
//       if (selectedDate === "today") {
//         url = "http://localhost:3000/data/tti/today";
//       } else if (selectedDate === "lastWeek") {
//         url = "http://localhost:3000/data/tti/last-week";
//       } else if (selectedDate === "last2Weeks") {
//         url = "http://localhost:3000/data/tti/last-2-weeks";
//       } else if (selectedDate === "last3Weeks") {
//         url = "http://localhost:3000/data/tti/last-3-weeks";
//       } else if (selectedDate === "last4Weeks") {
//         url = "http://localhost:3000/data/tti/last-4-weeks";
//       }

//       try {
//         const response = await fetch(url);
//         const data = await response.json();

//         const { D_PDP_Operations, avgTravelTimeIndex, totalPages } = data;

//         setAmPeakData(data.filter(item => item.Peak === "AM"));
//         setPmPeakData(data.filter(item => item.Peak === "PM"));
//         setAvgTravelTimeIndex(avgTravelTimeIndex);
//         setTotalPages(totalPages);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, [selectedDate, page]);

//   const uniqueRoads = [
//     "All",
//     ...new Set([...amPeakData, ...pmPeakData].map((item) => item.Road)),
//   ];
//   const uniqueRoutes = [
//     "All",
//     ...new Set([...amPeakData, ...pmPeakData].map((item) => item.Predefined_path)),
//   ];

//   const filteredAmPeakData = amPeakData.filter((row) => {
//     return (
//       (selectedRoad === "All" || row.Road === selectedRoad) &&
//       (selectedRoute === "All" || row.Predefined_path === selectedRoute)
//     );
//   });

//   const filteredPmPeakData = pmPeakData.filter((row) => {
//     return (
//       (selectedRoad === "All" || row.Road === selectedRoad) &&
//       (selectedRoute === "All" || row.Predefined_path === selectedRoute)
//     );
//   });

//   // Calculate AM Peak TTI (Sum of Travel Time / Sum of Free Flow Time)
//   const totalAmTravelTime = filteredAmPeakData.reduce((acc, row) => acc + row.am_peak_avg_travel_time, 0);
//   const totalAmFreeFlowTime = filteredAmPeakData.reduce((acc, row) => acc + row.free_flow_avg_travel_time, 0);
//   const amPeakTTI = totalAmFreeFlowTime !== 0 ? totalAmTravelTime / totalAmFreeFlowTime : 0;

//   // Calculate PM Peak TTI (Sum of Travel Time / Sum of Free Flow Time)
//   const totalPmTravelTime = filteredPmPeakData.reduce((acc, row) => acc + row.pm_peak_avg_travel_time, 0);
//   const totalPmFreeFlowTime = filteredPmPeakData.reduce((acc, row) => acc + row.free_flow_avg_travel_time, 0);
//   const pmPeakTTI = totalPmFreeFlowTime !== 0 ? totalPmTravelTime / totalPmFreeFlowTime : 0;


//   // const downloadExcel = () => {
//   //   const ws = XLSX.utils.json_to_sheet(filteredData);
//   //   const wb = XLSX.utils.book_new();
//   //   XLSX.utils.book_append_sheet(wb, ws, "Salik Data");
//   //   XLSX.writeFile(wb, "Salik_PDP_Data.xlsx");
//   // };


//   return (
//     <div>
//       <div className="nav-bar">
//         <h1>PDP - Travel Time Index Daily</h1>
//         <div className="nav-images">
//           <img src="https://via.placeholder.com/50" alt="Sample 1" className="nav-image" />
//           <img src="https://via.placeholder.com/50" alt="Sample 2" className="nav-image" />
//         </div>
//       </div>

//       <div className="tti-container">
//         <div className="tti-tables">
//           <div className="tti-filters">
//             <label>
//               Road:
//               <select onChange={(e) => setSelectedRoad(e.target.value)} value={selectedRoad}>
//                 {uniqueRoads.map((road, index) => (
//                   <option key={index} value={road}>
//                     {road}
//                   </option>
//                 ))}
//               </select>
//             </label>

//             <label>
//               Route:
//               <select onChange={(e) => setSelectedRoute(e.target.value)} value={selectedRoute}>
//                 {uniqueRoutes.map((route, index) => (
//                   <option key={index} value={route}>
//                     {route}
//                   </option>
//                 ))}
//               </select>
//             </label>

//             <label>
//               Date:
//               <select onChange={(e) => setSelectedDate(e.target.value)} value={selectedDate}>
//                 <option value="today">Today</option>
//                 <option value="lastWeek">Last Week</option>
//                 <option value="last2Weeks">Last 2 Weeks</option>
//                 <option value="last3Weeks">Last 3 Weeks</option>
//                 <option value="last4Weeks">Last 4 Weeks</option>
//               </select>
//             </label>
//           </div>

//           <h3>AM Peak</h3>
//           <div className="scrollable-table">
//             <table>
//               <thead>
//                 <tr>
//                   <th>SL</th>
//                   <th>Date</th>
//                   <th>Road</th>
//                   <th>Length (KM)</th>
//                   <th>Route</th>
//                   <th>Peak Travel Time</th>
//                   <th>Free Flow Time</th>
//                   <th>Peak TTI</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredAmPeakData.map((row, index) => (
//                   <tr key={index}>
//                     <td>{index + 1}</td>
//                     <td>{row.event_date}</td>
//                     <td>{row.Road}</td>
//                     <td>{row.Length_KM}</td>
//                     <td>{row.Predefined_path}</td>
//                     <td>{row.am_peak_avg_travel_time.toFixed(2)}</td>
//                     <td>{row.free_flow_avg_travel_time.toFixed(2)}</td>
//                     <td className={getTTIClass((row.am_peak_avg_travel_time / row.free_flow_avg_travel_time).toFixed(2))}>
//                       {(row.am_peak_avg_travel_time / row.free_flow_avg_travel_time).toFixed(2)}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           <h3>PM Peak</h3>
//           <div className="scrollable-table">
//             <table className="table_bottm">
//               <thead>
//                 <tr>
//                   <th>SL</th>
//                   <th>Date</th>
//                   <th>Road</th>
//                   <th>Length (KM)</th>
//                   <th>Route</th>
//                   <th>Peak Travel Time</th>
//                   <th>Free Flow Time</th>
//                   <th>Peak TTI</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredPmPeakData.map((row, index) => (
//                   <tr key={index}>
//                     <td>{index + 1}</td>
//                     <td>{row.event_date}</td>
//                     <td>{row.Road}</td>
//                     <td>{row.Length_KM}</td>
//                     <td>{row.Predefined_path}</td>
//                     <td>{row.pm_peak_avg_travel_time.toFixed(2)}</td>
//                     <td>{row.free_flow_avg_travel_time.toFixed(2)}</td>
//                     <td className={getTTIClass((row.pm_peak_avg_travel_time / row.free_flow_avg_travel_time).toFixed(2))}>
//                       {(row.pm_peak_avg_travel_time / row.free_flow_avg_travel_time).toFixed(2)}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         <div className="tti-summary">
//           <h2>Average Travel Time Index</h2>
//           <div className="avg-tti-box">
//             <div>
//               <p>AM Peak TTI</p>
//               <h3  >{amPeakTTI.toFixed(2)}</h3> {/* Display calculated AM TTI */}
//             </div>
//             <div>
//               <p>PM Peak TTI</p>
//               <h3>{pmPeakTTI.toFixed(2)}</h3> {/* Display calculated PM TTI */}
//             </div>
//             <div style={{ textAlign: 'left' }}>
//             <b >Definitions</b>
//   <p style={{ fontSize: "12px" }}>
//     <strong style={{ color:"#fff" }}>AM Peak:</strong><br /> 08:00 to 09:00
//   </p>
//   <p style={{ fontSize: "12px"}}>
//     <strong style={{ color:"#fff" }}>PM Peak:</strong><br /> 18:30 to 19:30
//   </p>
//   <p style={{ fontSize: "12px" }}>
//     <strong style={{ color:"#fff" }}>Free Flow:</strong><br /> 02:00 to 03:00
//   </p>
// </div>
//           </div>
//           <div className="tti-definitions-card">
//           <h3>TTI Ranges</h3>
//           <div className="tti-ranges">
//             <p><strong>0.00 TTI ≤ 1.4</strong> - GOOD STATUS: Normal Traffic Flow</p>
//             <p><strong>1.4 TTI ≤ 1.8</strong> - MINOR DELAYS: Below Expected Flow</p>
//             <p><strong>1.8 TTI</strong> - SEVERE DELAYS: Significant Congestion</p>
//           </div>
//         </div>
//         </div>

        
//       </div>
//     </div>
//   );
// };

// const getTTIClass = (tti) => {
//   if (tti <= 1.4) return "good";
//   if (tti <= 1.8) return "minor";
//   return "severe";
// };

// export default TravelTimeIndexTable;
