import React, { FC, useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {useSelector} from "react-redux";
import {RootState} from "../store";

interface Coefficientable {
    coefficients: { [key: number]: number[] };
    bomb: number;
    count: number;
}

const Coefficients: FC<Coefficientable> = ({ coefficients, bomb, count }) => {
    const ulRef = useRef<HTMLUListElement>(null);
    const [left, setLeft] = useState(12);
    const [width, setWidth] = useState(64); // Default width
    const ref = useRef<HTMLLIElement>(null);

    const dark = useSelector((state: RootState) => state.theme.dark);

    useEffect(() => {
        if (ulRef.current) {
            const liElements = ulRef.current.children;
            if (liElements.length >= count) {
                const selectedLi = liElements[count + 1] as HTMLElement;
                if (selectedLi) {
                    const liOffsetLeft = selectedLi.offsetLeft;
                    const liWidth = selectedLi.offsetWidth; // Get width of the selected li
                    setLeft(liOffsetLeft - 12);
                    setWidth(liWidth + 24); // Set width of the motion div
                }
            }
        }
    }, [count, coefficients, bomb]);

    useEffect(() => {
        if (ref.current) {
            ref.current.scrollIntoView({
                behavior: 'smooth', // Smooth scrolling
                inline: 'center', // Horizontal scrolling to the center of the parent container
                block: 'nearest', // Align the item vertically to the nearest edge
            });
        }
    }, [count]);

    return (
        <ul className={`w-full h-[60px] relative ${dark ? "bg-slate-800" : "bg-gray-200"} mt-4 rounded-2xl overflow-auto px-5 overscroll-x-none flex items-center gap-6`} ref={ulRef}>
            <motion.div
                className={`${dark ? "bg-darker" : "bg-white"} h-[40px] absolute rounded-2xl`}
                animate={{ left: left }} // Adjust the left position
                transition={{ type: "spring", stiffness: 300, damping: 30 }} // Spring animation
                style={{ left: left + 24, width: width }} // Set dynamic width
            />
            {coefficients[bomb].map((coefficient, i) => (
                <li
                    key={i}
                    ref={i === count ? ref : null} // Attach ref to the active element
                    className={`z-30 ${
                        coefficient === coefficients[bomb][count]
                            ? "flex items-center justify-center text-secondary"
                            : "text-primary"
                    } font-bold`}
                >
                    x{coefficient}
                </li>
            ))}
        </ul>
    );
}

export default Coefficients;
