import { assign, createMachine } from "xstate";

export type NavbarSectionId = "none" | "cuestionario" | "sobre-mi" | "planes";

interface NavbarContext {
  activeId: NavbarSectionId;
  targetId: NavbarSectionId;
}

type NavbarEvent = { type: "SET_ACTIVE"; id: NavbarSectionId };

const TRANSITION_DURATION_MS = 280;

export const navbarMachine = createMachine(
  {
    types: {} as {
      context: NavbarContext;
      events: NavbarEvent;
    },
    id: "navbar",
    initial: "idle",
    context: {
      activeId: "none",
      targetId: "none",
    },
    states: {
      idle: {
        on: {
          SET_ACTIVE: [
            {
              guard: ({ context, event }) => event.id === context.activeId,
              target: "active",
            },
            {
              actions: assign(({ event }) => ({ targetId: event.id })),
              target: "transitioning",
            },
          ],
        },
      },
      transitioning: {
        on: {
          SET_ACTIVE: {
            actions: assign(({ event }) => ({ targetId: event.id })),
          },
        },
        after: {
          [TRANSITION_DURATION_MS]: {
            actions: assign(({ context }) => ({ activeId: context.targetId })),
            target: "active",
          },
        },
      },
      active: {
        on: {
          SET_ACTIVE: [
            {
              guard: ({ context, event }) => event.id === context.activeId,
              target: "active",
            },
            {
              actions: assign(({ event }) => ({ targetId: event.id })),
              target: "transitioning",
            },
          ],
        },
      },
    },
  }
);

