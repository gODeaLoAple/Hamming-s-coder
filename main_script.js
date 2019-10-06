function checkNumerals(context) {
    context.value = context.value.replace(/[^0-1]/g, "");
}

function writeToErrorBlock(text) {
    document.getElementById("error_block")
        .querySelector("p").innerText = text;
}

function clearErrorBlock() {
    writeToErrorBlock("");
}

function getCode() {
    let originalMessage = document.getElementById("original_message").value;
    clearErrorBlock();

    if (originalMessage.length == 4) 
        document.getElementById("encoded_message").value 
            = encodeHamming(originalMessage);
    else 
        writeToErrorBlock("The original message is too small.");
}

function getDecode() {
    let encodedMessage = document.getElementById("encoded_message").value;
    let decodedMessage = document.getElementById("decoded_message");
    let decodedText;
    clearErrorBlock();

    if (encodedMessage.length == 7) 
    {
        decodedText = decodeHamming(encodedMessage);
        if (decodedText.length > 7)
            writeToErrorBlock("Error. More than one errors were found.");  
        decodedMessage.value = decodedText.substr(0, 7); 
    }
    else 
        writeToErrorBlock("The encoded message is too small.");
}

let inputs = document.getElementsByTagName("input");

for (let i = 0; i < inputs.length; i++)
    inputs[i].addEventListener("input", function(event) {
        event.preventDefault();
        checkNumerals(this);
    });