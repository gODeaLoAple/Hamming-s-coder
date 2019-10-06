function invert(data, index) {
    return data.substr(0, index)
        + (data[index] == "0" ? "1" : "0")
        + data.substr(index + 1);
}

function replaceData(data, errorPosition) {
    let result = data;

    switch (errorPosition.length) {
        case 0: 
            break;
        case 1: 
            result = invert(data, errorPosition[0]);
            break;
        default: 
            result = invert(data, errorPosition[0]) + "1";
            break;
    }

    return result;
}

function encodeHamming(data) {
    let positions = [ [ 1, 2, 3 ], [ 0, 2, 3 ], [ 0, 1, 3 ] ];
    let evenCode = ""; 

    for (let i = 0; i < positions.length; i++) {
        let isEven = true;

        for (let j = 0; j < positions[i].length; j++) {
            if (data[positions[i][j]] == "1") 
                isEven = !isEven;
        }

        evenCode += isEven ? "0" : "1";
    }

    return data + evenCode;
}

function decodeHamming(data) {
    let positions = [ [ 1, 2, 3, 4 ], [ 0, 2, 3, 5 ], [ 0, 1, 3, 6 ] ];
    let errors = [];
    let errorPosition = [];

    positions.forEach( (position) => {
        let isEven = true;
        
        position.forEach( (index) => {
            if (data[index] == "1")
                isEven = !isEven;
        });

        position.forEach( (index) => {
            errors[index] = isEven || errors[index];
        });
    });

    errors.forEach( (err, i) => {
        if (!err) 
            errorPosition.push(i);
    });
    
    return replaceData(data, errorPosition); 
}