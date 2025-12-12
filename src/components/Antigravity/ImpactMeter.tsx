"use client";

import React, { useState, useEffect } from 'react';

// 🍌 "Nano Banana" Impact Meter
// Visualizes the "Weight" of the current Vibe Coding session.

export default function ImpactMeter() {
  const [isCompact, setIsCompact] = useState(true);
  const [stats, setStats] = useState({ 
      tokens: 14500, 
      max: 1000000, 
      cost: 0.04, 
      currentModel: "models/gemini-3-pro" // Fixes TS Error
  });
  const [isLoading, setIsLoading] = useState(false);

  // Poll for status on mount/hover
  useEffect(() => {
    fetch('/api/status').then(r => r.json()).then(setStats).catch(() => {});
  }, [isCompact]);

  /* Voice Chat Logic */
  const [isListening, setIsListening] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);

  // 2-Minute Safety Timer
  useEffect(() => {
      let interval: NodeJS.Timeout;
      if (isListening) {
          interval = setInterval(() => {
              setSessionTime(prev => {
                  if (prev >= 120) { // 120 seconds = 2 minutes
                      setIsListening(false);
                      const audio = new Audio('/audio/shutdown.mp3'); // Optional: Shutdown sound
                      audio.play().catch(() => {});
                      alert("⚠️ Session Limit Reached (2 min). Microphone Deactivated.");
                      return 0;
                  }
                  return prev + 1;
              });
          }, 1000);
      } else {
          setSessionTime(0);
      }
      return () => clearInterval(interval);
  }, [isListening]);

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window)) {
        alert("Browser does not support Speech API. Use Chrome.");
        return;
    }
    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.continuous = false; // Reset per turn, but session timer persists if we loop
    recognition.lang = 'en-US';
    
    setIsListening(true);
    
    recognition.onresult = async (event: any) => {
        const transcript = event.results[0][0].transcript;
        console.log("🎤 Heard:", transcript);
        setIsListening(false); 
        await processVoiceQuery(transcript);
    };

    recognition.onerror = () => setIsListening(false);
    recognition.start();
  };

  const processVoiceQuery = async (text: string) => {
      setIsLoading(true);
      try {
          const res = await fetch('/api/chat/voice', {
              method: 'POST',
              body: JSON.stringify({ message: text })
          });
          const data = await res.json();
          
          if (data.stats) {
              setStats(data.stats); // 🍌 LIVE TOKEN UPDATE
          }
          
          if(data.audio) {
              const audio = new Audio(data.audio);
              audio.play();
          }
      } catch (e) {
          console.error(e);
      }
      setIsLoading(false);
  };

  const usagePercent = (stats.tokens / stats.max) * 100;
  // Compact View: "⚡ 14.5k / 1M"
  const compactLabel = `⚡ ${(stats.tokens / 1000).toFixed(1)}k / ${stats.max / 1000000}M`;

  return (
    <div 
      className={`fixed bottom-4 left-4 z-50 transition-all duration-300 ${isCompact ? 'w-auto' : 'w-64'} bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl overflow-hidden font-mono text-xs text-white`}
      onMouseEnter={() => setIsCompact(false)}
      onMouseLeave={() => setIsCompact(true)}
      onClick={() => setIsCompact(!isCompact)}
    >
      {/* Progress Bar Background */}
      <div className="absolute top-0 left-0 h-1 bg-yellow-500/20 w-full">
        <div 
          className="h-full bg-yellow-400" 
          style={{ width: `${usagePercent}%` }}
        />
      </div>

      <div className="p-2 flex items-center justify-between cursor-pointer select-none text-zinc-400 hover:text-white">
        {isCompact ? (
          <span className="font-bold text-yellow-500 animate-pulse bg-zinc-900 px-2 rounded">{compactLabel}</span>
        ) : (
          <div className="flex flex-col w-full gap-2 p-1">
             <div className="flex justify-between items-center border-b border-zinc-800 pb-1 mb-1">
                <span className="text-zinc-500">ANTIGRAVITY HUD</span>
                <span className="text-[10px] text-green-500">ONLINE</span>
             </div>
             
             <div className="flex justify-between">
               <span>Context:</span>
               <span className="text-white">{stats.tokens.toLocaleString()} / 1M</span>
             </div>
             
             <div className="flex justify-between">
               <span>Est. Cost:</span>
               <span className="text-yellow-400">${stats.cost.toFixed(4)}</span>
             </div>

             <div className="flex justify-between">
                <span>Model:</span>
                <span className="text-purple-400">{stats.currentModel.split('/')[1]}</span>
             </div>
             
             <div className="grid grid-cols-2 gap-2 mt-2">
                 <button 
                    className={`col-span-1 py-2 bg-red-900/50 hover:bg-red-800 text-center rounded text-[10px] font-bold uppercase tracking-wider ${isListening ? 'text-white animate-pulse' : 'text-red-200'}`}
                    onClick={(e) => { e.stopPropagation(); startListening(); }}
                 >
                    {isListening ? '🛑 LISTENING...' : '🎤 VOICE CHAT'}
                 </button>
                 
                 <button 
                    className="col-span-1 py-2 bg-zinc-800 hover:bg-zinc-700 text-center rounded text-[10px] uppercase tracking-wider text-zinc-300"
                    onClick={async (e) => {
                        e.stopPropagation();
                        // Trigger Compaction
                        setIsLoading(true);
                        await fetch('/api/compact', { method: 'POST' }); // Ensure this endpoint exists or mock it
                         // For now we just mock the reload stats
                        setStats(prev => ({...prev, tokens: prev.tokens * 0.7}));
                        setIsLoading(false);
                    }}
                 >
                    {isLoading ? '...' : '📉 COMPACT'}
                 </button>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
