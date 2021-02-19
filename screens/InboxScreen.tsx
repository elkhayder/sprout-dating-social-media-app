import * as React from "react";
import { Feather } from "@expo/vector-icons";
import TimeAgo from "javascript-time-ago";
import TimeAgoLocal_en from "javascript-time-ago/locale/en";
import { useNavigation } from "@react-navigation/core";
import { Image, TouchableNativeFeedback, FlatList } from "react-native";

import ScreenHeader from "../components/ScreenHeader";
import { View, Text } from "../components/Themed";
import Layout from "../constants/Layout";
import { InboxScreenConversationProps } from "../types";
// import { FlatList, TouchableHighlight } from "react-native-gesture-handler";
import Conversations from "../data/Conversations";
import NavigationRoutes from "../constants/Navigation";

TimeAgo.addLocale(TimeAgoLocal_en);
TimeAgo.setDefaultLocale("en");
const timeAgo = new TimeAgo("en-US");

const InboxScreen = () => {
   const navigation = useNavigation();

   return (
      <>
         <ScreenHeader
            title="Inbox"
            subTitle="133 conversation"
            RightIcon={({ color }) => (
               <Feather name="edit-2" size={18} color={color} />
            )}
            RightOnClick={() => {}}
         />
         <View style={{ flex: 1, paddingTop: 20 }}>
            <FlatList
               data={Conversations}
               renderItem={({ item, index }) => (
                  <ConversationContainer
                     key={item.conversationId}
                     {...item}
                     isFirst={index === 0}
                     isLast={Conversations.length === index - 1}
                     onPress={() => {
                        navigation.navigate(NavigationRoutes.Conversation);
                     }}
                  />
               )}
               keyExtractor={({ conversationId }) => conversationId}
            />
         </View>
      </>
   );
};

export default InboxScreen;

const ConversationContainer = ({
   profile,
   lastMessage,
   isFirst,
   isLast,
   onPress,
}: InboxScreenConversationProps & {
   isFirst?: boolean;
   isLast?: boolean;
   onPress: () => void;
}) => {
   return (
      <TouchableNativeFeedback onPress={onPress}>
         <View
            style={{
               height: 100,
               width: "100%",
               paddingHorizontal: 24,
               flexDirection: "row",
               alignItems: "center",
               justifyContent: "space-between",
               ...(!isLast && {
                  borderBottomWidth: 1,
                  borderBottomColor: "rgba(61, 61, 61, 0.2)",
               }),
               ...(isFirst && {
                  borderTopWidth: 1,
                  borderTopColor: "rgba(61, 61, 61, 0.2)",
               }),
            }}
         >
            <View
               style={{ flexDirection: "row", alignItems: "center" }}
               transparent
            >
               <Image
                  source={{
                     uri: profile.images[0],
                  }}
                  style={{
                     width: 68,
                     height: 68,
                     borderRadius: 100,
                     marginRight: 16,
                     marginLeft: -2,
                  }}
               />
               <View style={{ marginBottom: 7 }} transparent>
                  <Text
                     style={{
                        fontFamily: "Sofia_Medium",
                        fontSize: 18,
                        marginBottom: 2,
                        maxWidth: Layout.window.width / 2,
                     }}
                  >
                     {profile.name}
                  </Text>
                  <Text
                     style={{
                        fontSize: 12,
                        color: "#6B6B6B",
                        maxWidth: Layout.window.width - 170,
                     }}
                     numberOfLines={1}
                     ellipsizeMode="tail"
                  >
                     {lastMessage.content}
                  </Text>
               </View>
            </View>
            <Text
               style={{
                  color: "#6B6B6B",
                  fontSize: 12,
                  marginBottom: 22,
                  //    textTransform: "uppercase",
               }}
            >
               {timeAgo.format(lastMessage.timestamp, "mini")}
            </Text>
         </View>
      </TouchableNativeFeedback>
   );
};
