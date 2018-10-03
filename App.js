import { Main, UserLogin, UserSignUp, Welcome, UserPref } from './components';
import { createSwitchNavigator } from 'react-navigation';

const App = createSwitchNavigator(
  {
    Welcome,
    UserLogin,
    UserSignUp,
    UserPref,
    Main,
  },
  {
    initialRouteName: 'UserPref',
  }
);

export default App;
