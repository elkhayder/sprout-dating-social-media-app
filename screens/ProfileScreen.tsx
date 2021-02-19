import { RouteProp, useNavigation, useRoute } from "@react-navigation/core";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { ScrollView, StatusBar } from "react-native";
import { Feather, MaterialIcons } from "@expo/vector-icons";

import { Text, View } from "../components/Themed";
import getAgeFromTimestamp from "../functions/getAgeFromTimestamp";
import { UserProfile } from "../types";
import ProfileImagesSlider from "../components/ProfileImagesSlider";

const ProfileScreen = () => {
   const route = useRoute();
   const { profile }: { profile: UserProfile } = route.params;
   return (
      <View style={{ flex: 1, position: "relative" }}>
         <LinearGradient
            colors={["rgba(0,0,0,0.7)", "transparent"]}
            style={{
               position: "absolute",
               top: 0,
               width: "100%",
               height: 40 + StatusBar?.currentHeight,
               zIndex: 10,
            }}
         />

         <ScrollView stickyHeaderIndices={[0]}>
            <ProfileImagesSlider
               images={profile.images}
               aspectRatio={1.3}
               breadcrumbsPosition="bottom"
            />
            <View style={{ paddingHorizontal: 24, paddingVertical: 24 }}>
               <View
                  style={{
                     flexDirection: "row",
                     justifyContent: "space-between",
                     alignItems: "center",
                     marginBottom: 24,
                  }}
               >
                  <View>
                     <Text
                        style={{
                           fontSize: 26,
                           fontFamily: "Sofia_Bold",
                        }}
                     >
                        {profile.name}, {getAgeFromTimestamp(profile.birthday)}
                     </Text>
                     <View
                        style={{
                           flexDirection: "row",
                           alignItems: "center",
                           marginTop: 4,
                        }}
                     >
                        <MaterialIcons
                           name="work-outline"
                           size={18}
                           color="#797979"
                        />
                        <Text
                           style={{
                              color: "#797979",
                              fontSize: 15,
                              marginLeft: 5,
                           }}
                        >
                           Pitbull
                        </Text>
                     </View>
                  </View>
                  <View
                     style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 15,
                     }}
                  >
                     <Feather name="map-pin" size={16} color="#797979" />
                     <Text
                        style={{
                           color: "#797979",
                           fontSize: 14,
                           marginLeft: 4,
                        }}
                     >
                        7miles
                     </Text>
                  </View>
               </View>
               <View style={{ marginBottom: 16 }}>
                  <Text
                     style={{
                        fontFamily: "Sofia_Medium",
                        fontSize: 16,
                        marginBottom: 4,
                     }}
                  >
                     About
                  </Text>
                  <Text style={{ color: "#797979" }}>
                     {profile.description}
                  </Text>
               </View>
               <View>
                  <Text
                     style={{
                        fontFamily: "Sofia_Medium",
                        fontSize: 16,
                        marginBottom: 4,
                     }}
                  >
                     Interests
                  </Text>
                  <Text style={{ color: "#797979" }}>
                     {profile.description}
                  </Text>
               </View>
            </View>
         </ScrollView>
      </View>
   );
};

export default ProfileScreen;
