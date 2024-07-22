import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EmployeeComponent: React.FC = () => {
  const [employee, setEmployee] = useState<any>(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get('http://localhost:5000/contacts/'); 
        setEmployee(response.data); 
      } catch (error) {
        console.error('Error fetching employee:', error);
      }
    };

    fetchEmployee(); 
  }, []); 

  return (
    <div>
      <h2>Employee Details</h2>
      {employee ? (
        <div>
          <p><strong>Name:</strong> {employee.name}</p>
          <p><strong>Email:</strong> {employee.email}</p>
          <p><strong>Role:</strong> {employee.role}</p>
        </div>
      ) : (
        <p>Loading employee details...</p>
      )}
    </div>
  );
};

export default EmployeeComponent;
