import auth from "@react-native-firebase/auth";

export async function signIn() {
  try {
    const userCredential = await auth().signInWithEmailAndPassword(
      "yuriy.dobryi@gmail.com",
      "PljhjdPljhjd"
    );
    // console.log("User signed in: ", userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error("Error signing in: ", error);
  }
}

export const getUserId = () => auth().currentUser?.uid;
