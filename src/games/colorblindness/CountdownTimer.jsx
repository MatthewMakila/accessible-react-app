import React, { useState, useEffect } from 'react';
import { ProgressBar } from 'react-bootstrap';

function CountdownTimer({ initialTime, onComplete}) {
    const [timeRemaining, setTimeRemaining] = useState(initialTime);

    useEffect(() => {
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

    const progress = (timeRemaining / initialTime) * 100;

    return (
        <ProgressBar variant="danger" animated now={progress} label={`${Math.max(0, timeRemaining)}s`} />
    );
}

export default CountdownTimer;