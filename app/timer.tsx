import { Button, Card, Flex } from '@tremor/react'
import React, { useEffect, useRef, useState } from 'react'

// TODO: Tremor is interesting for the dashboard, but lets choose a component library for general design..
const Timer = () => {
    const [time, setTime] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [sec, setSec] = useState(0);
    const [start, setStart] = useState(false);
    const id = useRef<NodeJS.Timeout | undefined>(undefined)
    function decFun() {
        time - 5 < 0 ?
            alertOption()
            : setTime(prevCount => prevCount - 5);
    }

    function alertOption() {
        alert("Timer cannot be less than 00:00 Min!");
    }

    useEffect(() => {
        document.title = `${time < 10 ? '0' + time : time} : ${seconds < 10 ? '0' + seconds : seconds - 1} - Pomodoro Timer`;
    }, [sec])


    useEffect(() => {
        if (start) {
            startTimer()
        }
        else if (!start) {
            setStart(false)
            stopTimer()
        }
    }, [start])

    const startTimer = () => {
        let interval = setInterval(() => {
            setSec(prev => prev + 1);
        }
            , 1000)
        id.current = interval;
    }
    useEffect(() => {
        if (sec != 0 && start) {
            if (seconds == 0 && time == 0) {
                alert("Timer is up!");
                stopTimer();
                setStart(false);
            }
            else if (seconds == 0) {
                setSeconds(59);
                setTime(time => time - 1);
            }
            else {
                setSeconds(seconds => seconds - 1);
            }
        }
    }, [sec])

    const stopTimer = () => {
        setSeconds(0); setTime(0)
        clearInterval(id.current)
    }

    return (
        <>
            <Card>
                <Flex>
                    <Button
                        onClick={() => { setTime(1) }}
                    >
                        1 min
                    </Button>
                    <Button
                        onClick={() => { setTime(15) }}
                    >
                        15 min
                    </Button>
                    <Button
                        onClick={() => { setTime(25) }}
                    >
                        25 min
                    </Button>
                    <Button
                        onClick={() => { setTime(45) }}
                    >
                        45 min
                    </Button>
                </Flex>
            </Card>
            <Card>
                <Flex>
                    <Button
                        aria-label="Minus-Icon"
                        size="md"
                        onClick={() => { decFun(); }}
                        style={{padding: '10px'}}
                    >
                        Subtract 5 Minutes
                    </Button>
                    {time < 10 ? '0' + time : time}
                    :
                    {seconds < 10 ? '0' + seconds : seconds}
                    <Button
                        aria-label="Add-Icon"
                        size="md"
                        onClick={() => { setTime(prevCount => prevCount + 5) }}
                    >
                        Add 5 Minutes
                    </Button>
                </Flex>
            </Card>
            <Card>
                <Flex>
                    <Button
                        size="lg"
                        onClick={() => { setStart(!start); }}
                    >
                        {start ? 'Stop' : 'Start'}
                    </Button>
                    <Button
                        size="lg"
                    >
                        Clear
                    </Button>
                </Flex>
            </Card>
        </>
    )
}

export default Timer