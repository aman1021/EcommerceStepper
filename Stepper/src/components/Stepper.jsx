import { useEffect, useRef, useState } from "react";

const Stepper = ({ stepsConfig = [] }) => {

  const [currentStep, setCurrentStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const [margins, setMargins] = useState({
    marginLeft: 0,
    marginRight: 0,
  });
  const stepRef = useRef([])

  useEffect( () => {
    setMargins({
      marginLeft: stepRef.current[0].offsetWidth / 2,
      marginRight: stepRef.current[stepsConfig.length-1].offsetWidth / 2,
    })
  }, [stepRef, stepsConfig.length])

  if(!stepsConfig.length){
    return <div>Nothing to move forward with....</div>
  }

//For moving to the next step in the stepper. 
  const handleNextStep = () => {
    setCurrentStep((prevStep) => {
      if(prevStep === stepsConfig.length){
        setIsComplete(true);
        return prevStep;
      }
      else{
        return prevStep+1;
      }
    })
  }
   
  const calculateProgressBarWidth = () => {
    return ((currentStep - 1) / (stepsConfig.length - 1)) * 100;
  };

  const ActiveComponent = stepsConfig[currentStep-1]?.Component;

  return (
    <>
    <div className="stepper"> 
    {stepsConfig.map((step, index)=> {
      return (
        <div key={step.name}
        ref={(el) => (stepRef.current[index] = el)} className={`step ${currentStep > index + 1 || isComplete ? "complete" : ""}  ${currentStep == index + 1 ? "active" : ""} `}>
          <div className="step-number">{
          currentStep > index + 1 || isComplete ? <span>&#10003;</span> :
          (index+1)}</div>
          <div className="step-name">{step.name}</div>
        </div>
      )
    })} 
      <div className="progessBar" 
         style={{
          width: `calc(100% - ${margins.marginLeft + margins.marginRight}px)`,
          marginLeft: margins.marginLeft,
          marginRight: margins.marginRight,
        }}
        >
        <div className="progress"  style={{width:`${calculateProgressBarWidth()}%`}}></div>
      </div>
    </div>

    <ActiveComponent/>

    {!isComplete && <button className="btn" onClick={handleNextStep}>{ currentStep == stepsConfig.length ? "Finish" : "Next"}</button>}
    </>
  )
};

export default Stepper;

{/* <span>&#10003;</span>   ..... for the green tick mark after a stage is completed. */}