import { useEffect, useState } from 'react';
import Button from '../generic/Button';
import Input from '../generic/Input';
import Counter from '../generic/Counter';
import { translateFromSeconds, translateToSeconds } from '../../utils/helpers';

const XY = () => {

    // States for countdown
    const [isRunning, setIsRunning] = useState(false);
    const [isComplete, setIsComplete] = useState(true);
    const [inputIsDisabled, setInputIsDisabled] = useState(false);
    const [time, setTime] = useState(0);
    const [inputHours, setInputHours] = useState(0);
    const [inputMinutes, setInputMinutes] = useState(0);
    const [inputSeconds, setInputSeconds] = useState(0);
    const [inputTime, setInputTime] = useState(0);
    // States for rounds
    const [round, setRound] = useState(1);
    const [counterRound, setCounterRound] = useState(1);
    const [inputRounds, setInputRounds] = useState(1);

    const handleClick = value => {
        switch(value) {
            case 'Start':
                setIsRunning(true);
                setIsComplete(false);
                setInputIsDisabled(true);
                break;
            case 'Pause':
                setIsRunning(false);
                break;
            case 'Resume':
                setIsRunning(true);
                break;
            case 'Fast Forward':
                setTime(0);
                setIsRunning(false);
                setIsComplete(true);
                setInputIsDisabled(false);
                setRound(inputRounds);
                setCounterRound(inputRounds);
                break;
            case 'Reset':
                setTime(inputTime);
                setIsComplete(true);
                setIsRunning(false);
                setInputIsDisabled(false);
                setRound(inputRounds);
                setCounterRound(1);
                break;
            default:
                break;
        }
    }

    const makeInput = (state, setter, relatedSetter, label) => {
        return <Input label={label} value={state} disabledValue={inputIsDisabled} onChange={e => {
            if (e.target.value) {
                setter(parseInt(e.target.value));
                relatedSetter(parseInt(e.target.value));
            } else {
                setter(0);
            }
        }} />
    };

    const makeButton = ({value, disabledValue}) => {
        return <Button value={value} disabledValue={inputTime ? disabledValue : true} onClick={handleClick} />
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
                if (round === 1) {
                    clearInterval(i);
                    setIsRunning(false);
                } else {
                    setTime(inputTime);
                    setRound(round - 1);
                    setCounterRound(counterRound + 1);
                }
            }
        }

        return () => clearInterval(i);

    }, [time, inputTime, isRunning, round, counterRound ]);

    return (
        <div style={{ textAlign: "center",}}>
            <Counter>{translateFromSeconds(time)}</Counter>
            <div style={{ margin: "15px 0 20px", fontStyle: "italic",}}>Round {counterRound} of {inputRounds}</div>
            <div style={{ margin: "10px 0 20px", display: "flex",}}>
                {makeButton({
                    value: "Start",
                    disabledValue: !isComplete || (time === 0)
                })}
                {makeButton({
                    value: "Pause",
                    disabledValue: !isRunning
                })}
                {makeButton({
                    value: "Resume",
                    disabledValue: isRunning || isComplete || (time === 0)
                })}
                {makeButton({
                    value: "Fast Forward",
                    disabledValue: isComplete || (time === 0)
                })}
                {makeButton({
                    value: "Reset",
                    disabledValue: isComplete && (time === inputTime)
                })}
            </div>
            <div style={{ margin: "0 0 10px",display: "flex", justifyContent: "center", alignItems: "center",}}>
                <div style={{ width: "135px", textAlign: "right"}}>Set workout time:</div>
                {makeInput(inputHours, setInputHours, setTime, "H")}
                {makeInput(inputMinutes, setInputMinutes, setTime, "M")}
                {makeInput(inputSeconds, setInputSeconds, setTime, "S")}
            </div>
            <div style={{ margin: "0 0 10px",}}>Set number of rounds: {makeInput(inputRounds, setInputRounds, setRound, "R")}</div>
        </div>
    );
};

export default XY;
