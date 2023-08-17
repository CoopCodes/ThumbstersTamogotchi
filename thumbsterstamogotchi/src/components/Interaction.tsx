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
    attribute: "hunger" | "health" | 'happiness'; 
    imagePath: string;
    monster: MonsterObj;
    OnClickEvent?: onClickEvent;
}

// Styled Components:
const Container = styled.div`
    position: relative;
    height: 12em;
    width: 12em;
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

const MainBox = styled.div<{pressed: boolean}>`
    position: relative;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.theme.default.interactionPrimary};
    border-radius: 100%;
    transform: ${(props) => props.pressed? 'translateY(10px)' : 'translateY(0px)'};
    z-index: 1;
`

const Icon = styled.img`
    width: 60%;
    height: 60%;
    z-index: 1;
`

const Interaction = ({ attribute, imagePath, monster, OnClickEvent }: Props) => {
    const [enabledState, setEnabledState] = useState(true);
    const [pressed, setPressed] = useState(false);

    // Passing in an object with all the monster information, so when clicked, it can update the focus monster, and then update the main UseState Monsters, using setMonsterState, similar to when decreasing the monsters hunger every x seconds.
    function Click() {
        if (OnClickEvent) {
            OnClickEvent(); 
            return
        }

        monster.focusMonster[attribute] += 1;
        monster.setMonstersState([ monster.focusMonster,...monster.monstersState.filter(m => m.id !== 1)])
    }

    return (
        <Container onClick={Click} onMouseDown={() => setPressed(true)}
        onMouseUp={() => setPressed(false)}>
            <MainBox pressed={pressed}>
                <Icon src={imagePath}/>
            </MainBox>
            <ShadowBox/>
        </Container>
    );
};

export default Interaction;