import React, { useState } from 'react'
import { Volume2, Mic, Headphones } from 'lucide-react'

const Mixer: React.FC = () => {
  const [tracks] = useState([
    { id: 1, name: 'Track 1', volume: 75, pan: 0, mute: false, solo: false },
    { id: 2, name: 'Track 2', volume: 60, pan: -20, mute: false, solo: false },
    { id: 3, name: 'Track 3', volume: 80, pan: 30, mute: true, solo: false },
    { id: 4, name: 'Track 4', volume: 45, pan: 0, mute: false, solo: true },
  ])

  return (
    <div className="h-full bg-gray-800 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Mixer</h3>
        <div className="flex items-center space-x-2">
          <Volume2 size={20} />
          <span className="text-sm">Master: 85%</span>
        </div>
      </div>
      
      <div className="flex space-x-4 overflow-x-auto">
        {tracks.map((track) => (
          <div key={track.id} className="bg-gray-700 rounded p-3 min-w-[150px]">
            <div className="text-center mb-3">
              <div className="text-sm font-medium">{track.name}</div>
            </div>
            
            <div className="mb-3">
              <input
                type="range"
                min="0"
                max="100"
                value={track.volume}
                className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #06b6d4 0%, #06b6d4 ${track.volume}%, #4b5563 ${track.volume}%, #4b5563 100%)`
                }}
                readOnly
              />
              <div className="text-xs text-center mt-1">{track.volume}%</div>
            </div>
            
            <div className="mb-3">
              <input
                type="range"
                min="-50"
                max="50"
                value={track.pan}
                className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                readOnly
              />
              <div className="text-xs text-center mt-1">
                {track.pan > 0 ? `R${track.pan}` : track.pan < 0 ? `L${Math.abs(track.pan)}` : 'C'}
              </div>
            </div>
            
            <div className="flex justify-between">
              <button
                className={`px-2 py-1 text-xs rounded ${
                  track.mute ? 'bg-red-600' : 'bg-gray-600 hover:bg-gray-500'
                }`}
              >
                M
              </button>
              <button
                className={`px-2 py-1 text-xs rounded ${
                  track.solo ? 'bg-yellow-600' : 'bg-gray-600 hover:bg-gray-500'
                }`}
              >
                S
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Mixer
