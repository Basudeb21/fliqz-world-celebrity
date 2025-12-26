import { useEffect, useState } from 'react';

const getTimeLeft = (deadline) => {
    if (!deadline) {
        return { days: '00', hours: '00', minutes: '00', seconds: '00' };
    }

    const diff = new Date(deadline).getTime() - Date.now();

    if (isNaN(diff) || diff <= 0) {
        return { days: '00', hours: '00', minutes: '00', seconds: '00' };
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return {
        days: String(days).padStart(2, '0'),
        hours: String(hours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0'),
    };
};

const useCountdown = (deadline) => {
    const [timeLeft, setTimeLeft] = useState(getTimeLeft(deadline));

    useEffect(() => {
        if (!deadline) return;

        const interval = setInterval(() => {
            setTimeLeft(getTimeLeft(deadline));
        }, 1000);

        return () => clearInterval(interval);
    }, [deadline]);

    return timeLeft;
};

export default useCountdown;
