import ChatIconSvg from "@/components/chat/ChatIcons";
import { chatScript, type ChatMessage } from "@/components/chat/chatScript";

export function Bubble({ message }: { message: ChatMessage }) {
  if (message.from === "system") {
    return (
      <p className="flex items-center gap-2 self-center rounded-full bg-lemon px-3.5 py-2 text-[12px] font-semibold">
        <ChatIconSvg icon={message.icon} />
        {message.text}
      </p>
    );
  }
  const customer = message.from === "customer";
  return (
    <div className={`flex max-w-[80%] flex-col gap-1 ${customer ? "self-start" : "self-end"}`}>
      {customer && message.time && (
        <p className="self-center text-[11px] text-ink-soft">{message.time}</p>
      )}
      <p
        className={`px-3.5 py-2.5 text-[14px] leading-[1.45] ${
          customer
            ? "rounded-[16px_16px_16px_4px] bg-cream-soft/45"
            : "rounded-[16px_16px_4px_16px] bg-orange/25"
        }`}
      >
        <span className="sr-only">{customer ? "Customer: " : "AI assistant: "}</span>
        {message.text}
        {message.from === "ai" && message.icon && <ChatIconSvg icon={message.icon} />}
      </p>
    </div>
  );
}

/** Static chat (all messages). Phase 4 adds the timed playback. */
export default function ChatDemo() {
  return (
    <div className="flex flex-1 flex-col gap-3 overflow-y-auto px-3.5 py-4" aria-label="Example WhatsApp chat with the AI assistant">
      {chatScript.map((m, i) => (
        <Bubble key={i} message={m} />
      ))}
    </div>
  );
}
