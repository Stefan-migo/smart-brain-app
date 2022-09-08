import React from "react";

import "./Dialog.css";

function Dialog ({show}) {
if (!show) {
    return <></>
}
    return (
        <div className="wrapper">
            <div className="br3 pa4 ba dark-gray b--black-10 mv4 w-100 w-80-m shadow-5 center">
                <div>
                    <h1 className="pa2 black-80">Something went wrong!</h1>
                    <h4 className="pa2 black-80">
                    Please, check out your credentials and try to log in again.
                    </h4>
                    <div className="lh-copy mt3">
                        <p 
                        onClick={show}
                        href="#0" 
                        className="b ph3 pv2 input-reset black ba br-100 bg-transparent grow pointer f6 dib"
                        // ""
                        >X</p>
                    </div>
                </div>
            </div>
        </div>

    
      );

}
  


export default Dialog;