import React from "react";
import { StatusBar } from "react-native";
import { Entypo, FontAwesome5, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { TouchableNativeFeedback, TextInput, FlatList } from "react-native";

import { Text, View } from "../components/Themed";
import ScreenHeader from "../components/ScreenHeader";
import Messages from "../data/Messages";
import { ConversationMessage } from "../types";

const ConversationScreen = () => {
   const navigation = useNavigation();
   return (
      <View style={{ flex: 1, position: "relative", paddingBottom: 79 }}>
         <ScreenHeader
            title="Simo"
            subTitle="Active Now"
            LeftIcon={({ color }) => (
               <Entypo name="chevron-left" size={22} color={color} />
            )}
            LeftOnClick={() => navigation.goBack()}
            RightIcon={({ color }) => (
               <FontAwesome5 name="heart-broken" size={20} color={color} />
            )}
            RightOnClick={() => {}}
         />
         <View style={{ marginTop: 20 }} />
         <FlatList
            data={Messages}
            keyExtractor={({ id }) => id}
            renderItem={({ item }) => <RenderMessage {...item} />}
            style={{ paddingHorizontal: 12 }}
            inverted
         />
         <MessageInput />
      </View>
   );
};

const MessageInput = () => {
   return (
      <View
         style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            // height: 80,
            paddingHorizontal: 12,
            paddingVertical: 12,
            justifyContent: "center",
         }}
      >
         <View transparent style={{ position: "relative" }}>
            <TextInput
               style={{
                  width: "100%",
                  height: 55,
                  backgroundColor: "#262626",
                  borderRadius: 66,
                  borderColor: "#3A3A3A",
                  // borderWidth: 0.5,
                  color: "white",
                  paddingHorizontal: 22,
                  fontFamily: "Sofia_Regular",
                  // overflow: "hidden",
               }}
               placeholder="Message..."
               placeholderTextColor="#7B7B7B"
               multiline
            />
            <View
               style={{
                  position: "absolute",
                  top: 7.5,
                  right: 7.5,
                  borderRadius: 50,
                  width: 40,
                  height: 40,
                  overflow: "hidden",
               }}
            >
               <TouchableNativeFeedback>
                  <View
                     style={{
                        height: 40,
                        width: 40,
                        backgroundColor: "#393939",
                        borderRadius: 35,
                        alignItems: "center",
                        justifyContent: "center",
                     }}
                  >
                     <Entypo name="chevron-right" size={22} color="white" />
                  </View>
               </TouchableNativeFeedback>
            </View>
         </View>
      </View>
   );
};

const RenderMessage = ({
   content,
   senderId,
   timestamp,
}: ConversationMessage) => {
   return (
      <View style={{ width: "100%", marginVertical: 8 }}>
         <View
            style={{
               width: "100%",
               flexDirection: "row",
               justifyContent: "space-between",
               alignItems: "center",
            }}
         >
            <Text style={{ color: "white", fontSize: 10 }}>Simo</Text>
            <Text style={{ color: "#6B6B6B", fontSize: 10 }}>04:22 PM</Text>
         </View>
         <View
            style={{
               width: "100%",
               paddingVertical: 10,
               paddingHorizontal: 12,
               marginTop: 4,
               borderRadius: 12,
               ...(senderId === "me"
                  ? {
                       // If I am the sender
                       backgroundColor: "white",

                       borderTopRightRadius: 0,
                    }
                  : {
                       // If I am the Reciever
                       backgroundColor: "#2D2D2D",
                       borderTopLeftRadius: 0,
                    }),
            }}
         >
            <Text style={{ color: senderId === "me" ? "black" : "white" }}>
               {content}
            </Text>
         </View>
      </View>
   );
};

export default ConversationScreen;
