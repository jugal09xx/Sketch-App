import React from 'react'
import Canvas from '../canvas/Canvas';
import {Box,Heading,Center} from '@chakra-ui/react'

function Main() {
  return (
    <Box p={0}>
    <Center p={2}>
      <Heading>React Drawing App</Heading>
      </Center>
      <Canvas/>      
    </Box>
  )
}

export default Main
