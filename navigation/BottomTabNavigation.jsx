import React from 'react';
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  AntDesign,
} from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Account, Home, MyLearning, Search } from '../screens';
import { COLORS } from '../constants';

const Tab = createBottomTabNavigator();

const screenOptions = {
  tabBarShowLabel: false,
  tabBarHideOnKeyword: true,
  headerShown: false,
  tabBarStyle: {
    backgroundColor: COLORS.white,
    height: 70,
    elevation: 5,
  },
  contentStyle: {
    backgroundColor: '#FFF',
  },
};

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => {
            return focused ? (
              <MaterialIcons
                name="home-filled"
                size={24}
                color={COLORS.primary}
              />
            ) : (
              <MaterialCommunityIcons
                name="home-variant-outline"
                size={24}
                color={COLORS.gray2}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name={'search-sharp'}
                size={24}
                color={focused ? COLORS.primary : COLORS.gray2}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="MyLearning"
        component={MyLearning}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <AntDesign
                name={focused ? 'play' : 'playcircleo'}
                size={24}
                color={focused ? COLORS.primary : COLORS.gray2}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name={focused ? 'person' : 'person-outline'}
                size={24}
                color={focused ? COLORS.primary : COLORS.gray2}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
