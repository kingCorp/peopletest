// import { useTranslation } from "react-i18next";

import { Box } from "@/app/components/base/box";
import { CustomButton } from "@/app/components/base/pressable-box";
import { Screen } from "@/app/components/base/screen";
import { Text } from "@/app/components/base/text";
import { TextInput } from "@/app/components/base/text-input";
import { useSignIn } from "@/app/services/hooks";
import { isValidEmail, isValidPassword } from "@/app/utils/helper-functions";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Alert, Dimensions } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Login() {
  const { navigate } = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailerr, setEmailerr] = useState("");
  const [passworderr, setPassworderr] = useState("");
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusedPass, setIsFocusedPass] = useState(false);
  const signinHook = useSignIn();

  const handleSignin = () => {
    if (!isValidEmail(email)) {
      setEmailerr("Please enter a valid email");
      return;
    }
    if (!isValidPassword(password)) {
      setPassworderr(
        "Password should not be less than 4 characters must have a number"
      );
      return;
    }
    setEmailerr("");
    setPassworderr("");
    signinHook.mutate(
      { email, password },
      {
        onSuccess: (data) => {
          console.log(data);
        },
        onError: (error) => {
          console.log(error);
            Alert.alert('', error.message);
        },
      }
    );
  };

  console.log(email, password);

  return (
    <Screen paddingHorizontal="m" isLoading={signinHook.isPending}>
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        extraScrollHeight={20} // gives extra space above keyboard
      >
        <Box
          height={Dimensions.get("window").height - 60}
          flex={1}
          alignItems="center"
          justifyContent="center"
          rowGap="xl"
        >
          <Box>
            <Text
              testID="title"
              fontSize={30}
              marginVertical="l"
              fontWeight="800"
              textAlign="center"
            >
              Welcome!
            </Text>
            <Text fontSize={15} fontWeight="600" textAlign="center">
              Sign in to view names of people
            </Text>
          </Box>
          <Box rowGap="l" width="100%">
            <Box>
              <TextInput
                placeholder="Enter email"
                placeholderTextColor="#8c8a8aff"
                width="100%"
                height={50}
                keyboardType="email-address"
                onFocus={() => setIsFocusedEmail(true)}
                onBlur={() => setIsFocusedEmail(false)}
                style={{
                  backgroundColor: "#e2e2e2",
                  borderRadius: 5,
                  paddingHorizontal: 10,
                  color: "#000",
                  borderWidth: isFocusedEmail ? 2 : 0,
                  borderColor: isFocusedEmail ? "blue" : "transparent",
                }}
                onChangeText={setEmail}
              />
              {emailerr && (
                <Text fontSize={12} style={{ color: "red" }}>
                  {emailerr}
                </Text>
              )}
            </Box>
            <Box>
              <TextInput
                placeholder="Enter password"
                placeholderTextColor="#8c8a8aff"
                width="100%"
                height={50}
                keyboardType="default"
                secureTextEntry
                onFocus={() => setIsFocusedPass(true)}
                onBlur={() => setIsFocusedPass(false)}
                style={{
                  backgroundColor: "#e2e2e2",
                  borderRadius: 5,
                  paddingHorizontal: 10,
                  color: "#000",
                  borderWidth: isFocusedPass ? 2 : 0,
                  borderColor: isFocusedPass ? "blue" : "transparent",
                }}
                onChangeText={setPassword}
              />
              {passworderr && (
                <Text fontSize={12} style={{ color: "red" }}>
                  {passworderr}
                </Text>
              )}
            </Box>
            <CustomButton
              disabled={
                email.length < 3 || password.length < 4 || signinHook.isPending
              }
              title="Sign in"
              onPress={handleSignin}
            />
          </Box>
        </Box>
      </KeyboardAwareScrollView>
    </Screen>
  );
}
