import { useState } from 'react';
import { useSprings, animated } from 'react-spring';
import SizeSelection from './components/SizeSelection';
import ElementManipulation from './components/ElementManipulation';
import { useSelector } from 'react-redux';


function App() {
  const cubes = useSelector(state => state.cubesSlice.cubes);

  const [cubeSize, setCubeSize] = useState({width: 100,height: 100});
  const areaPlace = {width: 800,height: 500};

  const changeCubeSize = (size) => {
    !!size.width ? 
    setCubeSize({width: size.width, height: cubeSize.height}) :
    setCubeSize({height: size.height, width: cubeSize.width})
  }

  const springs = useSprings(
    cubes.length,
    cubes.map((item, index) => ({
      from: { transform: `translateX(-${cubeSize.width}px)` },
      to: { background: '#ff6d6d', transform: `translate(${item.x}px, ${item.y}px)` },
    })),
  );

  return (
    <>
      <SizeSelection 
        widthArea={areaPlace.width} 
        heightArea={areaPlace.height} 
        changeCubeSize={changeCubeSize}
      />

      <ElementManipulation 
        cubeSize={cubeSize} 
        areaPlace={areaPlace} 
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
          key={cubes[index].id}
          style={{
            position: 'absolute',
            width: cubeSize.width,
            height: cubeSize.height,
            borderRadius: 4,
            transition: '1s',
            ...spring,
          }}
      >{cubes[index].id}</animated.div>))}
      </div>
    </>
  );
}

export default App;
