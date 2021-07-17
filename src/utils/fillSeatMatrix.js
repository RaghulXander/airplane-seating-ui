import flattenDeep from 'lodash/flattenDeep';
import sortBy from 'lodash/sortBy';
import map from 'lodash/map';

class Seat {
	constructor(matrixId, row, column, category) {
		this.matrixId = matrixId
		this.row = row
		this.column = column
		this.passengerIdx = 0
		this.category = category
	}
}

const fillSeatMatrix = (groupList, passengerCount) => {
	let aisle = [];
	let window = [];
	let center = [];
	let count = 1;

	const getAisleSeats = (matrixGroup, groupIndex) => {
		if (groupIndex === 0) {
			let tempArray = [];
			if (matrixGroup[1] === 1) return;
			for (let i = 0; i < matrixGroup[0]; i++) {
				if (matrixGroup[1] >= 2) {
					let tempNode = new Seat(groupIndex, i, matrixGroup[1] - 1, 'aisle')
					tempArray.push(tempNode)
				}
			}
			aisle.push(tempArray)
		} else if (groupIndex === groupList.length - 1) {
			let tempArray = [];
			if (matrixGroup[1] === 1) return;
			for (let i = 0; i < matrixGroup[0]; i++) {
				let tempNode = new Seat(groupIndex, i, 0, 'aisle')
				tempArray.push(tempNode)
			}
			aisle.push(tempArray)
		} else {
			let tempArray = [];
			for (let i = 0; i < matrixGroup[0]; i++) {
				let tempNode = new Seat(groupIndex, i, 0, 'aisle');
				tempArray.push(tempNode)
				if (matrixGroup[1] > 1) {
					tempNode = new Seat(groupIndex, i, matrixGroup[1] -1, 'aisle');
					tempArray.push(tempNode)
				}

			}
			aisle.push(tempArray)
		}
	}

	const getWindowSeats = (matrixGroup, groupIndex) => {
		if (groupIndex === 0) {
			let tempArray = [];
			for (let i = 0; i < matrixGroup[0]; i++) {
				let tempNode = new Seat(groupIndex, i, 0, 'window')
				tempArray.push(tempNode)

				if (groupList.length === 1 && matrixGroup[0].length > 1) {
					let tempNode = new Seat(groupIndex, i, matrixGroup[1] -1, 'window')
					tempArray.push(tempNode)
				}
			}
			window.push(tempArray)
		}
		
		if (groupIndex === groupList.length - 1 && matrixGroup[1] > 1) {
			let tempArray = [];
			for (let i = 0; i < matrixGroup[0]; i++) {
				let tempNode = new Seat(groupIndex, i, matrixGroup[1] - 1, 'window')
				tempArray.push(tempNode)
			}
			window.push(tempArray)
		}
	}

	const getCenterSeats = (matrixGroup, groupIndex) => {
		for (let i = 0; i < matrixGroup[0]; i++) {
			let tempArray = [];
			for (let j = 1; j < matrixGroup[1] - 1; j++) {
				if (matrixGroup[1] > 2) {
					let tempNode = new Seat(groupIndex, i, j, 'center')
					tempArray.push(tempNode)
				}
				
			}
			center.push(tempArray);
		}
	}

	const fillMatrix = () => {
		for (let i = 0; i < groupList.length; i++) {

			// The first condition says that one group will have two windows and no aisles 
			if (groupList.length !== 1 && groupList[i][1] >= 1) {
				getAisleSeats(groupList[i], i);
			}
			getWindowSeats(groupList[i], i);
			if (groupList[i][1] > 2) {
				getCenterSeats(groupList[i], i);
			}

		}
	}
    
	fillMatrix()

	const sortedList = [
		...sortBy(flattenDeep(aisle), ['row', 'matrixId']),
		...sortBy(flattenDeep(window), ['row', 'matrixId']),
		...sortBy(flattenDeep(center), ['row', 'matrixId'])
	]

	map(sortedList, seat => {
		if (count > passengerCount) return;
		seat.passengerIdx = count
		count++
	});

	return sortedList
}

export default fillSeatMatrix