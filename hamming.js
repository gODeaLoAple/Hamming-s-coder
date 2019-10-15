function invert(data, index) {
    return data.substr(0, index)
        + (data[index] === "0" ? "1" : "0")
        + data.substr(index + 1);
}

function getNumbersSet(from, to) {
    let result = new Set();
    for (let i = from; i <= to; i++)
        result.add(i);
    return result;
}

function replaceData(data, errorPositions) {
    switch (errorPositions.length) {
        case 0: 
            return data;
        case 1: 
            return invert(data, errorPositions[0]);
        case 3: 
            if (errorPositions[1] > 3)
                return invert(data, errorPositions[0]);
        case 7:
            return invert(data, 3);
        default: 
            return invert(data, errorPositions[0]) + "1";
    }
}

function encodeHamming(data) {
    const positions = [ [ 1, 2, 3 ], [ 0, 2, 3 ], [ 0, 1, 3 ] ];
    let evenCode = ""; 

    positions.forEach( (round) => {
        let isEven = true;
        round.forEach( (position) => {
            if (data[position] === "1")
                isEven = !isEven;
        });
        evenCode += isEven ? "0" : "1";
    });

    return data + evenCode;
}

function decodeHamming(data) {
    const positions = [ [ 1, 2, 3, 4 ], [ 0, 2, 3, 5 ], [ 0, 1, 3, 6 ] ];
    let hasError = getNumbersSet(0, 6);

    positions.forEach( (round) => {
        let isEven = true;
        round.forEach( (index) => {
            if (data[index] === "1")
                isEven = !isEven;
        });
        if (isEven)
            round.forEach( (index) => hasError.delete(index) );
    });
    
    return replaceData(data, Array.from(hasError).sort()); 
}