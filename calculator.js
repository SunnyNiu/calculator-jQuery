
let formula = '0'

function getLastSegment(value) {
    return value.match(/(-?\d+\.?\d*$)|([\+\-\*\/]+$)/)[0];
}


$('.numberBtn').click(
    function (e) {
        if(formula.includes('Infinity') || formula.includes('NaN')) return;
        let inputNumber = e.target.value;
        
        if (formula === '0') {
            formula = inputNumber
        } else {
            //last digital is 0
            if (getLastSegment(formula) === '0') {
                formula = formula.slice(0, formula.length - 1) + inputNumber
            } else {
                //last digital is not 0
                formula += inputNumber;
            }
        }

        $('#display').val(formula)
    }
)

$('#decimal').click(
    function () {
        if(formula.includes('Infinity') || formula.includes('NaN')) return;
        let lastSegment = getLastSegment(formula);
        if (!lastSegment.includes('.')) {
            if (formula === '0') {
                formula = formula + '.'
            } else {
                if (isNaN(Number(lastSegment))) {
                    formula = formula + '0.'
                } else {
                    formula = formula + '.'
                }
            }
        }
        $('#display').val(formula)
    }
)

$('#clearAll').click(
    function () {
        formula = '0'
        $('#display').val(formula)
    }
)

$('#clear').click(
    function () {
        if(formula.length > 0){
            formula = formula.slice(0, formula.length-1)
            if(formula.toString() === ''){
                formula = '0'
            }
        }
        $('#display').val(formula)
    }
)

$('.operatorBtn').click(
    function (e) {
        if(formula.includes('Infinity') || formula.includes('NaN')) return;
        let operatorInput = e.target.value;
        let lastSegment = getLastSegment(formula);

        if (!isNaN(Number(lastSegment))) {
            formula += operatorInput
        } else {
            if (!lastSegment.includes('-') && operatorInput === '-') {
                formula += operatorInput
            } else if (isNaN(Number(lastSegment)) && operatorInput !== '-' && !lastSegment.includes('-')) {
                formula = formula.slice(0, formula.length - 1) + operatorInput
            }
        }
        $('#display').val(formula)
    }
)

$('#equals').click(
    function () {
        if(formula.includes('Infinity') || formula.includes('NaN')) return;
        formula = eval(formula).toString()
        if(formula.includes('.')){
            let index = formula.indexOf('.')
            let length = formula.length;
            if((length - index) > 5){
                formula = formula.substring(0, index + 5)
            }
        }
        $('#display').val(formula)
    }
)