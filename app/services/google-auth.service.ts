import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { useEffect } from "react";
import { signInWithCredential, GoogleAuthProvider } from "firebase/auth";
import { auth } from "./firebase.service";

WebBrowser.maybeCompleteAuthSession();

export function useGoogleAuth() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId:
      "223778959506-3gfivakhm26irc248g27jrivs948l0ki.apps.googleusercontent.com",
    iosClientId:
      "223778959506-3gfivakhm26irc248g27jrivs948l0ki.apps.googleusercontent.com",
    androidClientId: "TON_ANDROID_CLIENT_ID",
    //webClientId:"223778959506-0djoee70qjin43qjrdn7p4bk8h3vkrn2.apps.googleusercontent.com",
  });
  useEffect(() => {
    if (response?.type === "success") {
      const { idToken } = response.authentication!;
      const credential = GoogleAuthProvider.credential(idToken);
      signInWithCredential(auth, credential);
    }
  }, [response]);

  return { request, promptAsync };
}
