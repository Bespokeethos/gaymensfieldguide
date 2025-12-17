'use client';

import React, { useEffect, useState } from 'react';

type AgentStatus = {
  status: string;
  lastUpdate: string;
  expertise: string;
  recentLogs: string[];
};

type SwarmStatus = Record<string, AgentStatus>;

export default function DashboardPage() {
  const [agents, setAgents] = useState<SwarmStatus | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStatus = async () => {
    try {
      const res = await fetch('/api/pipeline/status');
      if (res.ok) {
        const data = await res.json();
        setAgents(data);
      }
    } catch (e) {
      console.error('Failed to fetch status', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 3000); // Poll every 3s
    return () => clearInterval(interval);
  }, []);

  if (loading && !agents) return <div className="p-10 text-white">Loading Command Center...</div>;

  return (
    <div className="min-h-screen bg-black text-white p-8 font-mono">
      <header className="mb-12 border-b border-gray-800 pb-4">
        <h1 className="text-4xl font-bold text-orange-500 mb-2">ANTIGRAVITY COMMAND CENTER</h1>
        <p className="text-gray-400">Autonomous Swarm Monitor v1.0</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {agents && Object.entries(agents).map(([name, data]) => {
          const isIdle = data.status === 'Idle' || data.status === 'Offline';
          const isError = data.status.includes('Error') || data.status.includes('MISSING');
          
          let statusColor = "bg-gray-900 border-gray-700";
          if (!isIdle) statusColor = "bg-green-900/20 border-green-500 animate-pulse";
          if (isError) statusColor = "bg-red-900/20 border-red-500";

          return (
            <div key={name} className={`border rounded-lg p-4 flex flex-col h-[500px] ${statusColor}`}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">{name}</h2>
                <span className={`px-2 py-1 text-xs rounded ${isIdle ? 'bg-gray-700' : 'bg-green-600'}`}>
                  {data.status}
                </span>
              </div>
              
              <p className="text-xs text-gray-500 mb-4">{data.expertise}</p>
              
              <div className="flex-grow bg-black/50 rounded p-2 overflow-y-auto font-mono text-xs border border-gray-800">
                {data.recentLogs.length === 0 ? (
                  <span className="text-gray-600 italic">No recent logs...</span>
                ) : (
                  data.recentLogs.map((log, i) => (
                    <div key={i} className="mb-1 border-b border-gray-900 pb-1 last:border-0 text-gray-300">
                      {log}
                    </div>
                  ))
                )}
              </div>

              <div className="mt-4 text-xs text-gray-500">
                Last Update: {new Date(data.lastUpdate).toLocaleTimeString()}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
