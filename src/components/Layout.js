import React, {Component} from 'react'
import isArray from 'lodash/isArray'
import sample from 'lodash/sample'
import map from 'lodash/map'

import fillSeatMatrix from '../utils/fillSeatMatrix';
import create2DLayout from '../utils/createSeatLayout';
import SeatLayout from './SeatLayout'

const bgColors = ['#FFFAFA',
    '#F8F8FF',
    '#F5F5F5',
    '#F5F5F5',
    '#DCDCDC',
    '#FFFAF0',
    '#FFFAF0',
    '#FDF5E6',
    '#FDF5E6',
    '#FAF0E6',
    '#FAEBD7',
    '#FAEBD7',
    '#FFEFD5',
    '#FFEFD5',
    '#E6E6FA',
    '#FFF5EE',
    '#F0FFF0',
    '#F0F8FF'
];

class Layout extends Component {
    state = {
        passengerCount: 3,
        matrixInputValue: '',
        generatedMatrix: [],
        loading: true,
    }

    seatMatrixInputRef = React.createRef()
    passengerInputRef = React.createRef()

    validateInputMatrix = (inputValue) => {
        let matrix = JSON.parse(inputValue)
        let output = []
        let error = ""

        if (!isArray(matrix)) error = "Not an Valid Array!!" 

        Array.from(matrix).forEach((subMatrix) => {
            if (!isArray(subMatrix) && subMatrix.length !== 2) {
                error = "Not an Valid Array!" 
            } else {
                output.push(subMatrix)
            }
        })

        return {
            matrix: output,
            error
        }
    }

    componentDidMount() {
        const { matrix, error } = this.validateInputMatrix("[[3,2],[4,3],[2,3],[3,4]]")
        if (!error) {
            this.setState({
                matrixInputValue: matrix,
                inputValue: JSON.stringify(matrix),
                generatedMatrix: fillSeatMatrix(matrix, this.state.passengerCount),
                loading: false,
            })
        } else {
            this.setState({
                errorMessage: error,
                loading: false,
            })
        }
       
    }

    getSeatMatrix = () => {
        const { matrixInputValue } = this.state
        const matrixList = []
        map(matrixInputValue, (matrix, index) => {  
            matrixList[index] = create2DLayout(matrix[0], matrix[1])
        })

        return matrixList;
    }

    isValidInputs = (matrixInputValue) => {
        const { passengerCount } = this.state;
        let seatCount = 0;
        matrixInputValue.map(seatGroup => seatCount += parseInt(seatGroup[0]) * parseInt(seatGroup[1]))

        return seatCount >= parseInt(passengerCount)
    }

  
    handleMatrixCreation = () => {
        const { inputValue, passengerCount } = this.state;
        const { matrix: outputMatrix, error } = this.validateInputMatrix(inputValue)

        if (!this.isValidInputs(outputMatrix) || error) {
            this.setState({
                errorMessage: error || 'Passenger Limit Exceeded!!!'
            })
        } else {
            this.setState({
                loading: true
            })

            // Created a Loading State for a smooth visual
            setTimeout(() => {
                this.setState({
                    loading: false,
                    matrixInputValue: outputMatrix,
                    inputValue: JSON.stringify(outputMatrix),
                    generatedMatrix: fillSeatMatrix(outputMatrix, passengerCount),
                    errorMessage: ''
                })
            }, 500)
        }
        
    }

    handleMatrixChange = (event) => {
        this.setState({
            inputValue: event.target.value,
        })
    }

    handlePassengerCount = (event) => {
        this.setState({
            passengerCount: event.target.value
        })
    }

    render() {
      const { errorMessage, passengerCount, generatedMatrix, inputValue, loading } = this.state

      return (
          <main className='page-container' style={{background: sample(bgColors)}}>
            <div className='page-header'>
                  <header>Airplane Seating Mechanism</header>
                  <div className="rules-container">
                      <div className="rules">Rules:</div>
                      <ol>
                        <li>Always seat passengers starting from the front row to	back, starting from the left	to	the	right</li>
                        <li>Fill	aisle seats	first followed by window seats followed	by center seats (any order in center seats)	</li>
                      </ol>
                  </div>
                <div className="matrix-form-input">
                <div className="input-1">
                    <label>Enter Seat Matrix Input <sup><b>*</b></sup></label>
                    <input ref={this.seatMatrixInputRef} placeholder="Enter Seat Matrix Input" value={`${inputValue}`} onChange={this.handleMatrixChange} />
                </div>
                <div className="input-2">
                    <label>Enter Passenger Queue Input (in Numbers) <sup><b>*</b></sup></label>
                    <input ref={this.passengerInputRef} placeholder="Enter Passenger Queue Matrix Input" value={passengerCount} onChange={this.handlePassengerCount}/>
                </div>
                <button onClick={() => this.handleMatrixCreation()}>Fill Seats</button>
                </div>
                {errorMessage && <div className="error">{errorMessage}</div>}
              </div>
              {loading ? <div className="loader"></div> : <SeatLayout totalPassengers={passengerCount} seatGroupList={generatedMatrix} seatLayout={this.getSeatMatrix()} /> }
          </main>
      )
  }
}

export default Layout;