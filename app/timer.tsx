import { Button, Card } from '@tremor/react'
import React, { useEffect, useRef, useState } from 'react'
import { CountdownCircleTimer, useCountdown } from 'react-countdown-circle-timer'

// TODO: Tremor is interesting for the dashboard, but lets choose a component library for general design..
const Timer = () => {
    const [time, setTime] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [sec, setSec] = useState(0);
    const [start, setStart] = useState(false);
    const [key, setKey] = useState(0);
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

    const renderTime = ({ remainingTime }) => {
        if (remainingTime === 0) {
          return <div className="timer">Too lale...</div>;
        }
      
        return (
          <div className="timer">
            <div className="text">Remaining</div>
            <div className="value">{remainingTime}</div>
            <div className="text">seconds</div>
          </div>
        );
      };

    return (
        <>
            <Card>
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
            </Card>
            <Card>
                    <Button
                        aria-label="Minus-Icon"
                        size="md"
                        onClick={() => { decFun(); }}
                        style={{padding: '10px'}}
                    >
                        Subtract 5 Minutes
                    </Button>
                    {'~t'}
                    {time < 10 ? '0' + time : time}
                    :
                    {seconds < 10 ? '0' + seconds : seconds}
                    {'~t'}

                    <CountdownCircleTimer
                        key={key}
                        isPlaying
                        duration={10}
                        colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                        colorsTime={[7, 5, 2, 0]}
                        //onComplete={() => [true, 1000]}
                    >
                        {/* {({ remainingTime }) => remainingTime} */}
                        {renderTime}
                    </CountdownCircleTimer>
                    <Button
                        aria-label="Add-Icon"
                        size="md"
                        onClick={() => { setTime(prevCount => prevCount + 5) }}
                    >
                        Add 5 Minutes
                    </Button>
            </Card>
            <Card>
                    <Button
                        size="lg"
                        color="amber"
                        onClick={() => { setStart(!start); }}
                    >
                        {start ? 'Stop' : 'Start'}
                    </Button>
                    <Button
                        size="lg"
                        variant='secondary'
                        onClick={() => { setKey(prevKey => prevKey + 1) }}
                    >
                        Clear
                    </Button>
            </Card>
        </>
    )
}

export default Timer