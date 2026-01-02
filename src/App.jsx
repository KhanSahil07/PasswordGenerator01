import { useState,useCallback, useEffect, useRef } from 'react'



function App() {
 

  const [length, setLength] = useState(8);

  const [isnumber,setIsNumber]=useState(false);

  const [character,setCharacter]=useState(false);
  
  const[password,setPassword]=useState("")
  const passwordRef=useRef(null)
  const PasswordGenerator=useCallback( () =>
  {

    let pass="";
    let strr="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMOPQRSTUVWXYZ";

    if(isnumber) strr += "0123456789"
    if(character) strr += "~!@#$%^&*(_+:><?/"

   for (let index = 1; index <= length; index++) {
    const char= Math.floor(Math.random()*strr.length+1);
     pass+=strr.charAt(char)
   }
   setPassword(pass)

  }, [length,isnumber,character,setPassword]
)

const copypasswordToclipboard=useCallback( () => {
 window.navigator.clipboard.writeText(password)
 passwordRef.current?.select(password)

})


useEffect( () =>{
  PasswordGenerator()
}

,[length,character,isnumber,PasswordGenerator]);



  return (
    <>
    <div className="w-full max-w-md  text-amber-100 bg-amber-700 mx-auto shadow-md rounded-lg px-4 my-4 m-4 p-1"><h1 className='text-center text-white b'>PasswordGenerator</h1>
      <div className="flex shadow rounded-lg overflow-hidden  mb-4 bg-amber-50 ">
        <input type="text"
        value={password} 
        className='outline-none w-full py-1 px-3 text-black'
        placeholder='password'
        readOnly
        ref={passwordRef}
        />
        <button   onClick={copypasswordToclipboard} className='bg-red-950 text-white rounded-lg p-1.5 m-1 shrink-0'>copy</button>
      </div>
       <div className="flex text-sm gap-x-2 text-black ">
        <div className="flex-center gap-x-1">
          <input type="range"
            min={6}
            max={100}
            value={length}
            className='cursor-pointer '
            onChange={(e) => {setLength(e.target.value)}}
            />
            <label>Length:{length}</label>
        </div>
        
        <div className="flex-center gap-x-1">
          <input type="checkbox"
           defaultChecked={character}
          id='numberInput'
          onChange={() => {
            setCharacter((prev) => !prev);
          }
          }

  
            />
            <label>sp.character</label>
        </div>
         <div className="flex-center gap-x-1">
          <input type="checkbox"
          defaultChecked={isnumber}
          id='numberInput'
          onChange={() => {
            setIsNumber((prev) => !prev);
          }
          }
            />
            <label htmlFor='numberInput'>Numbers</label>
        </div>
        
       </div>


    </div>
    </>
  )
}

export default App
