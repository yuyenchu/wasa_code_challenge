import React, { useState, useEffect } from 'react';
import { FAB, Portal, Provider } from 'react-native-paper';
import Home from './Component/Home';
import Devices from './Component/Devices';
import Map from './Component/Map';
import Help from './Component/Help';

// url for fake json api, the same data is stored in data.json
const url = "https://mocki.io/v1/17522c0d-6476-4ae0-b408-da1deb257b47";

function App() {
    const [items, setItems] = useState(null);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);

    // fetching data from fake json api
    useEffect(() => {
        fetch(url, {
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json',
                "Access-Control-Allow-Origin": "*"
            },
        })
        .then((res) => {
            if (res.ok){
                return res.json();
            }
            throw res;
        })
        .then((data) => {
            setItems(data);
        })
        .catch((err) => {
            console.log(err);
            setError(err);
        })
    },[]);

    // displaying different components based on speed dial selection
    const [index, setIndex] = useState(0);
    const actions = [
        { icon: 'devices', label: 'Device', onPress: ()=>setIndex(1)},
        { icon: 'map-marker', label: 'Map', onPress: ()=>setIndex(2)},
        { icon: 'help', label: 'Help', onPress: ()=>setIndex(3)},
    ];
    const scenes = [<Home data={items}/>, <Devices data={items}/>, <Map data={items}/>, <Help/>]

    return (
        <Provider>
            {scenes[index]}
            <Portal>
                <FAB.Group
                    open={open}
                    icon={open ? 'home' : 'plus'}
                    actions={actions}
                    onStateChange={()=>{setOpen(!open)}}
                    onPress={() => {
                        if (open) {
                            setIndex(0);
                        }
                    }}
                />
            </Portal>
        </Provider>
    );
};

export default App;
