// import React, { useState, useEffect } from "react";
// import "../assets/styles.css";

// const Jumeirah = () => {
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
//         url = "http://localhost:3000/data/jumeirah/today";
//       } else if (selectedDate === "lastWeek") {
//         url = "http://localhost:3000/data/jumeirah/last-week";
//       } else if (selectedDate === "last2Weeks") {
//         url = "http://localhost:3000/data/jumeirah/last-2-weeks";
//       } else if (selectedDate === "last3Weeks") {
//         url = "http://localhost:3000/data/jumeirah/last-3-weeks";
//       } else if (selectedDate === "last4Weeks") {
//         url = "http://localhost:3000/data/jumeirah/last-4-weeks";
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

//   // Calculate average TTI for AM Peak
//   const calculateAvgTTI = (data) => {
//     const totalTravelTime = data.reduce((sum, item) => sum + item.am_peak_avg_travel_time, 0);
//     const totalFreeFlowTime = data.reduce((sum, item) => sum + item.free_flow_avg_travel_time, 0);
//     return totalFreeFlowTime !== 0 ? (totalTravelTime / totalFreeFlowTime).toFixed(2) : 0;
//   };

//   // Calculate average TTI for PM Peak
//   const calculateAvgTTIForPM = (data) => {
//     const totalTravelTime = data.reduce((sum, item) => sum + item.pm_peak_avg_travel_time, 0);
//     const totalFreeFlowTime = data.reduce((sum, item) => sum + item.free_flow_avg_travel_time, 0);
//     return totalFreeFlowTime !== 0 ? (totalTravelTime / totalFreeFlowTime).toFixed(2) : 0;
//   };

//   const avgAmTTI = calculateAvgTTI(filteredAmPeakData);
//   const avgPmTTI = calculateAvgTTIForPM(filteredPmPeakData);

//   return (
//     <div>
//       <div className="nav-bar">
//         <h1>PDP - Jumeirah</h1>
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
//             <table  className="table_bottm">
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
//               <h3>{avgAmTTI}</h3>
//             </div>
//             <div>
//               <p>PM Peak TTI</p>
//               <h3>{avgPmTTI}</h3>
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

// export default Jumeirah;















// import React, { useState, useEffect } from "react";
// import "../assets/styles.css";
// import * as XLSX from "xlsx";

// const Jumeirah = () => {
//   const [data, setData] = useState([]);
//   const [selectedRoad, setSelectedRoad] = useState("All");
//   const [selectedRoute, setSelectedRoute] = useState("All");
//   const [selectedDate, setSelectedDate] = useState("today");

//   useEffect(() => {
//     const fetchData = async () => {
//       let url = "";

//       if (selectedDate === "today") {
//         url = "http://localhost:3000/data/jumeirah/today";
//       } else if (selectedDate === "lastWeek") {
//         url = "http://localhost:3000/data/jumeirah/last-week";
//       } else if (selectedDate === "last2Weeks") {
//         url = "http://localhost:3000/data/jumeirah/last-2-weeks";
//       } else if (selectedDate === "last3Weeks") {
//         url = "http://localhost:3000/data/jumeirah/last-3-weeks";
//       } else if (selectedDate === "last4Weeks") {
//         url = "http://localhost:3000/data/jumeirah/last-4-weeks";
//       }

//       try {
//         const response = await fetch(url);
//         const result = await response.json();
//         setData(result);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, [selectedDate]);

//   const uniqueRoads = [
//     "All",
//     ...new Set(data.map((item) => item.Road)),
//   ];
  
//   const uniqueRoutes = [
//     "All",
//     ...new Set(data.map((item) => item.Predefined_path)),
//   ];

//   const filteredData = data.filter((row) => {
//     return (
//       (selectedRoad === "All" || row.Road === selectedRoad) &&
//       (selectedRoute === "All" || row.Predefined_path === selectedRoute)
//     );
//   });

//   const calculateTTI = (amPeak, freeFlow) => {
//     return freeFlow !== 0 ? (amPeak / freeFlow).toFixed(2) : 0;
//   };

//   const downloadExcel = () => {
//     const ws = XLSX.utils.json_to_sheet(filteredData);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Jumeirah Data");
//     XLSX.writeFile(wb, "Jumeirah_PDP_Data.xlsx");
//   };

//   return (
//     <div>
//       <div className="nav-bar">
//         <h1>PDP - Jumeirah</h1>
//       </div>

//       <div className="tti-container">
//         <div className="tti-filters">
//           <label>
//             Road:
//             <select onChange={(e) => setSelectedRoad(e.target.value)} value={selectedRoad}>
//               {uniqueRoads.map((road, index) => (
//                 <option key={index} value={road}>
//                   {road}
//                 </option>
//               ))}
//             </select>
//           </label>

//           <label>
//             Route:
//             <select onChange={(e) => setSelectedRoute(e.target.value)} value={selectedRoute}>
//               {uniqueRoutes.map((route, index) => (
//                 <option key={index} value={route}>
//                   {route}
//                 </option>
//               ))}
//             </select>
//           </label>

//           <label>
//             Date:
//             <select onChange={(e) => setSelectedDate(e.target.value)} value={selectedDate}>
//               <option value="today">Today</option>
//               <option value="lastWeek">Last Week</option>
//               <option value="last2Weeks">Last 2 Weeks</option>
//               <option value="last3Weeks">Last 3 Weeks</option>
//               <option value="last4Weeks">Last 4 Weeks</option>
//             </select>
//           </label>

//           <button onClick={downloadExcel}>Download Excel</button>
//         </div>

//         <div className="tti-table">
//           <table>
//             <thead>
//               <tr>
//                 <th>SL</th>
//                 <th>Date</th>
//                 <th>Road</th>
//                 <th>Length (KM)</th>
//                 <th>Route</th>
//                 <th>Peak Travel Time</th>
//                 <th>Free Flow Time</th>
//                 <th>Peak TTI</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredData.map((row, index) => (
//                 <tr key={index}>
//                   <td>{index + 1}</td>
//                   <td>{row.event_date}</td>
//                   <td>{row.Road}</td>
//                   <td>{row.Length_KM}</td>
//                   <td>{row.Predefined_path}</td>
//                   <td>{row.am_peak_avg_travel_time.toFixed(2)}</td>
//                   <td>{row.free_flow_avg_travel_time.toFixed(2)}</td>
//                   <td className={getTTIClass(calculateTTI(row.am_peak_avg_travel_time, row.free_flow_avg_travel_time))}>
//                     {calculateTTI(row.am_peak_avg_travel_time, row.free_flow_avg_travel_time)}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
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

// export default Jumeirah;



import React, { useState, useEffect } from "react";
import "../assets/styles.css";
import * as XLSX from "xlsx";

const Jumeirah = () => {
  const [data, setData] = useState([]);
  const [avgTravelTimeIndex, setAvgTravelTimeIndex] = useState({});
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedRoad, setSelectedRoad] = useState("All");
  const [selectedRoute, setSelectedRoute] = useState("All");
  const [selectedDate, setSelectedDate] = useState("today");

  useEffect(() => {
    const fetchData = async () => {
      let url = "";

      if (selectedDate === "today") {
        url = "http://localhost:3000/data/jumeirah/today";
      } else if (selectedDate === "lastWeek") {
        url = "http://localhost:3000/data/jumeirah/last-week";
      } else if (selectedDate === "last2Weeks") {
        url = "http://localhost:3000/data/jumeirah/last-2-weeks";
      } else if (selectedDate === "last3Weeks") {
        url = "http://localhost:3000/data/jumeirah/last-3-weeks";
      } else if (selectedDate === "last4Weeks") {
        url = "http://localhost:3000/data/jumeirah/last-4-weeks";
      }

      try {
        const response = await fetch(url);
        const data = await response.json();
        setData(data); // Ensure data is an array
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
    ...new Set(data?.map((item) => item.Road)),
  ];
  const uniqueRoutes = [
    "All",
    ...new Set(data?.map((item) => item.Predefined_path)),
  ];

  const filteredData = data.filter((row) => {
    return (
      (selectedRoad === "All" || row.Road === selectedRoad) &&
      (selectedRoute === "All" || row.Predefined_path === selectedRoute)
    );
  });

  const calculateAvgTTI = (data, peakType) => {
    const totalTravelTime = data.reduce(
      (sum, item) => sum + (item[`${peakType}_peak_avg_travel_time`] || 0),
      0
    );
    const totalFreeFlowTime = data.reduce(
      (sum, item) => sum + (item.free_flow_avg_travel_time || 0),
      0
    );
    return totalFreeFlowTime !== 0
      ? (totalTravelTime / totalFreeFlowTime).toFixed(2)
      : 0;
  };

  const avgAmTTI = calculateAvgTTI(filteredData, "am");
  const avgPmTTI = calculateAvgTTI(filteredData, "pm");

  const getTTIClass = (tti) => {
    if (tti <= 1.4) return "good";
    if (tti <= 1.8) return "minor";
    return "severe";
  };

  const downloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Salik Data");
    XLSX.writeFile(wb, "Salik_PDP_Data.xlsx");
  };

  // Filter the data for AM and PM separately
  const filteredAmData = filteredData.filter((row) => row.am_peak_avg_travel_time > 0);
  const filteredPmData = filteredData.filter((row) => row.pm_peak_avg_travel_time > 0);

  return (
    <div>
      <div className="nav-bar">
        <h1>PDP - Jumeirah</h1>
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
                {uniqueRoads?.map((road, index) => (
                  <option key={index} value={road}>
                    {road}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Route:
              <select onChange={(e) => setSelectedRoute(e.target.value)} value={selectedRoute}>
                {uniqueRoutes?.map((route, index) => (
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

            {/* <button class="button-4" onClick={downloadExcel}>Download Excel</button> */}
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
                {filteredAmData?.map((row, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{row.event_date}</td>
                    <td>{row.Road}</td>
                    <td>{row.Length_KM}</td>
                    <td>{row.Predefined_path}</td>
                    <td>
                      {row.am_peak_avg_travel_time.toFixed(2)}
                    </td>
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
                {filteredPmData?.map((row, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{row.event_date}</td>
                    <td>{row.Road}</td>
                    <td>{row.Length_KM}</td>
                    <td>{row.Predefined_path}</td>
                    <td>
                      {row.pm_peak_avg_travel_time.toFixed(2)}
                    </td>
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
              <h3>{avgAmTTI}</h3>
            </div>
            <div>
              <p>PM Peak TTI</p>
              <h3>{avgPmTTI}</h3>
            </div>
            <div style={{ textAlign: 'left' }}>
              <b>Definitions</b>
              <p style={{ fontSize: "12px" }}>
                <strong style={{ color:"#fff" }}>AM Peak:</strong><br /> 08:00 to 09:00
              </p>
              <p style={{ fontSize: "12px"}}>
                <strong style={{ color:"#fff" }}>PM Peak:</strong><br /> 18:30 to 19:30
              </p>
              <p style={{ fontSize: "12px" }}>
                <strong style={{ color:"#fff" }}>Free Flow:</strong><br /> 02:00 to 03:00
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

export default Jumeirah;


// import React, { useState, useEffect } from "react";
// import "../assets/styles.css";
// import * as XLSX from "xlsx";

// const Jumeirah = () => {
//   const [data, setData] = useState([]);
//   const [avgTravelTimeIndex, setAvgTravelTimeIndex] = useState({});
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [selectedRoad, setSelectedRoad] = useState("All");
//   const [selectedRoute, setSelectedRoute] = useState("All");
//   const [selectedDate, setSelectedDate] = useState("today");

//   useEffect(() => {
//     const fetchData = async () => {
//       let url = "";

//       if (selectedDate === "today") {
//         url = "http://localhost:3000/data/jumeirah/today";
//       } else if (selectedDate === "lastWeek") {
//         url = "http://localhost:3000/data/jumeirah/last-week";
//       } else if (selectedDate === "last2Weeks") {
//         url = "http://localhost:3000/data/jumeirah/last-2-weeks";
//       } else if (selectedDate === "last3Weeks") {
//         url = "http://localhost:3000/data/jumeirah/last-3-weeks";
//       } else if (selectedDate === "last4Weeks") {
//         url = "http://localhost:3000/data/jumeirah/last-4-weeks";
//       }

//       try {
//         const response = await fetch(url);
//         const data = await response.json();
//         setData(data); // Ensure data is an array
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
//     ...new Set(data?.map((item) => item.Road)),
//   ];
//   const uniqueRoutes = [
//     "All",
//     ...new Set(data?.map((item) => item.Predefined_path)),
//   ];

//   const filteredData = data.filter((row) => {
//     return (
//       (selectedRoad === "All" || row.Road === selectedRoad) &&
//       (selectedRoute === "All" || row.Predefined_path === selectedRoute)
//     );
//   });

//   const calculateAvgTTI = (data, peakType) => {
//     const totalTravelTime = data.reduce(
//       (sum, item) => sum + (item[`${peakType}_peak_avg_travel_time`] || 0),
//       0
//     );
//     const totalFreeFlowTime = data.reduce(
//       (sum, item) => sum + (item.free_flow_avg_travel_time || 0),
//       0
//     );
//     return totalFreeFlowTime !== 0
//       ? (totalTravelTime / totalFreeFlowTime).toFixed(2)
//       : 0;
//   };

//   const avgAmTTI = calculateAvgTTI(filteredData, "am");
//   const avgPmTTI = calculateAvgTTI(filteredData, "pm");

//   const getTTIClass = (tti) => {
//     if (tti <= 1.4) return "good";
//     if (tti <= 1.8) return "minor";
//     return "severe";
//   };

//   const downloadExcel = () => {
//     const ws = XLSX.utils.json_to_sheet(filteredData);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Salik Data");
//     XLSX.writeFile(wb, "Salik_PDP_Data.xlsx");
//   };

//   return (
//     <div>
//       <div className="nav-bar">
//         <h1>PDP - Jumeirah</h1>
//         <div className="nav-images">
//           <img src="https://via.placeholder.com/50" alt="Sample 2" className="nav-image" />
//         </div>
//       </div>

//       <div className="tti-container">
//         <div className="tti-tables">
//           <div className="tti-filters">
//             <label>
//               Road:
//               <select onChange={(e) => setSelectedRoad(e.target.value)} value={selectedRoad}>
//                 {uniqueRoads?.map((road, index) => (
//                   <option key={index} value={road}>
//                     {road}
//                   </option>
//                 ))}
//               </select>
//             </label>

//             <label>
//               Route:
//               <select onChange={(e) => setSelectedRoute(e.target.value)} value={selectedRoute}>
//                 {uniqueRoutes?.map((route, index) => (
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

//             <button class="button-4"  onClick={downloadExcel}>Download Excel</button>
//           </div>

//           <div className="scrollable-table-salik-jumeirah">
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
//                 {filteredData?.map((row, index) => (
//                   <tr key={index}>
//                     <td>{index + 1}</td>
//                     <td>{row.event_date}</td>
//                     <td>{row.Road}</td>
//                     <td>{row.Length_KM}</td>
//                     <td>{row.Predefined_path}</td>
//                     <td>
//                       AM: {row.am_peak_avg_travel_time.toFixed(2)} / PM: {row.pm_peak_avg_travel_time.toFixed(2)}
//                     </td>
//                     <td>{row.free_flow_avg_travel_time.toFixed(2)}</td>
//                     <td className={getTTIClass((row.am_peak_avg_travel_time / row.free_flow_avg_travel_time).toFixed(2))}>
//                       {(row.am_peak_avg_travel_time / row.free_flow_avg_travel_time).toFixed(2)}
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
//               <h3>{avgAmTTI}</h3>
//             </div>
//             <div>
//               <p>PM Peak TTI</p>
//               <h3>{avgPmTTI}</h3>
//             </div>
//             <div style={{ textAlign: 'left' }}>
//               <b>Definitions</b>
//               <p style={{ fontSize: "12px" }}>
//                 <strong style={{ color:"#fff" }}>AM Peak:</strong><br /> 08:00 to 09:00
//               </p>
//               <p style={{ fontSize: "12px"}}>
//                 <strong style={{ color:"#fff" }}>PM Peak:</strong><br /> 18:30 to 19:30
//               </p>
//               <p style={{ fontSize: "12px" }}>
//                 <strong style={{ color:"#fff" }}>Free Flow:</strong><br /> 02:00 to 03:00
//               </p>
//             </div>
//           </div>
//           <div className="tti-definitions-card">
//             <h3>TTI Ranges</h3>
//             <div className="tti-ranges">
//               <p><strong>0.00 TTI ≤ 1.4</strong> - GOOD STATUS: Normal Traffic Flow</p>
//               <p><strong>1.4 TTI ≤ 1.8</strong> - MINOR DELAYS: Below Expected Flow</p>
//               <p><strong>1.8 TTI</strong> - SEVERE DELAYS: Significant Congestion</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Jumeirah;