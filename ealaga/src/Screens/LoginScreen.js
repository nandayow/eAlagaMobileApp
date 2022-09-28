import { Box, View, Image, Heading, VStack, Input } from "native-base";
import { Text } from "react-native";
import React from "react";
import Colors from "../color";
import global from "../styles/global";
import { MaterialIcons } from "@expo/vector-icons";
function LoginScreen() {
  return (
    <Box flex={1}>
      <Box flex={1} bg={Colors.light} style={[global.LoginTopcontainer]}>
        <Image
          alt="Unplash"
          w="155"
          h="20"
          position="absolute"
          top="5"
          source={require("../../assets/unplash.png")}
        />
      </Box>
    </Box>
  );
}

export default LoginScreen;
