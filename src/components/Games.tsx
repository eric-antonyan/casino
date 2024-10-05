import { useState } from "react";
import { motion } from "framer-motion";
import {useSelector} from "react-redux";
import {RootState} from "../store";
import {Link} from "react-router-dom";

const Games = () => {
    const games = [
        { id: 1, image: "https://storage.googleapis.com/kickthe/assets/images/games/mines-hacksawgaming/gb/gbp/tile_large.jpg", game: "mines" },
        { id: 2, image: "https://www.askgamblers.com/uploads/original/other/41/c3/5c/17c37003047a36537ae69afd82cbd2148b/rocket-slots-casino-logo.png", game: "reaction" },
        { id: 3, image: "https://via.placeholder.com/180x180" },
        { id: 4, image: "https://via.placeholder.com/180x180" },
        { id: 5, image: "https://via.placeholder.com/180x180" },
        { id: 6, image: "https://via.placeholder.com/180x180" },
        { id: 7, image: "https://via.placeholder.com/180x180" },
        { id: 8, image: "https://via.placeholder.com/180x180" },
        { id: 9, image: "https://via.placeholder.com/180x180" }
    ];

    const dark = useSelector((state: RootState) => state.theme.dark);

    return (
        <div className={`p-5`}>
            <h2 className={`my-3 text-3xl font-bold ${dark ? "text-white" : "text-darker"}`}>MoolaGames</h2>
            <ul className="grid grid-cols-3 gap-5 gap-y-10">
                {
                    games.map((game, i) => (
                        <motion.li
                            key={i}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.5,
                                delay: i * 0.1,
                                ease: "easeOut"
                            }}
                            className="bg-slate-800 flex-1 h-[180px] rounded-2xl active:scale-[0.99] relative overflow-hidden"
                        >
                            <Link to={`/games/${game.game}`}>
                            <ImageWithLoadingEffect src={game.image} alt={`Game ${game.id}`} />
                            </Link>
                        </motion.li>
                    ))
                }
            </ul>
        </div>
    );
};

const ImageWithLoadingEffect = ({ src, alt }: {src: string, alt: string}) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div className="relative w-full h-full">
            {/* Placeholder with gradient loading effect */}
            <motion.div
                className={`absolute inset-0 bg-gray-700 loading-gradient ${isLoaded ? 'opacity-0' : 'opacity-100'}`}
                animate={{ opacity: isLoaded ? 0 : 1 }}
                transition={{ duration: 0.3 }}
            >
            </motion.div>

            {/* Image with fade-in effect */}
            <motion.img
                src={src}
                alt={alt}
                onLoad={() => setIsLoaded(true)}
                className="w-full h-full object-cover rounded-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: isLoaded ? 1 : 0 }}
                transition={{ duration: 0.5 }}
            />
        </div>
    );
};

export default Games;