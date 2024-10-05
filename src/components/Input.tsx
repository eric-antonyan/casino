import {FC} from "react";

interface Inputable extends React.AllHTMLAttributes<HTMLInputElement> {
}

const Input: FC<Inputable> = (attributes) => {
    return (
        <input { ...attributes } className={"p-3 text-lg flex-1 rounded-lg px-4 outline-none text-white " + attributes.className} />
    )
}

export default Input