import { Component } from 'react';
import './App.css';

class App extends Component{
  state = {
    capitalAmount: '',
    riskRatePercentage: '',
    entryPrice: '',
    stopLossPrice: '',
    leveragePercentage: '',
    quantity: '',
    risk: '',
    tradeLoss: '',
    investment: '',
    calculated: false,
    quantityClicked: false,
    saved: false,
  }

  componentDidMount(){
    if(localStorage.getItem('capital_amount')){
      this.setState({
        capitalAmount: parseInt(localStorage.getItem('capital_amount')),
        riskRatePercentage:  parseInt(localStorage.getItem('risk_rate')),
        leveragePercentage: parseInt(localStorage.getItem('leverage'))
      })
    }
  }

  onCalculate = () => {
    this.setState(status => ({calculated: !status.calculated, quantityClicked: false}))
  }

  onCapital = (event) => {
    this.setState({capitalAmount : event.target.value})
  }

  onRiskRate = (event) => {
    this.setState({riskRatePercentage : event.target.value})
  }

  onEntry = (event) => {
    this.setState({entryPrice : event.target.value})
  }

  onStopLoss = (event) => {
    this.setState({stopLossPrice : event.target.value})
  }

  onLeverage = (event) => {
    this.setState({leveragePercentage : event.target.value})
  }

  onQuantity = event => {
    this.setState({quantity: event.target.value})
  }

  onQuantityClick = () => {
    this.setState(state=>({quantityClicked: !state.quantityClicked}))
  }

  onSave = () => {
    const {capitalAmount, riskRatePercentage, leveragePercentage} = this.state
    localStorage.setItem('capital_amount', capitalAmount)
    localStorage.setItem('risk_rate', riskRatePercentage)
    localStorage.setItem('leverage', leveragePercentage)
    this.setState({saved: true, quantityClicked: false})
  }

  inputComponent = () => {
    const {capitalAmount, entryPrice, riskRatePercentage, stopLossPrice, leveragePercentage} = this.state
    return(
    <div className='form'>
      <div>
        <label htmlFor='capital'>CAPITAL AMOUNT IN RUPEES:</label>
        <input onChange={this.onCapital} value={capitalAmount} type='number' id='capital' className='capital-field' />
      </div>
      <hr/>
      <div>
        <label htmlFor='risk_rate'>RISK RATE PERCENTAGE:</label>
        <input onChange={this.onRiskRate} value={riskRatePercentage} type='number' id='risk_rate' className='risk-rate-field' />
      </div>
      <hr/>
      <div>
        <label htmlFor='entry'>ENTRY PRICE IN RUPEES:</label>
        <input onChange={this.onEntry} value={entryPrice} type='number' id='entry' className='entry-field' />
      </div>
      <hr/>
      <div>
        <label htmlFor='stop_loss'>STOP LOSS PRICE IN RUPEES:</label>
        <input onChange={this.onStopLoss} value={stopLossPrice} type='number' id='stop_loss' className='stop-loss-field' />
      </div>
      <hr/>
      <div>
        <label htmlFor='leverage'>LEVERAGE PERCENTAGE:</label>
        <input onChange={this.onLeverage} value={leveragePercentage} type='number' id='leverage' className='leverage-field' />
      </div>
    </div>
  )}

  outputComponent = () => {
    const {capitalAmount,riskRatePercentage, entryPrice, leveragePercentage, stopLossPrice, quantity, quantityClicked} = this.state
    
    return(
      <div className='form'>
        <div className='result-container'>
          <label htmlFor='risk'>RISK :</label>
          <h2 className='risk-rate-field' id='risk'>{capitalAmount * (riskRatePercentage/100)}</h2>
        </div>
        <hr/>
        <div className='result-container'>
          <label htmlFor='trade_loss'>TRADE LOSS :</label>
          <h2 className='risk-rate-field' id='trade_loss'>{entryPrice - stopLossPrice}</h2>
        </div>
        <hr/>
        <div className='result-container'>
          <label htmlFor='quantity'>QUANTITY :</label>
          {!quantityClicked? <h2 onClick={this.onQuantityClick} className='leverage-field quantity-field' id='quantity'>{quantity === '' ? ((capitalAmount * (riskRatePercentage/100)) / (entryPrice - stopLossPrice)) : quantity}</h2> : <input className= "leverage-field" value={quantity} type='number' onChange={this.onQuantity} />}
        </div>
        <hr/>
        <div className='result-container'>
          <label htmlFor='investment'>INVESTMENT :</label>
          <h2 className='leverage-field' id='investment'>{(entryPrice * (quantity === '' ? ((capitalAmount * (riskRatePercentage/100)) / (entryPrice - stopLossPrice)) : quantity)) * (leveragePercentage/100)}</h2>
        </div>
      </div>
    )
  }

  render(){
    const {calculated, saved} = this.state
    return(
      <div className='main-container'>
        {!calculated? this.inputComponent() : this.outputComponent()}
        <div className='buttons-container'>
          <button onClick={this.onCalculate}>
            {calculated? "<-- GO BACK" : "CALCULATE -->"}
          </button>
          {calculated && <button onClick={this.onSave}>{saved ? 'SAVED': 'SAVE'}</button>}
        </div>
      </div>
    )
  }
}

export default App;
