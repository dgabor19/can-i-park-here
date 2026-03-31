'use client';

import { useState, useRef, useEffect } from 'react';
import { ChatMessage, Player } from '@/types';

interface ChatBoxProps {
  players: Player[];
}

const INITIAL_MESSAGE: ChatMessage = {
  role: 'assistant',
  content: "Hi! I'm your football buddy! 🌟 Ask me anything about football players!",
};

export default function ChatBox({ players }: ChatBoxProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const userMessage: ChatMessage = { role: 'user', content: trimmed };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages, players }),
      });

      const reader = response.body!.getReader();
      const decoder = new TextDecoder();

      setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: 'assistant',
            content: updated[updated.length - 1].content + chunk,
          };
          return updated;
        });
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Oops! Something went wrong. Try again! 😅' },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl overflow-hidden shadow-lg bg-white flex flex-col" style={{ minHeight: '480px' }}>
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-5 py-4">
        <h2 className="text-white text-lg font-extrabold">💬 Ask me anything about football!</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3" style={{ maxHeight: '400px' }}>
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.role === 'assistant' && (
              <div className="w-8 h-8 rounded-full bg-green-400 flex items-center justify-center text-lg shrink-0 mt-1">
                ⚽
              </div>
            )}
            <div
              className={`rounded-2xl px-4 py-2 max-w-[75%] text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-green-400 text-white font-medium rounded-br-sm'
                  : 'bg-gray-100 text-gray-800 rounded-bl-sm'
              }`}
            >
              {msg.content || (
                <span className="flex gap-1 items-center text-gray-500">
                  <span className="animate-bounce">●</span>
                  <span className="animate-bounce [animation-delay:0.1s]">●</span>
                  <span className="animate-bounce [animation-delay:0.2s]">●</span>
                </span>
              )}
            </div>
          </div>
        ))}

        {loading && messages[messages.length - 1]?.role !== 'assistant' && (
          <div className="flex gap-2 justify-start">
            <div className="w-8 h-8 rounded-full bg-green-400 flex items-center justify-center text-lg shrink-0 mt-1">
              ⚽
            </div>
            <div className="bg-gray-100 rounded-2xl rounded-bl-sm px-4 py-3 text-sm text-gray-500">
              <span className="flex gap-1 items-center">
                <span className="animate-bounce">●</span>
                <span className="animate-bounce [animation-delay:0.1s]">●</span>
                <span className="animate-bounce [animation-delay:0.2s]">●</span>
              </span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2 p-4 border-t border-gray-100">
        <input
          className="flex-1 rounded-full border-2 border-gray-200 px-4 py-2 text-sm focus:outline-none focus:border-green-400 transition-colors"
          placeholder="Ask about any football player..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="rounded-full bg-green-400 hover:bg-green-500 disabled:bg-gray-200 disabled:text-gray-400 text-white font-bold px-5 py-2 text-sm transition-colors shrink-0"
        >
          Send ⚽
        </button>
      </form>
    </div>
  );
}
