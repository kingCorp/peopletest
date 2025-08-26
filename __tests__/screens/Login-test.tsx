import Login from "@/app/screens/onboarding/Login";
import { render } from "@testing-library/react-native";

jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
  };
});

describe("<Login />", () => {
  test("Text renders correctly on Login", () => {
    const { getByText } = render(<Login />);

    getByText("Welcome");
  });
});
