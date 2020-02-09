import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import LeaderBoardComponent from './LeaderBoardComponent';
import NewGameComponent from './NewGameComponent';
import AboutGameComponent from './AboutGameComponent';

const MainNavigator = createStackNavigator({
  NewGame: {screen: NewGameComponent},
  LeaderBoard: {screen: LeaderBoardComponent},
  AboutGame:{screen:AboutGameComponent}
});

const MenuNavigationComponent = createAppContainer(MainNavigator);

export default MenuNavigationComponent;