import React, { useState } from 'react';
import { MessageCircleIcon, SendIcon, UserIcon, BotIcon, SparklesIcon } from 'lucide-react';
export function SymptomAssessment() {
  const [messages, setMessages] = useState([{
    sender: 'ai',
    content: "Hello! I'm your PCOS assessment assistant. I can help evaluate your symptoms and provide personalized insights. To get started, could you tell me what symptoms you've been experiencing?"
  }]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const handleSend = () => {
    if (input.trim() === '') return;
    // Add user message
    const newMessages = [...messages, {
      sender: 'user',
      content: input
    }];
    setMessages(newMessages);
    setInput('');
    // Simulate AI thinking
    setIsTyping(true);
    // Simulate AI response after a delay
    setTimeout(() => {
      let aiResponse;
      if (newMessages.length === 2) {
        aiResponse = "Thank you for sharing. Based on what you've described, I'd like to ask a few follow-up questions to better understand your situation. Have you noticed any irregularities in your menstrual cycle? If so, could you describe the pattern?";
      } else if (newMessages.length === 4) {
        aiResponse = "I understand. Irregular periods can be a key indicator of PCOS. I'd also like to know if you've experienced any of these other common symptoms: unwanted hair growth (hirsutism), acne, weight gain especially around the abdomen, or thinning hair on the scalp?";
      } else {
        aiResponse = "Thank you for providing this information. Based on the symptoms you've described, there are several indicators that align with PCOS patterns. I recommend discussing these symptoms with a healthcare provider for proper diagnosis. Would you like me to provide some information about next steps or explain more about how these symptoms relate to PCOS?";
      }
      setMessages([...newMessages, {
        sender: 'ai',
        content: aiResponse
      }]);
      setIsTyping(false);
    }, 1500);
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-sm font-medium text-blue-800 mb-4">
          <SparklesIcon size={16} className="mr-2" /> AI-Powered Assessment
        </div>
        <h2 className="text-4xl font-bold text-gray-900 mb-6">
          Intelligent Symptom Assessment
        </h2>
        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
          Our advanced medical AI asks contextual questions that adapt based on
          your responses, helping to identify potential PCOS indicators with
          high accuracy.
        </p>
      </div>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-blue-100">
          <div className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-8 py-6 flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-white/20 rounded-full p-2 mr-3">
                <BotIcon size={24} />
              </div>
              <h3 className="text-xl font-medium">PCOS Symptom Assessment</h3>
            </div>
            <div className="bg-white/20 text-xs rounded-full px-3 py-1 font-medium">
              Medical AI Assistant
            </div>
          </div>
          <div className="h-[450px] overflow-y-auto p-6 bg-gradient-to-b from-blue-50 to-white" aria-live="polite">
            <div className="space-y-6">
              {messages.map((message, index) => <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}>
                  {message.sender === 'ai' && <div className="bg-blue-100 rounded-full p-2 mr-3 h-fit">
                      <BotIcon size={20} className="text-blue-600" />
                    </div>}
                  <div className={`rounded-2xl px-6 py-4 max-w-[80%] shadow-sm ${message.sender === 'user' ? 'bg-gradient-to-r from-blue-600 to-teal-600 text-white' : 'bg-white border border-gray-200 text-gray-800'}`}>
                    {message.content}
                  </div>
                  {message.sender === 'user' && <div className="bg-gray-200 rounded-full p-2 ml-3 h-fit">
                      <UserIcon size={20} className="text-gray-600" />
                    </div>}
                </div>)}
              {isTyping && <div className="flex justify-start animate-fadeIn">
                  <div className="bg-blue-100 rounded-full p-2 mr-3 h-fit">
                    <BotIcon size={20} className="text-blue-600" />
                  </div>
                  <div className="bg-white border border-gray-200 rounded-2xl px-6 py-4 text-gray-500 shadow-sm">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce"></div>
                      <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{
                    animationDelay: '0.2s'
                  }}></div>
                      <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{
                    animationDelay: '0.4s'
                  }}></div>
                    </div>
                  </div>
                </div>}
            </div>
          </div>
          <div className="border-t border-gray-200 p-6 bg-white">
            <div className="flex items-end">
              <textarea className="flex-grow border-2 border-gray-200 rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-gray-50" placeholder="Describe your symptoms..." rows={2} value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown} aria-label="Symptom description input" />
              <button className="ml-4 p-4 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-xl hover:from-blue-700 hover:to-teal-700 transition-all duration-300 flex-shrink-0 shadow-lg shadow-blue-600/20" onClick={handleSend} aria-label="Send message">
                <SendIcon size={20} />
              </button>
            </div>
            <div className="mt-3 text-xs text-gray-500 flex items-center">
              <div className="bg-blue-100 rounded-full p-1 mr-2">
                <ShieldIcon size={12} className="text-blue-600" />
              </div>
              <span>
                Your data is secure and only used to provide personalized
                assessments
              </span>
            </div>
          </div>
        </div>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="bg-blue-100 rounded-xl w-12 h-12 flex items-center justify-center mb-4">
              <MessageCircleIcon size={24} className="text-blue-600" />
            </div>
            <h4 className="font-medium text-gray-900 mb-2 text-lg">
              Conversational AI
            </h4>
            <p className="text-gray-700 text-sm">
              Natural language processing understands your symptoms and provides
              personalized insights.
            </p>
          </div>
          <div className="bg-gradient-to-br from-teal-50 to-cyan-50 border border-teal-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="bg-teal-100 rounded-xl w-12 h-12 flex items-center justify-center mb-4">
              <BrainIcon size={24} className="text-teal-600" />
            </div>
            <h4 className="font-medium text-gray-900 mb-2 text-lg">
              Adaptive Questioning
            </h4>
            <p className="text-gray-700 text-sm">
              Questions adapt based on your responses to gather the most
              relevant information for assessment.
            </p>
          </div>
          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="bg-cyan-100 rounded-xl w-12 h-12 flex items-center justify-center mb-4">
              <ShieldIcon size={24} className="text-cyan-600" />
            </div>
            <h4 className="font-medium text-gray-900 mb-2 text-lg">
              Medically Informed
            </h4>
            <p className="text-gray-700 text-sm">
              Our system is trained on medical literature and validated by
              healthcare professionals.
            </p>
          </div>
        </div>
      </div>
    </div>;
}
function ShieldIcon(props: {
  size: number;
  className?: string;
}) {
  return <svg xmlns="http://www.w3.org/2000/svg" width={props.size} height={props.size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    </svg>;
}
function BrainIcon(props: {
  size: number;
  className?: string;
}) {
  return <svg xmlns="http://www.w3.org/2000/svg" width={props.size} height={props.size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"></path>
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"></path>
    </svg>;
}