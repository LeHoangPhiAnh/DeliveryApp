import { StyleSheet, View, StatusBar } from 'react-native';
import {Colors} from './src/global/styles'
import RootNavigator from './src/navigation/rootNavigation';
import { Provider } from 'react-redux';
import {store} from './src/redux/store/Store';
import MyAccountScreen from './src/screens/MyAccountScreen';
import OrderScreen from './src/screens/orderScreen/OrderScreen';
import OrderInvisibleScreen from './src/screens/orderScreen/OrderInvisibleScreen';
import MyOrdersScreen from './src/screens/MyOrdersScreen';
import RestaurantHomeScreen from './src/screens/RestaurantHomeScreen';

export default function App() {
  return (
      <Provider store={store}>
        <View style={styles.container}>
          <StatusBar barStyle= 'light-content' 
          backgroundColor = {Colors.statusbar}  />
          <RootNavigator/>
        </View>
      </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
