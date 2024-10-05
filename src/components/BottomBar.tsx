import {FaComment, FaGift, FaUserPlus} from "react-icons/fa";
import {FaCircleInfo} from "react-icons/fa6";
import {motion} from "framer-motion";
import React, {useState} from "react";
import ChatBot from "./ChatBox";
import {AnimatePresence} from "framer-motion"
import {useSelector} from "react-redux";
import {RootState} from "../store";
import {Link} from "react-router-dom";

const BottomBar = ({setChat}: {setChat: any}) => {
    const dark = useSelector((state: RootState) => state.theme.dark); // Select dark state from Redux

    const handleOpen = () => {
        setChat(true);
    }
    return (
        <>
            <div className={"sticky bottom-0"}>
                <div className={"flex justify-end px-5"}>
                    <div onClick={handleOpen} className={"bg-primary text-3xl p-3 rounded-full "}>
                        <FaComment className={"text-white"}/>
                    </div>
                </div>
                <footer className={`flex p-5 gap-5 ${dark ? "bg-darker" : "bg-white"}`}>
                    <motion.div initial={{opacity: 0, scale: 0.5}} whileInView={{opacity: 1, scale: 1}}
                                transition={{delay: 0 * 0.5}}
                                className={"p-3 text-3xl bg-primary flex rounded-2xl flex-1 items-center justify-center"}>
                        <FaGift className={"text-white"}/>
                    </motion.div>
                    <motion.div initial={{opacity: 0, scale: 0.5}} whileInView={{opacity: 1, scale: 1}}
                                transition={{delay: 1 * 0.5}}
                                className={"p-3 text-3xl bg-secondary rounded-2xl flex text-primary-shadow flex-1 items-center justify-center"}>
                        <FaUserPlus className={"text-white"}/>
                    </motion.div>
                    <Link to={"/account"} className={"flex-1"}>
                        <motion.div initial={{opacity: 0, scale: 0.5}} whileInView={{opacity: 1, scale: 1}}
                                    transition={{delay: 2 * 0.5}}
                                    className={"p-3 text-3xl bg-primary rounded-2xl flex text-primary-shadow flex-1 items-center justify-center"}>
                            <FaCircleInfo className={"text-white"}/>
                        </motion.div>
                    </Link>
                </footer>
            </div>
        </>
    )
}

export default BottomBar