import { Main, UserLogin, UserSignUp, Welcome } from './components';
import { createSwitchNavigator } from 'react-navigation';

const App = createSwitchNavigator(
  {
    Welcome,
    UserLogin,
    UserSignUp,
    Main
  }, {
    initialRouteName: 'Welcome'
  }
)

export default App
