import logo from "../assets/img/moolat.jpg"
import {AnimatePresence, motion} from "framer-motion";

const SplashScreen = () => {
    return (
        <div className={"bg-darker h-screen flex w-full items-center justify-center"}>
            <AnimatePresence mode={"wait"}>
                <motion.img initial={{scale: 0.5, opacity: 0}} animate={{scale: 1, opacity: 1}}
                            exit={{scale: 0.5, opacity: 0}} src={logo} className={"w-[230px] rounded-full"} alt={""}/>
            </AnimatePresence>
        </div>
    )
}

export default SplashScreen