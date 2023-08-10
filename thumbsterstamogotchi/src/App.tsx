import React from 'react';
import { Monster } from './global'
import './App.css';

function App() {
  let monsters: Array<Monster> = [
    new Monster("blue", 1)
  ];
  
  return (
    <div className="App">
      <div className="attributes">
        
      </div>
      <div className="monsters">
        {
          monsters.map((monster) => {
            return (
              <img src={'./resources/Monsters/' + monster.updateMood().path} alt='monster' className='monster'/>
            )
          })
        }
      </div>
    </div>
  );
}

export default App;
