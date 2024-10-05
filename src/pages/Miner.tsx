import React, {ChangeEvent, useEffect, useState} from 'react';
import {motion} from "framer-motion"
import Header, {format} from "../components/Header";
import {useSelector} from "react-redux";
import {RootState} from "../store";
import winIcon from "../assets/img/win.PNG";
import lostIcon from "../assets/img/lost.PNG";
import toast, {Toaster} from "react-hot-toast";
import {FaCheckCircle} from "react-icons/fa";
import Coefficients from "../components/Coefficients";

const Miner = () => {
    const [bomb, setBomb] = useState<number>(1);
    const [bombs, setBombs] = useState<Array<boolean>>([]);
    const [gameStarted, setGameStarted] = useState<boolean>(false);
    const [balance, setBalance] = useState<number>(100);
    const [bet, setBet] = useState<number>(25);
    const [processBet, setProcessBet] = useState<number>(0);
    const [count, setCount] = useState<number>(0);
    const templateBombs = [1, 3, 5];
    const [value, setValue] = useState<number>(25);
    const [gameBoard, setGameBoard] = useState<Array<boolean | "incorrect" | "correct">>([]);
    const [gameEnded, setGameEnded] = useState(false);

    const boardSize = 5 * 5;

    const handleAggregate = () => {
        const boards: boolean[] = Array(boardSize).fill(true);

        const randoms: number[] = []

        for (let i = 0; i < bomb; i++) {
            let randomIndex = Math.floor(Math.random() * boardSize);
            while (randoms.includes(randomIndex)) {
                randomIndex = Math.floor(Math.random() * boardSize);
            }
            randoms.push(randomIndex)
            boards[randomIndex] = false;
        }

        setBombs(boards);
        setGameBoard(boards);
    };

    const showWinToast = () => {
        toast(`Поздравляем вы выиграли ${format(processBet)}!`,
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
    }

    const dark = useSelector((state: RootState) => state.theme.dark);

    useEffect(() => {
        handleAggregate();
    }, [bomb]);

    const handleChange = (value: number) => {
        setBomb(value);
        setGameEnded(false)
    };

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

    const handleOpen = (index: number) => {
        const isSuccess = bombs[index]; // Check the bomb status instead of gameStarted

        if (isSuccess) {
            setCount((prevCount) => {
                const newCount = prevCount + 1;
                setProcessBet(bet * coefficients[bomb][count]);
                if (newCount >= boardSize - bomb) {
                    setGameStarted(true)
                    handleGetBet()
                    setGameEnded(true);
                    showWinToast();
                }
                return newCount;
            });
            setGameBoard((prevBombs) => {
                const total = prevBombs.map((bomb, i) => (i === index ? "correct" : bomb));
                console.log(total);
                return total;
            });
        } else {
            setGameBoard((prevBombs) => {
                const total = prevBombs.map((bomb, i) => (i === index ? "incorrect" : bomb));
                console.log(total);
                return total;
            });
            setGameEnded(true)
            handleStop();
        }
    };

    const handleBet = () => {
        setBet(value);
        console.log(value)
    };

    const handleStart = () => {
        if (value > balance) {
            alert(`balance influenced`)
        } else {
            setGameStarted(true);
            setBalance(balance - value);
            handleAggregate();
            setGameEnded(false);
            setCount(0);
            handleBet();
        }
    };

    const handleStop = () => {
        setProcessBet(0);
        setGameEnded(true)
        setGameStarted(false);
    };

    const handleGetBet = () => {
        setBalance(balance + processBet);
        handleStop();
        if (!gameEnded) {
            showWinToast()
        }
    };

    const coefficients: { [key: number]: number[] } = {
        1: [0.99, 1.04, 1.09, 1.14, 1.19, 1.26, 1.33, 1.4, 1.49, 1.59, 1.71, 1.84, 1.99, 2.17, 2.39, 2.65, 2.98, 3.41, 3.98, 4.78, 5.97, 7.96, 11.94, 23.88],
        3: [1.09, 1.24, 1.43, 1.65, 1.93, 2.27, 2.69, 3.23, 3.92, 4.83, 6.03, 7.68, 9.98, 13.31, 18.76, 26.15, 39.22, 62.76, 109.83, 219.65, 549.13, 2196.5],
        5: [1.19, 1.51, 1.93, 2.49, 3.27, 4.36, 5.92, 8.2, 11.62, 16.9, 25.34, 39.42, 64.06, 192.83, 201.53, 402.69, 906.03, 1937.37, 2968.69],
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
            <Header back={true} balance={balance} backUrl={"/"}/>
            <div className={`p-5 ${dark ? "text-white" : "text-darker"}`}>
                <div className='grid grid-cols-5 gap-3'>
                    {bombs.map((bombState, i) => (
                        !gameEnded ? (
                            <div
                                key={i}
                                onClick={() => (gameStarted && (gameBoard[i] !== "incorrect" && gameBoard[i] !== "correct")) && handleOpen(i)}
                                className={`cursor-pointer flex items-center justify-center aspect-square rounded-2xl ${dark ? "bg-slate-800" : "bg-gray-200"}`}
                            >
                                {!bombState && gameBoard[i] === "incorrect" ? (
                                    <motion.img initial={{scale: 0}} animate={{scale: 1}} className={"w-[70%]"}
                                                src={lostIcon}/>
                                ) : gameBoard[i] === "correct" ? (
                                    <motion.img initial={{scale: 0}} animate={{scale: 1}} className={"w-[70%]"}
                                                src={winIcon}/>
                                ) : ""}
                            </div>
                        ) : (
                            <div
                                key={i}
                                onClick={() => (gameStarted && (gameBoard[i] !== "incorrect" && gameBoard[i] !== "correct")) && handleOpen(i)}
                                className={`cursor-pointer flex items-center justify-center aspect-square rounded-2xl ${dark ? "bg-slate-800" : "bg-gray-200"}`}
                            >
                                {!bombState ? (
                                    <motion.img initial={{scale: 0}} animate={{scale: 1}} className={"w-[70%]"}
                                                src={lostIcon}/>
                                ) : gameBoard[i] === "correct" ? (
                                    <motion.img initial={{scale: 0}} animate={{scale: 1}} className={"w-[70%]"}
                                                src={winIcon}/>
                                ) : null}
                            </div>
                        )
                    ))}
                </div>

                {gameStarted && (
                    <>
                        <Coefficients  coefficients={coefficients} bomb={bomb} count={count} />
                        <div className={"flex justify-between"}>
                            <p className={`py-2 px-3 rounded-full text-sm font-bold mt-4 ${
                                !dark ? 'bg-darker text-white' : 'bg-white text-darker'
                            }`}>Ставка: ${bet}</p>
                        </div>
                    </>
                )}

                {!gameStarted ? (
                    <>
                        <h2 className={"mt-5 font-bold"}>Бомбы</h2>
                        <div className={"flex gap-4 mt-2"}>
                            {templateBombs.map((varBomb) => (
                                <button key={varBomb} onClick={() => handleChange(varBomb)}
                                        className={`${varBomb === bomb ? "bg-secondary" : "bg-primary"} text-white font-bold flex-1 p-3 rounded-lg`}>
                                    {varBomb}
                                </button>
                            ))}
                        </div>
                        <h2 className={"mt-5 font-bold"}>Ставка</h2>
                        <div className={"flex gap-4 bg-primary p-4 text-white mt-2 rounded-lg"}>
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
                        <button onClick={handleStart}
                                className={`text-white flex-1 font-bold p-4 rounded-lg cursor-pointer bg-primary mt-5 w-full`}>
                            Играть
                        </button>
                    </>
                ) : (
                    <>
                        <button onClick={() => count > 0 && handleGetBet()}
                                className={`text-white flex-1 flex flex-col items-center font-medium p-2 rounded-lg bg-primary mt-5 w-full ${count <= 0 ? "opacity-50" : ""}`}>
                            <span className={"text-sm"}>${processBet.toFixed(2)}</span>
                            <span className={"text-sm"}>Забрать</span>
                        </button>
                    </>
                )}
            </div>
            <Toaster position={"top-center"}/>
        </>
    );
};

export default Miner;
