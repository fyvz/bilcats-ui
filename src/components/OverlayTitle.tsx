

type OverlayTitleType = {
    image: string;
    children?:React.ReactNode;
    overlayStyle?:string;
}

const OverlayTitle = ({image, children, overlayStyle="bg-black/60 backdrop-blur-sm"}:OverlayTitleType) => {
    console.log(children);
    return ( 
        <div 
        className="relative min-h-24  bg-cover bg-center p-6 py-6 md:py-2 space-y-4 md:space-y-0 flex flex-col justify-center items-center "
         style={{ backgroundImage: `url(${image})` }}>
        {/* Overlay */}
            <div className={"absolute min-h-full inset-0 z-2 "+overlayStyle}>

            </div>
            <div className="relative z-4 ">
                                    {children?children:""}
            </div>
    
        </div>
     );
}
 
export default OverlayTitle;