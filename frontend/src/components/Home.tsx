import React from 'react';
import DisplayTask from './DisplayTask';
import AddTask from './AddTask';
import '../index.css';



const Home: React.FC = () => {

  return (
    <div className="app-container">
      <div className="container">
       <AddTask/>
        <DisplayTask/>
      </div>
    </div>
  );
};

export default Home;
