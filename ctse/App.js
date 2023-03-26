import { View, Platform, StatusBar } from "react-native";
import AddUser from "././components/screen/AddUser";
import UserList from "././components/screen/UserList";
import UpdateUser from "././components/screen/UpdateUser";
import SplashScreen from "././components/screen/SplashScreen";
import { NavigationContainer } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//Chanduni
import AddNotice from "./components/screen/Notices/AddNotice";
import NoticeList from "./components/screen/Notices/NoticeList";
import UpdateNotice from './components/screen/Notices/UpdateNotice'

import AddClassSchedule from './components/screen/TimeTable/ClassSchedule'
import ScheduleList from "./components/screen/TimeTable/ScheduleList";

import AddSubmission from './components/screen/Submission/AddSubmission'
import SubmissionList from './components/screen/Submission/SubmissionList'
import SubmitSubmission from './components/screen/Submission/SubmitSubmission'

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <View
      style={{
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        flex: 1,
      }}
    >
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Submission List">
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Add User" component={AddUser} />
          <Stack.Screen name="User List" component={UserList} />
          <Stack.Screen name="Update User" component={UpdateUser} />

          {/* Chanduni */}
          <Stack.Screen name="Add Notice" component={AddNotice} />
          <Stack.Screen name="View Notice" component={NoticeList} />
          <Stack.Screen name="Update Notice" component={UpdateNotice} />

          {/* Vishwa */}
          <Stack.Screen name="Add ClassSchedule" component={AddClassSchedule} />
          <Stack.Screen name="Schedule List" component={ScheduleList} />

          {/*Yasith*/}
          <Stack.Screen name="Add Submission" component={AddSubmission}/>
          <Stack.Screen name="Submission List" component={SubmissionList}/>
          <Stack.Screen name="Submit Submission" component={SubmitSubmission}/>

          
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
