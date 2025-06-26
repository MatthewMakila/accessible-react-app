import React, { useState, useEffect } from 'react';
import { ProgressBar } from 'react-bootstrap';

function CountdownTimer({ initialTime, onComplete}) {
    const [timeRemaining, setTimeRemaining] = useState(initialTime);

    useEffect(() => { // interval to decrease time by 1/sec 
        const intervalId = setInterval(() => {
            setTimeRemaining((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(intervalId);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => { // trigger action when timer ends
        if (timeRemaining === 0 && typeof onComplete === 'function') {
            onComplete(); // trigger callback when timer ends
        }
    }, [timeRemaining, onComplete]);

    const progress = (timeRemaining / initialTime) * 100; // calculate proportion for progress 

    return (
        <ProgressBar variant="info" animated now={progress} label={`${Math.max(0, timeRemaining)}s`} />
    );
}

export default CountdownTimer;