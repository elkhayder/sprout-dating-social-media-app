// import { Ionicons } from '@expo/vector-icons';
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as React from "react";

export default function useCachedResources() {
   const [isLoadingComplete, setLoadingComplete] = React.useState<boolean>(
      false
   );

   // Load any resources or data that we need prior to rendering the app
   React.useEffect(() => {
      async function loadResourcesAndDataAsync() {
         try {
            SplashScreen.preventAutoHideAsync();

            // Load fonts
            await Font.loadAsync({
               // ...Ionicons.font,
               "space-mono": require("../assets/fonts/SpaceMono-Regular.ttf"),
               // Sofia Pro
               Sofia_Regular: require("../assets/fonts/Sofia/SofiaPro-Regular.otf"),
               Sofia_Medium: require("../assets/fonts/Sofia/SofiaPro-Medium.otf"),
               Sofia_Bold: require("../assets/fonts/Sofia/SofiaPro-Bold.otf"),
               Sofia_Black: require("../assets/fonts/Sofia/SofiaPro-Black.otf"),
            });
         } catch (e) {
            // We might want to provide this error information to an error reporting service
            console.warn(e);
         } finally {
            setLoadingComplete(true);
            SplashScreen.hideAsync();
         }
      }

      loadResourcesAndDataAsync();
   }, []);

   return isLoadingComplete;
}
