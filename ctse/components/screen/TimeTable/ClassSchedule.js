import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ToastAndroid,
  TimePickerAndroid,
  Picker,
} from "react-native";
import { db } from "../../firebase-config/firebase-config";
import { useNavigation } from "@react-navigation/native";
import { collection, addDoc } from "firebase/firestore";

export default function AddClassSchedule() {
  const [data, setData] = useState("");
  const navigation = useNavigation();
  const DatCollectinRef = collection(db, "Class Schedule"); //database collection reference
  const [selectedDay, setSelectedDay] = useState("");

  //inputs handle function
  const handleChangeText = async (name, value) => {
    if (name === "subject" && value.trim() === "") {
      // If the subject field is empty, show an error message
      ToastAndroid.show("Please enter a subject.", ToastAndroid.SHORT);
      return;
    }

    // Validate the selectedDay value
    if (name === "day" && value === "") {
      // If the day is not selected, show an error message
      ToastAndroid.show("Please select a day.", ToastAndroid.SHORT);
      return;
    }

    if (name === "time") {
      // If the Time input field is clicked, show the time picker
      try {
        const { action, hour, minute } = await TimePickerAndroid.open({
          hour: 12,
          minute: 0,
          is24Hour: false,
        });
        if (action !== TimePickerAndroid.dismissedAction) {
          // Set the selected time to the Time input field
          let selectedTime = `${hour}:${minute}`;
          setData((prevState) => ({ ...prevState, [name]: selectedTime }));
        }
      } catch (error) {
        console.warn("Cannot open time picker", error);
      }
    } else {
      setData((prevState) => ({
        ...prevState,
        [name]: value,
        day: selectedDay,
      }));
    }
  };

  //create user function,include firebase methods
  const add_data = async () => {
    try {
      await addDoc(DatCollectinRef, {
        day: data.day,
        time: data.time,
        duration: data.duration,
        venue: data.venue,
        subject: data.subject,
        lecturer: data.lecturer,
      });
      if (addDoc) {
        ToastAndroid.show(
          "Class Schedule Successfully submited!",
          ToastAndroid.SHORT
        ); //application toast message
      }
    } catch (e) {
      //error handling
      console.error("Error adding document: ", e);
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorCode, errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Class Schedule</Text>
      <View
        style={{
          margin: 5,
          borderBottomWidth: 1,
          borderColor: "#BDBDBD",
          padding: 10,
        }}
      >
        <Text style={styles.text}>Day</Text>
        <Picker
          style={styles.input}
          selectedValue={selectedDay}
          onValueChange={(itemValue, itemIndex) => setSelectedDay(itemValue)}
        >
          <Picker.Item label="Select a Day" value="" />
          <Picker.Item label="Monday" value="Monday" />
          <Picker.Item label="Tuesday" value="Tuesday" />
          <Picker.Item label="Wednesday" value="Wednesday" />
          <Picker.Item label="Thursday" value="Thursday" />
          <Picker.Item label="Friday" value="Friday" />
          <Picker.Item label="Saturday" value="Saturday" />
          <Picker.Item label="Sunday" value="Sunday" />
        </Picker>

        <Text style={styles.text}>Time</Text>
        <TextInput
          style={styles.input}
          placeholder="Select the Time"
          editable={false}
          value={data.time}
          onTouchStart={() => handleChangeText("time")}
        />

        <Text style={styles.text}>Duration</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter the Duration"
          onChangeText={(val) => handleChangeText("duration", val)}
        />

        <Text style={styles.text}>Venue</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter the Venue"
          onChangeText={(val) => handleChangeText("venue", val)}
        />

        <Text style={styles.text}>Subject</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter the Subject"
          onChangeText={(val) => handleChangeText("subject", val)}
        />

        <Text style={styles.text}>Lecturer</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter the lecturer's name"
          onChangeText={(val) => handleChangeText("lecturer", val)}
        />
        <br />
        <Button title="Add Class" onPress={() => add_data()} />
        <br />
        <Button
          title="Schedule List"
          onPress={() => navigation.navigate("Schedule List")}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
});
