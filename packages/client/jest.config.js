import dotenv from "dotenv";
dotenv.config();

export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  testMatch: ["<rootDir>/src/**/*.test.{ts,tsx}"],
  globals: {
    // __SERVER_PORT__: process.env.SERVER_PORT,
    __SERVER_PORT__: 3001,
  },
  setupFiles: ["./setupTests.ts"],
  moduleNameMapper: {
    "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|ogg|wav|mp3|m4a|aac|oga)$":
      "identity-obj-proxy",
    "\\.(css|less)$": "identity-obj-proxy",
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};
