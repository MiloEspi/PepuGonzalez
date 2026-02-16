import { assign, createMachine } from "xstate";

interface SectionContext {
  navActive: boolean;
}

type SectionEvent =
  | { type: "ENTER_VIEW" }
  | { type: "NAV_ACTIVE"; value: boolean };

export const sectionMachine = createMachine(
  {
    types: {} as {
      context: SectionContext;
      events: SectionEvent;
    },
    id: "section",
    initial: "hidden",
    context: {
      navActive: false,
    },
    on: {
      NAV_ACTIVE: {
        actions: assign(({ event }) => ({ navActive: event.value })),
      },
    },
    states: {
      hidden: {
        on: {
          ENTER_VIEW: "entering",
        },
      },
      entering: {
        after: {
          360: "visible",
        },
      },
      visible: {},
    },
  }
);

