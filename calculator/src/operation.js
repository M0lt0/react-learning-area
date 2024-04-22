
import { ACTIONS } from "./App"
export default function Operation({ dispatch, opreation }) {
    return (<button onClick={() => dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { opreation } })} >{opreation}</button>)
}