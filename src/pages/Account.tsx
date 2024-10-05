import { FC, useEffect, useState } from "react";
import axios from "axios";
import {FaChevronLeft, FaGear, FaGears, FaLeftRight} from "react-icons/fa6";
import { Link } from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../store";

interface TelegramUser {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
    photo_url?: string;
}

interface Accountable {
    user: TelegramUser;
}

const Account: FC<Accountable> = ({ user }) => {
    const [photoUrl, setPhotoUrl] = useState<string | null>("letters");

    const dark = useSelector((state: RootState) => state.theme.dark);

    useEffect(() => {
        if (user.id) {
            fetchProfilePhotos(user.id);
        }
    }, [user.id]);

    const format = (number: number) => {
        return Intl.NumberFormat('ru-RU', {
            currency: 'AMD',
            style: 'currency'
        }).format(number);
    };

    const fetchProfilePhotos = async (userId: number) => {
        const botToken = '7990642982:AAFSha9IQWUaqjoGZFXiN7Lxx3LkFYMb5dI'; // Replace with your bot token
        try {
            const response = await axios.get(
                `https://api.telegram.org/bot${botToken}/getUserProfilePhotos`,
                { params: { user_id: userId } }
            );
            const photos = response.data.result?.photos;

            if (photos && photos.length > 0) {
                const fileId = photos[0][0].file_id;
                const fileResponse = await axios.get(
                    `https://api.telegram.org/bot${botToken}/getFile`,
                    { params: { file_id: fileId } }
                );
                const filePath = fileResponse.data.result.file_path;
                setPhotoUrl(`https://api.telegram.org/file/bot${botToken}/${filePath}`);
            } else {
                setPhotoUrl('letters'); // Fallback placeholder
            }
        } catch (error) {
            console.error("Error fetching profile photo:", error);
            setPhotoUrl('letters');
        }
    };

    return (
        <div className="mx-auto">
            <header className={`flex items-center justify-between p-4 border-b ${dark ? "text-white border-gray-600" : "text-darker border-gray-300"}`}>
                <Link to={"/"}>
                    <FaChevronLeft className="" />
                </Link>
                <span className="font-bold text-lg">{user.username ? user.username : `${user.first_name} ${user.last_name}`}</span>
                <FaGear />
            </header>
            <div className="flex flex-col items-center mt-6">
                {photoUrl ? (
                    photoUrl !== "letters" ? (
                        <img
                            src={photoUrl}
                            alt={`${user.first_name} ${user.last_name}`}
                            className={`w-[150px] aspect-square rounded-full border-2 ${dark ? "border-primary" : "border-secondary"}`}
                        />
                    ) : (
                        <div className={`w-[150px] aspect-square rounded-full border-2 ${dark ? "border-primary text-primary" : "border-secondary text-primary"} text-5xl font-bold flex items-center justify-center`}>
                            {user.first_name[0].toUpperCase()}
                        </div>
                    )
                ) : (
                    <p>No photo available</p>
                )}
                <h2 className={`mt-4 text-xl font-semibold ${dark ? "text-white" : "text-darker"}`}>{user.first_name} {user.last_name}</h2>
                <p className="text-gray-600">{user.username ? `@${user.username}` : null}</p>
                <button className={`${dark ? "bg-primary" : "bg-secondary"} px-3 py-2 text-sm text-white rounded-2xl font-bold mt-4`}>
                    {format(20000)}
                </button>
            </div>
        </div>
    );
};

export default Account;
