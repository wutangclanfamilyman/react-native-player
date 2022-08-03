import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import AudioList from '../screens/AudioList';
import Player from '../screens/Player';
import PlayerList from '../screens/PlayList';
import {MaterialIcons, FontAwesome5} from '@expo/vector-icons'

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
    return <Tab.Navigator>
        <Tab.Screen name='AudioList' component={AudioList} options={{
            tabBarIcon: ({color, size, focused}) => <MaterialIcons name='headset' size={size} color={color} />
        }}/> 
        <Tab.Screen name="Player" component={Player} options={{
            tabBarIcon: ({color, size, focused}) => <FontAwesome5 name='compact-disc' size={size} color={color} />
        }}/>
        <Tab.Screen name="PlayerList" component={PlayerList} options={{
            tabBarIcon: ({color, size, focused}) => <MaterialIcons name='library-music' size={size} color={color} />
        }}/>
    </Tab.Navigator>
}

export default AppNavigator;