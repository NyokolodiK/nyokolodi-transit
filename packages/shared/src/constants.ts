export const APP_TIMEZONE = "Africa/Johannesburg";

export const CURRENCY = "ZAR";

export const SUPPORTED_CURRENCIES = [CURRENCY] as const;

export type SupportedCurrency = (typeof SUPPORTED_CURRENCIES)[number];

export interface BrandTokens {
  readonly name: string;
  readonly tagline: string;
  readonly colors: {
    readonly primary: string;
    readonly secondary: string;
    readonly background: string;
    readonly backgroundAlt: string;
    readonly text: string;
  };
}

export const BRAND: BrandTokens = {
  name: "Nyokolodi Transit",
  tagline: "Smarter Journeys. Better Experiences.",
  colors: {
    primary: "#063B29",
    secondary: "#53B51C",
    background: "#FFFFFF",
    backgroundAlt: "#F8FAF8",
    text: "#17241C",
  },
};
