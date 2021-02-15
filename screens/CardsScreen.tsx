import * as React from "react";
import {
   Image,
   StyleSheet,
   TouchableWithoutFeedback,
   ViewStyle,
} from "react-native";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import Swiper from "react-native-deck-swiper";
import { LinearGradient } from "expo-linear-gradient";

import { Text, View } from "../components/Themed";
import Layout from "../constants/Layout";
import Colors from "../constants/Colors";

const SwiperRefContext = React.createContext<any>(null);

export default function CardsScreen() {
   const SwiperRef = React.useRef<Swiper<any> | null>(null);
   return (
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
               cards={Array(10).fill(100)}
               renderCard={(props) => <RenderCard {...props} />}
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

const RenderCard = (props: { cardData: any; cardIndex: number }) => {
   const { cardIndex, cardData } = props;

   return (
      <View
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
         <ImagesContainer
            images={[
               "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=800",
               "https://images.unsplash.com/photo-1516726817505-f5ed825624d8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
               "https://images.unsplash.com/photo-1467632499275-7a693a761056?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
               "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=662&q=80",
               "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80",
               "https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80",
            ]}
         />
         <View
            transparent
            style={{
               position: "absolute",
               width: "100%",
               left: 0,
               bottom: 60,
               paddingLeft: 24,
               zIndex: 3,
               overflow: "hidden",
            }}
            pointerEvents="none"
         >
            <Text
               style={{ fontSize: 26, fontFamily: "Sofia_Bold" }}
               numberOfLines={1}
            >
               Zakaria, 17
            </Text>
            <Text style={{ fontSize: 14 }} numberOfLines={1}>
               IT Manager
            </Text>
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

const ImagesContainer = ({ images }: { images: string[] }) => {
   const [imageIndex, setImageIndex] = React.useState<number>(0);

   const viewsSize = {
      width: Layout.window.width - 32,
      aspectRatio: 15 / 21,
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      borderBottomLeftRadius: 35,
      borderBottomRightRadius: 35,
      // height: (Layout.window.width * 16) / 9,
   };

   return (
      <View
         transparent
         style={{
            position: "relative",
            overflow: "hidden",
            backgroundColor: Colors.dark.background,
            ...viewsSize,
         }}
      >
         <View
            style={{
               position: "absolute",
               top: 0,
               alignSelf: "center",
               height: 30,
               backgroundColor: "rgba(0,0,0,0.2)",
               zIndex: 20,
               borderBottomLeftRadius: 15,
               borderBottomRightRadius: 15,
               flexDirection: "row",
               alignItems: "center",
               justifyContent: "center",
               paddingHorizontal: 16,
            }}
         >
            {images.map((_, i) => {
               return (
                  <View
                     key={i}
                     style={{
                        width: 8,
                        height: 8,
                        borderRadius: 8,
                        marginHorizontal: 4,
                        backgroundColor:
                           i === imageIndex
                              ? "rgba(255,255,255,0.8)"
                              : "rgba(255,255,255,0.2)",
                     }}
                  ></View>
               );
            })}
         </View>
         <Image
            source={{
               uri: images[imageIndex],
            }}
            style={{ ...viewsSize }}
         />
         <View
            transparent
            style={{
               position: "absolute",
               top: 0,
               left: 0,
               right: 0,
               bottom: 0,
               zIndex: 10,
               flexDirection: "row",
            }}
         >
            <TouchableWithoutFeedback
               touchSoundDisabled
               onPress={() =>
                  setImageIndex(
                     imageIndex !== 0 ? imageIndex - 1 : images.length - 1
                  )
               }
            >
               <View
                  transparent
                  style={{
                     width: "50%",
                     height: "100%",
                  }}
               />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
               touchSoundDisabled
               onPress={() => setImageIndex((imageIndex + 1) % images.length)}
            >
               <View
                  transparent
                  style={{
                     width: "50%",
                     height: "100%",
                  }}
               />
            </TouchableWithoutFeedback>
         </View>
      </View>
   );
};
