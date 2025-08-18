import React, { useState } from 'react';
import { MessageCircleIcon, SendIcon, UserIcon, BotIcon, SparklesIcon } from 'lucide-react';
import ReactMarkdown from "react-markdown";

export function SymptomAssessment() {
  const [messages, setMessages] = useState([{
    sender: 'ai',
    content: "Hello! I'm your PCOS assessment assistant. I can help evaluate your symptoms and provide personalized insights.\n\nTo get started, could you tell me what symptoms you've been experiencing?"
  }]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState('');

  const handleSend = async () => {
    if (input.trim() === '') return;

    // Add user message
    const newMessages = [...messages, { sender: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);

    try {
      const formData = new FormData();
      formData.append('input', input);
      if (sessionId) {
        formData.append('session_id', sessionId);
      }

      const response = await fetch('http://127.0.0.1:4933/chat', {
        method: 'POST',
        body: formData,
        mode: 'cors',
        headers: { 'Accept': 'text/event-stream' }
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const reader = response.body?.getReader();
      if (!reader) return;

      let fullResponse = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = new TextDecoder().decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));

              if (data.type === 'chunk') {
                fullResponse += data.content;
                const formattedResponse = fullResponse
                  .replace(/<think>.*?<\/think>/gs, '')
                  .trim();

                setMessages(prev => {
                  const newMessages = [...prev];
                  if (newMessages.length > 0 && newMessages[newMessages.length - 1].sender === 'ai') {
                    newMessages[newMessages.length - 1].content = formattedResponse;
                  } else {
                    newMessages.push({ sender: 'ai', content: formattedResponse });
                  }
                  return newMessages;
                });

                if (!sessionId && data.session_id) {
                  setSessionId(data.session_id);
                }
              }
            } catch (e) {
              console.error('Error parsing SSE data:', e);
            }
          }
        }
      }

    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        sender: 'ai',
        content: "I apologize, but I encountered an error. Please try again."
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <div className="inline-flex items-center px-4 py-1.5 bg-blue-100 rounded-full text-sm font-medium text-blue-800 mb-4">
          <SparklesIcon size={16} className="mr-2" /> AI-Powered Assessment
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Intelligent Symptom Assessment
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Our AI asks contextual questions that adapt based on your responses,
          helping to identify potential PCOS indicators with accuracy.
        </p>
      </div>

      <div className="w-full mx-auto">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-blue-100">
          <div className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-6 py-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-white/20 rounded-full p-2 mr-2">
                <BotIcon size={20} />
              </div>
              <h3 className="text-lg font-medium">PCOS Symptom Assessment</h3>
            </div>
            <div className="bg-white/20 text-xs rounded-full px-2 py-0.5 font-medium">
              Medical AI Assistant
            </div>
          </div>

          {/* Chat container */}
          <div className="h-[500px] overflow-y-auto p-4 bg-gradient-to-b from-blue-50 to-white">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {message.sender === 'ai' && (
                    <div className="bg-blue-100 rounded-full p-1.5 mr-2 h-fit">
                      <BotIcon size={16} className="text-blue-600" />
                    </div>
                  )}
                  <div
                    className={`rounded-lg px-4 py-2 max-w-[75%] text-base leading-relaxed ${message.sender === 'user'
                        ? 'bg-gradient-to-r from-blue-600 to-teal-600 text-white'
                        : 'bg-white border border-gray-200 text-gray-800'
                      }`}
                  >
                    <ReactMarkdown
                      components={{
                        ul: ({ children }) => <ul className="list-disc list-inside my-2">{children}</ul>,
                        ol: ({ children }) => <ol className="list-decimal list-inside my-2">{children}</ol>,
                        li: ({ children }) => <li className="ml-4 mb-1">{children}</li>,
                        p: ({ children }) => <p className="mb-2">{children}</p>
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                  </div>
                  {message.sender === 'user' && (
                    <div className="bg-gray-200 rounded-full p-1.5 ml-2 h-fit">
                      <UserIcon size={16} className="text-gray-600" />
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-blue-100 rounded-full p-1.5 mr-2 h-fit">
                    <BotIcon size={16} className="text-blue-600" />
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg px-4 py-2 flex items-center space-x-2 shadow-sm">
                    <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-150"></span>
                    <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-300"></span>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 p-3 bg-white">
            <div className="flex items-end">
              <textarea
                className="flex-grow border border-gray-300 rounded-md px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none bg-gray-50"
                placeholder="Type your symptoms..."
                rows={2}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button
                className="ml-3 px-4 py-3 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-md hover:from-blue-700 hover:to-teal-700 transition-all"
                onClick={handleSend}
              >
                <SendIcon size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Info cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100 rounded-lg p-5 shadow-sm">
            <div className="bg-blue-100 rounded-md w-10 h-10 flex items-center justify-center mb-3">
              <MessageCircleIcon size={18} className="text-blue-600" />
            </div>
            <h4 className="font-medium text-gray-900 mb-1 text-base">Conversational AI</h4>
            <p className="text-gray-700 text-sm">
              Understands your symptoms and provides personalized insights.
            </p>
          </div>
          <div className="bg-gradient-to-br from-teal-50 to-cyan-50 border border-teal-100 rounded-lg p-5 shadow-sm">
            <h4 className="font-medium text-gray-900 mb-1 text-base">Adaptive Questioning</h4>
            <p className="text-gray-700 text-sm">
              Questions adapt based on your responses for better assessment.
            </p>
          </div>
          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-100 rounded-lg p-5 shadow-sm">
            <h4 className="font-medium text-gray-900 mb-1 text-base">Medically Informed</h4>
            <p className="text-gray-700 text-sm">
              Trained on medical literature and validated by experts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
