import React from 'react';
import { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import { MonsterClass, onFoodClickEvent, FoodClass } from '../global';

interface MonsterObj {
    focusMonster: MonsterClass,
    monstersState: MonsterClass[],
    setMonstersState: React.Dispatch<React.SetStateAction<MonsterClass[]>>
}

interface Props { 
    foodItem: FoodClass;
    monster: MonsterObj;
    enabledState: boolean;
    setEnabledState: (bool: boolean) => void;
    OnClickEvent?: onFoodClickEvent;
}

// Styled Components:

const Button = styled.div<{enabled: boolean}>`
    position: relative;
    height: 9em;
    width: 9em;
    filter: ${(props) => props.enabled? 'saturate(100%)' : 'saturate(0%)'};
`

const Icon = styled.img`
    width: 60%;
    height: 60%;
    z-index: 1;
`

const FoodPerkContainer = styled.div`
    width: 80%;
    height: 20px;
    border-radius: 30px;
    overflow: hidden;
    background-color: ${(props) => props.theme.default.interactionShadow};
    `

const FoodPerk = styled.div<{perk: number}>`
    width: ${(props) => ((props.perk / 30) * 100)}%; // Making the bar as wide as proportional to 30
    background-color: #F3AD61;
    background-color: ${(props) => props.theme.default.hunger};
    height: 100%;
    border-radius: 0 20px 20px 0;
`

const FoodPerkText = styled.h1`
    
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    scale: 0.9;
`

const Food = ({ monster, OnClickEvent, enabledState, setEnabledState, foodItem }: Props) => {
    const [pressed, setPressedState] = useState(false);
    const attribute = 'hunger';


    // Passing in an object with all the monster information, so when clicked, it can update the focus monster, and then update the main UseState Monsters, using setMonsterState, similar to when decreasing the monsters hunger every x seconds.
    function Click() {
        if (enabledState) {
            if (OnClickEvent) {
                OnClickEvent(foodItem.perk); 
                if (attribute === undefined)
                return
            }
        }
            
    }

    return (
        <Container>
            <Button onClick={() => Click()} onMouseDown={() => setPressedState(true)}
            onMouseUp={() => setPressedState(false)} enabled={enabledState}>
                <Container>
                    <Icon src={foodItem.iconPath}/>
                    <FoodPerkContainer>
                        <FoodPerk perk={foodItem.perk}/>
                    </FoodPerkContainer>
                </Container>
            </Button>
        </Container>
    );
};

export default Food;