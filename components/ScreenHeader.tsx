import React from "react";
import { StatusBar, TouchableNativeFeedback } from "react-native";

import { Text, View } from "./Themed";

type IconType = ({ color }: { color: string }) => React.ReactElement;

type ScreenHeaderProps = {
   title: string;
   subTitle: string;
   RightIcon?: IconType;
   RightOnClick?: () => void;
   LeftIcon?: IconType;
   LeftOnClick?: () => void;
};

const ScreenHeader = ({
   RightIcon,
   LeftIcon,
   RightOnClick,
   LeftOnClick,
   title,
   subTitle,
}: ScreenHeaderProps) => {
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
         {LeftIcon && LeftOnClick && (
            <HeaderButton Icon={LeftIcon} onPress={LeftOnClick} />
         )}
         <View
            transparent
            style={{
               // marginLeft: 10,
               ...(LeftIcon &&
                  RightIcon &&
                  LeftOnClick &&
                  RightOnClick && {
                     alignItems: "center",
                  }),
            }}
         >
            <Text
               style={{
                  fontFamily: "Sofia_Bold",
                  fontSize: 30,
               }}
            >
               {title}
            </Text>
            <Text style={{ color: "#797979", fontSize: 15 }}>{subTitle}</Text>
         </View>
         {RightIcon && RightOnClick && (
            <HeaderButton Icon={RightIcon} onPress={RightOnClick} />
         )}
      </View>
   );
};

export default ScreenHeader;

export const HeaderButton = ({
   Icon,
   onPress,
}: {
   Icon: ({ color }: { color: string }) => React.ReactElement;
   onPress: () => void;
}) => {
   return (
      <TouchableNativeFeedback touchSoundDisabled onPress={onPress}>
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
            <Icon color="#878787" />
         </View>
      </TouchableNativeFeedback>
   );
};
