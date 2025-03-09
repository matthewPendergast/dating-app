const messageBubbleStyles = {
    bubble: `relative flex justify-center items-center p-3 mb-3 rounded-[2rem] shadow-[inset_-1px_-1px_5px_1px] bg-white`,
    imgBubble: "h-24 md:h-40 lg:h-44",
    textBubble: "max-w-[45%] min-w-[4rem] px-4",
    after: `after:content-[''] after:absolute after:bottom-[-7px] after:w-[10px] after:h-[7px]
        after:shadow-md after:border-[2px] after:border-gray-400 after:[border-style:none_outset_outset_outset] after:bg-white`,
    tailL: `after:left-7 after:rounded-br-[15rem]`,
    tailR: `after:right-7 after:rounded-bl-[15rem]`,
    messageImage: `h-full rounded-[1.5rem]`,
};

export default messageBubbleStyles;