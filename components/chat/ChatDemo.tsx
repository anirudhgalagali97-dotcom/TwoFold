"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ChatIconSvg from "@/components/chat/ChatIcons";
import PhoneMockup from "@/components/chat/PhoneMockup";
import { BOOKED_EVENT, chatScript, chatTiming, type ChatMessage } from "@/components/chat/chatScript";
import { prefersReducedMotion } from "@/lib/useReducedMotion";

export function Bubble({ message, animate }: { message: ChatMessage; animate?: boolean }) {
  const enter = animate ? "bubble-in" : "";
  if (message.from === "system") {
    return (
      <p className={`flex items-center gap-2 self-center rounded-full bg-lemon px-3.5 py-2 text-[12px] font-semibold ${enter}`}>
        <ChatIconSvg icon={message.icon} />
        {message.text}
      </p>
    );
  }
  const customer = message.from === "customer";
  return (
    <div className={`flex max-w-[80%] flex-col gap-1 ${customer ? "self-start" : "self-end"} ${enter}`}>
      {customer && message.time && <p className="self-center text-[11px] text-ink-soft">{message.time}</p>}
      <p
        className={`px-3.5 py-2.5 text-[14px] leading-[1.45] ${
          customer ? "rounded-[16px_16px_16px_4px] bg-cream-soft/45" : "rounded-[16px_16px_4px_16px] bg-orange/25"
        }`}
      >
        <span className="sr-only">{customer ? "Customer: " : "AI assistant: "}</span>
        {message.text}
        {message.from === "ai" && message.icon && <ChatIconSvg icon={message.icon} />}
      </p>
    </div>
  );
}

function Typing() {
  return (
    <div className="bubble-in flex gap-1 self-end rounded-[16px_16px_4px_16px] bg-orange/25 px-4 py-3.5" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="size-1.5 rounded-full bg-ink"
          style={{ animation: `typing-dot 1s ${i * 0.15}s infinite ease-in-out` }}
        />
      ))}
    </div>
  );
}

const wait = (ms: number, signal: AbortSignal) =>
  new Promise<void>((resolve, reject) => {
    const t = setTimeout(resolve, ms);
    signal.addEventListener("abort", () => {
      clearTimeout(t);
      reject(signal.reason);
    });
  });

/**
 * WhatsApp-style demo. Plays once when the phone is 40% in view, with a
 * typing indicator before each AI message; Replay restarts it. Without JS or
 * under reduced motion, all messages show at once.
 */
export default function ChatDemo() {
  const phoneRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(chatScript.length);
  const [typing, setTyping] = useState(false);
  const [animated, setAnimated] = useState(false);
  const [live, setLive] = useState(false);
  const played = useRef(false);
  const controller = useRef<AbortController | null>(null);
  const scroller = useRef<HTMLDivElement>(null);

  const play = useCallback(async () => {
    controller.current?.abort();
    const ctrl = new AbortController();
    controller.current = ctrl;

    if (prefersReducedMotion()) {
      setTyping(false);
      setCount(chatScript.length);
      window.dispatchEvent(new Event(BOOKED_EVENT));
      return;
    }
    setAnimated(true);
    setCount(0);
    try {
      for (let i = 0; i < chatScript.length; i++) {
        if (i > 0) await wait(chatTiming.gap, ctrl.signal);
        if (chatScript[i].from === "ai") {
          setTyping(true);
          await wait(chatTiming.typing, ctrl.signal);
          setTyping(false);
        }
        setCount(i + 1);
        if (chatScript[i].from === "system") window.dispatchEvent(new Event(BOOKED_EVENT));
      }
    } catch {
      // aborted by Replay or unmount
    }
  }, []);

  // Hide the messages (client only) until the phone scrolls into view.
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const el = phoneRef.current;
    if (!el) return;
     
    setCount(0);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !played.current) {
          played.current = true;
          io.disconnect();
          play();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      controller.current?.abort();
    };
  }, [play]);

  useEffect(() => {
    const el = scroller.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  }, [count, typing]);

  const replay = () => {
    played.current = true;
    setLive(true);
    play();
  };

  return (
    <>
      <div ref={phoneRef} className="flex w-full justify-center">
        <PhoneMockup>
          <div
            ref={scroller}
            className="flex flex-1 flex-col gap-3 overflow-y-auto px-3.5 py-4"
            role="log"
            aria-label="Example WhatsApp chat with the AI assistant"
            aria-live={live ? "polite" : "off"}
          >
            {chatScript.slice(0, count).map((m, i) => (
              <Bubble key={i} message={m} animate={animated} />
            ))}
            {typing && <Typing />}
          </div>
        </PhoneMockup>
      </div>
      <button
        type="button"
        onClick={replay}
        className="t-label inline-flex min-h-11 items-center gap-3 rounded-full border-2 border-current px-6 py-3"
      >
        <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
          <path d="M4 10a6 6 0 1 0 2-4.5M4 3v3.5h3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Replay
        <span className="sr-only"> the chat demo</span>
      </button>
    </>
  );
}
