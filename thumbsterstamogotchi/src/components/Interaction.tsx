import React, { Ref } from 'react';
import Food from './Food';
import { useState, useMemo, useEffect } from 'react';
import { styled } from 'styled-components';
import { onClickEvent, onFoodClickEvent } from '../global';
import { MonsterClass, Foods } from '../global';
import { useClickOutside } from '../customEffects/useClickoutside';

interface MonsterObj {
    focusMonster: MonsterClass,
    monstersState: MonsterClass[],
    setMonstersState: React.Dispatch<React.SetStateAction<MonsterClass[]>>
}

interface Props { 
    attribute?: "hunger" | "health" | 'happiness'; 
    name: string;
    imagePath: string;
    monster: MonsterObj;
    enabledState: boolean;
    setEnabledState: (bool: boolean) => void;
    OnClickEvent?: onClickEvent;
    // children: React.ReactNode;
}

// Styled Components:

const FoodDrawer = styled.div<{$enabled: boolean, $clicked: boolean}>`
    position: absolute;
    display: flex;
    flex-direction: column-reverse;
    height: 750px;
    bottom:0;
    left: 0;
    background-color: ${(props) => (props.theme.default.interactionPrimary)};
    width: 100%;
    z-index: 2;
    border-radius: 100px;
    padding-bottom: 50px;
    transition: transform .5s ease-in-out;
    transform: translateY(${(props) => (props.$clicked === true)? '0px' : '1000px' });
    filter: ${(props) => props.$enabled? 'saturate(100%)' : 'saturate(0%)'};
`

const Button = styled.div<{$enabled: boolean, attribute: string | undefined}>`
    position: relative;
    height: 9em;
    width: 9em;
    filter: ${(props) => props.$enabled? 'saturate(100%)' : 'saturate(0%)'};
`

const ShadowBox = styled.div`
    position: absolute;
    top: 10px;
    height: 100%;
    width: 100%;
    background-color: ${(props) => props.theme.default.interactionShadow};
    border-radius: 100px;
    z-index: 0;
    `

const MainBox = styled.div<{$pressed: boolean, $enabled: boolean, $clicked: boolean}>`
    position: relative;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.theme.default.interactionPrimary};
    border-radius: 100px;
    transition: opacity 0.25s ease-in-out 0.25s;
    transform: ${(props) => (props.$pressed && props.$enabled)? 'translateY(10px)' : 'translateY(0px)'};
    z-index: 1;
    opacity: ${(props) => (props.$clicked === true)? 0 : 1};
    `

const Icon = styled.img`
    width: 60%;
    height: 60%;
    z-index: 2;
    `

const InteractionName = styled.h1`
    position: relative;
    color: white;
    color: #FFF;
    text-align: center;
    font-family: Poppins;
    font-size: 2.5em;
    font-style: normal;
    font-weight: 800;
    `

const Container = styled.div`
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    `

const FoodDrawContainer = styled.div<{$clicked: boolean}>`
    width: 100%;
    position: absolute;
    height: 100vh;
    bottom: 0;
    overflow: hidden;
    border-radius: 100px;
    z-index: ${(props) => (props.$clicked === true)? 1 : -1};
    `

const Interaction = ({ attribute, name, imagePath, monster, OnClickEvent, enabledState, setEnabledState }: Props) => {
    // const [enabledState, setEnabledState] = useState(true);
    const [pressed, setPressedState] = useState(false);
    const [clicked, setClickedState] = useState(false);
    const clickRef: React.RefObject<any> = React.useRef();

    const clickedState = useMemo(() => {
        console.log(clicked);
        return clicked;
    }, [clicked]);
    // useEffect(() => {
    //     setInterval(() => {
    //         console.log("clicked state: ", clicked)
    //     }, 500)
    // }, [clicked]);

    function onClickOutsideDrawer() { // Not changing to false for some reason
        setClickedState(false);
        // console.log('onClickOutsideDrawer()')
        // if (clicked === true) {
        //     console.log('clicked === true')
        // }
    }

    
    useClickOutside(clickRef, onClickOutsideDrawer);
    
    // Passing in an object with all the monster information, so when clicked, it can update the focus monster, and then update the main UseState Monsters, using setMonsterState, similar to when decreasing the monsters hunger every x seconds.
    function Click(perk: number) {
        if (enabledState) {
            if (OnClickEvent) {
                OnClickEvent(); 
                if (attribute === undefined)
                return
        }
        
        if (attribute === undefined) return
        monster.focusMonster[attribute] += perk;
        monster.setMonstersState([ monster.focusMonster,...monster.monstersState.filter(m => m.id !== 1)])
    } 
        if (attribute === undefined) return
        if (monster.focusMonster[attribute] < 100) {
            setEnabledState(true)
        } else { setEnabledState(false) }
    }

    function HungerClick() {
        // slide food into view
        setClickedState(!clicked) 
    }

    return (
        <Container>
        {
            (attribute === "hunger")?
            // if is hunger 
            <div  ref={clickRef}>
                <Button onClick={() => HungerClick()} 
                onMouseDown={() => setPressedState(true)} 
                onMouseUp={() => setPressedState(false)} 
                $enabled={enabledState} 
                attribute={(attribute !== undefined)? attribute : undefined}>
                        <MainBox $pressed={pressed} $enabled={enabledState} $clicked={clicked}>
                            <Icon src={imagePath}/>
                        </MainBox>
                        <ShadowBox/>
                        <InteractionName>{name}</InteractionName>
                </Button>
                <FoodDrawContainer $clicked={clicked}>
                    <FoodDrawer $enabled={enabledState} $clicked={clicked}>
                        { Foods.map((food) => {
                            return (<Food monster={monster} OnClickEvent={Click} enabledState={enabledState} setEnabledState={setEnabledState} foodItem={food}/>)
                        }) }
                    </FoodDrawer>
                </FoodDrawContainer>
            </div> :
                // if is not hunger attribute
                <Button onClick={() => Click(1)} onMouseDown={() => setPressedState(true)}
                onMouseUp={() => setPressedState(false)} $enabled={enabledState} attribute={(attribute !== undefined)? attribute : undefined} >
                    <MainBox $pressed={pressed} $enabled={enabledState} $clicked={clicked}>
                        <Icon src={imagePath}/>
                    </MainBox>
                    <ShadowBox/>
                    <InteractionName>{name}</InteractionName>
                </Button>
            }
        </Container>
    );
};

export default Interaction;