import React, { useRef, useEffect, useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'

const PianoRoll: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [notes, setNotes] = useState<any[]>([])
  const [selectedNote, setSelectedNote] = useState<number | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)

  const CANVAS_WIDTH = 800
  const CANVAS_HEIGHT = 400
  const KEY_WIDTH = 60
  const NOTE_HEIGHT = 20
  const TIME_GRID = 20

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear canvas
    ctx.fillStyle = '#1f2937'
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

    // Draw piano keys
    for (let i = 0; i < 24; i++) {
      const y = i * NOTE_HEIGHT
      const isBlackKey = [1, 3, 6, 8, 10].includes(i % 12)
      
      ctx.fillStyle = isBlackKey ? '#374151' : '#ffffff'
      ctx.fillRect(0, y, KEY_WIDTH, NOTE_HEIGHT)
      
      if (!isBlackKey) {
        ctx.strokeStyle = '#d1d5db'
        ctx.strokeRect(0, y, KEY_WIDTH, NOTE_HEIGHT)
      }
    }

    // Draw grid lines
    ctx.strokeStyle = '#374151'
    ctx.lineWidth = 1
    
    for (let x = KEY_WIDTH; x < CANVAS_WIDTH; x += TIME_GRID) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, CANVAS_HEIGHT)
      ctx.stroke()
    }

    // Draw notes
    notes.forEach((note, index) => {
      ctx.fillStyle = selectedNote === index ? '#06b6d4' : '#8b5cf6'
      ctx.fillRect(
        KEY_WIDTH + note.start * TIME_GRID,
        (127 - note.pitch) * NOTE_HEIGHT / 12,
        note.duration * TIME_GRID,
        NOTE_HEIGHT
      )
    })
  }, [notes, selectedNote])

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    if (x > KEY_WIDTH) {
      const pitch = Math.floor(127 - (y / NOTE_HEIGHT) * 12)
      const start = Math.floor((x - KEY_WIDTH) / TIME_GRID)
      
      const newNote = {
        pitch: Math.max(0, Math.min(127, pitch)),
        start: Math.max(0, start),
        duration: 4,
        velocity: 100
      }
      
      setNotes([...notes, newNote])
    }
  }

  const handleDeleteNote = () => {
    if (selectedNote !== null) {
      setNotes(notes.filter((_, index) => index !== selectedNote))
      setSelectedNote(null)
    }
  }

  return (
    <div className="h-full flex flex-col">
      {/* Toolbar */}
      <div className="bg-gray-800 border-b border-gray-700 p-3">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsDrawing(!isDrawing)}
            className={`p-2 rounded transition-colors ${
              isDrawing ? 'bg-cyan-600' : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            <Plus size={16} />
          </button>
          <button
            onClick={handleDeleteNote}
            disabled={selectedNote === null}
            className="p-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 rounded"
          >
            <Trash2 size={16} />
          </button>
          <span className="text-sm text-gray-400">
            Click to add notes, {notes.length} notes created
          </span>
        </div>
      </div>

      {/* Piano Roll Canvas */}
      <div className="flex-1 overflow-auto bg-gray-900">
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          onClick={handleCanvasClick}
          className="border border-gray-700 cursor-crosshair"
        />
      </div>
    </div>
  )
}

export default PianoRoll
