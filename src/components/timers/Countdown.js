import { useEffect, useState } from 'react';
import Button from '../generic/Button';
import { translateFromSeconds } from '../../utils/helpers';

const Countdown = () => {

    const [time, setTime] = useState(0);
    const [inputHours, setInputHours] = useState(0);
    const [inputMinutes, setInputMinutes] = useState(0);
    const [inputSeconds, setInputSeconds] = useState(0);
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
        
        const totalSeconds = ((inputHours * 60) * 60) + (inputMinutes * 60) + inputSeconds;
        setInputTime(totalSeconds);
        setTime(totalSeconds);

    }, [inputHours, inputMinutes, inputSeconds]);

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
            <div>{translateFromSeconds(time)}</div>
            Count down from
            <br></br>
            <input type="number" min="0" value={inputHours} disabled={inputIsDisabled} onChange={e => {
                e.target.value ? setInputHours(parseInt(e.target.value)) : setInputHours(0);
                e.target.value && setTime(parseInt(e.target.value));
            }} /> H
            <input type="number" min="0" value={inputMinutes} disabled={inputIsDisabled} onChange={e => {
                e.target.value ? setInputMinutes(parseInt(e.target.value)) : setInputMinutes(0);
                e.target.value && setTime(parseInt(e.target.value));
            }} /> M
            <input type="number" min="0" value={inputSeconds} disabled={inputIsDisabled} onChange={e => {
                e.target.value ? setInputSeconds(parseInt(e.target.value)) : setInputSeconds(0);
                e.target.value && setTime(parseInt(e.target.value));
            }} /> S
            <br></br>
            <Button value="Start" disabledValue={!isComplete || (time != inputTime)} inputTime={inputTime} onClick={handleClick} />
            <Button value="Pause" disabledValue={!isRunning} inputTime={inputTime} onClick={handleClick} />
            <Button value="Resume" disabledValue={(isRunning || isComplete || (time === 0))} inputTime={inputTime} onClick={handleClick} />
            <Button value="Fast Forward" disabledValue={isComplete || (time === 0)} inputTime={inputTime} onClick={handleClick} />
            <Button value="Reset" disabledValue={isComplete && (time === inputTime)} inputTime={inputTime} onClick={handleClick} />
        </>
    );
};

export default Countdown;