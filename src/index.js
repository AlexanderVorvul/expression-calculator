function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {

    let bracketsExpr = '';
	let expr_ = '';
    for(let i=0; i<expr.length; i++){
        if (expr[i] === '(' || expr[i] === ')') bracketsExpr += expr[i];
	if (! (expr[i]===' ')) expr_ +=expr[i];
	}		
	expr = expr_;

    for (let i = 0; i < bracketsExpr.length-1; ){
        if (bracketsExpr[i] === '(' && bracketsExpr[i+1] === ')'){       
          let s1 = bracketsExpr.substring(0, i);      
          let s2 = bracketsExpr.substring(i+2, bracketsExpr.length);      
          bracketsExpr = s1 + s2;        
          i--;
          if( i < 0 ) i = 0;       
        }	else i++;
    }
    if (bracketsExpr) throw "ExpressionError: Brackets must be paired";

    function findEnd(end, expr){
		const reserved = '(+-*/)';
        let k = end;
        for (; k < expr.length; k++)
            if (1 + reserved.indexOf(expr[k])) break;
        return k;
    }

    let arr = new Array();

    const reserved = '(+-*/)';	

    for(let i=0; i<expr.length; i++)
        if (1 + reserved.indexOf(expr[i])) arr.push(expr[i]);
		    else {
			    let end = findEnd(i, expr);
			    let num = Number(expr.substring(i, end));			
			    arr.push(num);
			    i=end-1;
		    }
	
    function evaluate(arr){
        for (let i = 1; i <arr.length-1;)		
           if (arr[i] === '*' || arr[i] === '/'){                
                let op1 = arr[i-1];
                let op2 = arr[i+1];
				let result;
				if (arr[i] === '*') result = op1 * op2;
				    else {
					    if (op2===0) throw "TypeError: Division by zero.";
            				else result = op1 / op2;
				    }
                arr.splice(i-1, 3, result);
                i--;
			    if( i < 0 ) i = 0;
			} else i++;
	
		for (let i = 0; i <expr.length;)	
			if (arr[i] === '+' || arr[i] === '-'){
                let op1 = arr[i-1];
                let op2 = arr[i+1];
				let result = 0;
				if(arr[i] === '+') result= op1 + op2;
				    else result = op1 - op2;			
			    arr.splice(i-1, 3, result);
                i--;
			    if( i < 0 ) i = 0;
			} else i++;
	return arr[0];    
 }

 while(true){
        let leftIndex = arr.lastIndexOf('(');	
        let rightIndex = arr.indexOf(')', leftIndex);
        if (leftIndex === -1) return Number(evaluate(arr));
        let op = evaluate(arr.slice(leftIndex+1, rightIndex))
        arr.splice(leftIndex, rightIndex - leftIndex + 1, op);
    }
}

module.exports = {
    expressionCalculator
}
