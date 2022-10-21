import { useEffect, useState } from 'react';
import Button from '../generic/Button';

const Countdown = () => {

    const [time, setTime] = useState(0);
    const [inputTime, setInputTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [isComplete, setIsComplete] = useState(true);
    const [inputIsDisabled, setInputIsDisabled] = useState(false);

    const handleClick = value => {
        if (value === "Start") {
            setIsRunning(true);
            setIsComplete(false);
            setInputIsDisabled(true);
        } else if (value === "Pause") {
            setIsRunning(false);
        } else if (value === "Resume") {
            setIsRunning(true);
        } else if (value === 'Fast Forward') {
            setTime(0);
            setIsComplete(true);
            setInputIsDisabled(false);
        } else if (value === 'Reset') {
            setTime(inputTime);
            setIsComplete(true);
            setIsRunning(false);
            setInputIsDisabled(false);
        }
    }

    useEffect(() => {

        let i;

        if (isRunning) {
            i = setInterval(() => {
                setTime(time - 1);
            }, 1000);
            if (time === 0) {
                clearInterval(i);
                setIsRunning(false);
            }
        }

        return () => clearInterval(i);

    }, [time, inputTime, isRunning]);

    return (
        <>
            <div>{time}</div>
            Count down from <input type="number" defaultValue={inputTime} disabled={inputIsDisabled} onChange={e => {
                setInputTime(parseInt(e.target.value));
                setTime(parseInt(e.target.value));
            }} />
            <Button value="Start" disabledValue={!isComplete || (time != inputTime)} inputTime={inputTime} onClick={handleClick} />
            <Button value="Pause" disabledValue={!isRunning} inputTime={inputTime} onClick={handleClick} />
            <Button value="Resume" disabledValue={(isRunning || isComplete || (time === 0))} inputTime={inputTime} onClick={handleClick} />
            <Button value="Fast Forward" disabledValue={isComplete || (time === 0)} inputTime={inputTime} onClick={handleClick} />
            <Button value="Reset" disabledValue={isComplete && (time === inputTime)} inputTime={inputTime} onClick={handleClick} />
        </>
    );
};

export default Countdown;