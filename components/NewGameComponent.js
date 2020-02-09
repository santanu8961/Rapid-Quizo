import React, { Component, useState, useEffect } from 'react';
import { Text,View,StyleSheet, AsyncStorage } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import quiz from '../QuizDataBase/quizData';
import GameController from '../controllers/GameController';
import { showMessage, hideMessage } from "react-native-flash-message";




class NewGameComponent extends Component {
    constructor(props) {
        super(props);
        this.menuStateCopy = props.menuStateCopy;
        this.setmenuState = props.setmenustate;
        this.setscore = props.setscore;
        
       
        this.state = { 
            timer:null,
            counter:{
                minute:0,
                second:0,
                decisecond:0,
              
            },
            question:props.question,
            score :props.score,
            isgameActive:null
         }
    }

    AttemptQuestion=(answer)=>{
        
         if(this.state.question[1]=== answer){

            showMessage({
                message: "Bravo! Right Answer !",
                type: "info",
              });

              this.setscore(this.state.score+1)
            //   AsyncStorage.mergeItem("score",(this.state.score+1).toString());

            this.setState({
                question:GameController.setQuestion(),
                score:this.props.score 
            })
            

         }else{
            showMessage({
                message: "Opps! Wrong Answer! ",
                type: "error",
              });
            this.setState({
                question:GameController.setQuestion(),
                score:this.props.score 
            })
         }
        
       

        
         
    }


    navigate = (screentoNavigate)=>{
        // alert(menuStateCopy.length)
       this.menuStateCopy.forEach(menu=>{
        if(menu.screen === screentoNavigate){
            menu.isActive = true;

        }else{
            menu.isActive= false;
        }
       });
            this.setmenuState(this.menuStateCopy);
      

        
      
    }
    componentDidMount() {
        this.setState({
            isgameActive:true
        })
        let timer = setInterval(this.tick, 90);
        this.setState({timer});

      }
      componentWillUnmount() {
        clearInterval(this.state.timer);
        showMessage({
            message: "Game Over !! \n Score : " + parseInt(this.state.score),
            type: "info",
          });
         this.setscore(0)
      }

      tick =() => {

        if(parseInt(this.state.counter.minute) > 2 ){
            clearInterval(this.state.timer);
            showMessage({
                message: "Game Over !! \n Score : " + parseInt(this.state.score+1),
                type: "info",
              });
            this.setscore(0);
            this.setState({
                isgameActive:false
            })
        }
        if(this.state.counter.decisecond > 8){
            this.setState({
                counter: {
                    decisecond:0,
                    minute:"0"+parseInt(this.state.counter.minute),
                    second:  (parseInt(this.state.counter.second)+1).toString().length >1 ?   parseInt(this.state.counter.second+1) : "0"+(parseInt(this.state.counter.second)+1)
                }
              });
            //   alert(this.state.counter.second)
              if(parseInt(this.state.counter.second) >59){
                this.setState({
                    counter: {
                        decisecond:0,
                        minute:"0"+(parseInt(this.state.counter.minute)+1),
                           second:  "0" + 0
                    }
                  });
              }
        }else{
            this.setState({
                counter: {
                    decisecond:this.state.counter.decisecond+1,
                    minute:"0"+parseInt(this.state.counter.minute),
                   second: (parseInt(this.state.counter.second)+1).toString().length >1 ?   parseInt(this.state.counter.second) : "0"+(parseInt(this.state.counter.second))
                }
              });
        }
      }

    style = StyleSheet.create({
        NewGameComponent:{
            
            flex:1,
            
        },
        Timer:{
            margin:"4%",
            borderColor:"#FFF700",
            borderWidth:2,
            borderRadius:10,
            padding:"5%",
            color:"#FFF700",fontSize:30,    
            textAlign:"center",
            top:20,
            fontFamily:"monospace"
            
        },question:{
            margin:"3%",
           
            borderRadius:10,
            padding:"0%",
            color:"#FFF700",fontSize:20
        },
        answer:{
            borderRadius:10,
            padding:"4%",
            color:"#FFF700",fontSize:25,
            flex:0.4  , textAlign:"center",
            borderColor:"#FFF700",
            borderWidth:2,
            margin:"5%",
            top:70
    
        },
        GameoverView:{
            flex:1
        }
     })

    render() { 
        
        return(
        
            <View style={this.style.NewGameComponent}>
              <View onTouchEnd={()=>{  this.navigate("Menu");}} style={{padding:"4%"}}><Text  style={{fontSize:20,textAlign:"right",color:"#FFF700"}}>Exit Game</Text></View>
               {this.state.isgameActive && (<View style={{flex:1}}>
                <View style={{flex:0.25}}>
                <Text style={this.style.Timer}>{this.state.counter.minute}  :  {this.state.counter.second}  :  {this.state.counter.decisecond}</Text>
                </View>
                <View   style={{flex:0.3}}>
                <Text style={this.style.question}>[Q] : {this.state.question} </Text>
                </View>
                <View  style={{flex:0.15 , flexDirection:"row"}}>
               <Text onTouchEnd={()=>{this.AttemptQuestion(true)}} style={this.style.answer}>True</Text>
               <Text onTouchEnd={()=>{this.AttemptQuestion(false)}} style={this.style.answer}>False</Text>
                </View>
                </View>)}
                {!this.state.isgameActive &&
                    (<View style={this.style.GameoverView}>
                        <Text style={this.style.Timer}>
                      || Game Over ||{"\n"} {"\n"}

                        {""}  Your Score is  {"\n"} {"\n"} 
               <Text style={{fontSize:50}}>  {this.state.score} </Text>
                        </Text>
                    </View>)
                }
            </View>
            );
    }
}
 
export default NewGameComponent;







