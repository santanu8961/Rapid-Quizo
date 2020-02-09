import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View,AsyncStorage } from 'react-native';
import AppHeader from './components/AppHeader';
import GameComponent from './components/GameComponent';
import DataBaseFunc from './controllers/StorageController';
import FlashMessage from 'react-native-flash-message';

export default function App() {
  const [highScore, sethighScore] = useState();
  const [score, setscore] = useState(0);
  useEffect(() => {
   AsyncStorage.getItem("LeaderBoard").then(val =>{
    if(val === null || val === undefined){
      sethighScore(0) 
    }else{
       AsyncStorage.getItem("LeaderBoard").then(val =>{
        var list =JSON.parse(val);
        sethighScore(list[0]);
      })
    }
   })
    return () => {
      
    };
  });
  // alert(score);
  return (
    <View style={styles.container}>
     <View>
       <AppHeader title="Rapid Quizo" />
     </View>
     <FlashMessage position="top" />
     <View style={styles.appBlock}>
     <View style={styles.gameHeader}>
        <View style={styles.gameHeaderSpace}>
        <Text style={styles.appTextHeaderColor}>Life :   {"XXXXXX"}</Text>
        </View>
        <View style={styles.gameHeaderSpace}>
        <Text style={styles.appTextHeaderColor}>Score : {score}</Text>
        </View>
        <View style={styles.gameHeaderSpace}>
        <Text style={styles.appTextHeaderColor}>Top Score : {highScore}</Text>
        </View>
     </View>

     <View  style={{flex:1}}>
       <GameComponent score={[score, setscore]} />
     </View>
     </View>
     <Text style={{backgroundColor:"#353839",textAlign:"right"}}>Developed By Santanu Roy</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#FFF700'
  },
  appBlock:{
    backgroundColor:'#353839',
    width:'100%',
   color :'#76D7EA',
   flex:1,
  //  marginHorizontal:"1.5%",
  //  marginVertical:'1.5%',
   borderRadius:0
  },
  gameHeader:{
    flexDirection:"row" ,
    flex:0.065,
    paddingTop:5,
    marginVertical:10
  },
gameHeaderSpace:{
  width:'31.1%',
  marginTop:7,
  marginBottom:5,
  marginLeft:6,
  paddingLeft:7,
  borderBottomColor:"#FFF700",
  borderWidth:2.3,
  borderTopWidth:0,
  borderLeftWidth:0,
  borderRightWidth:0,
  borderRadius:5
},

appTextHeaderColor:{
  color: '#FFF700',
  fontSize:15,
  fontWeight:"bold"
}

});
