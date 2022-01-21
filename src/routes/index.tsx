import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// Blocks
import Camera from '../screens/Camera'

const Stack = createStackNavigator();

const Routes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Camera"
        component={Camera}
        options={{
          headerShown: false,
        }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default Routes;
