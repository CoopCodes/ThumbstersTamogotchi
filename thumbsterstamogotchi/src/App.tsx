import React, { useEffect } from 'react';
import { useState, useRef } from 'react';
import './App.css';
import { styled, ThemeProvider } from 'styled-components';
import { MonsterClass, updateMood } from './global'

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
  margin-top: -80px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 50vh;
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
  justify-content: space-evenly;
`


function App() {
  let monsters: Array<MonsterClass> = [
    new MonsterClass("blue", 1) // List of all monsters that user has
  ];

  const [monstersState, setMonstersState] = useState(monsters);
  const [hungerEnabledState, setHungerEnabledState] = useState(false);
  const [happinessEnabledState, setHappinessEnabledState] = useState(false);
  const [cleanEnabledState, setCleanEnabledState] = useState(false);
  const [happinessState, setHappinessState] = useState("./resources/images/happiness.svg")
  const focusMonster = monstersState.find(m => m.id === 1)

  let attributeTicks: { [key: string]: number } = {
    hunger: 5000,
    happiness: 100,
    clean: 1000,
  }

  function Pat() {

  }

  useEffect(() => {
   if (focusMonster) {
      // Hunger tick
      setInterval(() => { 
          if (focusMonster.hunger > 0) {
            focusMonster.hunger -= 1;
            focusMonster.mood = updateMood(focusMonster);
            setMonstersState([focusMonster,...monstersState.filter(m => m.id !== 1)]);
            setHungerEnabledState(true)
            
          } else { // Start health decreasing
            focusMonster.health -= 1;
            setMonstersState([focusMonster,...monstersState.filter(m => m.id !== 1)]);
            attributeTicks.happiness = 3000;
          }
        }, attributeTicks.hunger);
        
        // Happiness Tick
        setInterval(() => {
          if (focusMonster.happiness > 0) {
            focusMonster.happiness -= 1;
            focusMonster.mood = updateMood(focusMonster)
            setMonstersState([focusMonster,...monstersState.filter(m => m.id !== 1)])
            setHappinessEnabledState(true)
            console.log(focusMonster.mood)

            // Changes the mood of the smiley face
            if (focusMonster.happiness <= 100 && focusMonster.happiness > 60) {
              setHappinessState("./resources/images/happiness.svg")
            } else if (focusMonster.happiness <= 60 && focusMonster.happiness >= 20 ) {
              setHappinessState("./resources/images/happiness-neutral.svg")
            } else if (focusMonster.happiness <= 20 && focusMonster.happiness >= 0 ) {
              setHappinessState("./resources/images/happiness-sad.svg")
            }
            
        }
      }, attributeTicks.happiness);
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
          <Attribute attrName="happiness" imagePath={happinessState} color='#02D9A0' progress={focusMonster.happiness}/>
        </Attributes>

        {/* Monsters */}
        <Monsters>
          {
            monsters.map((monster) => {
              return (
                <Monster src={'./resources/Monsters/' + focusMonster.mood.path} alt='monster'/>
              )
            })
          }
        </Monsters>
        
        {/* Interactions */}
        <Interactions>
          <Interaction name="Feed" enabledState={hungerEnabledState} setEnabledState={setHungerEnabledState} attribute='hunger' imagePath='./resources/images/hunger.svg' monster={{focusMonster: focusMonster, monstersState: monstersState, setMonstersState: setMonstersState}}/>
          <Interaction name="Pat" enabledState={happinessEnabledState} setEnabledState={setHappinessEnabledState} attribute='happiness' imagePath='./resources/images/pat.svg' monster={{focusMonster: focusMonster, monstersState: monstersState, setMonstersState: setMonstersState}} OnClickEvent={Pat}/>
          <Interaction name="Clean" enabledState={cleanEnabledState} setEnabledState={setCleanEnabledState} imagePath='./resources/images/clean.svg' monster={{focusMonster: focusMonster, monstersState: monstersState, setMonstersState: setMonstersState}}/>
        </Interactions>

      </div>
    </ThemeProvider>
  );
}

export default App;
