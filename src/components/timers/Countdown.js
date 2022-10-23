import { useEffect, useState } from 'react';
import Button from '../generic/Button';
import Input from '../generic/Input';
import { translateFromSeconds, translateToSeconds } from '../../utils/helpers';

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

    const makeInput = (state, setter) => {
        return <Input state={state} inputIsDisabled={inputIsDisabled} onChange={e => {
            if (e.target.value) {
                setter(parseInt(e.target.value));
                setTime(parseInt(e.target.value));
            } else {
                setter(0);
            }
        }} />
    };

    const makeButton = (value, disabledValue) => {
        return <Button value={value} disabledValue={disabledValue} inputTime={inputTime} onClick={handleClick} />
    };

    useEffect(() => {
        
        const totalSeconds = translateToSeconds(inputHours, inputMinutes, inputSeconds);
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
            {makeInput(inputHours, setInputHours)} H
            {makeInput(inputMinutes, setInputMinutes)} M
            {makeInput(inputSeconds, setInputSeconds)} S
            <br></br>
            {makeButton("Start", !isComplete || (time != inputTime))}
            {makeButton("Pause", !isRunning)}
            {makeButton("Resume", isRunning || isComplete || (time === 0))}
            {makeButton("Fast Forward", isComplete || (time === 0))}
            {makeButton("Reset", isComplete && (time === inputTime))}
        </>
    );
};

export default Countdown;