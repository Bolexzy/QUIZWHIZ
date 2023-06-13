import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@chakra-ui/react'



export default function QuizInfo({ startTime, endTime, submitQuiz }) {

    let stoprequestAnimationframe = useRef(false)

    const [rerender, setRerender] = useState(false)
    let minref = useRef()
    let secref = useRef()
    let animationFrameRef = useRef()
    let windowFocusEvent = useRef()

    minref.current = (Math.floor((endTime - Date.now()) / 1000 / 60))
    secref.current = (((endTime - Date.now()) / 1000) % 60).toFixed(0)

    function displayTimer() {
        minref.current = (Math.floor((endTime - Date.now()) / 1000 / 60))
        secref.current = (((endTime - Date.now()) / 1000) % 60).toFixed(0)
        setRerender((prevState) => !prevState)
        if (Date.now() >= endTime) {
            cancelAnimationFrame(animationFrameRef.current)
            stoprequestAnimationframe.current = true;
            submitQuiz()
        }
        if (!stoprequestAnimationframe.current) {
            animationFrameRef.current = requestAnimationFrame(displayTimer)
        }
    }

    useEffect(() => {
        animationFrameRef.current = requestAnimationFrame(displayTimer)
        return () => cancelAnimationFrame(animationFrameRef.current)
    }, [])


    function handleWindowBlur() {
        window.removeEventListener('blur', handleWindowBlur, false);
        cancelAnimationFrame(animationFrameRef.current)
        stoprequestAnimationframe.current = true;
        submitQuiz()
    }

    useEffect(() => {
        window.addEventListener('blur', handleWindowBlur, false);
        return () => window.removeEventListener('blur', handleWindowBlur, false);
    }, [])




    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }} className='p-2'>
            <div>Remaining time : {minref.current}:{secref.current}</div>
            <div>
                <Button colorScheme='green' onClick={submitQuiz}>Submit</Button>
            </div>
        </div>
    )
}