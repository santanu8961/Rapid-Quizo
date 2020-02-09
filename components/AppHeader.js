import React from 'react';
import { View,StyleSheet,Text } from 'react-native';

var AppHeader = (props)=>{
   
    return(
        <View style={styles.header}>
            <Text style={styles.headerText}>{props.title}</Text>
        </View>
    )


    
}

var styles = StyleSheet.create({
    header:{
        paddingTop:20,
        backgroundColor:'#FD3A4A',
        marginTop:34,
        paddingBottom:20
    },
    headerText:{
        textAlign:'center',
        fontSize:35,
        fontWeight:'bold',
        fontFamily:"monospace"
    }

})

export default AppHeader;