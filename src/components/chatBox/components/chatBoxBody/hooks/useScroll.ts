//libs 
import { useEffect, useRef } from "react"

export const useScroll = () => {
    const latestRef = useRef<HTMLElement>(null);
    const previousRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (latestRef.current !== previousRef.current) {
            
        }
    },[])

    
}