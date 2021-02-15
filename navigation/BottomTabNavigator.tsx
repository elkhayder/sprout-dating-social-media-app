import { Ionicons, AntDesign, Octicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
   createStackNavigator,
   StackHeaderProps,
} from "@react-navigation/stack";
import { TouchableWithoutFeedback } from "react-native";
import * as React from "react";
import { Text, View } from "../components/Themed";

import Colors from "../constants/Colors";
import Navigation from "../constants/Navigation";
import useColorScheme from "../hooks/useColorScheme";
import CardsScreen from "../screens/CardsScreen";
import TabTwoScreen from "../screens/TabTwoScreen";

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator() {
   const colorScheme = useColorScheme();

   return (
      <BottomTab.Navigator
         initialRouteName={Navigation.Home}
         tabBarOptions={{
            inactiveTintColor: Colors[colorScheme].tabIconDefault,
            activeTintColor: Colors[colorScheme].tabIconSelected,
            style: {
               height: 60,
               backgroundColor: Colors[colorScheme].background,
               // borderTopLeftRadius: 15,
               // borderTopRightRadius: 15,
               // elevation: 0,
               borderTopColor: "#3D3D3D",
            },
            labelStyle: {
               fontFamily: "Sofia_Regular",
               letterSpacing: 0.5,
               marginBottom: 8,
            },
            iconStyle: {
               marginBottom: -2,
            },
         }}
      >
         <BottomTab.Screen
            name={Navigation.Home}
            component={CardsStack}
            options={{
               tabBarIcon: ({ color }) => (
                  <AntDesign name="home" size={24} color={color} />
               ),
            }}
         />
         <BottomTab.Screen
            name={Navigation.Matches}
            component={CardsStack}
            options={{
               tabBarIcon: ({ color }) => (
                  <AntDesign name="hearto" size={22} color={color} />
               ),
            }}
         />
         <BottomTab.Screen
            name={Navigation.Inbox}
            component={TabTwoNavigator}
            options={{
               tabBarIcon: ({ color }) => (
                  <Ionicons name="chatbubble-outline" size={24} color={color} />
               ),
            }}
         />
         <BottomTab.Screen
            name={Navigation.Settings}
            component={TabTwoNavigator}
            options={{
               tabBarIcon: ({ color }) => (
                  <Ionicons name="settings-outline" size={23} color={color} />
               ),
            }}
         />
      </BottomTab.Navigator>
   );
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const HomeStack = createStackNavigator();

function CardsStack() {
   const CardsHeader = ({ insets }: StackHeaderProps) => {
      return (
         <View
            style={{
               paddingTop: insets.top + 20,
               paddingHorizontal: 16,
               // height: 150,
               flexDirection: "row",
               alignItems: "center",
               justifyContent: "space-between",
            }}
            // transparent
         >
            <View
               transparent
               style={{
                  marginLeft: 10,
               }}
            >
               <Text
                  style={{
                     fontFamily: "Sofia_Bold",
                     fontSize: 30,
                  }}
               >
                  Discover
               </Text>
               <Text style={{ color: "#797979", fontSize: 15 }}>
                  Casablanca, Morocco
               </Text>
            </View>
            <TouchableWithoutFeedback>
               <View
                  style={{
                     width: 48,
                     height: 48,
                     backgroundColor: "#2D2D2D",
                     alignItems: "center",
                     justifyContent: "center",
                     borderRadius: 10,
                     marginTop: 10,
                  }}
               >
                  <Octicons name="settings" size={20} color="#878787" />
               </View>
            </TouchableWithoutFeedback>
         </View>
      );
   };

   return (
      <HomeStack.Navigator>
         <HomeStack.Screen
            name={Navigation.Discover}
            component={CardsScreen}
            options={{
               header: CardsHeader,
            }}
         />
      </HomeStack.Navigator>
   );
}

const TabTwoStack = createStackNavigator();

function TabTwoNavigator() {
   return (
      <TabTwoStack.Navigator>
         <TabTwoStack.Screen
            name="TabTwoScreen"
            component={TabTwoScreen}
            options={{ headerTitle: "Tab Two Title" }}
         />
      </TabTwoStack.Navigator>
   );
}
