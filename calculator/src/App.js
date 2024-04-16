import { useReducer } from 'react';
import './App.css';
import Button from './button';
import Operation from './operation'

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  DELET_DIGIT: 'dlete-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  EVALUATE: 'evaluate'


}

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          current: `${current || ''}${payload.digit}`,
          overwrite: false
        }

      }
      if (state.current === '0' && payload.digit === '0') return state
      if (payload.digit === '.' && state.current.includes('.')) return state
      return {
        ...state,
        current: `${state.current || ''}${payload.digit}`
      }
    case ACTIONS.CHOOSE_OPERATION:
      if (state.current == null && state.previous == null) { return state }
      if (state.current == null) {
        return {
          ...state,
          operation: payload.operation
        }
      }

      if (state.previous == null) {
        return {
          ...state,
          opreation: payload.operation,
          previous: state.current,
          current: null
        }


      }
      return {
        ...state,
        previous: evaluate(state),
        operation: payload.opertain,
        current: null
      }

    case ACTIONS.CLEAR:
      return {}
    case ACTIONS.DELET_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          current: null

        }
      }
      if (state.current == null) return state
      if (state.current.length === 1) {
        return {
          ...state,
          current: null
        }
      }
      return {
        ...state,
        current: state.current.slice(0, -1)
      }

    case ACTIONS.EVALUATE:
      if (state.operation == null || state.current == null || state.operation == null) { return state }
      return {
        ...state,
        overwrite: true,
        previous: null,
        operation: null,
        current: evaluate(state),

      }



  }

}

const formatter = new Intl.NumberFormat('en-us', { maximumFractionDigits: 0 })
function numberFormater(operand) {
  if (operand == null) return
  const [intg, dec] = operand.split('.')
  if (dec == null) return formatter.format(intg)
  return `${formatter.format(intg)}.${dec}`
}

function evaluate({ current, previous, operation }) {
  const numiricalCurrent = parseFloat(current)
  const numiricalPrevious = parseFloat(previous)
  if (isNaN(numiricalCurrent) || isNaN(numiricalPrevious)) return "."
  let calculation = ""
  switch (operation) {
    case '+':
      calculation = numiricalPrevious + numiricalCurrent
      break;
    case '-':
      calculation = numiricalPrevious - numiricalCurrent
      break;
    case '÷':
      calculation = numiricalPrevious / numiricalCurrent
      break;
    case '*':
      calculation = numiricalPrevious * numiricalCurrent
      break;


  }
  return calculation.toString()


}
function App() {
  const [{ current, previous, opreation }, dispatch] = useReducer(reducer, {})

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous">{numberFormater(previous)} {opreation}</div>
        <div className="current">{numberFormater(current)}</div>
      </div>
      <button className='span-two' onClick={() => dispatch({ type: ACTIONS.CLEAR })}>ac</button>
      <button onClick={() => dispatch({ type: ACTIONS.DELET_DIGIT })}>DEL</button>

      <Operation opertain='÷' dispatch={dispatch} />
      <Button digit='1' dispatch={dispatch} />
      <Button digit='2' dispatch={dispatch} />
      <Button digit='3' dispatch={dispatch} />
      <Operation opertain='*' dispatch={dispatch} />
      <Button digit='4' dispatch={dispatch} />
      <Button digit='5' dispatch={dispatch} />
      <Button digit='6' dispatch={dispatch} />
      <Operation opertain='+' dispatch={dispatch} />
      <Button digit='7' dispatch={dispatch} />
      <Button digit='8' dispatch={dispatch} />
      <Button digit='9' dispatch={dispatch} />
      <Operation opertain='-' dispatch={dispatch} />
      <Button digit='.' dispatch={dispatch} />
      <Button digit='0' dispatch={dispatch} />
      <button className='span-two' onClick={() => dispatch({ type: ACTIONS.EVALUATE })}>=</button>


    </div>

  );
}

export default App;
