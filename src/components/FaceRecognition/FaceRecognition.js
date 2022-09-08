import React from 'react';
import './FaceRecognition.css'

// FaceRecognition element
/*  /creating the function , with imageUrl and box as 
        parameters, both called from the state of app.js
    /it will return a html/ json 
*/
const FaceRecognition = ({ imageUrl , box }) => {
    console.log('box from facerecognition', box);
    return (
        <div className='center ma' >
            <div className='relative mt2'>
            <img 
            id='inputImage' 
            src={imageUrl} //state from the root(app), empty string
            alt='' 
            width='500px'  
            heigh='auto'
            />
            {
            Array.isArray(box)
            ? box.map((item, i) => (
                <div 
                key={i}
                className ='bounding_box' 
                style={{    //state from the root(app), empty object
                    left: item.leftCol, 
                    top: item.topRow, 
                    right: item.rightCol, 
                    bottom: item.bottomRow
                    }}>                
                </div>
            ))
            : null
            }



{ /*
            <div 
                className ='bounding_box' 
                style={{    //state from the root(app), empty object
                    left: box.leftCol, 
                    top: box.topRow, 
                    right: box.rightCol, 
                    bottom: box.bottomRow
                    }}>                
            </div>
    */
}            
            
            </div>
        </div>

    )
}
export default FaceRecognition;