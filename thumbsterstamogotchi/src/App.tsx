import React, { useEffect } from 'react';
import { useState } from 'react';
import './App.css';
import { styled, ThemeProvider } from 'styled-components';
import { MonsterClass } from './global'

import Attribute from './components/Attribute';
import Interaction from './components/Interaction';

const theme = {
  default: {
    backgroundColor: '#8053FF',
    interactionPrimary: '#9F53FF',
    interactionShadow: '#713BB2',
  }
}


// Styled Components:

const Monsters = styled.section`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 50%;
`;

const Monster = styled.img`
  width: 45%;
`;

const Attributes = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`
const Interactions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`


function App() {
  let monsters: Array<MonsterClass> = [
    new MonsterClass("blue", 1) // List of all monsters that user has
  ];

 
  const [monstersState, setMonstersState] = useState(monsters);

  const focusMonster = monstersState.find(m => m.id === 1)

  useEffect(() => {
   if (focusMonster) {

     setInterval(() => {
       focusMonster.hunger -= 1
       // If hunger is full, then disable the button.

       setMonstersState([ focusMonster,...monstersState.filter(m => m.id !== 1)])
     }, 5000);
   }

  }, [])
  // let focusMonster = monstersState.find(m => m.id === 1); // Default the first monster, but could be something else
  
  if (!focusMonster) return null
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        {/* Attributes */}
        <Attributes className="attributes">
          <Attribute attrName="health" imagePath='./resources/images/heart.png' color='#FF4848' progress={focusMonster.health}/>
          <Attribute attrName="hunger" imagePath='./resources/images/hunger.svg' color='#F3AD61' progress={focusMonster.hunger}/>
          <Attribute attrName="happiness" imagePath='./resources/images/happiness.svg' color='#02D9A0' progress={focusMonster.happiness}/>
        </Attributes>

        {/* Monsters */}
        <Monsters>
          {
            monsters.map((monster) => {
              return (
                <Monster src={'./resources/Monsters/' + monster.updateMood().path} alt='monster'/>
              )
            })
          }
        </Monsters>
        
        {/* Interactions */}
        <Interactions>
          <Interaction attribute='hunger' imagePath='./resources/images/hunger.svg' monster={{focusMonster: focusMonster, monstersState: monstersState, setMonstersState: setMonstersState}}/>
        </Interactions>

      </div>
    </ThemeProvider>
  );
}

export default App;
