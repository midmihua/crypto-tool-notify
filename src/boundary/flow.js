module.exports = mainFlow = (symbols, rules, market) => {

    symbols.forEach(symbol => {

        // Verify if symbol is available for data processing
        // Available if {status: active} and {retry: > 0}
        if (symbol.status === 'active' && symbol.retry > 0) {

            // Verify if Rule and MArket are available for data processing too


        }
    });

    // execute specific rule for each pairs

    // send notification of needed

    // decrease retry parameter (send updated data to ct-config micro-service)

};