import React, {useRef,useState} from 'react';
// import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonRow,
  IonTitle,
  IonToolbar,
  IonAlert,
  IonCol,
} from '@ionic/react';
import BmiControls from './components/BmiControls'
import BmiResult from './components/BmiResult'
import InputControl from './components/InputControl'

// import { IonReactRouter } from '@ionic/react-router';
// import { ellipse, square, triangle } from 'ionicons/icons';
// import Tab1 from './pages/Tab1';
// import Tab2 from './pages/Tab2';
// import Tab3 from './pages/Tab3';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const App: React.FC = () => {
  const [calculatedBmi, setCalculatedBmi]=useState<number>();
  const [error, setError]=useState<string>();
  const [calcUnits, setCalcUnits]=useState<'mkg' | 'ftlbs'>('mkg');
  const weightInputRef=useRef<HTMLIonInputElement>(null);
  const heightInputRef=useRef<HTMLIonInputElement>(null);


  const calculateBMI = () =>{
const enteredWeight= weightInputRef.current!.value;
const enteredHeight= heightInputRef.current!.value;

if(!enteredHeight || !enteredWeight || +enteredWeight <=0 || +enteredHeight<=0){
  setError('please enter a valid (non-negative) number')
  return;
}

const weightConversionFactor =  calcUnits === 'ftlbs' ? 2.2 : 1;
const heightConversionFactor =  calcUnits === 'ftlbs' ? 3.28 : 1;
const weight = +enteredWeight / weightConversionFactor;
const height = +enteredHeight /heightConversionFactor;
const bmi = weight/(height* height)

console.log(bmi)
setCalculatedBmi(bmi);
  };

  const resetInputs =() =>{
    weightInputRef.current!.value="";
    heightInputRef.current!.value="";
  };

  const clearError=()=>{
    setError('');
  }

  const selectCalcUnitHandler=(selectedValue:'mkg'|'ftlbs') =>{
    setCalcUnits(selectedValue);
  }
return(
  <>
  <IonAlert isOpen={!!error} message={error} buttons={[{text:'Okay', handler:clearError}]}/>
  <IonApp>
    <IonHeader>
      <IonToolbar color="primary">
        <IonTitle>BMI Calculator</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent className="ion-padding">
      <IonGrid>
        <IonRow>
          <IonCol>
            <InputControl selectedValue={calcUnits} onSelectValue={selectCalcUnitHandler} />
          </IonCol>
        </IonRow>
      </IonGrid>
      <IonItem>
        <IonLabel position="floating">Your height ({calcUnits==='mkg' ? 'meters' : 'feet'})</IonLabel>
        <IonInput type="number" ref={heightInputRef}></IonInput>
      </IonItem>
      <IonItem>
        <IonLabel position="floating">Your weight ({calcUnits==='mkg' ? 'kg' : 'lbs'})</IonLabel>
        <IonInput type="number" ref={weightInputRef}></IonInput>
      </IonItem>
      <IonGrid>
        <BmiControls onCalculate={calculateBMI} onReset={resetInputs}/>
        {calculatedBmi && (
          <BmiResult result={calculatedBmi}/>
        )}
      </IonGrid>
    </IonContent>
  </IonApp>
  </>
)};

export default App;
