import fillSeatMatrix from '../utils/fillSeatMatrix';

const getFilledSeatsByType = (seatList, category) => {
    return seatList.filter(seat => seat.passengerIdx > 0 && seat.category === category).map(seat => seat.passengerIdx)
}

describe("Utils: fillSeatMatrix", () => {
    describe("Should test the Seat filling length should match the passenger count", () => {
        it("should leave the seats blank when the total passenger count is less than the actual seats", () => {
            expect(fillSeatMatrix([[2, 3]], 5).filter(seat => seat.passengerIdx > 0).length).toEqual(5);
        });
    
        it("should leave the seats blank when the total passenger count is less than the actual seats for 3Group", () => {
            expect(fillSeatMatrix([[2, 3], [3,4],[4,5]], 15).filter(seat => seat.passengerIdx > 0).length).toEqual(15);
        });
    
        it("should leave the seats blank when the total passenger count is less than the actual seats for 4 Group", () => {
            expect(fillSeatMatrix([[2, 3], [3,4],[4,5], [4,6]], 50).filter(seat => seat.passengerIdx > 0).length).toEqual(50);
        });

        it("should fill the maximum capacity of seats when the passenger count exceeds", () => {
            expect(fillSeatMatrix([[2, 3], [3,4],[4,5], [4,6]], 100).filter(seat => seat.passengerIdx > 0).length).toEqual(62);
        });

        // Takes More than 40ms
        it("should testing the maximum capability - 1", () => {
            expect(fillSeatMatrix([[112, 113], [113,114],[114,115], [14,16]], 1024).filter(seat => seat.passengerIdx > 0).length).toEqual(1024);
        });

        // Takes More than 50ms
        it("should testing the maximum capability - 2", () => {
            expect(fillSeatMatrix([[120, 113], [150,114],[114,115], [14,16]], 10024).filter(seat => seat.passengerIdx > 0).length).toEqual(10024);
        });
    });

    describe("Snap shoting the Seat Node Array Values", () => {
        it("should consider the one column matrix as the window for the first group", () => {
            expect(fillSeatMatrix([[2, 1]], 2)).toEqual([
                {
                    "category": "window",
                    "column": 0,
                    "matrixId": 0,
                    "passengerIdx": 1,
                    "row": 0,
                },
                {
                    "category": "window",
                    "column": 0,
                    "matrixId": 0,
                    "passengerIdx": 2,
                    "row": 1,
                },
            ]);
        });

        it("should start the two column matrix with the aisle and then with the window for the first group", () => {
            expect(fillSeatMatrix([[2, 2]], 2)).toEqual([{"category": "window", "column": 0, "matrixId": 0, "passengerIdx": 1, "row": 0}, {"category": "window", "column": 1, "matrixId": 0, "passengerIdx": 2, "row": 0}, {"category": "window", "column": 0, "matrixId": 0, "passengerIdx": 0, "row": 1}, {"category": "window", "column": 1, "matrixId": 0, "passengerIdx": 0, "row": 1}]);
        });
    })
    
    describe("Test cases to check 2 column matrix", () => {
        it("should start the two same size two-column matrix with the aisle, window, center seats for multiple group", () => {
            const seatList = fillSeatMatrix([[2, 2], [2, 2]], 7);
            const aisleSeats = getFilledSeatsByType(seatList, 'aisle');
            const windowSeats = getFilledSeatsByType(seatList, 'window');
            const centerSeats = getFilledSeatsByType(seatList, 'center');
            expect([aisleSeats, windowSeats, centerSeats]).toEqual([[1,2,3,4],[5,6,7],[]]);
        });

        it("should start the two different size two-column matrix with the aisle, window, center seats for multiple group", () => {
            const seatList = fillSeatMatrix([[2, 3], [2, 4]], 7);
            const aisleSeats = getFilledSeatsByType(seatList, 'aisle');
            const windowSeats = getFilledSeatsByType(seatList, 'window');
            const centerSeats = getFilledSeatsByType(seatList, 'center');
            expect([aisleSeats, windowSeats, centerSeats]).toEqual([[1,2,3,4],[5,6,7],[]]);
        });
    });

    describe("Test cases to check 3 column matrix", () => {
        it("should start the one three-column matrix with the window, center seats for a single group", () => {
            const seatList = fillSeatMatrix([[3, 4]], 10);
            const aisleSeats = getFilledSeatsByType(seatList, 'aisle');
            const windowSeats = getFilledSeatsByType(seatList, 'window');
            const centerSeats = getFilledSeatsByType(seatList, 'center');
            expect([aisleSeats, windowSeats, centerSeats]).toEqual([[],[1,2,3,4,5,6],[7,8,9,10]]);
        });

        it("should start the three same column matrix with the aisle, window, center seats for multiple group", () => {
            const seatList = fillSeatMatrix([[3, 3], [3, 3]], 17);
            const aisleSeats = getFilledSeatsByType(seatList, 'aisle');
            const windowSeats = getFilledSeatsByType(seatList, 'window');
            const centerSeats = getFilledSeatsByType(seatList, 'center');
            expect([aisleSeats, windowSeats, centerSeats]).toEqual([[1,2,3,4,5,6],[7,8,9, 10, 11, 12],[13,14,15,16,17]]);
        });

        it("should start the two different sized three-column matrix with the aisle, window, center seats for multiple group", () => {
            const seatList = fillSeatMatrix([[3, 4], [3, 4]], 10);
            const aisleSeats = getFilledSeatsByType(seatList, 'aisle');
            const windowSeats = getFilledSeatsByType(seatList, 'window');
            const centerSeats = getFilledSeatsByType(seatList, 'center');
            expect([aisleSeats, windowSeats, centerSeats]).toEqual([[1,2,3,4,5,6],[7,8,9,10],[]]);
        });
    });    
});
