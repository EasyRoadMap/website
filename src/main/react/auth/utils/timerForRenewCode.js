// on response start timer
// show time 
// etc

export const timer = (callback, setTime) => {
    const interval = setInterval(() => {
        setTime((prevTime) => {
            const newTime = prevTime - 1;
            if (newTime <= 0) {
                callback();
                clearInterval(interval);
                return 0;
            }
            return newTime;
        });
        
    }, 1000);

    return () => {
        clearInterval(interval);
    };
}