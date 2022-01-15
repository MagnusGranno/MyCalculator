import { stringify } from 'postcss';
import { useState, useEffect } from 'react';
import stringMath from 'string-math';

const Calculator = () => {
  const [result, setResult] = useState('0');
  const [calculation, setCalculation] = useState('');
  const [error, setError] = useState('');
  const operatorErrorCheck = ['+', '-', '*', '/', '.', 'x'];
  const keysAllowed = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const clear = () => {
    setResult('0');
    setCalculation('');
    setError('');
  };

  useEffect(() => {
    document.addEventListener('keyup', onKeyUp);

    return () => {
      document.removeEventListener('keyup', onKeyUp);
    };
  });

  const onKeyUp = (event) => {
    let keyName = event.key;

    // Clean
    if (keyName === 'c') {
      clear();
    }

    // Delete last
    if (keyName === 'Backspace') {
      setCalculation(calculation.slice(0, calculation.length - 1));
    }
    // Calculate
    if (keyName === 'Enter' || keyName === '=') {
      calculateResult();
    }
    // Number 0-9
    if (keysAllowed.includes(keyName)) {
      if (calculation === '') {
        if (keyName === '0') {
          return;
        }
        setCalculation(keyName);
      }
      setCalculation(calculation + keyName);
    }

    // Operators
    if (operatorErrorCheck.includes(keyName)) {
      if (keyName === 'x') {
        keyName = '*';
      }
      const errorCheck = calculation.slice(-1);
      if (operatorErrorCheck.includes(errorCheck)) {
        setCalculation(
          calculation.substring(0, calculation.length - 1) + keyName
        );
        return;
      }
      setCalculation(calculation + keyName);
    }
  };

  const addToCalculation = (e) => {
    if (calculation === '' && e.currentTarget.value === '0') {
      return;
    }

    let tempCalc = calculation;

    tempCalc += e.currentTarget.value;
    setCalculation(tempCalc);
  };

  const clickOperator = (e) => {
    if (e.currentTarget.value !== '-' && calculation === '') {
      return;
    }
    const errorCheck = calculation.slice(-1);
    if (operatorErrorCheck.includes(errorCheck)) {
      if (calculation === '-') {
        setCalculation('');
        return;
      }
      setCalculation(
        calculation.substring(0, calculation.length - 1) + e.currentTarget.value
      );
      return;
    }
    addToCalculation(e);
  };
  const calculateResult = () => {
    try {
      if (calculation === '') {
        return;
      }
      setResult(stringMath(calculation));
      setCalculation('');
    } catch (error) {
      setCalculation('');
      setError('ERROR');
    }
  };
  return (
    <div className="box-border bg-gray-800 w-full max-w-xs rounded-md p-4">
      <div className="flex flex-col justify-between bg-white mb-2 rounded-md text-right h-20 p-2">
        <div className="border-b-2 h-10 flex flex-col justify-end">
          {error ? (
            <p className="text-red-900 font-medium">{error}</p>
          ) : calculation === '' ? (
            ''
          ) : (
            calculation
          )}
        </div>
        <div className="h-10 flex flex-col justify-end text-gray-800 font-bold">
          {result === '' ? '0' : result}
        </div>
      </div>
      <div className="grid grid-cols-4 grid-rows-5 gap-2">
        <button
          onClick={(e) => clickOperator(e)}
          value="/"
          className="orange-button"
        >
          /
        </button>

        <button
          onClick={(e) => addToCalculation(e)}
          value="7"
          className="regular-button"
        >
          7
        </button>
        <button
          onClick={(e) => addToCalculation(e)}
          value="8"
          className="regular-button"
        >
          8
        </button>
        <button
          onClick={(e) => addToCalculation(e)}
          value="9"
          className="regular-button"
        >
          9
        </button>
        <button
          onClick={(e) => clickOperator(e)}
          value="*"
          className="orange-button"
        >
          x
        </button>

        <button
          onClick={(e) => addToCalculation(e)}
          value="4"
          className="regular-button"
        >
          4
        </button>
        <button
          onClick={(e) => addToCalculation(e)}
          value="5"
          className="regular-button"
        >
          5
        </button>
        <button
          onClick={(e) => addToCalculation(e)}
          value="6"
          className="regular-button"
        >
          6
        </button>
        <button
          onClick={(e) => clickOperator(e)}
          value="-"
          className="orange-button"
        >
          -
        </button>

        <button
          onClick={(e) => addToCalculation(e)}
          value="1"
          className="regular-button"
        >
          1
        </button>
        <button
          onClick={(e) => addToCalculation(e)}
          value="2"
          className="regular-button"
        >
          2
        </button>
        <button
          onClick={(e) => addToCalculation(e)}
          value="3"
          className="regular-button"
        >
          3
        </button>
        <button
          onClick={(e) => clickOperator(e)}
          value="+"
          className="orange-button"
        >
          +
        </button>

        <button
          onClick={(e) => addToCalculation(e)}
          value="0"
          className="regular-button col-span-2"
        >
          0
        </button>
        <button
          onClick={(e) => clickOperator(e)}
          value="."
          className="regular-button"
        >
          .
        </button>
        <button
          onClick={clear}
          className="orange-button col-span-2 bg-blue-400"
        >
          C
        </button>
        <button
          onClick={() => calculateResult()}
          className="bg-green-500 regular-button col-span-2"
        >
          =
        </button>
      </div>
    </div>
  );
};

export default Calculator;
