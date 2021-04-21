import React from 'react';
import { StyleSheet } from 'react-native';
import { Appbar, DefaultTheme, Text} from 'react-native-paper';

function Help(props) {
    return(
        <>
            <Appbar.Header>
                <Appbar.Content title="Help" subtitle={'Need help?'} />
            </Appbar.Header>
            <Text style={{...styles.headline, marginTop:30}}>  
                Unfortunatly, this is a test sample that would probably not be updated. 
                So there is no help for you, but if you're interest in my work, 
                go checkout
            </Text>
            <Text style={styles.headline}>  
                https://next-react-a3ced.web.app/
            </Text>
            <Text style={styles.headline}>  
                 Have fun exploring this app!
            </Text>
        </>
    );
}

const styles = StyleSheet.create({
    headline: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 5,
        marginHorizontal: 20,
        color: DefaultTheme.colors.placeholder,
    },
    
})

export default Help;