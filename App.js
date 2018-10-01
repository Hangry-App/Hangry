import { Map, UserLogin, UserSignUp, Welcome } from './components';
import { createSwitchNavigator } from 'react-navigation';



const App = createSwitchNavigator(
  {
    Welcome,
    UserLogin,
    UserSignUp,
    Map
  }, {
    initialRouteName: 'Welcome'
  }
)

export default App
