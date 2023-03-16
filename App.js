import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Main from "./components/Main";
import Memories from "./components/Memories";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Making Memories"
                // screenOptions={{ headerShown: false }}
            >
                <Stack.Screen name="Making Memories" component={Main} />
                <Stack.Screen name="Memories" component={Memories} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
