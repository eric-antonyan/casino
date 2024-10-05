import React, {useState, useEffect} from "react";
import "./css/shadows.css";
import "./css/reset.css";
import "./css/animations.css";

import SplashScreen from "./components/SplashScreen";
import Home from "./pages/Home";
import {Provider, useSelector} from "react-redux";
import {RootState, store} from "./store";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Account from "./pages/Account";
import axios from "axios/index"; // Ensure this imports the correct RootState type
import Miner from "./pages/Miner";

const App = () => {
    const [userData, setUserData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const dark = useSelector((state: RootState) => state.theme.dark);


    useEffect(() => {
        console.log("Dark mode is:", dark); // Check the value of dark
        const bodyClassList = document.body.classList;
        if (dark) {
            bodyClassList.add("bg-darker");
            bodyClassList.remove("bg-white");
        } else {
            bodyClassList.add("bg-white");
            bodyClassList.remove("bg-darker");
        }
    }, [dark]);

    useEffect(() => {
        const anyWindow = window as any;
        const telegram = anyWindow.Telegram;

        if (telegram && telegram.WebApp) {
            telegram.WebApp.expand();
            const telegramData = telegram.WebApp.initDataUnsafe;
            const user = telegramData?.user;

            if (user) {
                setTimeout(() => {
                    setUserData(user);
                    setLoading(false);
                }, 1000);
            } else {
                setLoading(false);
            }
        } else {
            setError("Telegram Web App is not available.");
            setLoading(false);
        }
    }, []);

    return (
        !loading ? (
            <BrowserRouter>
                <Routes>
                    <Route path={'/'} element={<Home />} />
                    <Route path={'account'} element={<Account user={userData} />} />
                    <Route path={"games"}>
                        <Route path={"mines"} element={<Miner />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        ) : <SplashScreen/>
    );
};

export default App;
