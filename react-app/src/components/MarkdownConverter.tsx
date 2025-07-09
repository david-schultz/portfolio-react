'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'

export default function MarkdownConverter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [isConverting, setIsConverting] = useState(false)

  const handleConvert = async () => {
    setIsConverting(true)
    // Simulate AI conversion process
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Simple mock conversion - in real implementation, this would call an AI service
    const converted = `# Converted Notes\n\n${input}\n\n*Converted using AI*`
    setOutput(converted)
    setIsConverting(false)
  }

  return (
    <div className="border rounded-lg p-6 my-8 bg-bg-secondary">
      <h4 className="text-lg font-semibold mb-4">Markdown Converter</h4>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Input (Handwritten Notes)
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your handwritten notes here..."
            className="w-full h-32 p-3 border rounded-md resize-none"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">
            Output (Markdown)
          </label>
          <textarea
            value={output}
            readOnly
            placeholder="Converted markdown will appear here..."
            className="w-full h-32 p-3 border rounded-md resize-none bg-gray-50"
          />
        </div>
      </div>
      
      <Button 
        onClick={handleConvert}
        disabled={!input.trim() || isConverting}
        className="mt-4"
      >
        {isConverting ? 'Converting...' : 'Convert to Markdown'}
      </Button>
    </div>
  )
}
