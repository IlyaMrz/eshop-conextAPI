import { useEffect } from 'react';

const useOutsideClick = (ref, callback) => {
    const handleClick = e => {
      console.log('handle click in useOusideClick')
      if (ref.current && !ref.current.contains(e.target)) {
          console.log(e.target)
        callback();
      }
    };
  
    useEffect(() => {
      document.addEventListener("click", handleClick);
  
      return () => {
        document.removeEventListener("click", handleClick);
      };
    });
  };
  
  export default useOutsideClick;