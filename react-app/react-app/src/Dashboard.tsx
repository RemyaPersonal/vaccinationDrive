
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { httpGet } from "./HttpService/HttpPost";
import { PieChart } from 'react-minimal-pie-chart';


type Metrics = {
  totalStudents: string;
  vaccinatedStudents: string;
  vaccinatedPercentage: string;
  upcomingDrives: { date: string; location: string }[];
};

function Dashboard() {
    const [data, setData] = useState<Metrics | null>(null);
    const navigate = useNavigate();
    const logindata = sessionStorage.getItem("logindata")??'';
    
    
    useEffect(() => {
        if (!logindata || logindata==="") {
            navigate("/");
            
        }
        else{
          const fetchData = async () => {
            if (!logindata || logindata === "") {
              navigate("/");
            } else {
              try {
                const data = await httpGet({ endpoint: "/api/Dashboard/GetDashboard" });
                setData(data.data);
              } catch (error) {
                console.error("Error fetching data:", error);
              }
            }
          };
      
          fetchData();
        
        }
    }, [logindata, navigate]);

    const navItems = [
        { name: "Manage Students", path: "/ManageStudent/Student" },
        { name: "Vaccination Drives", path: "/Vaccination/VaccinationDrives" },
        { name: "Reports", path: "/Report/Reports" },
      ];
    
      
        const handleNavClick = (path: string) => {
          navigate(path);
        };
    return (
        
        <div className="dashboard">
            
          <nav className="navbar navbar-expand-lg navbar-light bg-light m-2 p-3 shadow border border-2">
            <h2>Quick Navigation</h2>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav">
            {navItems.map((item, index) => (
        <li key={index} className="nav-item active m-2">
          <a
            className="text-decoration-none"
            onClick={() => handleNavClick(item.path)}
            href="#"
          >
            {item.name}
          </a>
        </li>
      ))}
            </ul>
            </div>
          </nav>
      <h4>Vaccination Dashboard</h4>
      {data ? (
        <>
        <PieChart className="w-25"
          data={[
            { title: 'Total Students', value:parseInt(data.totalStudents) , color: '#115650' },
            { title: 'Vaccinated Students', value: parseInt(data.vaccinatedStudents), color: '#08DDCA' },
           
          ]}
          label={({ dataEntry }) => `${dataEntry.title} (${dataEntry.value})`}
          labelStyle={{
            fontSize: "4px",
            fontFamily: "sans-serif",
            fill: "#fff", // Text color
          }}
          labelPosition={50} 
        />
          <div className="container d-flex m-2 p-2 justify-content-center">
       
            <p className="m-2">Total Students: <strong className="text-danger">{data.totalStudents}</strong></p>
            <p className="m-2">Vaccinated Students: <strong className="text-danger">{data.vaccinatedStudents}</strong></p>
            <p className="m-2">Vaccinated Percentage: <strong className="text-danger">{data.vaccinatedPercentage}%</strong></p>
          </div>

          <div className="upcoming-drives card rounded-4 shadow-lg ">
            <h4 className="text-danger opacity-75">Upcoming Vaccination Drives (Next 30 Days)</h4>
            <div className="d-flext justify-content-center">
            {data.upcomingDrives.length > 0 ? (
              <ul className="list-group">
                {data.upcomingDrives.map((drive, index) => (
                  <li className="list-group-item" key={index}>
                    📅 <strong>{drive.date}</strong> - 📍 {drive.location}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No upcoming drives scheduled.</p>
            )}
            </div>
         
          </div>

        </>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
    );
}

export default Dashboard;
