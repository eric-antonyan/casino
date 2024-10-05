import Input from "./Input";
import { FaPaperPlane } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { AnimatePresence, motion } from "framer-motion";
import {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../store";

const ChatBot = ({ setChat }: { setChat: any }) => {
    const ref = useRef<HTMLFormElement>(null);
    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

    const dark = useSelector((state: RootState) => state.theme.dark);

    const handleClose = () => {
        setChat(false);
    }

    useEffect(() => {
        const updateFormPosition = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);

            // Correct check for ref.current
            if (!ref.current) {
                return;
            }

            // Adjust bottom position based on keyboard visibility
            if (isKeyboardVisible) {
                ref.current.classList.add("bottom-[200px]"); // Adjust value as needed
                ref.current.classList.remove("bottom-10");
            } else {
                ref.current.classList.add("bottom-10");
                ref.current.classList.remove("bottom-[200px]");
            }
        };

        // Keyboard visibility detection
        const handleResize = () => {
            const currentHeight = window.innerHeight;
            const screenHeight = window.screen.height;

            // If the current viewport height is significantly smaller than the screen height, the keyboard is likely open
            if (currentHeight < screenHeight * 0.75) {
                setIsKeyboardVisible(true);
            } else {
                setIsKeyboardVisible(false);
            }
            updateFormPosition();
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Trigger on component mount

        return () => window.removeEventListener('resize', handleResize);
    }, [isKeyboardVisible]);

    return (
        <AnimatePresence>
            <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                className={`h-screen z-50 fixed top-0 left-0 w-full ${dark ? "bg-darker" : "bg-white"} flex flex-col py-5`}
            >
                <div className={`flex relative justify-center ${!dark ? "text-darker" : "text-white"} px-5 font-extrabold flex-col items-center`}>
                    <h3 className={"text-2xl"}>Тех. поддержка</h3>
                    <p>Мы всегда <span className={"text-primary"}>в сети</span></p>
                    <div className={"text-3xl absolute top-1/2 right-5 -translate-y-1/2"}>
                        <FaXmark onClick={handleClose} />
                    </div>
                </div>
                <div className={"flex-1"}></div>
                <form ref={ref} className={"sticky transition-all duration-150 bottom-5 flex rounded-2xl overflow-hidden"}>
                    <Input onFocus={(e) => {
                        if (!ref.current) return;

                        ref.current.classList.add("-translate-y-5")
                        ref.current.classList.remove("rounded-2xl")
                    }} onBlur={(e) => {
                        if (!ref.current) return;

                        ref.current.classList.remove("-translate-y-5")
                        ref.current.classList.add("rounded-2xl")
                        window.scrollTo({
                            behavior: "smooth",
                            top: 100,
                        })

                    }} placeholder={"Введите сообщения..."} className={`w-full rounded-none ${dark ? "bg-black" : "bg-gray-100"}`} />
                    <button className={`bg-primary h-[50px] w-[50px] flex items-center justify-center p-3`}>
                        <FaPaperPlane className={"text-white"} />
                    </button>
                </form>
            </motion.div>
        </AnimatePresence>
    );
};

export default ChatBot;
