import { useEffect, useState } from 'react';

const Stopwatch = () => {

    const [time, setTime] = useState(0);
    const [inputTime, setInputTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {

        let i;

        if (isRunning) {
            i = setInterval(() => {
                setTime(time + 1);
            }, 1000);
            if (time >= inputTime) {clearInterval(i);}
        }

        return () => clearInterval(i);

    }, [time, isRunning, inputTime]);

    return (
        <>
            <div>{time}</div>
            Count to <input type="number" defaultValue={inputTime} onChange={e => {setInputTime(parseInt(e.target.value));}} /> seconds
            <div onClick={() => {setIsRunning(true);}}>Start</div>
            <div onClick={() => {setIsRunning(false);}}>Pause</div>
            <div onClick={() => {setIsRunning(true);}}>Resume</div>
        </>
    );
};

export default Stopwatch;
