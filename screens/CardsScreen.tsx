import * as React from "react";
import { StatusBar, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { FontAwesome, AntDesign, Feather, Octicons } from "@expo/vector-icons";
import Swiper from "react-native-deck-swiper";
import { LinearGradient } from "expo-linear-gradient";

import { Text, View } from "../components/Themed";
import ProfileImagesSlider from "../components/ProfileImagesSlider";
import Layout from "../constants/Layout";
import { useNavigation } from "@react-navigation/core";
import NavigationRoutes from "../constants/Navigation";
import { Users } from "../data/Users";
import { UserProfile } from "../types";

import getAgeFromTimestamp from "../functions/getAgeFromTimestamp";
import Colors from "../constants/Colors";

const SwiperRefContext = React.createContext<any>(null);

export default function CardsScreen() {
   const SwiperRef = React.useRef<Swiper<any> | null>(null);

   return (
      <>
         <CardsScreenHeader />
         <View
            style={{
               flex: 1,
               // alignItems: "center",
               // justifyContent: "center",
               position: "relative",
               paddingHorizontal: 16,
            }}
         >
            <SwiperRefContext.Provider value={SwiperRef}>
               <Swiper
                  ref={SwiperRef}
                  cards={Users}
                  renderCard={(cardData: UserProfile, cardIndex: number) => (
                     <RenderCard userData={cardData} userIndex={cardIndex} />
                  )}
                  // verticalSwipe={false}
                  disableBottomSwipe
                  containerStyle={{ backgroundColor: "transparent" }}
                  cardVerticalMargin={35}
                  cardHorizontalMargin={16}
                  animateCardOpacity
                  showSecondCard
                  stackSize={2}
                  infinite
               />
               <CallToActionButtons />
            </SwiperRefContext.Provider>
         </View>
      </>
   );
}

const CallToActionButtons = () => {
   const SwiperRef = React.useContext(SwiperRefContext);
   const styles = StyleSheet.create({
      callToActionContainer: {
         width: 86,
         height: 86,
         backgroundColor: "#FFFFFF",
         alignItems: "center",
         justifyContent: "center",
         borderRadius: 500,
         marginHorizontal: 8,
      },
   });
   return (
      <View
         transparent
         style={{
            position: "absolute",
            bottom: 30,
            alignSelf: "center",
            flexDirection: "row",
         }}
      >
         <TouchableWithoutFeedback
            onPress={() => SwiperRef.current.swipeLeft()}
         >
            <View
               style={[styles.callToActionContainer, { width: 63, height: 63 }]}
            >
               <FontAwesome name="close" size={24} color="#FF9B9B" />
            </View>
         </TouchableWithoutFeedback>
         <TouchableWithoutFeedback onPress={() => SwiperRef.current.swipeTop()}>
            <View style={styles.callToActionContainer}>
               <AntDesign name="star" size={35} color="#83E2FF" />
            </View>
         </TouchableWithoutFeedback>
         <TouchableWithoutFeedback
            onPress={() => SwiperRef.current.swipeRight()}
         >
            <View
               style={[styles.callToActionContainer, { width: 63, height: 63 }]}
            >
               <AntDesign name="heart" size={24} color="#FFC6CD" />
            </View>
         </TouchableWithoutFeedback>
      </View>
   );
};

const RenderCard = ({
   userData,
   userIndex,
}: {
   userData: UserProfile;
   userIndex: number;
}) => {
   const navigation = useNavigation();
   console.log(userData);
   return (
      <View
         key={userData.id}
         transparent
         style={{
            position: "relative",
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            borderBottomLeftRadius: 35,
            borderBottomRightRadius: 35,
            // overflow: "hidden",
            width: Layout.window.width - 32,
            aspectRatio: 15 / 21,
            // height: (Layout.window.width * 16) / 9,
         }}
      >
         <View
            transparent
            style={{
               position: "relative",
               overflow: "hidden",
               backgroundColor: Colors.dark.background,
               width: Layout.window.width - 32,
               aspectRatio: 15 / 21,
               borderTopLeftRadius: 25,
               borderTopRightRadius: 25,
               borderBottomLeftRadius: 35,
               borderBottomRightRadius: 35,
            }}
         >
            <ProfileImagesSlider
               images={userData.images}
               aspectRatio={15 / 21}
            />
         </View>
         <View
            transparent
            style={{
               position: "absolute",
               width: "100%",
               left: 0,
               bottom: 60,
               paddingHorizontal: 24,
               paddingRight: 16,
               zIndex: 3,
               overflow: "hidden",
               flexDirection: "row",
               alignItems: "center",
               justifyContent: "space-between",
            }}
         >
            <View transparent>
               <Text
                  style={{ fontSize: 26, fontFamily: "Sofia_Bold" }}
                  numberOfLines={1}
               >
                  {userData.name}, {getAgeFromTimestamp(userData.birthday)}
               </Text>
               <Text style={{ fontSize: 14 }} numberOfLines={1}>
                  IT Manager
               </Text>
            </View>
            <TouchableWithoutFeedback
               onPress={() =>
                  navigation.navigate(NavigationRoutes.Profile, {
                     profile: userData,
                  })
               }
            >
               <View
                  transparent
                  style={{
                     width: 30,
                     height: 30,
                     alignItems: "center",
                     justifyContent: "center",
                  }}
               >
                  <Feather name="more-vertical" size={24} color="#ffffff" />
               </View>
            </TouchableWithoutFeedback>
         </View>

         <LinearGradient
            colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.7)"]}
            style={{
               position: "absolute",
               width: "100%",
               height: 160,
               left: 0,
               bottom: 0,
               borderBottomLeftRadius: 35,
               borderBottomRightRadius: 35,
            }}
            pointerEvents="none"
         />
      </View>
   );
};

const CardsScreenHeader = () => {
   return (
      <View
         style={{
            paddingTop: 20 + StatusBar?.currentHeight,
            paddingHorizontal: 16,
            // height: 150,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
         }}
         // transparent
      >
         <View
            transparent
            style={{
               marginLeft: 10,
            }}
         >
            <Text
               style={{
                  fontFamily: "Sofia_Bold",
                  fontSize: 30,
               }}
            >
               Discover
            </Text>
            <Text style={{ color: "#797979", fontSize: 15 }}>
               Casablanca, Morocco
            </Text>
         </View>
         <TouchableWithoutFeedback>
            <View
               style={{
                  width: 48,
                  height: 48,
                  backgroundColor: "#2D2D2D",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 10,
                  marginTop: 10,
               }}
            >
               <Octicons name="settings" size={20} color="#878787" />
            </View>
         </TouchableWithoutFeedback>
      </View>
   );
};
