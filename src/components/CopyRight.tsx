import logo from "../assets/img/moolat.jpg";

const CopyRight = () => {
    return (
        <div className={"p-5 flex flex-col gap-3"}>
            <div className={"flex justify-between"}>
                <span className={"text-primary font-bold"}>18+</span>
                <span className={"text-gray-500 font-medium italic"}>&copy; Moolat все права защищены</span>
                <span>{""}</span>
            </div>
            <div className={"flex justify-center"}>
                <img className={"w-[100px] rounded-full"} src={logo} alt=""/>
            </div>
        </div>
    )
}

export default CopyRight

