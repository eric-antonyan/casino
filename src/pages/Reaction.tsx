import { useEffect, useState } from "react";
import Header from "../components/Header";

const Reaction = () => {
    const [balance, setBalance] = useState(100);
    const [time, setTime] = useState<string | number>(5);
    const [opacity, setOpacity] = useState(1);
    const [gameStarted, setGameStarted] = useState(false);
    const [increment, setIncrement] = useState(0);
    const [timerStarted, setTimerStarted] = useState(false);

    const [random, setRandom] = useState(Math.floor(Math.random() * 50));

    console.log(random)

    // Countdown timer effect
    useEffect(() => {
        if (timerStarted) {
            const intervalId = setInterval(() => {
                setTime((prevTime) => {
                    if (prevTime > 0 && typeof prevTime === "number") {
                        return prevTime - 1;
                    } else {
                        clearInterval(intervalId); // Clear the interval when time hits 0
                        setGameStarted(true); // Start the game when time reaches 0
                        return 0;
                    }
                });

                setOpacity((prevOpacity) => {
                    if (time > 0) {
                        return prevOpacity - 0.1;
                    } else {
                        return 0;
                    }
                });
            }, 1000);

            return () => clearInterval(intervalId);
        }
    }, [time, timerStarted]);

    // Start incrementing after time reaches 0 (game started)
    useEffect(() => {
        let incrementInterval: ReturnType<typeof setInterval>;
        if (gameStarted) {
            incrementInterval = setInterval(() => {
                setIncrement((prevIncrement) => prevIncrement + 0.05); // Incrementing by 0.1 each second
            }, 50);

            // return () => clearInterval(incrementInterval); // Clear interval on cleanup
        }
    }, [gameStarted]);

    const handleClick = () => {
        alert("You winning")
    };

    const handleLaunch = () => setTimerStarted((started) => !started)

    return (
        <>
            <Header balance={balance} back={true} backUrl={"/"} />
            <div className="p-4">
                <div
                    onClick={() => time === 0 && increment > 0.01 && increment <= random ? handleClick() : null}
                    className="rounded-2xl bg-black h-[200px] flex border-2 border-secondary items-center justify-center"
                >
                    <h3 className="text-secondary text-3xl">
                        {time > 0 ? time : increment}
                    </h3>
                </div>
                <button onClick={handleLaunch} className={"bg-secondary w-full p-4 text-white rounded-2xl mt-5"}>
                    {time <= 0 ? (!timerStarted ? time : "started") : "Запустить"}
                </button>
            </div>
        </>
    );
};

export default Reaction;
