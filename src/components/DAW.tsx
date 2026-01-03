import React, { useState, useEffect } from 'react'
import { Play, Pause, Stop, Square } from 'lucide-react'
import AudioEditor from './AudioEditor/AudioEditor'
import Mixer from './Mixer/Mixer'
import PianoRoll from './PianoRoll/PianoRoll'
import EffectsRack from './EffectsRack/EffectsRack'
import AIComposer from './AIComposer/AIComposer'
import { useAudioEngine } from '../hooks/useAudioEngine'

const DAW: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [selectedTrack, setSelectedTrack] = useState(0)
  
  const { audioContext, masterGain, play, pause, stop } = useAudioEngine()

  const handlePlay = () => {
    setIsPlaying(true)
    play()
  }

  const handlePause = () => {
    setIsPlaying(false)
    pause()
  }

  const handleStop = () => {
    setIsPlaying(false)
    stop()
    setCurrentTime(0)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying) {
        setCurrentTime(prev => prev + 0.1)
      }
    }, 100)
    return () => clearInterval(interval)
  }, [isPlaying])

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-cyan-400">SoundForge AI</h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={handlePlay}
                disabled={isPlaying}
                className="p-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 rounded"
              >
                <Play size={20} />
              </button>
              <button
                onClick={handlePause}
                disabled={!isPlaying}
                className="p-2 bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-600 rounded"
              >
                <Pause size={20} />
              </button>
              <button
                onClick={handleStop}
                className="p-2 bg-red-600 hover:bg-red-700 rounded"
              >
                <Square size={20} />
              </button>
            </div>
            <div className="text-cyan-400 font-mono">
              {currentTime.toFixed(1)}s
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel - Tracks */}
        <div className="w-1/4 bg-gray-800 border-r border-gray-700">
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">Tracks</h2>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((track) => (
              <div
                key={track}
                onClick={() => setSelectedTrack(track - 1)}
                className={`p-3 mb-2 rounded cursor-pointer transition-colors ${
                  selectedTrack === track - 1
                    ? 'bg-cyan-600'
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>Track {track}</span>
                  <div className="flex items-center space-x-2">
                    <button className="w-4 h-4 bg-green-500 rounded-full" />
                    <button className="w-4 h-4 bg-red-500 rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Center - Timeline/Editor */}
        <div className="flex-1 flex flex-col">
          <div className="bg-gray-800 border-b border-gray-700 p-4">
            <div className="flex space-x-4">
              <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded">
                Audio Editor
              </button>
              <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded">
                Piano Roll
              </button>
              <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded">
                Mixer
              </button>
            </div>
          </div>
          <div className="flex-1 bg-gray-900">
            <AudioEditor selectedTrack={selectedTrack} />
          </div>
        </div>

        {/* Right Panel - Effects & AI */}
        <div className="w-1/4 bg-gray-800 border-l border-gray-700">
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">AI Composer</h2>
            <AIComposer />
            
            <h2 className="text-lg font-semibold mb-4 mt-6">Effects</h2>
            <EffectsRack />
          </div>
        </div>
      </div>

      {/* Bottom Panel - Mixer */}
      <div className="h-48 bg-gray-800 border-t border-gray-700">
        <Mixer />
      </div>
    </div>
  )
}

export default DAW
