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

const SwipingPositionContext = React.createContext<any>({});

export default function TabOneScreen() {
   const [swipingPosition, setSwipingPosition] = React.useState({ X: 0, Y: 0 });
   return (
      <SwipingPositionContext.Provider value={swipingPosition}>
         <View
            style={{
               flex: 1,
               // alignItems: "center",
               // justifyContent: "center",
               position: "relative",
               paddingHorizontal: 16,
            }}
         >
            <Swiper
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
               onSwiping={(X, Y) =>
                  setSwipingPosition({
                     X,
                     Y,
                  })
               }
            />
            <CallToActionButtons />
         </View>
      </SwipingPositionContext.Provider>
   );
}

const CallToActionButtons = () => {
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
         <TouchableWithoutFeedback onPress={() => console.log("pressed")}>
            <View
               style={[styles.callToActionContainer, { width: 63, height: 63 }]}
            >
               <FontAwesome name="close" size={24} color="#FF9B9B" />
            </View>
         </TouchableWithoutFeedback>
         <TouchableWithoutFeedback>
            <View style={styles.callToActionContainer}>
               <AntDesign name="star" size={35} color="#83E2FF" />
            </View>
         </TouchableWithoutFeedback>
         <TouchableWithoutFeedback>
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

   const swipingPosition = React.useContext(SwipingPositionContext);
   // React.useEffect(() => console.log(swipingPosition), [swipingPosition]);

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
            ]}
         />
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
         />
      </View>
   );
};

const ImagesContainer = ({ images }: { images: String[] }) => {
   const [imageIndex, setImageIndex] = React.useState<number>(0);

   React.useEffect(() => {
      console.log(imageIndex);
   }, [imageIndex]);

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
         style={{ position: "relative", overflow: "hidden", ...viewsSize }}
      >
         <Image
            source={{
               uri: images[imageIndex],
            }}
            style={viewsSize}
         />
         <View
            transparent
            style={{
               position: "absolute",
               top: 0,
               left: 0,
               width: Layout.window.width - 32,
               aspectRatio: 15 / 42,
               flexDirection: "row",
               zIndex: 99,
            }}
         >
            <TouchableWithoutFeedback
               touchSoundDisabled
               onPress={() => {
                  setImageIndex(
                     imageIndex !== 0 ? imageIndex - 1 : images.length - 1
                  );
                  console.log("hey");
               }}
            >
               <DummyView />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
               touchSoundDisabled
               onPress={() => setImageIndex((imageIndex + 1) % images.length)}
            >
               <DummyView />
            </TouchableWithoutFeedback>
         </View>
      </View>
   );
};

const DummyView = ({ style }: { style?: ViewStyle }) => {
   return (
      <View
         transparent
         style={[
            {
               width: (Layout.window.width - 32) / 2,
               height: "100%",
            },
            style,
         ]}
         pointerEvents="none"
      />
   );
};
