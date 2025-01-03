import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Chats from "../screens/Chats";
import Profile from "../screens/Profile";
import Ionicons from 'react-native-vector-icons/Ionicons'

const SCREENS ={
    Feed:'Home',
    Profile:'Profile',
    Chats:'Chats'

};
const TabNavigator=()=>{

    const Tab = createBottomTabNavigator();
    console.log("Opening tabbbbb");

    return(

        <Tab.Navigator screenOptions={({route})=>({
            tabBarShowLabel:false,
            tabBarIcon:({focused,color,size})=>{
                let iconName;
                if(route.name===SCREENS.Feed){
                    iconName= focused?'home':'home'
                } else if (route.name === SCREENS.Chats){
                    iconName = focused?'chatbubbles' : 'chatbubbles-outline';
                } else if(route.name === SCREENS.Profile){
                    iconName = focused?'person' : 'person-outline';
                }
                return <Ionicons name={iconName} size={size || 24} color={color || 'black'} />;

            }
        })}>

            <Tab.Screen name={SCREENS.Feed} component={Home} />
            <Tab.Screen name={SCREENS.Chats} component={Chats}/>
            <Tab.Screen name={SCREENS.Profile} component={Profile}/>

        </Tab.Navigator>
        
    );

};
export default TabNavigator;