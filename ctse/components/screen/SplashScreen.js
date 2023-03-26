import React, { Component } from "react";
import { Image, View } from "react-native";

class SplashScreen extends Component {
  componentDidMount() {
    // You can add any logic here to run when the splash screen loads
    // such as fetching data or initializing services
    setTimeout(() => {
      this.props.navigation.navigate("Add User"); // replace 'Main' with the name of your main app component
    }, 3000); // replace 3000 with the desired number of milliseconds for your splash screen to display
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        {/* <Image
          source={require("")}
          onError={(error) => console.log("Error loading image:", error)}
        /> */}
      </View>
    );
  }
}

export default SplashScreen;
