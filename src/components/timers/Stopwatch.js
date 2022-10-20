import { useEffect, useState } from 'react';
import Button from '../generic/Button';

const Stopwatch = () => {

    const [time, setTime] = useState(0);
    const [inputTime, setInputTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    const handleClick = (e, isRunning, isPaused) => {
        setIsRunning(isRunning);
        setIsPaused(isPaused);
        // Disable button after it's been clicked once
        e.currentTarget.disabled = true;
    }

    useEffect(() => {

        let i;

        if (isRunning) {
            i = setInterval(() => {
                setTime(time + 1);
            }, 1000);
            if (time >= inputTime) {
                clearInterval(i);
                setIsRunning(false);
            }
        }

        return () => clearInterval(i);

    }, [time, inputTime, isRunning]);

    return (
        <>
            <div>{time}</div>
            Count to <input type="number" defaultValue={inputTime} onChange={e => {setInputTime(parseInt(e.target.value));}} /> seconds
            <Button value="Start" disabledValue={!inputTime} onClick={handleClick} setIsRunning={true} setIsPaused={false} />
            <Button value="Pause" disabledValue={!isRunning} onClick={handleClick} setIsRunning={false} setIsPaused={true} />
            <Button value="Resume" disabledValue={!isPaused} onClick={handleClick} setIsRunning={true} setIsPaused={false} />
        </>
    );
};

export default Stopwatch;
