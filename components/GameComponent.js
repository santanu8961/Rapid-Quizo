import React, { useState } from 'react';
import { View, Text, StyleSheet, Button , TouchableNativeFeedback,BackHandler, AsyncStorage } from 'react-native';
import quiz from '../QuizDataBase/quizData';
import NewGameComponent from './NewGameComponent';
import GameController from '../controllers/GameController';

var GameComponent = (props) => {
    var quizData = quiz;
    var [score, setscore] = props.score;
    var menuStateCopy = [
        {screen:"NewGame","isActive":false},
        {screen:"LeaderBoard","isActive":false},
        {screen:"LeaderBoardAboutGame","isActive":false},
        {screen:"Menu","isActive":true}
    ];
    const [menuState, setmenuState] = useState([
        {screen:"NewGame","isActive":false},
        {screen:"LeaderBoard","isActive":false},
        {screen:"AboutGame","isActive":false},
        {screen:"Menu","isActive":true}
    ]);

 
    const [Question, setQuestion] = useState([]);
    const [gameStatus, setgameStatus] = useState();




    

    var navigate = (screentoNavigate)=>{
        
        // alert(menuStateCopy.length)
       menuStateCopy.forEach(menu=>{
        if(menu.screen === screentoNavigate){
            menu.isActive = true;
        }else{
            menu.isActive= false;
        }
       })
          
    //    alert(menuState[0].isActive)
            setmenuState(menuStateCopy);
            if(screentoNavigate === "NewGame"){
                setgameStatus(true);
                // alert(gameStatus);
                // settimer(300000);
                
               
              
                 
            }
      
    }

    var stopGame = ()=>{
        setgameStatus(false);
    }
    return (
        <View  style={styles.GameComponent}>
        {!menuState[3].isActive && !menuState[0].isActive && <View onTouchEnd={()=>{navigate("Menu")}} style={{padding:"4%"}}><Text  style={{fontSize:20,textAlign:"right",color:"#FFF700"}}>Back</Text></View>}
       
       { menuState[3].isActive && <View  style={styles.GameMenuComponent}>
            <View style={styles.GameMenuHeaderComponent}>
            <Text style={styles.GameMenuHeaderTextComponent}>Game Menu</Text>
            </View>
            <View style={styles.GameMenuMenuComponent} >
            
                <View>
                <TouchableNativeFeedback>
                    <View onTouchEnd={()=>{navigate("NewGame"),setQuestion(GameController.setQuestion())}}  style={styles.MenuElement}><Text style={styles.GameMenuMenuTextComponent}>New Game</Text></View>
                    </TouchableNativeFeedback>
                </View>
                <View>
                <TouchableNativeFeedback>
                    <View onTouchEnd={()=>{navigate("LeaderBoard")}} style={styles.MenuElement}><Text style={styles.GameMenuMenuTextComponent} >LeaderBoard</Text></View>
                    </TouchableNativeFeedback>
                </View>
                <View>
                <TouchableNativeFeedback>
                    <View onTouchEnd={()=>{navigate("AboutGame")}} style={styles.MenuElement}><Text style={styles.GameMenuMenuTextComponent}>About The Game</Text></View>
                    </TouchableNativeFeedback>
                </View>
                <View>
                <TouchableNativeFeedback>
                    <View onTouchEnd={()=>{BackHandler.exitApp()}} style={styles.MenuElement}><Text style={styles.GameMenuMenuTextComponent}>Quit Game</Text></View>
                    </TouchableNativeFeedback>
                </View>
            </View>
        </View> }
       { menuState[0].isActive &&  (<View style={{flex:1}}>
            <NewGameComponent score={score} setscore={setscore} stopGame={stopGame} menuStateCopy={menuStateCopy}  setmenustate={setmenuState} setQuestion={setQuestion}   question={Question}  />
        </View>)}

        </View>
    )
}



var styles = StyleSheet.create({
    GameMenuComponent:{
        flex:1,
        
    },
    MenuElement:{
        backgroundColor:"#FFF700",
        height:60,
        borderRadius:10,
        margin:10,
        padding:"5%"

    },
    GameComponent: {
        flex: 1,
        marginHorizontal: 12,
        marginBottom: 10,
        borderRadius: 10,
        borderColor: "#FFF700",
        borderWidth: 2

    },
    GameMenuHeaderComponent: {
        flex: 0.3,
        margin: "6%",
        borderColor: "#FFF700",
        borderWidth: 1,

    },
    GameMenuHeaderTextComponent: {
        color: "#FFF700",
        padding: "8%",
        fontSize: 45,
        fontFamily: "notoserif"
    },
    GameMenuMenuComponent:{
        flex:0.7,
        margin:"2%",
        padding:"10%",
    },
    GameMenuMenuTextComponent:{
        textAlign:"center",
        fontSize:25
    }
})


export default GameComponent;
