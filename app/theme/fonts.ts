export type ObjectValues<T extends object> = T[keyof T];

export const Fonts = {
  OutfitBold700: "Outfit-Bold",
  OutfitRegular400: "Outfit-Regular",
} as const;

export const FontWeights = {
  bold: "Outfit-Bold",
  normal: "Outfit-Regular",
} as const;

export type TFontValues = ObjectValues<typeof Fonts>;

export type Weights = keyof typeof FontWeights;

export const getFontFamily = (key: Weights) => FontWeights[key];
