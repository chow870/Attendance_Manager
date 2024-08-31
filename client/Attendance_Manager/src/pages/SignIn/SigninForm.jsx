import { useState } from 'react';
import axios from 'axios';

function CustomisedSigninForm({ username }) {
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const [password, setPassword] = useState(''); // Store password separately
  const [isPasswordSet,setIsPasswordSet] =useState(false);
  const [formData, setFormData] = useState({
    username: username,
    dailyRecords: daysOfWeek.reduce((acc, day) => {
      acc.push({
        day,
        Schedule: []
      });
      return acc;
    }, [])
  });

  const handlePasswordChange = async (e) => {
    if(isPasswordSet){
      return ;
    }
    const newPassword = e.target.value;
    setPassword(newPassword); // Update state
    setIsPasswordSet(true);
  
    try {
      let response = await fetch("/signin/Credentials", {  // Assuming you have a specific endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username: username, password: newPassword }) // Use newPassword directly
      });
  
      let data = await response.json();
      if (response.ok) {
        console.log("UserCredentials saved properly");
      } else {
        console.log("UserCredentials was not saved successfully", data.message);
      }
    } catch (error) {
      console.error("Error while connecting or submitting the form", error);
    }
  };
  

  const handleDailyRecordChange = (day, index, e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      dailyRecords: prevState.dailyRecords.map(record => 
        record.day === day
          ? {
              ...record,
              Schedule: record.Schedule.map((schedule, i) => i === index ? { ...schedule, [name]: value } : schedule)
            }
          : record
      )
    }));
  };

  const handleNumClassesChange = (day, e) => {
    const numClasses = parseInt(e.target.value, 10);
    setFormData(prevState => ({
      ...prevState,
      dailyRecords: prevState.dailyRecords.map(record => 
        record.day === day
          ? {
              ...record,
              Schedule: Array.from({ length: numClasses }, (_, i) => prevState.dailyRecords.find(r => r.day === day)?.Schedule[i] || { subject: '', professor: '', credit: '', venue: '', time: '' })
            }
          : record
      )
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { username, dailyRecords } = formData; // Exclude password
      console.log(formData);
      const response = await axios.post('/signin/submit', JSON.stringify({ username:username, dailyRecords
        :dailyRecords
       }), {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log("the response here is :"); // Handle response
      console.log(response.data); // Handle response
    } catch (error) {
      console.error('Error submitting form', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
          // password handle properly
        />
      </div>
      {formData.dailyRecords.map(dayRecord => (
        <div key={dayRecord.day}>
          <h3>{dayRecord.day}</h3>
          <label>Number of Classes:</label>
          <input
            type="number"
            min={0}
            value={dayRecord.Schedule.length}
            onChange={(e) => handleNumClassesChange(dayRecord.day, e)}
          />
          {dayRecord.Schedule.map((schedule, index) => (
            <div key={index}>
              <h4>Class {index + 1}</h4>
              <label>Subject:</label>
              <input
                type="text"
                name="subject"
                value={schedule.subject}
                onChange={(e) => handleDailyRecordChange(dayRecord.day, index, e)}
              />
              <label>Professor:</label>
              <input
                type="text"
                name="professor"
                value={schedule.professor}
                onChange={(e) => handleDailyRecordChange(dayRecord.day, index, e)}
              />
              <label>Credit:</label>
              <input
                type="number"
                name="credit"
                value={schedule.credit}
                onChange={(e) => handleDailyRecordChange(dayRecord.day, index, e)}
              />
              <label>Venue:</label>
              <input
                type="text"
                name="venue"
                value={schedule.venue}
                onChange={(e) => handleDailyRecordChange(dayRecord.day, index, e)}
              />
              <label>Time:</label>
              <input
                type="text"
                name="time"
                value={schedule.time}
                onChange={(e) => handleDailyRecordChange(dayRecord.day, index, e)}
              />
            </div>
          ))}
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
}

export default CustomisedSigninForm;
