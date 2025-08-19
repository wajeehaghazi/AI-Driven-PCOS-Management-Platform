import React, { useState, useRef, useEffect } from 'react';
import { MessageCircleIcon, SendIcon, UserIcon, BotIcon, SparklesIcon, MicIcon, PlayIcon, StopCircleIcon, Trash2Icon } from 'lucide-react';
import ReactMarkdown from "react-markdown";

// Define interface for messages
interface Message {
  sender: 'user' | 'ai';
  content: string;
  audioUrl?: string;
}

export function SymptomAssessment() {
  const [messages, setMessages] = useState<Message[]>([{
    sender: 'ai',
    content: "Hello! I'm your PCOS assessment assistant. I can help evaluate your symptoms and provide personalized insights.\n\nTo get started, could you tell me what symptoms you've been experiencing?",
    audioUrl: undefined
  }]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playingAudioIndex, setPlayingAudioIndex] = useState<number | null>(null);

  // 🎤 Start Recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      const chunks: Blob[] = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        setAudioBlob(blob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Mic error:', error);
      setMessages(prev => [...prev, {
        sender: 'ai',
        content: "Sorry, I couldn't access the microphone. Please check permissions and try again.",
        audioUrl: undefined
      }]);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  // when audio recording finished
  useEffect(() => {
    if (audioBlob) handleAudioSubmit();
  }, [audioBlob]);

  // 🎤 Send recorded audio → backend
  const handleAudioSubmit = async () => {
    if (!audioBlob) return;
    try {
      const audioUrl = URL.createObjectURL(audioBlob);
      setMessages(prev => [...prev, { sender: 'user', audioUrl, content: '' }]);
      setAudioBlob(null);

      const formData = new FormData();
      formData.append('file', audioBlob, 'recording.webm');

      const transcriptionResponse = await fetch('http://127.0.0.1:4933/transcribe', {
        method: 'POST',
        body: formData,
      });

      if (!transcriptionResponse.ok) throw new Error('Transcription failed');
      const transcriptionData = await transcriptionResponse.json();

      if (transcriptionData.success && transcriptionData.transcription) {
        await handleSend(transcriptionData.transcription);
      } else {
        throw new Error('No transcription returned');
      }
    } catch (error) {
      console.error('Transcribe error:', error);
      setMessages(prev => [...prev, {
        sender: 'ai',
        content: "I couldn't transcribe your audio. Please try again or type your message.",
        audioUrl: undefined
      }]);
    }
  };

  // 📝 Handle text or transcript input
  const handleSend = async (textInput?: string) => {
    const currentInput = textInput || input;
    if (currentInput.trim() === '' && !textInput) return;

    if (!textInput) {
      setMessages(prev => [...prev, { sender: 'user', content: currentInput, audioUrl: undefined }]);
      setInput('');
    }
    setIsTyping(true);

    try {
      const formData = new FormData();
      formData.append('input', currentInput);
      if (sessionId) formData.append('session_id', sessionId);

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
                const formatted = fullResponse.replace(/<think>.*?<\/think>/gs, '').trim();
                setMessages(prev => {
                  const updated = [...prev];
                  if (updated.length > 0 && updated[updated.length - 1].sender === 'ai') {
                    updated[updated.length - 1].content = formatted;
                  } else {
                    updated.push({ sender: 'ai', content: formatted, audioUrl: undefined });
                  }
                  return updated;
                });
                if (!sessionId && data.session_id) setSessionId(data.session_id);
              }
            } catch (e) {
              console.error('Parse SSE error', e);
            }
          }
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        sender: 'ai',
        content: "I encountered an error. Please try again.",
        audioUrl: undefined
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  // 🔊 Generate or play TTS for AI message
  const handleTTS = async (text: string, index: number, audioUrl?: string) => {
    if (audioUrl) {
      // If audioUrl exists, toggle play/stop
      if (playingAudioIndex === index) {
        stopAudio();
      } else {
        playAudio(audioUrl, index);
      }
    } else {
      // Generate TTS
      try {
        const response = await fetch('http://127.0.0.1:4933/tts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text, session_id: sessionId, language: 'en' })
        });
        if (!response.ok) throw new Error('TTS failed');

        const audioBlob = await response.blob();
        const newAudioUrl = URL.createObjectURL(audioBlob);

        setMessages(prev => {
          const updated = [...prev];
          if (updated[index] && updated[index].sender === 'ai') {
            updated[index] = { ...updated[index], audioUrl: newAudioUrl };
          }
          return updated;
        });

        // Auto-play the audio
        if (audioRef.current) {
          audioRef.current.src = newAudioUrl;
          audioRef.current.play();
          setPlayingAudioIndex(index);
        }
      } catch (error) {
        console.error('TTS error:', error);
        setMessages(prev => [...prev, {
          sender: 'ai',
          content: "Sorry, I couldn't generate audio for this response.",
          audioUrl: undefined
        }]);
      }
    }
  };

  // ▶️ Play audio
  const playAudio = (audioUrl: string, index: number) => {
    if (audioRef.current) {
      audioRef.current.src = audioUrl;
      audioRef.current.play();
      setPlayingAudioIndex(index);
    }
  };

  // ⏹️ Stop audio
  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setPlayingAudioIndex(null);
    }
  };

  // 🗑️ Clear chat
  const clearChat = () => {
    setMessages([{
      sender: 'ai',
      content: "Hello! I'm your PCOS assessment assistant. I can help evaluate your symptoms and provide personalized insights.\n\nTo get started, could you tell me what symptoms you've been experiencing?",
      audioUrl: undefined
    }]);
    setSessionId('');
    setInput('');
    stopAudio();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
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
            <div className="flex items-center space-x-2">
              <div className="bg-white/20 text-xs rounded-full px-2 py-0.5 font-medium">
                Medical AI Assistant
              </div>
              <button
                className="bg-white/20 text-white hover:bg-white/30 rounded-full p-2 transition-all"
                onClick={clearChat}
                title="Clear Chat"
              >
                <Trash2Icon size={16} />
              </button>
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
                    {/* Always show text for AI messages, show nothing for user audio messages */}
                    {(message.sender === 'ai' || (message.sender === 'user' && !message.audioUrl)) && (
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
                    )}
                    {/* Show audio player for user messages with audioUrl */}
                    {message.sender === 'user' && message.audioUrl && (
                      <div className="flex items-center space-x-2 mt-2">
                        <audio src={message.audioUrl} controls className="max-w-full" />
                        <button
                          className="text-blue-600 hover:text-blue-800"
                          onClick={() => playingAudioIndex === index ? stopAudio() : playAudio(message.audioUrl!, index)}
                        >
                          {playingAudioIndex === index ? (
                            <StopCircleIcon size={16} />
                          ) : (
                            <PlayIcon size={16} />
                          )}
                        </button>
                      </div>
                    )}
                    {/* Show TTS play/stop button for AI messages */}
                    {message.sender === 'ai' && (
                      <div className="flex space-x-2 mt-2">
                        <button
                          onClick={() => handleTTS(message.content, index, message.audioUrl)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          {playingAudioIndex === index ? (
                            <StopCircleIcon size={16} />
                          ) : (
                            <PlayIcon size={16} />
                          )}
                        </button>
                      </div>
                    )}
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
            <div className="flex items-center">
              <textarea
                className="flex-grow border border-gray-300 rounded-md px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none bg-gray-50 h-12"
                placeholder="Type your symptoms or use the microphone..."
                rows={1}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button
                className={`ml-2 px-3 py-2 rounded-md transition-all ${isRecording ? 'bg-red-600 hover:bg-red-700' : 'bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700'} h-12 w-12 flex items-center justify-center`}
                onClick={isRecording ? stopRecording : startRecording}
              >
                <MicIcon size={24} className="text-white" />
              </button>
              <button
                className="ml-2 px-3 py-2 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-md hover:from-blue-700 hover:to-teal-700 transition-all h-12 w-12 flex items-center justify-center"
                onClick={() => handleSend()}
              >
                <SendIcon size={20} />
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
            <p className="text-gray-600 text-sm">
              Understands your symptoms and provides personalized insights.
            </p>
          </div>
          <div className="bg-gradient-to-br from-teal-50 to-cyan-50 border border-teal-100 rounded-lg p-5 shadow-sm">
            <h4 className="font-medium text-gray-900 mb-1 text-base">Adaptive Questioning</h4>
            <p className="text-gray-600 text-sm">
              Questions adapt based on your responses for better assessment.
            </p>
          </div>
          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-100 rounded-lg p-5 shadow-sm">
            <h4 className="font-medium text-gray-900 mb-1 text-base">Medically Informed</h4>
            <p className="text-gray-600 text-sm">
              Trained on medical literature and validated by experts.
            </p>
          </div>
        </div>
      </div>

      {/* Hidden audio player */}
      <audio ref={audioRef} onEnded={() => setPlayingAudioIndex(null)} />
    </div>
  );
}