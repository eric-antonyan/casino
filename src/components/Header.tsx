import logo from "../assets/img/moolat.jpg";
import { motion } from "framer-motion";
import { FC, useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import {useSelector, useDispatch} from "react-redux";
import {toggleTheme} from "../themeSlice";
import {RootState} from "../store";
import {FaChevronLeft} from "react-icons/fa6";
import {Link} from "react-router-dom";

interface HeaderProps {
    balance: number;
    back?: boolean;
    backUrl?: string;
    backDisabled?: boolean;
}

export const format = (number: number) => {
    return Intl.NumberFormat('ru-RU', {
        currency: 'AMD',
        style: 'currency'
    }).format(number);
};

const Header: FC<HeaderProps> = ({ balance, backDisabled, back, backUrl }) => {

    const dark = useSelector((state: RootState) => state.theme.dark); // Select dark state from Redux
    const dispatch = useDispatch();

    const handleThemeToggle = () => {
        dispatch(toggleTheme()); // Dispatch action to toggle theme
    };


    return (
        <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex flex-col sticky top-0 py-4 z-10 ${
                dark ? 'bg-darker text-white' : 'bg-white text-darker'
            }`}
        >
            <div className="flex items-center p-4 justify-between">
                <div
                    className={`py-2 px-3 rounded-full text-sm font-bold ${
                        !dark ? 'bg-darker text-white' : 'bg-white text-darker'
                    }`}
                >
                    <span>{format(balance)}</span>
                </div>
                <div className="flex font-bold gap-3 items-center">
                    <button className="bg-primary px-3 py-2 text-sm text-white rounded-2xl">
                        Пополнить
                    </button>
                    <button className="bg-secondary px-3 py-2 text-sm text-white rounded-2xl">
                        Вывести
                    </button>
                </div>
            </div>
            <div className={`switcher px-4 flex ${back ? "justify-between" : "justify-end"} items-center w-full`}>
                {
                    back ? (
                        backUrl && <Link to={backUrl} className={"flex items-center font-bold text-lg"}><FaChevronLeft /> Назад</Link>
                    ) : null
                }
                <button
                    onClick={handleThemeToggle}
                    className={`switch relative flex gap-5 text-lg p-2 rounded-full transition-colors duration-150 ${
                        !dark ? 'bg-darker' : 'bg-white'
                    }`}
                >
                    <div
                        className={`absolute transition-transform duration-150 top-0 z-0 h-full rounded-full aspect-square ${
                            !dark ? 'bg-white left-0' : 'bg-darker right-0'
                        }`}
                    ></div>
                    <FaSun className={`z-10 ${dark ? 'text-black' : 'text-black'}`}/>
                    <FaMoon className={`z-10 ${!dark ? 'text-white' : 'text-white'}`}/>
                </button>

            </div>
        </motion.header>
    );
};

export default Header;
