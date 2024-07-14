import React, { useState } from "react";
import { deleteLogApi } from "../../apis/Api";
import Sidebar from "../../components/Sidebar";
import LogDetails from "./logDetails";
import LogList from "./loglist";

const LogDashboard = () => {
  const [selectedLogId, setSelectedLogId] = useState(null);

  const handleSelectLog = (logId) => {
    setSelectedLogId(logId);
  };

  const handleDeleteLog = async (logId) => {
    try {
      await deleteLogApi(logId);
      setSelectedLogId(null); // Clear selection after deletion
      alert("Log deleted successfully");
    } catch (error) {
      console.error("Failed to delete log", error);
    }
  };

  return (
    <>
    <Sidebar/>
    <div className="main-content">
        <h2 className="main head"style={{ marginLeft: "5%",marginTop:'2%' }}>List of Logs</h2>
     
      <div className="m-4">
        <table className="table table-striped-dash">
          <thead className="head-dashboard">
            <tr>
            <th style={{ backgroundColor:'#9A5865', color: 'white',fontSize:'19px' }}>List of Logs</th>
            
            </tr>
          </thead>
          <tbody className="tbod-dash">
          <LogList onSelectLog={handleSelectLog} onDeleteLog={handleDeleteLog} />
          {selectedLogId && <LogDetails logId={selectedLogId} />}

</tbody>
        </table>
      </div>
      </div>
    
    
    </>
  );
};

export default LogDashboard;
