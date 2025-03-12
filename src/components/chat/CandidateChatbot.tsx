
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetFooter,
  SheetTrigger 
} from "@/components/ui/sheet";
import { MessageSquare, Send, X, Briefcase, FileText } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

const initialMessages: Message[] = [
  {
    id: '1',
    text: 'Hi there! I\'m TalentBuddy, your career assistant. How can I help you today?',
    sender: 'bot',
    timestamp: new Date()
  }
];

const CandidateChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Auto-scroll to the bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulate bot response - Candidate specific responses
    setTimeout(() => {
      const botResponses = [
        "I can help you search for software engineering jobs in Bangalore. Try using our search feature!",
        "Looking for a job? Make sure your resume is uploaded and updated for the best matches.",
        "You can prepare for your upcoming interviews in the interview page.",
        "Need help with your resume? Upload it and I can analyze it for you.",
        "Based on your skills, I can recommend jobs that match your profile."
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button 
            className="h-14 w-14 rounded-full shadow-md bg-primary hover:bg-primary/90" 
            onClick={() => setIsOpen(true)}
          >
            <MessageSquare className="h-6 w-6" />
            <span className="sr-only">Open candidate chat</span>
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[90vw] sm:max-w-[400px] p-0 flex flex-col h-[90vh] sm:h-[600px]">
          <SheetHeader className="border-b p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-primary h-8 w-8 rounded-full flex items-center justify-center">
                  <MessageSquare className="h-4 w-4 text-white" />
                </div>
                <SheetTitle>TalentBuddy</SheetTitle>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </SheetHeader>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs mt-1 opacity-70">
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          <SheetFooter className="border-t p-4">
            <div className="flex w-full items-center gap-2">
              <Input
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default CandidateChatbot;
