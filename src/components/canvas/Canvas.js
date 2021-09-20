import React, { useEffect, useRef, useState } from "react";
import { Button, Center, Box, Switch, Flex, HStack } from "@chakra-ui/react";

function Canvas() {
  const canvasRef = useRef(null);
  const canvasContextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [textToggle, setTextToggle] = useState(false);
  const [strokeToggle, setStrokeToggle] = useState(false)

  useEffect(() => {
    //setStrokeToggle(true)
    const canvas = canvasRef.current;
    canvas.width = 900 * 2;
    canvas.height = 500 * 2;
    canvas.style.width = "900px";
    canvas.style.height = "500px";

    const canvasContext = canvas.getContext("2d");
    canvasContext.scale(2, 2);
    canvasContext.lineCap = "round";
    canvasContext.strokeStyle = "black";
    canvasContext.lineWidth = 5;
    canvasContextRef.current = canvasContext;
  }, []);

  const draw = ({ nativeEvent }) => {
    if(strokeToggle){
      if (!isDrawing) {
        return;
      }
      const { offsetX, offsetY } = nativeEvent;
      canvasContextRef.current.lineTo(offsetX, offsetY);
      canvasContextRef.current.stroke();
    }
    else  
      return
  };

  const startInput = ({ nativeEvent }) => {
    if(strokeToggle){
      const { offsetX, offsetY } = nativeEvent;
      canvasContextRef.current.beginPath();
      canvasContextRef.current.moveTo(offsetX, offsetY);
      setIsDrawing(true);
    }
    else
      return
  };

  const stopInput = () => {
    if(strokeToggle){
      canvasContextRef.current.closePath();
      setIsDrawing(false);
    }
    else  
      return
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const canvasContext = canvas.getContext("2d");
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleStrokeToggle = () => {
    setStrokeToggle(!strokeToggle)
  }

  const handleTextToggle = () => {
    setTextToggle(!textToggle)
  }

  return (
    <Flex backgroundColor="#B3B3B3" flexDir="column" p={7}>
      <Center>
        <HStack spacing={7}>
        <Button variant="solid" onClick={handleStrokeToggle}>Stroke</Button>
        <Button variant="solid" onClick={handleTextToggle}>Text</Button>
        <Button variant="solid" onClick={clearCanvas}>
          Clear
        </Button>
        </HStack>
        <br />
      </Center>
      <Center m={5}>
        <canvas
          style={{backgroundColor: "#ffffff"}}
          width="200px"
          height="200px"
          id="canvas"
          onMouseMove={draw}
          onMouseDown={startInput}
          onMouseUp={stopInput}
          ref={canvasRef}
        />
      </Center>
    </Flex>
  );
}

export default Canvas;
