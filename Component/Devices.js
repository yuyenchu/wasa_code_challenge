import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { Appbar, Badge, DefaultTheme, Divider, List, Text } from 'react-native-paper';

const key = "pk.04ac748ced465e498bea34a6a5d47938";
const iconsByType = {
    phone: "cellphone",
    computer: "laptop-mac",
    viechle: "car"
}
function Devices({data}) {
    const [locations, setLocations] = useState([]);
    useEffect(()=>{
        // fetching all address by reverse geocoding, and set all response at once
        const fetchLoc = async()=>{
            let holder = [];
            for(var i=0; i<data.length; i++){
                let res = await fetch(`https://us1.locationiq.com/v1/reverse.php?key=${key}&lat=${data[i].latitude}&lon=${data[i].longitude}&format=json`);
                let value = await res.json();
                console.log(i+"value="+value.display_name)
                holder = [{id:data[i].id, loc:value.display_name},...holder];
            }
            setLocations(holder)
        }
        fetchLoc()
    },[]);

    const generateContent = () => {
        return data.map((val)=>{
            let power = parseInt(val.power);            // the power badge goes to red when power is low, green when high
            let green = Math.round(power/100*255);      // getting rgb value of green
            let red = Math.round((1-power/100)*255);    // getting rgb value of red
            let loc = locations.find(e=>e.id==val.id);  // get the adress if fetch success
            let margin = loc?parseInt((loc.loc.length+11)/2):24;    // adjusting margin for badge
            return (
                <>
                <List.Accordion title={val.name} id={val.id+""} key={val.id}>
                    <List.Item title="Detail" key={`item${val.id}`}
                        left={()=>{
                        return(
                            <>
                            <List.Icon size={30} icon={iconsByType[val.type]} />
                            <Badge style={{"backgroundColor":"rgb("+red+","+green+",0)", "marginBottom":margin}} size={30}>{val.power+"%"}</Badge>
                            </>
                        )}}
                        description={`Location: ${loc?loc.loc:""}\nModel: ${val.model}`}
                        descriptionNumberOfLines={loc?5:2}
                    />
                </List.Accordion>
                <Divider />
                </>
        )})
    }

    return(
        <>
            <Appbar.Header>
                <Appbar.Content title="My Devices" subtitle={'Track your registered devices here'} />
            </Appbar.Header>
            <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <List.AccordionGroup>
                    {generateContent()}
                    <></>
                </List.AccordionGroup>
            </ScrollView>
            </SafeAreaView>
            {/* <Text>{JSON.stringify(locations)}</Text> */}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        backgroundColor: DefaultTheme.colors.surface,
        marginHorizontal: 20,
    },
})

export default Devices;