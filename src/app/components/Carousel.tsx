'use client'
import { Children, ReactNode, useState, useEffect } from 'react'
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai'

const Slide = ({ children, className, automatic = true }: {
    children: ReactNode,
    className?: string,
    automatic?: boolean
}) => {

    const ch = Children.toArray(children).flat()
    const [view, setView] = useState(1)
    
    console.log(view)

    const nextView = () => setView(view => view === ch.length ? 1 : view+1)
    const backView = () => setView(view => view === ch.length ? 1 : view+1)

    useEffect(() => {
        if(automatic) {
            const interval = setInterval(() => {
                setView(view => view === ch.length ? 1 : view+1)
            }, 7500);
            return () => clearInterval(interval);
        } else {
            return () => ''
        }
      }, [automatic, ch.length]);

    return ( 
        <div className={`relative overflow-hidden ${className}`}>
            <button className='absolute top-0 left-0 w-12 h-full flex justify-center items-center z-20'
                    onClick={backView}>
                <AiFillCaretLeft />
            </button>
            <ul className={`h-full inline-flex z-10 transition-transform`} style={{ 
                width: `${ch.length * 100}%`,
                transform: `translateY(0px) translateX(-${(100 / ch.length) * (view - 1)}%)`
                }}>
                { ch.map((child, i) => {
                    return <li className='w-full h-full' key={i}>{child}</li>
                }) }
            </ul>
            <button className='absolute top-0 right-0 w-12 h-full flex justify-center items-center z-20'
                    onClick={nextView}>
             <AiFillCaretRight />
            </button>
        </div>
     );
}
 
export default Slide;