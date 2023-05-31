import React from 'react';

function SizeSelection({ widthArea, heightArea, changeCubeSize }) {


  const findSize =((number)=> {
    const numbers = [];

    for (let i = 1; i < number; i++) {
      if (number % i === 0) {
        numbers.push(i);
      }
    }

    return numbers;
  })

  const handleClick = (event, sizeType) => {
    const selectedSize = parseInt(event.target.innerText);
    if (sizeType === "width") {
      changeCubeSize({ width: selectedSize, height: 0 });
    } else if (sizeType === "height") {
      changeCubeSize({ width: 0, height: selectedSize });
    }
  };

  return (
    <>
      <h1>Ширина</h1>
      <div onClick={(event) => handleClick(event, "width")}>
        {findSize(widthArea).map((item) => (
          <button key={item}>{item}</button>
        ))}
      </div>

      <h1>Высота</h1>
      <div onClick={(event) => handleClick(event, "height")}>
        {findSize(heightArea).map((item) => (
          <button key={item}>{item}</button>
        ))}
      </div>
    </>
  );
}

export default SizeSelection;