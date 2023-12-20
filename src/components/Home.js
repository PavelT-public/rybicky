import React from 'react';
import { PageContainer, FishList, FishItem, FishForm, Input, InputB, Button, Button2, Buttons, TabButton, AquariumForm, AquariumStatus } from './HomeStyle';
import rybicky from '../rybickyData';
import { useState, useEffect, useRef } from 'react';


const Home = () => {
    const rybickyCount = useRef(rybicky.length);

    const [listOfFishes, setListOfFishes] = useState(rybicky);
    const [newFish, setNewFish] = useState({

        id: rybickyCount.current + 1,
        name: '',
        size: '',
    });
    const [valid, setValid] = useState(false);
    const validateData = (fish) => {
        if (fish.name.trim().length === 0) {
            return setValid(false);
        } else if (fish.size.trim().length === 0) {
            return setValid(false);
        }
        setValid(true);
    };

    const handleChange = (e) => {
        const updateFish = { ...newFish, [e.target.name]: e.target.value };
        setNewFish(updateFish);
        validateData(updateFish);
    };

    const handleAdd = () => {
        setListOfFishes((listOfFishes) => {
            return [...listOfFishes, newFish];
        });

        rybickyCount.current++;
        const updateFish = {
            id: rybickyCount.current + 1,
            name: '',
            size: '',
        }
        setNewFish(updateFish);
        setValid(false);

        if (newFish.size === 'small') {
            return smallFishes + 1;
        } else if (newFish.size === 'large') {
            return largeFishes + 1;
        }
    };

    const handleDelete = (idToDel) => {
        setListOfFishes(listOfFishes.filter((fish) => fish.id !== idToDel));
    };


    const smallFishes = listOfFishes.filter(fish => fish.size === 'small').length;
    const largeFishes = listOfFishes.filter(fish => fish.size === 'large').length;


    const litersSmall = 10;
    const litersLarge = 20;

    const minDimensionLiter = (litersSmall * smallFishes) + (litersLarge * largeFishes);
    console.log(minDimensionLiter);
    const [tempDimension, setTempDimension] = useState({ height: '', width: '', depth: '' });

    let height = tempDimension.height;
    let width = tempDimension.width;
    let depth = tempDimension.depth;

    const literDimension = (height * width * depth) / 1000;
    console.log(literDimension);

    const handleTasks = (event) => {
        const updateTasks = { ...tempDimension, [event.target.name]: event.target.value };
        setTempDimension(updateTasks);
        validateTask(updateTasks);
    };

    const [Tasks, setTasks] = useState({
        height: 1,
        width: 1,
        depth: 1,
    });

    const updateTasks = () => {
        const taskValue = tempDimension;
        let newTaskValue = {};
        const keys = Object.keys(taskValue);
        keys.map((key) => {
            if (parseInt(taskValue[key])) {
                return (newTaskValue[key] = parseInt(Tasks[key]) + parseInt(taskValue[key]))
            } else {
                return newTaskValue[key] = parseInt(Tasks[key])
            }
        });
        setTasks(newTaskValue);
        setTempDimension({ height: '', width: '', depth: '' })
    };
    const [validTask, setValidTask] = useState(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setTempDimension({ ...tempDimension, [name]: value });
        validateTask();
    };
    function handleAllChanges(event) {
        handleInputChange(event);
        handleTasks(event);
    }

    const validateTask = () => {
        if (tempDimension.height === '' || tempDimension.width === '' || tempDimension.depth === '' || tempDimension.height === '0' || tempDimension.width === '0' ||
            tempDimension.depth === '0' || parseInt(tempDimension.height) === 0 || parseInt(tempDimension.width) === 0 || parseInt(tempDimension.depth) === 0) {
            return setValidTask(false);
        } else if (literDimension >= minDimensionLiter) {
            setValidTask(true);
        } else {
            setValidTask(false);
        }
    };

    
    useEffect(() => {
        validateTask();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tempDimension, listOfFishes]);

    const taskStatus = () => {
        if (literDimension >= minDimensionLiter) { 
            return <AquariumStatus style={{ color: 'green', fontSize: 12 + 'px' }}>The aquarium is sufficient</AquariumStatus>;
        } else if (tempDimension.height === '' || tempDimension.width === '' || tempDimension.depth === '' || tempDimension.height === '0' ||
            tempDimension.width === '0' || tempDimension.depth === '0' || parseInt(tempDimension.height) === 0 || parseInt(tempDimension.width) === 0 || parseInt(tempDimension.depth) === 0) {
            return <AquariumStatus style={{ color: 'red', fontSize: 12 + 'px' }}>Please fill in all fields</AquariumStatus>;
        } else {
            return <AquariumStatus style={{ color: 'red', fontSize: 12 + 'px' }}>Insufficient aquarium capacity</AquariumStatus>;
        }
    };

    //* ===== Styles ===== *//
    const buttonStyle = {
        backgroundColor: validTask ? 'green' : 'red',
    };
    const h3Style = {
        paddingTop: 30 + 'px',
        color: '#183B59',
    };
    const styleBlue = {
        color: '#183B59',
    };
    //* ===== End of styles ===== *//


    const uncheckAll = () => {
        const radioButtons = document.getElementsByName('size');
        for (let i = 0; i < radioButtons.length; i++) {
            radioButtons[i].checked = false;
        }
    }
    useEffect(() => {
        uncheckAll();
    }
    , [listOfFishes]);

    const [activeTab, setActiveTab] = useState('list-of-fishes');

    return (
        <PageContainer>
            <Buttons>
                <TabButton name='list-of-fishes' data-active={activeTab} onClick={() => { setActiveTab('list-of-fishes') }}>List of Fishes</TabButton>
                <TabButton name='aquarium' data-active={activeTab} onClick={() => { setActiveTab('aquarium') }}>Aquarium</TabButton>
            </Buttons>
            {(activeTab === 'list-of-fishes') &&
                <>
                    <FishList name="fishList" data-active={activeTab}>
                        {listOfFishes.map((fish) => {
                            return (
                                <FishItem key={fish.id}>{fish.name} - {fish.size}
                                    <button style={{
                                        color: 'red',
                                        fontWeight: 'bold',
                                        height: 25 + 'px',
                                        width: 25 + 'px',
                                        background: 'transparent',
                                        border: 'none',
                                        cursor: 'pointer',
                                    }}
                                        onClick={() => { handleDelete(fish.id) }}>
                                        X
                                    </button>
                                </FishItem>
                            )
                        })}
                    </FishList>
                    <FishForm>
                        <Input type="text" placeholder="Name" name='name' value={newFish.name} onChange={handleChange} />
                        <input type="radio" name="size" value="small" onClick={handleChange} />small (under 4 cm)
                        <input type="radio" name="size" value="large" onClick={handleChange} />large (over 4 cm)
                        <Button disabled={!valid} onClick={handleAdd} name="addFish" >Add fish</Button>
                    </FishForm>
                </>
            }


            {/* 2. TAB */}
            {(activeTab === 'aquarium') &&
                <>
                    <h2 style={styleBlue}>PLANNING AQUARIUM</h2>
                    <h3 style={h3Style}>Current number of fishes:</h3>
                    <h4 style={styleBlue}>Small: {smallFishes} </h4>
                    <h4 style={styleBlue}>Large: {largeFishes}</h4>
                    <p style={{fontStyle:"italic", fontSize: 11 + "px", paddingTop: .25 + "rem"}}>Note: approx. 1 cm of fish per 2-3 l of water</p>
                    <AquariumForm>
                        <InputB type="text" min="0" placeholder="Enter height [cm]" name='height' value={tempDimension.height} onChange={handleAllChanges} id='radio'/>
                        <InputB type="text" min="0" placeholder="Enter width [cm]" name='width' value={tempDimension.width} onChange={handleAllChanges} id='radio'  />
                        <InputB type="text" min="0" placeholder="Enter depth [cm]" name='depth' value={tempDimension.depth} onChange={handleAllChanges} />
                        <Button2 disabled={!validTask} onClick={updateTasks} name='addWork' style={buttonStyle}>Aquarium planning</Button2>
                        <AquariumStatus>{taskStatus()}</AquariumStatus>
                    </AquariumForm>

                </>
            }
        </PageContainer>
    );
}
export default Home;