import './App.css'
import { useState, useEffect, useRef } from 'react';

function ButtonCode(props) {
  return (
    <button className='guessButton' onClick={(e) => props.guessFunction(e, props.rgbCode)}>{props.rgbCode}</button>
  );
}

export default function App() {
  const [rgb, setRgb] = useState([]);
  const [colorCircle, setColorCircle] = useState('');
  const [points, setPoints] = useState(0);
  const randomIndex = useRef(0);
  const [togglePreventClick, setTogglePreventClick] = useState(false);

  function randomize() {
    const newRgb = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    newRgb.forEach((e, i) => {
      newRgb[i] = e.map(() => Math.floor(Math.random() * 256));
    });
    setRgb(newRgb);

    const newRandomIndex = (Math.floor(Math.random() * 3));
    randomIndex.current = newRandomIndex;
    setColorCircle(`rgb(${newRgb[newRandomIndex].join(',')}`);
  }

  useEffect(() => {
    randomize();
  }, [])

  function guess(e, rgbCode) {
    setTogglePreventClick(true);
    const clickedRgb = `rgb(${rgbCode})`;
    const circleColor = document.getElementById('circle').style.backgroundColor
    if (clickedRgb === circleColor) {
      setPoints(p => p + 1);
    } else {
      setPoints(0);
      e.target.classList.add('wrongAswner');
    }
    const choiceButton = document.querySelectorAll('.guessButton');
    choiceButton[randomIndex.current].classList.add('rightAswner');
    setTimeout(() => {
      choiceButton[randomIndex.current].classList.remove('rightAswner');
      e.target.classList.remove('wrongAswner');
      setTogglePreventClick(false);
      randomize();
    }, 500);
  }

  return (
    <div>
      <header>
        <h1>Guess the RGB code!!</h1>
      </header>
      <main>
        <p className='points'>Points: {points}</p>
        <div id='circle' style={{backgroundColor: colorCircle}}></div>
        <div>
          <div className='preventClick' style={{display: togglePreventClick ? 'inline' : 'none'}}></div>
          <ButtonCode guessFunction={guess} rgbCode={rgb[0]?.join(', ')} />
          <ButtonCode guessFunction={guess} rgbCode={rgb[1]?.join(', ')} />
          <ButtonCode guessFunction={guess} rgbCode={rgb[2]?.join(', ')} />
        </div>
      </main>
    </div>
  )
}
