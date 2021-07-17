import flattenDeep from 'lodash/flattenDeep';
import sortBy from 'lodash/sortBy';
import map from 'lodash/map';

/**
 * Seat is Class construct which is helpful in computing the seat matrix and this aligns strongly with OOPS concepts
 * Class declaration
 * @class
 * @constructor
 * @public
 */
class Seat {
	/**
		 * The above Seat class includes following properties
		 * matrixId - @type {String} - keep track of the origin of the seat (refers the group to which this seat belong)
		 * row - @type {int} - row position of the seat within the origin group
		 * column - @type {int} - column position of the seat within the origin group
		 * passengerIdx - @type {int} - stores the passenger identity to whom the seat belongs in passenger queue
		 * category - @type {string} - type of the seat (aisle, center, window) and this will really helps in User Interface 
		 * @public
		 * @example
		 * {"category": "aisle", "column": 1, "matrixId": 0, "passengerIdx": 1, "row": 1}
		 * {"category": "window", "column": 1, "matrixId": 0, "passengerIdx": 1, "row": 0}
		 * 
    */
	constructor(matrixId, row, column, category) {
		this.matrixId = matrixId
		this.row = row
		this.column = column
		this.passengerIdx = 0
		this.category = category
	}
}

/**
 * The below function expression is exported and used during the user event of filling the seats
 * This should be used with the below parameters as arguments during the user events
 * The default values of passengerCount tends to be zero
 * groupList is the mandatory parameter for the below function
 * @param {Array} groupList 
 * @param {int} passengerCount 
 * @returns {Array<Seat>}
 */
const fillSeatMatrix = (groupList, passengerCount = 0) => {
	let aisle = [];
	let window = [];
	let center = [];
	let count = 1;

	/**
	 * The below functions creates the Aisle Seat nodes for all the seat groups
	 * This is the un-flattened Array each may be created on different row or columns or even in different groups 
	 * @param {Array<[m, n]>} matrixGroup 
	 * m - row length and n - column length
	 * @param {int} groupIndex 
	 * @returns {Array<Seat>} specific to Aisle Category
	 */
	const createAisleSeats = (matrixGroup, groupIndex) => {
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


	/**
	 * The below functions creates the Window Seat nodes for all the seat groups
	 * This is the un-flattened Array each may be created on different row or columns or even in different groups 
	 * @param {Array<[m, n]>} matrixGroup 
	 * m - row length and n - column length
	 * @param {int} groupIndex 
	 */
	const createWindowSeats = (matrixGroup, groupIndex) => {
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

	/**
	 * The below functions creates the Center Seat nodes for all the seat groups
	 * This is the easier part of creating the rest of the seats for remaining index in seat group matrices
	 * @param {Array<[m, n]>} matrixGroup 
	 * m - row length and n - column length
	 * @param {int} groupIndex 
	 */
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

			/**
			 * Iterating each seatGroup and filling based on the order below.
			 * When its one columned one seatGroup it will be a window
			 * When its the two columned one seatGroup both will be a window
			 * Like the above few etch cases are also covered to avoid confusion
			 */
			if (groupList.length !== 1 && groupList[i][1] >= 1) {
				createAisleSeats(groupList[i], i);
			}
			createWindowSeats(groupList[i], i);
			if (groupList[i][1] > 2) {
				getCenterSeats(groupList[i], i);
			}

		}
	}
    
	fillMatrix()

	/**
	 * The sorting is kept aside from the above logic to ensure that sorting can be controlled easily
	 * based on the preference like top to down or vice-versa
	 */
	const sortedList = [
		...sortBy(flattenDeep(aisle), ['row', 'matrixId']),
		...sortBy(flattenDeep(window), ['row', 'matrixId']),
		...sortBy(flattenDeep(center), ['row', 'matrixId'])
	]

	/**
	 * Involves in filling the seats within the sortedList and rest of the seats will stay unfilled
	 */
	map(sortedList, seat => {
		if (count > passengerCount) return;
		seat.passengerIdx = count
		count++
	});

	return sortedList
}

export default fillSeatMatrix