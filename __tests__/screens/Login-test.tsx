import Login from "@/app/screens/onboarding/Login";
import { ThemeProvider } from "@/app/theme/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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

const queryClient = new QueryClient();

describe("<Login />", () => {
  test("Text renders correctly on Login", () => {
    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <Login />
        </ThemeProvider>
      </QueryClientProvider>
    );

    getByText("Welcome Back!");
    getByText("Sign in");
  });
});
