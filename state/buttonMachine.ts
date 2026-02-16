import { createMachine } from "xstate";

type ButtonEvent =
  | { type: "HOVER" }
  | { type: "LEAVE" }
  | { type: "PRESS" }
  | { type: "RELEASE" }
  | { type: "START_LOADING" }
  | { type: "RESOLVE" }
  | { type: "FAIL" }
  | { type: "RESET" };

export const buttonMachine = createMachine(
  {
    types: {} as {
      events: ButtonEvent;
    },
    id: "animatedButton",
    initial: "idle",
    states: {
      idle: {
        on: {
          HOVER: "hover",
          PRESS: "pressed",
          START_LOADING: "loading",
        },
      },
      hover: {
        on: {
          LEAVE: "idle",
          PRESS: "pressed",
          START_LOADING: "loading",
        },
      },
      pressed: {
        on: {
          RELEASE: "hover",
          LEAVE: "idle",
          START_LOADING: "loading",
        },
      },
      loading: {
        on: {
          RESOLVE: "success",
          FAIL: "idle",
        },
      },
      success: {
        after: {
          560: "idle",
        },
        on: {
          RESET: "idle",
        },
      },
    },
  }
);

