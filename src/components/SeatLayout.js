import React, { PureComponent } from 'react'

class SeatLayout extends PureComponent {

    renderSeatCell = (value, isAisle, isWindow) => {
        const seatClass = isAisle ? 'asile' : isWindow ? 'window' : '';
        return (
            <div className={`seat ${seatClass}`}>{value}</div>
        )
    }
    
    renderRow = (matrixRow) => {
        return (
            <div className="seatRow">
                {matrixRow.map(column => this.renderSeatCell(column))}
            </div>
        )
    }

    render() {
        const { totalPassengers, seatGroupList, seatLayout } = this.props;

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
                            {
                                group.map((matrixRow, rowIndex) => {
                                    return (
                                    <div className="seatRow" key={`group-${index}-${rowIndex}`}>
                                        {matrixRow.map((column, colIndex) => {
                                            const currentSeat = seatGroupList.find(seat => seat.matrixId === index && seat.row === rowIndex && seat.column === colIndex)
                                            return (
                                                <div key={`group-${index}-${rowIndex}-${colIndex}`} className={`seat ${currentSeat?.category}`}>{currentSeat?.passengerIdx ?? 0}</div>
                                            )
                                        })}
                                    </div>
                                    )
                            })}
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