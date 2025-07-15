import React,{useEffect, useRef} from 'react'
import { Plane } from 'lucide-react'
import gsap from 'gsap'
import Flip_Book from '../components/filpbook';



function Book() {

 const GuideRef  = useRef();

 useEffect(()=>{
     const tl = gsap.timeline();

     tl.to(GuideRef.current,{
          y:-200,
          scale:1.2,
          duration:2,
          ease:"expo"
     })
     tl.from(".book-container",{
         opacity:1,
          ease:"expo"

     })
    


 })


  return (
    <>
          <header className=" fixed w-full h-20 z-50 bg-white/80 backdrop-blur-sm border-b border-indigo-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                <Plane className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-indigo-900">
                Trip Assistants
              </span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-indigo-600 hover:text-indigo-900 transition-colors font-medium">Features</a>
              <a href="#about" className="text-indigo-600 hover:text-indigo-900 transition-colors font-medium">About</a>
              <a href="#contact" className="text-indigo-600 hover:text-indigo-900 transition-colors font-medium">Contact</a>
            </nav>
          </div>
        </div>
      </header>
    <div className='inter flex items-center justify-center flex-col h-screen w-full bg-white'>
          <span  className=" scale-200 absolute top-30 inter text-5xl font-bold text-indigo-900">
              Guide Book 
        </span>
         
         <Flip_Book/>
   

    </div>
    </>
  )
}

export default Book