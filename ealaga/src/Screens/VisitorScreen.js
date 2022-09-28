import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

const VisitorViewContainer = () => {
  return (
    <View
      style={[
        styles.container,
        {
          flexDirection: "column",
        },
      ]}
    >
      <View style={{ flex: 1, backgroundColor: "white" }} />
      <View style={[styles.Middlecontainer, { flex: 2 }]}>
        <Image
          source={require("../../assets/favicon.png")}
          style={{ width: 90, height: 90 }}
        />
        <Image
          source={require("../../assets/unplash.png")}
          style={{ width: 200, height: 100 }}
        />
      </View>
      <View style={[styles.Lowercontainer, { flex: 3 }]}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.appButtonContainerLogin}>
            <Text style={styles.appButtonTextLogin}>LOG IN</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.appButtonContainerRegister}>
            <Text style={styles.appButtonTextRegister}>Register</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.Line}></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: "100%",
  },
  Lowercontainer: {
    flex: 3,
    flexDirection: "row",
    // alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    flex: 1,
  },
  appButtonContainerLogin: {
    backgroundColor: "#fff",
    borderWidth: 2,
    height: 50,
    width: 197,
    borderRadius: 5,
    borderColor: "#ff1717",
    paddingVertical: 10,
    paddingHorizontal: 12,
    position: "absolute",
    bottom: 30,
    margin: 5,
  },
  appButtonTextLogin: {
    fontSize: 14,
    color: "#ff1717",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  appButtonContainerRegister: {
    backgroundColor: "#ff1717",
    borderWidth: 2,
    height: 50,
    width: 197,
    borderRadius: 5,
    borderColor: "#ff1717",
    paddingVertical: 10,
    paddingHorizontal: 12,
    position: "absolute",
    bottom: 30,
    margin: 5,
  },
  appButtonTextRegister: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  Line: {
    backgroundColor: "#ff1717",
    height: 5,
    position: "absolute",
    bottom: 10,
    width: 200,
  },
  Middlecontainer: {
    paddingTop: 60,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
});
export default VisitorViewContainer;
