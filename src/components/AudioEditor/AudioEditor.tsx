import React, { useRef, useEffect, useState } from 'react'
import WaveSurfer from 'wavesurfer.js'
import { Upload, Scissors, Copy, Trash2 } from 'lucide-react'

interface AudioEditorProps {
  selectedTrack: number
}

const AudioEditor: React.FC<AudioEditorProps> = ({ selectedTrack }) => {
  const waveformRef = useRef<HTMLDivElement>(null)
  const wavesurferRef = useRef<WaveSurfer | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    if (waveformRef.current) {
      const wavesurfer = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: '#06b6d4',
        progressColor: '#0891b2',
        backgroundColor: '#1f2937',
        barWidth: 2,
        barRadius: 3,
        cursorWidth: 2,
        cursorColor: '#ffffff',
        height: 200,
        responsive: true,
      })

      wavesurferRef.current = wavesurfer

      wavesurfer.on('ready', () => {
        setIsLoaded(true)
        setDuration(wavesurfer.getDuration())
      })

      return () => {
        wavesurfer.destroy()
      }
    }
  }, [])

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && wavesurferRef.current) {
      const url = URL.createObjectURL(file)
      wavesurferRef.current.load(url)
    }
  }

  const handleCut = () => {
    if (wavesurferRef.current) {
      const start = wavesurferRef.current.getCurrentTime()
      // Implement cut functionality
      console.log('Cut at:', start)
    }
  }

  const handleCopy = () => {
    if (wavesurferRef.current) {
      const start = wavesurferRef.current.getCurrentTime()
      // Implement copy functionality
      console.log('Copy at:', start)
    }
  }

  const handleDelete = () => {
    if (wavesurferRef.current) {
      // Implement delete functionality
      console.log('Delete selection')
    }
  }

  return (
    <div className="h-full flex flex-col">
      {/* Toolbar */}
      <div className="bg-gray-800 border-b border-gray-700 p-3">
        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2 px-3 py-2 bg-cyan-600 hover:bg-cyan-700 rounded cursor-pointer">
            <Upload size={16} />
            <span>Import Audio</span>
            <input
              type="file"
              accept="audio/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={handleCut}
              disabled={!isLoaded}
              className="p-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 rounded"
            >
              <Scissors size={16} />
            </button>
            <button
              onClick={handleCopy}
              disabled={!isLoaded}
              className="p-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 rounded"
            >
              <Copy size={16} />
            </button>
            <button
              onClick={handleDelete}
              disabled={!isLoaded}
              className="p-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 rounded"
            >
              <Trash2 size={16} />
            </button>
          </div>

          <div className="text-sm text-gray-400">
            Track {selectedTrack + 1}
          </div>
        </div>
      </div>

      {/* Waveform */}
      <div className="flex-1 p-4">
        <div ref={waveformRef} className="w-full" />
        {isLoaded && (
          <div className="mt-4 text-sm text-gray-400">
            Duration: {duration.toFixed(2)}s
          </div>
        )}
      </div>
    </div>
  )
}

export default AudioEditor
