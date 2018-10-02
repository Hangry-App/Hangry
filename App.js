import { Main, UserLogin, UserSignUp, Welcome } from './components';
import { createSwitchNavigator } from 'react-navigation';

// OB/JD: look into the differences between this and StackNavigator
const App = createSwitchNavigator(
  {
    Welcome,
    UserLogin,
    UserSignUp,
    Main,
  },
  {
    initialRouteName: 'Welcome',
  }
);

export default App;
