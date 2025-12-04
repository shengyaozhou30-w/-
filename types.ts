export interface HolidayMagicResponse {
  greeting: string;
  ornamentColor: string;
  lightColor: string;
}

export interface TreeState {
  isLoading: boolean;
  userWish: string;
  magic: HolidayMagicResponse;
}

export const DEFAULT_MAGIC: HolidayMagicResponse = {
  greeting: "The Season's Brilliance Awaits You.",
  ornamentColor: "#FFD700", // Gold
  lightColor: "#FFaa00",
};
