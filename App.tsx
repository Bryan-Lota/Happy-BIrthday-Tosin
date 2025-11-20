
import React, { useState, Component, ErrorInfo, ReactNode } from 'react';
import { AnimationStage } from './components/AnimationStage';
import { Scene } from './types';
import { Sparkles, AlertTriangle } from 'lucide-react';

// Error Boundary to catch crashes and show a visible error
class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean, error: Error | null }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("App Crash:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-screen w-full bg-slate-900 text-white p-8 text-center z-50 relative">
          <AlertTriangle size={64} className="text-red-500 mb-4" />
          <h1 className="text-3xl font-bold mb-2">Oops! Something went wrong.</h1>
          <p className="text-slate-300 mb-4">The app encountered an error while rendering.</p>
          <div className="bg-slate-800 p-4 rounded text-left font-mono text-sm text-red-200 max-w-lg overflow-auto border border-slate-700">
            {this.state.error?.toString()}
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="mt-6 px-6 py-2 bg-blue-600 rounded-full hover:bg-blue-500 transition-colors"
          >
            Reload App
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default function App() {
  const [scene, setScene] = useState<Scene>(Scene.INTRO);

  const handleNextScene = (nextScene: Scene) => {
    setScene(nextScene);
  };

  return (
    <ErrorBoundary>
      <div className="relative w-full h-screen bg-slate-950 overflow-hidden text-white font-['Fredoka']">
        {/* Background ambient effects - Deep Blue/Midnight Theme */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900 via-slate-900 to-black opacity-100 z-0 pointer-events-none" />
        
        {/* Main Content Container - Explicit Z-index to sit above background */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center w-full h-full">
          <AnimationStage 
            currentScene={scene} 
            onNextScene={handleNextScene} 
          />
        </div>

        {/* Footer / Controls */}
        <div className="absolute bottom-4 right-4 z-50 text-xs text-white/30 flex items-center gap-2 pointer-events-none">
          <Sparkles size={14} />
          <span>Created for Tosin</span>
        </div>
      </div>
    </ErrorBoundary>
  );
}
