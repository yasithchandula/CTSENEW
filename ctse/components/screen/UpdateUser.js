import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React, { useState, useEffect } from "react";
import { db } from "../firebase-config/firebase-config";
import { useNavigation } from "@react-navigation/native";
import {
  collection,
  getDocs,
  updateDoc,
  getDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

export default function UpdateUser({ route }) {
  const { item } = route.params;
  const id = item.id;
  const [data, setData] = useState("");
  const navigation = useNavigation();
  const initialState = {
    name: "",
    email: "",
  };

  useEffect(() => {
    const updatemember = async () => {
      try {
        const docRef = await getDoc(doc(db, "User", id));
        // console.log("Document update data:", docRef.data());
        setData({ ...docRef.data(), id: docRef.id });
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    };

    updatemember();
  }, []);

  const handleChangeText = (name, value) => {
    setData((prevState) => ({ ...prevState, [name]: value }));
  };

  const UpdateUser = async () => {
    try {
      await updateDoc(doc(db, "User", id), {
        email: data.email,
        name: data.name,
      });
      if (updateDoc) {
        ToastAndroid.show("Updated successfully!", ToastAndroid.SHORT);
        navigation.navigate("User List");
      }
    } catch (e) {
      console.error("Error adding document: ", e);
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorCode, errorMessage);
    }
  };

  return (
    <View style={{ flex: 1, top: 20 }}>
      <Text
        style={{
          color: "#0D0140",
          fontWeight: "bold",
          fontSize: 20,
          marginTop: 30,
          textAlign: "center",
        }}
      >
        Update information
      </Text>
      <View
        style={{
          margin: 5,
          borderBottomWidth: 1,
          borderColor: "#BDBDBD",
          padding: 10,
        }}
      >
        <Text style={styles.text}>Email</Text>
        <TextInput
          style={{
            borderColor: "#67afff",
            borderWidth: 1.5,
            borderRadius: 10,
            padding: 5,
            paddingLeft: 10,
          }}
          keyboardType="email-address"
          placeholder="enter email"
          value={data.email}
          onChangeText={(val) => handleChangeText("email", val)}
        ></TextInput>

        <Text style={styles.text}>Name</Text>
        <TextInput
          style={{
            borderColor: "#67afff",
            borderWidth: 1.5,
            borderRadius: 10,
            padding: 5,
            paddingLeft: 10,
          }}
          placeholder="enter name"
          value={data.name}
          onChangeText={(val) => handleChangeText("name", val)}
        ></TextInput>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={2}
          onPress={() => UpdateUser()}
          underlayColor="#0084fffa"
        >
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}>
            Update
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "#0D0140",
    marginVertical: 5,
    fontWeight: "bold",
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
