
import { ACTIONS } from "./App"
export default function Operation({ dispatch, opertain }) {
    return <button onClick={() => dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { opertain } })} >{opertain}</button>
}