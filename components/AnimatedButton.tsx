"use client";

import { animate } from "animejs";
import { Loader2 } from "lucide-react";
import {
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type MouseEvent,
  type ReactNode,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { useMachine } from "@xstate/react";

import { buttonMachine } from "@/state/buttonMachine";
import { EASE_OUT_EXPO, prefersReducedMotion, resetWillChange, setWillChange } from "@/utils/animations";
import { cn } from "@/lib/utils";

type BaseProps = {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  loadingOnClick?: boolean;
};

type AnchorProps = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "onClick" | "children"> & {
    href: string;
    onClick?: (event: MouseEvent<HTMLAnchorElement>) => void | Promise<void>;
  };

type NativeButtonProps = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "onClick" | "children"> & {
    href?: undefined;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void | Promise<void>;
  };

export type AnimatedButtonProps = AnchorProps | NativeButtonProps;

export function AnimatedButton(props: AnimatedButtonProps) {
  const [state, send] = useMachine(buttonMachine);
  const rootRef = useRef<HTMLElement | null>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const spinnerRef = useRef<HTMLSpanElement>(null);
  const glowRef = useRef<HTMLSpanElement>(null);
  const reducedMotion = useMemo(() => prefersReducedMotion(), []);

  const isLoading = state.matches("loading");
  const isDisabled = Boolean(props.disabled || isLoading);
  const sharedClassName = cn(
    "relative inline-flex items-center justify-center overflow-hidden rounded-[10px] border px-5 py-2.5 text-sm font-semibold transition-colors duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
    isDisabled ? "pointer-events-none opacity-75" : "",
    props.className
  );

  useEffect(() => {
    const root = rootRef.current;
    const label = labelRef.current;
    const spinner = spinnerRef.current;
    const glow = glowRef.current;
    if (!root || !label || !spinner || !glow) return;

    if (reducedMotion) {
      root.style.transform = "translateZ(0)";
      spinner.style.opacity = isLoading ? "1" : "0";
      label.style.opacity = isLoading ? "0" : "1";
      return;
    }

    if (state.matches("hover")) {
      setWillChange([root, glow], "transform, opacity");
      glow.style.filter = "url(#redWobble)";
      animate(root, {
        scale: [1, 1.02],
        duration: 220,
        ease: EASE_OUT_EXPO,
      });
      animate(glow, {
        opacity: [0.16, 0.45],
        duration: 220,
        ease: EASE_OUT_EXPO,
      });
      return;
    }

    if (state.matches("pressed")) {
      setWillChange(root, "transform");
      animate(root, {
        scale: [1.02, 0.97, 1],
        duration: 240,
        ease: EASE_OUT_EXPO,
      });
      return;
    }

    if (state.matches("loading")) {
      setWillChange([label, spinner], "opacity, transform");
      animate(label, {
        opacity: [1, 0],
        duration: 150,
        ease: EASE_OUT_EXPO,
      });
      animate(spinner, {
        opacity: [0, 1],
        duration: 170,
        delay: 40,
        ease: EASE_OUT_EXPO,
      });
      return;
    }

    if (state.matches("success")) {
      setWillChange([root, glow, spinner, label], "opacity, transform");
      glow.style.filter = "url(#redWobble)";
      animate(glow, {
        opacity: [0.36, 0.78, 0.16],
        duration: 340,
        ease: EASE_OUT_EXPO,
      });
      animate(root, {
        scale: [1, 1.03, 1],
        duration: 320,
        ease: EASE_OUT_EXPO,
      });
      animate(spinner, {
        opacity: [1, 0],
        duration: 190,
        ease: EASE_OUT_EXPO,
      });
      animate(label, {
        opacity: [0, 1],
        duration: 210,
        delay: 90,
        ease: EASE_OUT_EXPO,
        complete: () => {
          glow.style.filter = "";
          resetWillChange([root, glow, spinner, label]);
        },
      });
      return;
    }

    glow.style.filter = "";
    setWillChange([root, glow], "transform, opacity");
    animate(root, {
      scale: 1,
      duration: 200,
      ease: EASE_OUT_EXPO,
      complete: () => resetWillChange(root),
    });
    animate(glow, {
      opacity: 0.16,
      duration: 190,
      ease: EASE_OUT_EXPO,
      complete: () => resetWillChange(glow),
    });
    animate(label, {
      opacity: 1,
      duration: 160,
      ease: EASE_OUT_EXPO,
      complete: () => resetWillChange(label),
    });
    animate(spinner, {
      opacity: 0,
      duration: 160,
      ease: EASE_OUT_EXPO,
      complete: () => resetWillChange(spinner),
    });
  }, [isLoading, reducedMotion, state]);

  async function runHandler(
    event: MouseEvent<HTMLButtonElement> | MouseEvent<HTMLAnchorElement>,
    handler?: ((event: MouseEvent<HTMLButtonElement>) => void | Promise<void>) | ((event: MouseEvent<HTMLAnchorElement>) => void | Promise<void>)
  ) {
    if (isDisabled) {
      event.preventDefault();
      return;
    }

    if (!props.loadingOnClick) {
      await handler?.(event as never);
      return;
    }

    event.preventDefault();
    send({ type: "START_LOADING" });

    try {
      await handler?.(event as never);
      send({ type: "RESOLVE" });
    } catch {
      send({ type: "FAIL" });
    }
  }

  const sharedEvents = {
    onMouseEnter: () => send({ type: "HOVER" }),
    onMouseLeave: () => send({ type: "LEAVE" }),
    onPointerDown: () => send({ type: "PRESS" }),
    onPointerUp: () => send({ type: "RELEASE" }),
  };

  const content = (
    <>
      <span
        ref={glowRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,26,26,0.28),transparent_72%)] opacity-16"
      />
      <span ref={labelRef} className="relative z-10 inline-flex items-center gap-2">
        {props.children}
      </span>
      <span ref={spinnerRef} className="pointer-events-none absolute inset-0 z-10 grid place-items-center opacity-0">
        <Loader2 className="size-4 animate-spin" />
      </span>
    </>
  );

  if ("href" in props && props.href) {
    const { href, onClick, target, rel, ...rest } = props;
    return (
      <a
        {...rest}
        {...sharedEvents}
        href={href}
        target={target}
        rel={rel}
        ref={(node) => {
          rootRef.current = node;
        }}
        aria-disabled={isDisabled}
        onClick={(event) => runHandler(event, onClick)}
        className={sharedClassName}
      >
        {content}
      </a>
    );
  }

  const { onClick, type = "button", ...rest } = props as NativeButtonProps;
  return (
    <button
      {...rest}
      {...sharedEvents}
      ref={(node) => {
        rootRef.current = node;
      }}
      type={type}
      disabled={isDisabled}
      onClick={(event) => runHandler(event, onClick)}
      className={sharedClassName}
    >
      {content}
    </button>
  );
}
