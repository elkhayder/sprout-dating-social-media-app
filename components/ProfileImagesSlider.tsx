import * as React from "react";
import { Image, TouchableWithoutFeedback } from "react-native";

import { View } from "../components/Themed";
import Layout from "../constants/Layout";
import Colors from "../constants/Colors";
import { ImagesType } from "../types";

const ProfileImagesSlider = ({
   images,
   breadcrumbsPosition,
   aspectRatio,
}: {
   images: ImagesType;
   breadcrumbsPosition?: "top" | "bottom";
   aspectRatio: number;
}) => {
   const [imageIndex, setImageIndex] = React.useState<number>(0);

   return (
      <View transparent style={{ width: "100%", position: "relative" }}>
         <View
            style={[
               {
                  position: "absolute",
                  alignSelf: "center",
                  height: 30,
                  backgroundColor: "rgba(0,0,0,0.2)",
                  zIndex: 20,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingHorizontal: 16,
                  ...(breadcrumbsPosition === "bottom"
                     ? {
                          bottom: 0,
                          borderTopLeftRadius: 15,
                          borderTopRightRadius: 15,
                       }
                     : {
                          top: 0,
                          borderBottomLeftRadius: 15,
                          borderBottomRightRadius: 15,
                       }),
               },
            ]}
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
            style={{ width: "100%", aspectRatio }}
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
export default ProfileImagesSlider;
