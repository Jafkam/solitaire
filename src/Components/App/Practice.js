// function solution(number){
//     let reducer = (acc, curr) => acc + curr;
//     let multiples = 0
//     for (let i = 0; i >= number; i++) {
//       if (i % 3 === 0 || i % 5 === 0) {
//       multiples ++
       
//       }
      
//       }
//       return multiples
//     }

//     console.log(solution(12))

    // function solution(number){
    //     let reducer = (acc, curr) => acc + curr;
    //     let multiples = 0
    //     for (let i = 0; i >= number; i++) {
    //       if (i % 3 === 0 || i % 5 === 0) {
    //        multiples += i
    //        console.log(multiples)
    //       }
          
    //       }
    //       return multiples
    
    //     }“

    var countBits = function(n) {
        let binArr = [];
        
        let reducer = (acc, curr) => acc + curr;
        
        for (let i=0; i<n.length; i++) {
        if (n[i] === 1 || n[i] === 2 || n[i] === 4 || n[i]===8) {
         binArr.push(1)
        } else if (n[i]===3 || n[i]===5 || n[i]===6 || n[i]===9) {
         binArr.push(2)
        } else if (n[i]===7) {
         binArr.push(3)
        } else {
         
        }
        
        }
        
        let newArr = binArr.reduce(reducer)
        console.log(binArr)
        return console.log(newArr)
    }
        
       let number = countBits([8,9])

       console.log(number)


