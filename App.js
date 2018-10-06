import { Main, UserLogin, UserSignUp, Welcome, UserPref } from './components';
import { createSwitchNavigator } from 'react-navigation';
import { SDK_VERSION } from 'firebase';

const App = createSwitchNavigator(
  {
    Welcome,
    UserLogin,
    UserSignUp,
    UserPref,
    Main,
  },
  {
    initialRouteName: 'UserSignUp',
  }
);

export default App;
