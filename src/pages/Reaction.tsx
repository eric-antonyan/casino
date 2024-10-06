import React, {ChangeEvent, useEffect, useState} from "react";
import Header, {format} from "../components/Header";
import rocketIcon from "../assets/img/rocket.png";
import "../css/shadows.css";
import {motion} from "framer-motion";
import Snowfall from 'react-snowfall'
import {Simulate} from "react-dom/test-utils";
import reset = Simulate.reset;
import toast, {Toaster} from "react-hot-toast";
import {FaCheckCircle} from "react-icons/fa";
import {useSelector} from "react-redux";
import {RootState} from "../store";

const Reaction = () => {
    const [balance, setBalance] = useState(100);
    const [time, setTime] = useState<string | number>(5);
    const [opacity, setOpacity] = useState(1);
    const [gameStarted, setGameStarted] = useState(false);
    const [increment, setIncrement] = useState(1);
    const [timerStarted, setTimerStarted] = useState(false);
    const [gamePaused, setGamePaused] = useState(true);
    const [bet, setBet] = useState<number>(25);
    const [processBet, setProcessBet] = useState<number>(0);
    const [disabled, setDisabled] = useState(true);
    const [value, setValue] = useState<number>(25);
    const [random, setRandom] = useState(Math.floor(Math.random() * 50));

    const dark = useSelector((state: RootState) => state.theme.dark);

    useEffect(() => {
        if (timerStarted) {
            const intervalId = setInterval(() => {
                setTime((prevTime) => {
                    if (prevTime > 0 && typeof prevTime === "number") {
                        return prevTime - 1;
                    } else {
                        clearInterval(intervalId);
                        setGameStarted(true);
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

    useEffect(() => {
        let incrementInterval: ReturnType<typeof setInterval>;
        if (gameStarted) {
            incrementInterval = setInterval(() => {
                setIncrement((prevIncrement) => {
                    const newIncrement = prevIncrement + 0.01;

                    setProcessBet(bet * newIncrement)

                    return newIncrement;
                })
            }, 100);

            return () => clearInterval(incrementInterval); // Clear interval on cleanup
        }
    }, [gameStarted]);

    useEffect(() => {
        if (increment > random) {
            toast(`Вы проиграли ${format(processBet)}!`,
                {
                    icon: <motion.span initial={{scale: 0}} animate={{scale: 1}}>
                        <FaCheckCircle className={"text-secondary"}/>
                    </motion.span>,

                    style: {
                        borderRadius: '10px',
                        background: dark ? '#333' : '#fff',
                        color: dark ? '#fff' : '#333',
                        fontSize: '14px'
                    },
                }
            );
            handleReset()
        }
    }, [increment]);

    const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;

        // If the input is empty, set the value to 0.00
        if (inputValue === '') {
            setValue(parseInt(inputValue));
        } else {
            // Parse the input value as an integer, and check if it's a valid number
            const parsedValue = parseFloat(inputValue);
            if (!isNaN(parsedValue)) {
                setValue(parsedValue);
            }
        }
    };

    const handleReset = () => {
        setIncrement(1);
        setTime(5)
        setTimerStarted(false)
        setGameStarted(false)
        setGamePaused(true)
    }

    const handleLaunch = () => {
        setTimerStarted(true)
        setGamePaused(false)
        setBalance((balance) => balance - bet)
    }

    const handleGetBet = () => {
        setBalance(balance + (processBet - bet));
        handleReset()
        setProcessBet(bet)
    };

    const plus = () => {
        if (value <= 100) {
            setValue((value) => value + 1);
        }
    }

    const minus = () => {
        if (value > 0.1) {
            setValue((value) => value - 1);
        }
    }

    return (
        <>
            <Header balance={balance} back={true} backUrl={"/"}/>
            <div className="p-4">
                <div
                    className="rounded-2xl bg-black h-[200px] flex overflow-x-hidden border-2 border-primary items-center justify-center relative"
                >
                    <div
                        className={"absolute top-0 z-50 left-0 h-full w-full flex items-center justify-center rocket-backdrop "}>
                        <h3 className="text-white z-30 font-extrabold text-6xl">
                            {time > 0 ? time + "s" : "x" + increment.toFixed(2)}
                        </h3>
                    </div>
                    <Snowfall speed={[1, 1]} color={increment !== 1 ? "#fff" : "#000"}/>
                    <motion.div initial={{y: "0%", opacity: 0}} animate={{y: !gamePaused ? "-80%" : "", opacity: 1}}
                                className={`z-0 absolute bottom-0 ${increment !== 1 ? "animate-bounce relative before:w-[14px] before:h-[64px] before:top-[69px] before:absolute before:left-[50%] before:-translate-x-[50%] before:bg-gradient-to-b from-primary to-transparent" : ""}`}>
                        <img style={{scale: "0.7"}} src={rocketIcon} alt={""}/>
                    </motion.div>
                </div>
                {
                    timerStarted && processBet >= 0 ? (
                        <>
                            <div className={"flex justify-between"}>
                                <p className={`py-2 px-3 rounded-full text-sm font-bold mt-4 ${
                                    !dark ? 'bg-darker text-white' : 'bg-white text-darker'
                                }`}>Ставка: ${bet}</p>
                            </div>
                            <button
                                onClick={() => increment !== 1 ? handleGetBet() : null}
                                className={`text-white flex-1 flex flex-col items-center font-medium p-2 rounded-lg bg-primary mt-5 w-full`}>
                                <span
                                    className={"text-sm"}>${processBet > 0 ? (processBet - bet).toFixed(2) : (0).toFixed(2)}</span>
                                <span className={"text-sm"}>Забрать</span>
                            </button>
                        </>
                    ) : (
                        <>
                            <div className={"flex gap-4 bg-primary p-4 text-white mt-5 rounded-lg"}>
                                <button className={"text-lg"} onClick={() => setValue(0.1)}>
                                min
                                </button>
                                <button className={"text-lg"} onClick={minus}>
                                    -
                                </button>
                                <input
                                    type="number"
                                    step="0.01" // Allow the input to handle decimal values
                                    onChange={handleChangeValue}
                                    className={"outline-none w-full placeholder:text-black text-center font-bold"}
                                    value={value.toString().includes(".") && value.toString().split(".")[1].length > 1
                                        ? value.toString().split(".")[0] + "." + value.toString().split(".")[1].substring(0, 2)
                                        : value}  // Always display the value as a string with 2 decimals
                                />
                                <button className={"text-lg"} onClick={plus}>
                                    +
                                </button>
                                <button className={"text-lg"} onClick={() => setValue(balance)}>
                                    max
                                </button>
                            </div>
                            <button disabled={!gamePaused} onClick={handleLaunch}
                                    className={"bg-primary transition duration-150 disabled:opacity-50 w-full p-4 text-white rounded-2xl mt-5"}>
                                {time <= 0 ? (!timerStarted ? time : "started") : "Запустить"}
                            </button>
                        </>
                    )
                }

            </div>
            <Toaster />
        </>
    );
};

export default Reaction;
