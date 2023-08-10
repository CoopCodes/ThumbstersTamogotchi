import React, { useEffect } from 'react';
import { useState } from 'react';
import './App.css';
import { styled } from 'styled-components';
import { MonsterClass } from './global'

import Attribute from './components/Attribute';

// Styled Components:

const Monsters = styled.section`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Monster = styled.img`
  width: 45%;
`;

const Attributes = styled.div`
display: flex;
flex-direction: row;
`

function App() {
  let monsters: Array<MonsterClass> = [
    new MonsterClass("blue", 1) // List of all monsters that user has
  ];

  const [monstersState, setMonstersState] = useState(monsters);


  useEffect(() => {
   const selectedMonster = monstersState.find(m => m.id === 1)
   if (selectedMonster) {

     setInterval(() => {
       selectedMonster.hunger -= 1

       setMonstersState([ selectedMonster,...monstersState.filter(m => m.id !== 1)])
     }, 10000);
   }

  }, [])
  let focusMonster = monstersState.find(m => m.id === 1); // Default the first monster, but could be something else
  
  if (!focusMonster) return null
  return (
    <div className="App">
      <Attributes className="attributes">
        <Attribute attrName="health" imagePath='./resources/images/heart.png' color='#FF4848' progress={focusMonster.health}/>
        <Attribute attrName="hunger" imagePath='./resources/images/hunger.svg' color='#F3AD61' progress={focusMonster.hunger}/>
        <Attribute attrName="happiness" imagePath='./resources/images/happiness.svg' color='#02D9A0' progress={focusMonster.happiness}/>
      </Attributes>
      <Monsters>
        {
          monsters.map((monster) => {
            return (
              <Monster src={'./resources/Monsters/' + monster.updateMood().path} alt='monster'/>
            )
          })
        }
      </Monsters>
    </div>
  );
}

export default App;
