function ElementManipulation({getPosition, cubeSize, areaPlace, setPosition}) {

  // максимальное количество елементов
  const maxNumberElements = (areaPlace.height / cubeSize.width) * (areaPlace.width / cubeSize.height)
  
  // максимальное количество елементов в линию
  const maxNumberElementsInLine = areaPlace.width / cubeSize.width
  
  // поиск всех номеров, которые делятся на сумму елементов в линии. Отчет начинается с конца массива
  function findFifthAndTenthNumbers(number) {
  
    // массив с числами, которые делятся на количество элементов в линии без остатка
    const array = [] 
  
    // вычислить все числа делящиеся на количество элементов в линии
    for (let i = 0; i < number; i++) {
      0 === i%maxNumberElementsInLine && array.push(i)
    }
  
    // поиск чисел, которые делятся на количество элементов в линии с конца
    return array.map(item => number - item)
  };

  // удаление елемента
  const handleRemoveElement = () => {

    setPosition(state => state.map((item, index) => {
      if (index === 0) {

        // подсчет до левой границы
        const distanceToBorder = (maxNumberElementsInLine - (index+1 % maxNumberElementsInLine)) * cubeSize.width + cubeSize.width

        // перемешение к границу
        return {...item, x: distanceToBorder}
      }
      return item
    }))

    // удаление елемента из массива
    setTimeout(()=> {setPosition(state => [...state].slice(1));}, 1500)
    
  };
    
  // добавление елемента
  const handleAddElement = () => {
    
    maxNumberElements !== getPosition.length 
    &&
    setPosition(state => [ // обновление 

      // разорхивирование нового массива, который собрал map
      ...state.map((item, index)=> {

        // все числа необходмые для переноса
        const numbers = findFifthAndTenthNumbers(state.length+1) 

        // проверка есть ли данный елемент в массиве чиселн, на перенос
        for (let i = 1; i < numbers.length; i++) {
          if (index === numbers[i]-1) {
            return {...item, x: 0, y: item.y + cubeSize.height}
          }
        }

        return { ...item, x: item.x + cubeSize.width, y: item.y}
      }), 

      // добавление нового елемента
      { x: state[state.length - 1].x, y: 0, id: state[state.length - 1].id +1}
    ]);
  };

  return <div style={{margin: "20px"}}>
    <button onClick={handleAddElement}> добавить элемент </button>
    <button onClick={handleRemoveElement}> удалить элемент </button>
  </div>
}

export default ElementManipulation;