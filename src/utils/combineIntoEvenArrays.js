export const combineIntoEvenArrays = (initialArray) => {
    // Output arrays
    const arrOne = [];
    const arrTwo = [];

    // Output arrays lengths
    let arrOneLength = 0;
    let arrTwoLength = 0;

    initialArray.forEach((str) => {
        if (arrTwoLength >= arrOneLength) {
            arrOne.push(str);
            arrOneLength += str.length;
        } else {
            arrTwo.push(str);
            arrTwoLength += str.length;
        }
    });

    return [arrOne, arrTwo];
};
