import React, {useEffect,useRef, useState} from 'react'

function Canvas() {

  const canvasRef = useRef(null)
  const canvasContextRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = window.innerWidth;
    canvas.style.height = window.innerHeight;

    const canvasContext = canvas.getContext("2d")
    canvasContext.scale(2,2)
    canvasContext.lineCap = "round"
    canvasContext.strokeStyle = "black"
    canvasContext.lineWidth = 5
    canvasContextRef.current = canvasContext;
  },[])
  
  const draw = ({nativeEvent}) => {
    if(!isDrawing){
      const {offsetX,offsetY} = nativeEvent;
      canvasContextRef.current.lineTo(offsetX,offsetY)
      canvasContextRef.current.stroke()
  }
  }

  const startInput = ({nativeEvent}) => {
    const { offsetX, offsetY } = nativeEvent;
    canvasContextRef.current.beginPath()
    canvasContextRef.current.moveTo(offsetX,offsetY)
    setIsDrawing(true)
  }

  const stopInput = () => {
    canvasContextRef.closePath();
    setIsDrawing(false)
  }

  return (
    <div>
      <canvas
        onMouseMove={draw}
        onMouseDown={startInput}
        onMouseUp={stopInput}
        ref={canvasRef}
      />
    </div>
  )
}

export default Canvas
