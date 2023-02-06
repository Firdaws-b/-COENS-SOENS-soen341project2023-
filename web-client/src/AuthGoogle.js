import React, {useEffect} from 'react';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';

const AuthGoogle = (props) => {
    useEffect(()=>{
        const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(props.auth)
        ui.start('.')
    })
    return (
        <div>AuthGoogle</div>
    )
}
export default AuthGoogle