import React, { useState } from 'react';
import "./StepperComponent.css"

const StepperComponent = ({currentStep}) => {
    return (
        <div className=" bg-white p-3 md:p-6 mb-4 flex flex-col shadow-sm shadow-blue-500 rounded">
            <div className='stepper mx-auto w-[70%] md:w-[70%]'>
                <div className={`step ${currentStep === 1 ? 'active' : ''}`}>
                    <div className="circle"><div className='deepCircle'></div></div>
                    {/* <span>Company Details</span> */}
                </div>
                <div className={`line ${currentStep > 1 ? 'active' : ''}`}></div>
                <div className={`step ${currentStep === 2 ? 'active' : ''}`}>
                    <div className="circle"><div className='deepCircle'></div></div>
                    {/* <span>Vessel Details</span> */}
                </div>
            </div>
            <div className='mx-auto w-[100%] md:w-[80%] flex justify-between mt-3'>
                <div className={` ${currentStep === 1 ? 'active' : ''}`}>Company Details</div>
                <div ></div>
                <div className={` ${currentStep === 2 ? 'active' : ''}`}>Vessel Details</div>
            </div>
            
        </div>
    );
};

export default StepperComponent;