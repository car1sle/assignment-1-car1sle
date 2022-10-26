import { useEffect, useState } from 'react';
import Button from '../generic/Button';
import Input from '../generic/Input';
import Counter from '../generic/CountingDisplay';
import { translateFromSeconds, translateToSeconds } from '../../utils/helpers';

const Stopwatch = () => {

    const [isRunning, setIsRunning] = useState(false);
    const [isComplete, setIsComplete] = useState(true);
    const [inputIsDisabled, setInputIsDisabled] = useState(false);
    const [time, setTime] = useState(0);
    const [inputHours, setInputHours] = useState(0);
    const [inputMinutes, setInputMinutes] = useState(0);
    const [inputSeconds, setInputSeconds] = useState(0);
    const [inputTime, setInputTime] = useState(0);

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
            setTime(inputTime);
            setIsComplete(true);
            setInputIsDisabled(false);
        } else if (value === 'Reset') {
            setTime(0);
            setIsComplete(true);
            setIsRunning(false);
            setInputIsDisabled(false);
        }
    }

    const makeInput = (state, setter, label) => {
        return <Input label={label} value={state} disabledValue={inputIsDisabled} onChange={e => {
            e.target.value ? setter(parseInt(e.target.value)) : setter(0);
        }} />
    };

    const makeButton = (value, disabledValue) => {
        return <Button value={value} disabledValue={disabledValue} inputTime={inputTime} onClick={handleClick} />
    };

    useEffect(() => {
        
        const totalSeconds = translateToSeconds(inputHours, inputMinutes, inputSeconds);
        setInputTime(totalSeconds);

    }, [inputHours, inputMinutes, inputSeconds]);

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
        <div style={{ textAlign: "center",}}>
            <Counter value={translateFromSeconds(time)} />
            <div style={{ margin: "10px 0 20px", display: "flex",}}>
                {makeButton("Start", !isComplete || (time === inputTime))}
                {makeButton("Pause", !isRunning || (time === inputTime))}
                {makeButton("Resume", isRunning || isComplete || (time === inputTime))}
                {makeButton("Fast Forward", isComplete || (time === inputTime))}
                {makeButton("Reset", isComplete && (time != inputTime))}
            </div>
            <div style={{ margin: "0 0 10px",display: "flex", justifyContent: "center", alignItems: "center",}}>
                <div style={{ width: "135px", textAlign: "right"}}>Set workout time:</div>
                {makeInput(inputHours, setInputHours, "H")}
                {makeInput(inputMinutes, setInputMinutes, "M")}
                {makeInput(inputSeconds, setInputSeconds, "S")}
            </div>
        </div>
    );
};

export default Stopwatch;