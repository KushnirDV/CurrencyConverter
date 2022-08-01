import React, { useCallback, useRef } from 'react';

const useThrottle = (callback, delay) => {
    const run = useRef();
    
    const throttleCallback = useCallback((...args) => {
        if(!run.current){
            callback(args);
            run.current = true;
        }
        setTimeout(() => {
            run.current = false;
        }, delay)
    }, [callback, delay]);

    return throttleCallback;
};

export default useThrottle;