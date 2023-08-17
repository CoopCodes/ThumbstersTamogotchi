import React from 'react';
import { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import { onClickEvent } from '../global';
import { MonsterClass } from '../global';

interface MonsterObj {
    focusMonster: MonsterClass,
    monstersState: MonsterClass[],
    setMonstersState: React.Dispatch<React.SetStateAction<MonsterClass[]>>
}

interface Props { 
    attribute?: "hunger" | "health" | 'happiness'; 
    imagePath: string;
    monster: MonsterObj;
    enabledState: boolean;
    setEnabledState: (bool: boolean) => void;
    OnClickEvent?: onClickEvent;
}

// Styled Components:

const Container = styled.div<{enabled: boolean}>`
    position: relative;
    height: 12em;
    width: 12em;
    filter: ${(props) => props.enabled? 'saturate(100%)' : 'saturate(0%)'};
`

const ShadowBox = styled.div`
    position: absolute;
    top: 10px;
    height: 100%;
    width: 100%;
    background-color: ${(props) => props.theme.default.interactionShadow};
    border-radius: 100%;
    z-index: 0;
    `

const MainBox = styled.div<{pressed: boolean, enabled: boolean}>`
    position: relative;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.theme.default.interactionPrimary};
    border-radius: 100%;
    transform: ${(props) => (props.pressed && props.enabled)? 'translateY(10px)' : 'translateY(0px)'};
    z-index: 1;
    `

const Icon = styled.img`
    width: 60%;
    height: 60%;
    z-index: 1;
    `

const Interaction = ({ attribute, imagePath, monster, OnClickEvent, enabledState, setEnabledState }: Props) => {
    // const [enabledState, setEnabledState] = useState(true);
    const [pressed, setPressedState] = useState(false);


    // Passing in an object with all the monster information, so when clicked, it can update the focus monster, and then update the main UseState Monsters, using setMonsterState, similar to when decreasing the monsters hunger every x seconds.
    function Click() {
        
        if (enabledState) {
            if (OnClickEvent) {
                OnClickEvent(); 
                if (attribute === undefined)
                return
            }
            
            if (attribute === undefined) return
            
            monster.focusMonster[attribute] += 1;
            monster.setMonstersState([ monster.focusMonster,...monster.monstersState.filter(m => m.id !== 1)])
        } 
        if (attribute === undefined) return
        if (monster.focusMonster[attribute] < 100) {
            setEnabledState(true)
        } else { setEnabledState(false) }
    }

    return (
        <Container onClick={() => Click()} onMouseDown={() => setPressedState(true)}
        onMouseUp={() => setPressedState(false)} enabled={enabledState}>
            <MainBox pressed={pressed} enabled={enabledState}>
                <Icon src={imagePath}/>
            </MainBox>
            <ShadowBox/>
        </Container>
    );
};

export default Interaction;