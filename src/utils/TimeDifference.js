const TimeDifference = (start, end) => {
    const startTime = new Date(start);
    const endTime = new Date(end);

    const diffMs = endTime - startTime;

    const diffHours = diffMs / (1000 * 60 * 60);

    return `${diffHours.toFixed(1)} hrs`;
};

export default TimeDifference;
