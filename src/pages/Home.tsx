import Header from "../components/Header";
import Games from "../components/Games";
import CopyRight from "../components/CopyRight";
import BottomBar from "../components/BottomBar";
import React, {useState} from "react";
import ChatBot from "../components/ChatBox";

const Home = () => {
    const [chat, setChat] = useState<boolean>(false);

    return (
        !chat ? (
            <>
                <Header balance={100}/>
                <Games/>
                <CopyRight/>
                <BottomBar setChat={setChat}/>
            </>
        ) : <ChatBot setChat={setChat} />
    )
}

export default Home;