import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/account/LoginScreen";

const Stack = createStackNavigator();

const AuthenticationNavigator = () => {
   return (
      <Stack.Navigator>
         <Stack.Screen name="test" component={LoginScreen} />
      </Stack.Navigator>
   );
};

export default AuthenticationNavigator;
