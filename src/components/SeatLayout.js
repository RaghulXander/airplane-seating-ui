import React, { PureComponent } from 'react'
import Seat from './Armchair.png'
class SeatLayout extends PureComponent {

    renderSeatCell = (index, rowIndex, colIndex) => {
       const { seatGroupList } = this.props;
        const currentSeat = seatGroupList.find(seat => seat.matrixId === index && seat.row === rowIndex && seat.column === colIndex)
        const seatFilledClass = currentSeat?.passengerIdx > 0 ? 'filled' : 'unfilled';
        return (
            <div key={`group-${index}-${rowIndex}-${colIndex}`} className={`seat ${currentSeat?.category} ${seatFilledClass}`}>
                {currentSeat?.passengerIdx > 0 ? currentSeat?.passengerIdx : '-'}
                <img src={Seat} alt="seat" />
                <div className="overlay" />
            </div>
        )
    }
    
    renderRow = (matrixRow, index, rowIndex) => {
       return (
            <div className="seatRow" key={`group-${index}-${rowIndex}`}>
                {matrixRow.map((column, colIndex) => this.renderSeatCell(index, rowIndex, colIndex))}
            </div>
        )
    }

    render() {
        const { totalPassengers, seatLayout } = this.props;

        return (
            <div className='plane-container'>
                <div className="seatContainer">
                    <div className="header">
                        <div className="passengerCount">Total Passenger: {totalPassengers}</div>
                        <div className="legendList">
                            <div className="legend"><div className="aisle-grid"></div><span>Aisle Seat</span></div>
                            <div className="legend"><div className="window-grid"></div><span>Window Seat</span></div>
                            <div className="legend"><div className="center-grid"></div><span>Center Seat</span></div>
                        </div>
                    </div>
                    <div className="seat-list">
                        {seatLayout.map((group, index) => {
                            return (
                                <div className="seat-group" key={`group-${index}`}>
                                {group.map((matrixRow, rowIndex) => this.renderRow(matrixRow, index, rowIndex))}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

export default SeatLayout;