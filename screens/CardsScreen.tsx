import * as React from "react";
import {
   Modal,
   StyleSheet,
   TouchableWithoutFeedback,
   TouchableNativeFeedback,
   Pressable,
} from "react-native";
import { FontAwesome, AntDesign, Feather, Octicons } from "@expo/vector-icons";
import Swiper from "react-native-deck-swiper";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/core";

import { Text, View } from "../components/Themed";
import ProfileImagesSlider from "../components/ProfileImagesSlider";
import Layout from "../constants/Layout";
import NavigationRoutes from "../constants/Navigation";
import { Users } from "../data/Users";
import { UserProfile } from "../types";

import getAgeFromTimestamp from "../functions/getAgeFromTimestamp";
import Colors from "../constants/Colors";
import ScreenHeader from "../components/ScreenHeader";

const SwiperRefContext = React.createContext<any>(null);

const CardsScreen = () => {
   const SwiperRef = React.useRef<Swiper<any> | null>(null);
   const [isModalVisible, setIsModalVisible] = React.useState(false);
   return (
      <>
         <ScreenHeader
            title="Discover"
            subTitle="Casablanca, Morocco"
            RightIcon={({ color }) => (
               <Octicons name="settings" size={20} color={color} />
            )}
            RightOnClick={() => setIsModalVisible(true)}
         />
         <View
            style={{
               flex: 1,
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
         <FiltersModal
            isModalVisible={isModalVisible}
            setIsModalVisible={setIsModalVisible}
         />
      </>
   );
};

export default CardsScreen;

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

const FiltersModal = ({
   isModalVisible,
   setIsModalVisible,
}: {
   isModalVisible: boolean;
   setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
   return (
      <Modal
         transparent
         animationType="slide"
         onRequestClose={() => setIsModalVisible(false)}
         visible={isModalVisible}
      >
         <TouchableWithoutFeedback
            touchSoundDisabled
            onPress={() => setIsModalVisible(false)}
         >
            <View
               transparent
               style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
               }}
            ></View>
         </TouchableWithoutFeedback>
         <View
            transparent
            style={{
               position: "relative",
               // height: "50%",
               marginTop: "auto",
               borderTopLeftRadius: 50,
               borderTopRightRadius: 50,
               backgroundColor: "#232323",
               paddingTop: 30,
               paddingBottom: 20,
               paddingHorizontal: 24,
            }}
         >
            <View
               transparent
               style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingHorizontal: 10,
               }}
            >
               <Pressable
                  android_disableSound
                  onPress={() => setIsModalVisible(false)}
                  hitSlop={{ top: 20, left: 20, right: 20, bottom: 20 }}
               >
                  <FontAwesome name="times" size={22} color="#9A9A9A" />
               </Pressable>
               <Text style={{ fontFamily: "Sofia_Medium", fontSize: 22 }}>
                  Filters
               </Text>
               <Pressable
                  android_disableSound
                  onPress={() => setIsModalVisible(false)}
                  hitSlop={{ top: 20, left: 20, right: 20, bottom: 20 }}
               >
                  <FontAwesome name="check" size={22} color="#9A9A9A" />
               </Pressable>
            </View>
         </View>
      </Modal>
   );
};
