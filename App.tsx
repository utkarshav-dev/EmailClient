import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import store from './src/redux/store';
import HomeScreen from './src/View/HomeScreen';
import EditEmailScreen from './src/View/EditEmailScreen';
import Toast from 'react-native-toast-message';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}> 
      <Toast ref={(ref) => Toast.setRef(ref)} />
      <NavigationContainer >
        <Stack.Navigator screenOptions={{
          headerShown: false,
          gestureEnabled: true,
        }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="EditEmailScreen" component={EditEmailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
