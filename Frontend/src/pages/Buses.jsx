
// / this code works original hai
import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar.jsx";

const formatDate = (dateString) => {
  const date = new Date(dateString);  
  return date.toLocaleDateString();   
};

const Buses = () => {
  const location = useLocation();
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(location.state?.error || "");
  const [searchDate, setSearchDate] = useState(""); // State for search date
  const [searchRoute, setSearchRoute] = useState("");
  const [filteredBuses, setFilteredBuses] = useState([]);

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        setLoading(true);
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
        const response = await axios.get(`${apiUrl}/api/buses`);
        setBuses(response.data);
        setFilteredBuses(response.data); // Set initial filtered buses
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch buses");
      } finally {
        setLoading(false);
      }
    };

    fetchBuses();
  }, []);


  const handleSearchDateChange = (e) => {
    setSearchDate(e.target.value);
  };

  const handleSearchRouteChange = (e) => {
    setSearchRoute(e.target.value);
  };


  useEffect(() => {
    const filtered = buses.filter((bus) => {
      const busDate = new Date(bus.departure_date).toLocaleDateString("en-CA");
      const matchesDate = !searchDate || busDate === searchDate;
      const matchesRoute = !searchRoute || bus.route.toLowerCase().includes(searchRoute.toLowerCase());
      return matchesDate && matchesRoute;
    });

    setFilteredBuses(filtered);
  }, [searchDate, searchRoute, buses]);
  

  return (
    <div className="min-h-screen bg-gray-200 p-6">
      <style>{`
        .scroll-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4 equal-width columns */
  gap: 1.5rem; /* Space between cards */
        }
        .bus-card {
          flex-shrink: 0;
          width: 320px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background-color: #f3f4f6; /* Light grey */
          padding: 1.5rem;
          border-radius: 1rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          border: 1px solid #d1d5db;
          scroll-snap-align: start;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .bus-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
        }
        .bus-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 0.5rem;
        }
        .bus-info {
          color: #4b5563;
          margin-bottom: 0.25rem;
        }
        .book-btn {
          margin-top: 1rem;
          padding: 0.6rem 1.5rem;
          background-color: #16a34a;
          color: white;
          border-radius: 0.5rem;
          font-weight: 500;
          text-align: center;
          transition: background-color 0.3s ease;
          white-space: nowrap;
        }
        .book-btn:hover {
          background-color: #15803d;
        }
      `}</style>

      <Navbar />
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">Available Buses</h1>

      {/* <div className="mb-4 flex flex-col sm:flex-row gap-4">
        <input
          type="date"
          value={searchDate}
          onChange={handleSearchDateChange}
          className="p-2 border border-gray-300 rounded-lg"
        />
        <input
          type="text"
          value={searchRoute}
          onChange={handleSearchRouteChange}
          placeholder="Search by Route (e.g. Pokhara to Kathmandu)"
          className="p-2 border border-gray-300 rounded-lg"
        />
      </div> */}

<div className="search-container">
  <div className="input-group">
    <label htmlFor="search-date">Departure Date</label>
    <input
      type="date"
      id="search-date"
      value={searchDate}
      onChange={handleSearchDateChange}
    />
  </div>

  <div className="input-group">
    <label htmlFor="search-route">Route</label>
    <input
      type="text"
      id="search-route"
      value={searchRoute}
      onChange={handleSearchRouteChange}
      placeholder="e.g. Pokhara to Kathmandu"
    />
  </div>

  <style>{`
    .search-container {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      background-color: #ffffff;
      padding: 1.5rem;
      border: 1px solid #d1d5db;
      border-radius: 1rem;
      box-shadow: 0 4px 8px rgba(0,0,0,0.04);
      max-width: 600px;
      margin-bottom: 2rem;
    }

    @media (min-width: 640px) {
      .search-container {
        flex-direction: row;
        align-items: flex-end;
      }
    }

    .input-group {
      display: flex;
      flex-direction: column;
      flex: 1;
    }

    .input-group label {
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: #000000;
    }

    // .input-group input {
    //   padding: 0.5rem 0.75rem;
    //   border: 1px solid #cbd5e1;
    //   border-radius: 0.5rem;
    //   font-size: 1rem;
    //   outline: none;
    //   transition: border-color 0.2s ease, box-shadow 0.2s ease;
    // }

     .input-group input {
      padding: 0.5rem 0.75rem;
      border: 1px solid #d1d5db;
      border-radius: 0.5rem;
      font-size: 1rem;
      color: #000000; /* black text inside input */
      background-color: #ffffff; /* white input box */
      outline: none;
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
    }


    .input-group input:focus {
      border-color: #16a34a;
      box-shadow: 0 0 0 3px rgba(22, 163, 74, 0.2);
    }
  `}</style>
</div>


      {loading ? (
        <p className="text-gray-600">Loading buses...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : filteredBuses.length === 0 ? (
        <p className="text-gray-600">No buses available.</p>
      ) : (
        <div className="scroll-container">
          {filteredBuses.map((bus) => (
            <div key={bus.id} className="bus-card">
              <div>
                <h3 className="bus-title">{bus.name}</h3> {/* Changed from bus.bus_name to bus.name */}
                <p className="bus-info">Route: {bus.route}</p> 
                <p className="bus-info">Available Seats: {bus.available_seats}</p>
                <p className="bus-info">Departure Time: {bus.departure_time}</p>
                <p className="bus-info">Arrival: {bus.arrival_time}</p>
                {/* <p className="bus-info">Departure Date: {bus.departure_date}</p> */}
                <p className="bus-info">Departure Date: {formatDate(bus.departure_date)}</p>
                <p className="bus-info">Price: NPR {bus.price}</p>
              </div>
              <Link to={`/booking/${bus.id}`} className="book-btn">
                Book Now
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Buses;





















// import React, { useState, useEffect } from "react";
// import { useLocation, Link } from "react-router-dom";
// import axios from "axios";
// import Navbar from "../components/Navbar.jsx";

// const formatDate = (dateString) => {
//   const date = new Date(dateString);  // Convert to Date object
//   return date.toLocaleDateString();   // Format to 'MM/DD/YYYY' or based on user's locale
// };

// const Buses = () => {
//   const location = useLocation();
//   const [buses, setBuses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(location.state?.error || "");
//   const [searchDate, setSearchDate] = useState(""); // State for search date
//   const [filteredBuses, setFilteredBuses] = useState([]);

//   useEffect(() => {
//     const fetchBuses = async () => {
//       try {
//         setLoading(true);
//         const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
//         const response = await axios.get(`${apiUrl}/api/buses`);
//         setBuses(response.data);
//         setFilteredBuses(response.data); // Set initial filtered buses
//       } catch (err) {
//         setError(err.response?.data?.message || "Failed to fetch buses");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBuses();
//   }, []);

//   // Handle search change (departure date)
//   const handleSearchChange = (e) => {
//     setSearchDate(e.target.value);
//   };



//   // Filter buses based on search date
//   useEffect(() => {
//     if (searchDate) {
//       const filtered = buses.filter((bus) => {
//         const busDate = new Date(bus.departure_date).toLocaleDateString("en-CA"); // Ensure matching format
//         return busDate === searchDate;
//       });
//       setFilteredBuses(filtered);
//     } else {
//       setFilteredBuses(buses); // Reset to all buses if no date is selected
//     }
//   }, [searchDate, buses]); // Re-run when searchDate or buses changes


  

//   return (
//     <div className="min-h-screen bg-gray-200 p-6">
//       <style>{`
//         .scroll-container {
//           display: flex;
//           overflow-x: auto;
//           gap: 1rem;
//           scroll-snap-type: x mandatory;
//           padding-bottom: 1rem;
//         }
//         .bus-card {
//           flex-shrink: 0;
//           width: 320px;
//           display: flex;
//           flex-direction: column;
//           justify-content: space-between;
//           background-color: #f3f4f6; /* Light grey */
//           padding: 1.5rem;
//           border-radius: 1rem;
//           box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
//           border: 1px solid #d1d5db;
//           scroll-snap-align: start;
//           transition: transform 0.3s ease, box-shadow 0.3s ease;
//         }
//         .bus-card:hover {
//           transform: translateY(-3px);
//           box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
//         }
//         .bus-title {
//           font-size: 1.25rem;
//           font-weight: 600;
//           color: #1f2937;
//           margin-bottom: 0.5rem;
//         }
//         .bus-info {
//           color: #4b5563;
//           margin-bottom: 0.25rem;
//         }
//         .book-btn {
//           margin-top: 1rem;
//           padding: 0.6rem 1.5rem;
//           background-color: #16a34a;
//           color: white;
//           border-radius: 0.5rem;
//           font-weight: 500;
//           text-align: center;
//           transition: background-color 0.3s ease;
//           white-space: nowrap;
//         }
//         .book-btn:hover {
//           background-color: #15803d;
//         }
//       `}</style>

//       <Navbar />
//       <h1 className="text-3xl font-semibold mb-6 text-gray-800">Available Buses</h1>

//       {/* Search input for departure date */}
//        <div className="mb-4">
//         <input
//           type="date"
//           value={searchDate}
//           onChange={handleSearchChange}
//           className="p-2 border border-gray-300 rounded-lg"
//           placeholder="Search by Departure Date"
//         />
//       </div> 
      
//       {loading ? (
//         <p className="text-gray-600">Loading buses...</p>
//       ) : error ? (
//         <p className="text-red-600">{error}</p>
//       ) : filteredBuses.length === 0 ? (
//         <p className="text-gray-600">No buses available.</p>
//       ) : (
//         <div className="scroll-container">
//           {filteredBuses.map((bus) => (
//             <div key={bus.id} className="bus-card">
//               <div>
//                 <h3 className="bus-title">{bus.name}</h3> {/* Changed from bus.bus_name to bus.name */}
//                 <p className="bus-info">Route: {bus.route}</p> {/* Changed to display the combined route */}
//                 <p className="bus-info">Available Seats: {bus.available_seats}</p>
//                 <p className="bus-info">Departure Time: {bus.departure_time}</p>
//                 <p className="bus-info">Arrival: {bus.arrival_time}</p>
//                 {/* <p className="bus-info">Departure Date: {bus.departure_date}</p> */}
//                 <p className="bus-info">Departure Date: {formatDate(bus.departure_date)}</p>
//                 <p className="bus-info">Price: NPR {bus.price}</p>
//               </div>
//               <Link to={`/booking/${bus.id}`} className="book-btn">
//                 Book Now
//               </Link>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Buses;
