import 'react-native-gesture-handler'
import {NavigationContainer} from '@react-navigation/native'
import {createDrawerNavigator} from '@react-navigation/drawer'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {createStackNavigator} from '@react-navigation/stack'
import {Image} from 'react-native'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import AllScreen from './src/screens/tabs/AllScreen'
import CompletedScreen from './src/screens/tabs/CompletedScreen'
import PendingScreen from './src/screens/tabs/PendingScreen'
import SettingsScreen from './src/screens/SettingsScreen'
import TodoDetailsScreen from './src/screens/TodoDetailsScreen'
import TodoEditModal from './src/screens/TodoEditModal'

const Drawer = createDrawerNavigator()
const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

const TodoStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Group>
      <Stack.Screen
        name="TodoTabs"
        component={TodoTabs}
        options={{
          headerShown:false,
        }}
      />
      <Stack.Screen
        name="TodoDetails"
        component={TodoDetailsScreen}
        options={{
          title:"Todo Details",
        }}
      />
    </Stack.Group>
    <Stack.Group screenOptions={{presentation:"modal"}}>
      <Stack.Screen
        name="TodoEdit"
        component={TodoEditModal}
        options={{
          title:"Edit Todo",
        }}
      />
    </Stack.Group>
  </Stack.Navigator>
);

const TodoTabs = ()=> (
  <Tab.Navigator
    screenOptions={({route})=>({
      tabBarIcon: ({focused,color,size})=> {
        if (route.name=== "All") {
          return <Image 
            source={{uri: focused 
              ? 'https://img.icons8.com/ios-filled/50/000000/todo-list.png'
              : 'https://img.icons8.com/ios/50/000000/todo-list--v1.png' 
            }}
            style={{width:size,height:size}}
          />
        } else if (route.name==="Completed") {
          return <Image 
            source={{uri: focused
              ? 'https://img.icons8.com/ios-filled/50/000000/checkmark--v1.png'
              : 'https://img.icons8.com/ios/50/000000/checkmark--v1.png'
            }}
            style={{width:size,height:size}}
          />
        }
        return <Image 
          source={{uri: focused
            ? 'https://img.icons8.com/ios-filled/50/000000/time-machine.png'
            : 'https://img.icons8.com/ios/50/000000/time-machine.png'
          }}
          style={{width:size,height:size}}
        />
      },
    })}
  >
    <Tab.Screen name="All" component={AllScreen} />
    <Tab.Screen name="Completed" component={CompletedScreen} />
    <Tab.Screen name="Pending" component={PendingScreen} />
  </Tab.Navigator>
)

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Drawer.Navigator
          screenOptions={{
            drawerActiveTintColor: '#2196F3',
            drawerInactiveTintColor: '#757575',
          }}
        >
          <Drawer.Screen
            name="Todos"
            component={TodoStack}
          />
          <Drawer.Screen
            name="Settings"
            component={SettingsScreen}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}
