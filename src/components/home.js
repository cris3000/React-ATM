import React, {Component} from 'react';
import PinInput from "react-pin-input";
import './home.css';

//services
import { login } from '../services/account-service';
import { setLocalStorage, getLocalStorage } from '../services/local-storage-service';

export default class Home extends Component {    

   componentDidMount(){
    let fiver=[...Array(4)];
    fiver.fill(5);
    let tenner=[...Array(15)];
    tenner.fill(10);
    let twenty=[...Array(7)];
    twenty.fill(20);    
    //set the following in local storage.
    const cash= [fiver, tenner, twenty];   
    setLocalStorage('cash', cash);
    setLocalStorage('overdraft',100);
   }


      onChange = value => {
        if (value.length === 4) {      
          login(value).then(data => {
            if (typeof data ==='number') {
              setLocalStorage('balance', data);
              this.props.history.push(
                  {
                      pathname:'/account'
                  }
              );
            } else {           
              this.props.history.push(
                {
                  pathname:'/error',
                  state: {error: data}
                }
              )
            }
          });
        }
      };
    
      onClear = () => {        
        this.pin.clear();
      };


      
    render() {
     
     
        return (
            <div >
            <h1>Automated Teller</h1>
            <p>Please enter your pin code to begin</p>
            <PinInput
                length={4}
                focus
                secret 
                ref={p => (this.pin = p)} 
                inputStyle={{borderColor: 'silver'}}
                inputFocusStyle={{borderColor: 'black'}}
                type="numeric"
                onChange={this.onChange}
            />
          <br></br>
        <button className='submitbutton' onClick={this.onClear}>Clear</button>  

        </div>
    );
}
}