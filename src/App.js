import { useState } from 'react';
import { useSprings, animated, config } from 'react-spring';
import SizeSelection from './components/SizeSelection';
import ElementManipulation from './components/ElementManipulation';


function App() {
  const [getPosition, setPosition] = useState([{ y: 0, x: 0, id: 1 }]);
  const [cubeSize, setCubeSize] = useState({width: 100,height: 100})
  const [areaPlace, setAreaPlace] = useState({width: 800,height: 500})

  const changeCubeSiza = (size) => {
    !!size.width ? 
    setCubeSize({width: size.width, height: cubeSize.height}) :
    setCubeSize({height: size.height, width: cubeSize.width})
  }

  const springs = useSprings(
    getPosition.length,
    getPosition.map((item, index) => ({
      from: { transform: `translateX(-${cubeSize.width}px)` },
      to: { background: '#ff6d6d', transform: `translate(${item.x}px, ${item.y}px)` },
    })),
  );

  return (
    <>
      <SizeSelection 
        widthArea={areaPlace.width} 
        heightArea={areaPlace.height} 
        changeCubeSiza={changeCubeSiza}
      />

      <ElementManipulation 
        getPosition={getPosition} 
        cubeSize={cubeSize} 
        areaPlace={areaPlace} 
        setPosition={setPosition} 
      />

      <div 
        style={{
          display: "flex", 
          width: `${areaPlace.width}px`, 
          height: `${areaPlace.height}px`, 
          border: '2px solid blue',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
      {springs.map((spring, index) => (
        <animated.div
          key={getPosition[index].id}
          style={{
            position: 'absolute',
            width: cubeSize.width,
            height: cubeSize.height,
            borderRadius: 4,
            transition: '1s',
            ...spring,
          }}
      >{getPosition[index].id}</animated.div>))}
      </div>
    </>
  );
}

export default App;
