import { useEffect } from 'react';
import { translateToSeconds } from '../utils/helpers';

// Initialize inputTime (and usually time)
export const useTimeSetter = (setter, input1, input2, input3) => {
    useEffect(() => {
        setter(translateToSeconds(input1, input2, input3));
    }, [input1, input2, input3]);
};