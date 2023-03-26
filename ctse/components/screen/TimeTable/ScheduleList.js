import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    FlatList,
    ToastAndroid,
  } from "react-native";
  import React, { useState, useEffect } from "react";
  import { useNavigation } from "@react-navigation/native";
  import { db } from "../../firebase-config/firebase-config";
  import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
  
  export default function ScheduleList() {
    const [getData, setGetData] = useState("");
    const navigation = useNavigation();
    const DatCollectinRef = collection(db, "Class Schedule"); //firebase databse reference
    const [ignored, forceUpdate] = React.useReducer((x) => x + 1, 0); //the method for refresh functions
  
    useEffect(() => {
      //fetch the all data from firebase and set it to usestate, this firebase method
      const getAllData = async () => {
        const data = await getDocs(DatCollectinRef);
        setGetData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        forceUpdate();
      };
      getAllData();
    }, [ignored]);
  
    //delete Schedules from database
    const deleteSchedule = async (id) => {
      try {
        const UserDoc = doc(db, "Class Schedule", id);
        await deleteDoc(UserDoc);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      ToastAndroid.show("Class Schedule Successfully Deleted!", ToastAndroid.SHORT);
      forceUpdate();
    };
  
    return (
      <View>
        <Text
          style={{
            color: "#0D0140",
            fontWeight: "bold",
            fontSize: 30,
            marginTop: 20,
            textAlign: "center",
          }}
        >
          Class Schedule List
        </Text>
        {/* store feched data in list using react native flatlist */}
        <FlatList
          style={{
            margin: 5,
            height: "95%",
          }}
          data={getData}
          renderItem={({ item }) => (
            <View
              style={{
                margin: 5,
                backgroundColor: "#fff",
                padding: 10,
                borderRadius: 15,
                elevation: 10,
              }}
            >
              <Text style={styles.text}>Day : {item.day}</Text>
              <Text style={styles.text}>Time : {item.time}</Text>
              <Text style={styles.text}>Duration : {item.duration}</Text>
              <Text style={styles.text}>Venue : {item.venue}</Text>
              <Text style={styles.text}>Subject : {item.subject}</Text>
              <Text style={styles.text}>Lecturer : {item.lecturer}</Text>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                {/* update button */}
                <TouchableOpacity
                  style={{
                    marginTop: 15,
                    flex: 0.4,
                    backgroundColor: "#0056A2",
                    marginHorizontal: 5,
                    height: 30,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 10,
                  }}
                  activeOpacity={2}
                  //pass data to another page using usenavigate params for update user
                  onPress={() => navigation.navigate("Update Notice", { item })}
                  underlayColor="#0084fffa"
                >
                  <Text style={{ fontSize: 15, color: "#fff" }}>Update</Text>
                </TouchableOpacity>
                {/* delete button */}
                <TouchableOpacity
                  style={{
                    marginTop: 15,
                    flex: 0.4,
                    backgroundColor: "tomato",
                    marginHorizontal: 5,
                    height: 30,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 10,
                  }}
                  activeOpacity={2}
                  onPress={() => deleteSchedule(item.id)}
                  underlayColor="#0084fffa"
                >
                  <Text style={{ fontSize: 15, color: "#fff" }}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        ></FlatList>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    text: {
      color: "#0D0140",
      marginVertical: 5,
      fontSize: 15,
    },
    button: {
      marginTop: 15,
      backgroundColor: "#448AFF",
      height: 40,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 7,
    },
  });
  