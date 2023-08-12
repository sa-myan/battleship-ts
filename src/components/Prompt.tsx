import { Dispatch, SetStateAction } from "react";

interface PromptProps  {
    promptText: string,
    setPromptText: Dispatch<SetStateAction<string>>
}

const Prompt= ({promptText}:PromptProps) =>{
    return <h1>{promptText}</h1>
}

export default Prompt