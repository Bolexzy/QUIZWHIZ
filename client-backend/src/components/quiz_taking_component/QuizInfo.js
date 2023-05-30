import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@chakra-ui/react'



export default function QuizInfo({ startTime, endTime, submitQuiz }) {

    const [rerender, setRerender] = useState(false)
    let minref = useRef()
    let secref = useRef()
    let animationFrameRef = useRef()

    minref.current = (Math.floor((endTime - Date.now()) / 1000 / 60))
    secref.current = (((endTime - Date.now()) / 1000) % 60).toFixed(0)

    function displayTimer (){
        minref.current = (Math.floor((endTime - Date.now()) / 1000 / 60))
        secref.current = (((endTime - Date.now()) / 1000) % 60).toFixed(0)
        setRerender((prevState)=> !prevState)
        requestAnimationFrame(displayTimer)
    }

    useEffect(()=>{
        animationFrameRef.current = requestAnimationFrame(displayTimer)
        return ()=> cancelAnimationFrame(animationFrameRef.current)
    }, [])
    



    return (
        <div style={{display:'flex', justifyContent:'space-between'}}>
            <div>Remaining time : {minref.current}:{secref.current}</div>
            <div>
            <Button colorScheme='green' onClick={submitQuiz}>Submit</Button>
            </div>
        </div>
    )
}