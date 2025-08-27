import { Box } from "@/app/components/base/box";
import { CustomButton } from "@/app/components/base/pressable-box";
import { Screen } from "@/app/components/base/screen";
import { Text } from "@/app/components/base/text";
import { TextInput } from "@/app/components/base/text-input";
import { NAV_ROUTES } from "@/app/navigation/nav-routes";
import navigationService from "@/app/navigation/utils/navigationService";
import { setHeaderToken } from "@/app/services/apiClient";
import { useRegister } from "@/app/services/hooks";
import { PERSIST_CONSTANTS } from "@/app/utils/constants";
import { isValidEmail, secureItem } from "@/app/utils/helper-functions";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Alert, Dimensions, Pressable } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Register() {
  const { navigate } = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailerr, setEmailerr] = useState("");
  const [passworderr, setPassworderr] = useState("");
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusedPass, setIsFocusedPass] = useState(false);
  const [isSecure, setIsSecure] = useState(true);
  const registerHook = useRegister();

  const handleSignin = () => {
    setEmailerr("");
    setPassworderr("");

    if (!isValidEmail(email)) {
      setEmailerr("Please enter a valid email");
      return;
    }
    if (password.length < 3) {
      setPassworderr("Password should not be less than 2 characters");
      return;
    }

    registerHook.mutate(
      { email, password },
      {
        onSuccess: (data) => {
          setHeaderToken(data?.token);
          secureItem(PERSIST_CONSTANTS.ACCESS_TOKEN, data?.token);
          navigationService.reset([{ name: NAV_ROUTES.DASHBOARD }]);
        },
        onError: (error) => {
          Alert.alert(
            "",
            error?.response?.data?.error || "Network error, Please try again"
          );
        },
      }
    );
  };

  return (
    <Screen paddingHorizontal="m" isLoading={registerHook.isPending}>
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
              Create Your Account!
            </Text>
            <Text fontSize={15} fontWeight="400" textAlign="center">
              Join the community and start browsing users right away.
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
              <Box
                flexDirection="row"
                alignItems="center"
                style={{
                  backgroundColor: "#e2e2e2",
                  borderRadius: 5,
                  paddingHorizontal: 10,
                  borderWidth: isFocusedPass ? 2 : 0,
                  borderColor: isFocusedPass ? "blue" : "transparent",
                }}
              >
                <TextInput
                  placeholder="Enter password"
                  placeholderTextColor="#8c8a8aff"
                  width="95%"
                  height={50}
                  keyboardType="default"
                  secureTextEntry={isSecure}
                  onFocus={() => setIsFocusedPass(true)}
                  onBlur={() => setIsFocusedPass(false)}
                  style={{
                    color: "#000",
                  }}
                  onChangeText={setPassword}
                />
                <Pressable onPress={() => setIsSecure((prev) => !prev)}>
                  <Ionicons
                    name={isSecure ? "eye-off" : "eye"}
                    size={18}
                    color="#333232ff"
                  />
                </Pressable>
              </Box>
              {passworderr && (
                <Text fontSize={12} style={{ color: "red" }}>
                  {passworderr}
                </Text>
              )}
            </Box>
            <CustomButton
              disabled={
                email.length < 3 ||
                password.length < 4 ||
                registerHook.isPending
              }
              title="Register"
              onPress={handleSignin}
            />
          </Box>

          <Pressable
            style={{ marginTop: 30 }}
            onPress={() => navigate(NAV_ROUTES.LOGIN)}
          >
            <Text>
              Already have an account? <Text fontWeight="800">Sign in</Text>
            </Text>
          </Pressable>
        </Box>
      </KeyboardAwareScrollView>
    </Screen>
  );
}
