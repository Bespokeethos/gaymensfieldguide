'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { InteractiveContainer } from './InteractiveContainer';

type Question = {
  id: number;
  text: string;
  options: { label: string; isCorrect: boolean; feedback?: string }[];
};

type QuizEngineProps = {
  title: string;
  questions: Question[];
  type?: 'game' | 'simulation' | 'exploit';
};

export function QuizEngine({ title, questions, type = 'game' }: QuizEngineProps) {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState(false);
  const [finished, setFinished] = useState(false);

  const handleAnswer = (isCorrect: boolean) => {
    if (showFeedback) return;
    if (isCorrect) setScore(s => s + 1);
    setLastAnswerCorrect(isCorrect);
    setShowFeedback(true);
  };

  const nextQuestion = () => {
    setShowFeedback(false);
    if (currentQ < questions.length - 1) {
      setCurrentQ(c => c + 1);
    } else {
      setFinished(true);
    }
  };

  const reset = () => {
    setCurrentQ(0);
    setScore(0);
    setFinished(false);
    setShowFeedback(false);
  };

  return (
    <InteractiveContainer title={title} type={type}>
      <div className="font-mono text-sm">
        {!finished ? (
          <>
            <div className="flex justify-between mb-4 text-xs text-zinc-500">
              <span>Q: {currentQ + 1}/{questions.length}</span>
              <span>SCORE: {score}</span>
            </div>

            <div className="mb-6 text-lg font-bold text-zinc-100 min-h-[60px]">
              {questions[currentQ].text}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {questions[currentQ].options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(opt.isCorrect)}
                  disabled={showFeedback}
                  className={cn(
                    "p-4 border-2 rounded text-left transition-all",
                    showFeedback && opt.isCorrect ? "border-neon-green bg-neon-green/10 text-neon-green" : "",
                    showFeedback && !opt.isCorrect && !lastAnswerCorrect ? "opacity-50" : "",
                    !showFeedback ? "border-zinc-700 hover:border-banana-500 hover:text-banana-500" : "border-zinc-800"
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {showFeedback && (
              <div className="mt-6 p-4 border-t border-dashed border-zinc-700 animate-in fade-in slide-in-from-bottom-2">
                <p className={cn("font-bold mb-2", lastAnswerCorrect ? "text-neon-green" : "text-neon-red")}>
                  {lastAnswerCorrect ? "CORRECT_INPUT" : "ERROR: INCORRECT"}
                </p>
                <p className="text-zinc-400 text-xs">
                   {questions[currentQ].options.find(o => o.isCorrect)?.feedback || "System logic implies this is the optimal choice."}
                </p>
                <button 
                  onClick={nextQuestion}
                  className="mt-4 w-full py-2 bg-zinc-800 hover:bg-zinc-700 text-white font-bold border border-zinc-600"
                >
                  {currentQ < questions.length - 1 ? "NEXT_SEQUENCE >>" : "FINALIZE >>"}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-8">
            <h3 className="text-2xl font-black mb-2 text-banana-500">SESSION_COMPLETE</h3>
            <p className="text-zinc-400 mb-6">FINAL_SCORE: {score} / {questions.length}</p>
            <div className="inline-block p-4 border border-zinc-700 bg-zinc-950 mb-6">
              {score === questions.length ? "RATING: GOD_TIER" : score > questions.length / 2 ? "RATING: HUMAN_AVERAGE" : "RATING: NPC_DETECTED"}
            </div>
            <button 
              onClick={reset}
              className="block w-full py-3 bg-neon-yellow text-black font-bold hover:bg-yellow-400"
            >
              REBOOT_SYSTEM
            </button>
          </div>
        )}
      </div>
    </InteractiveContainer>
  );
}
