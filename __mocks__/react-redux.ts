// __mocks__/react-redux.ts
export const useSelector = (fn: any) => fn({ profile: { mode: "light" } });
export const useDispatch = () => jest.fn();
