/*
function timeout(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
  
  async function asyncPrint(value, ms) {
    await timeout(ms);
    console.log(value);
  }
  
  asyncPrint('hello world', 5000);
 */

 var ac = 0

 function bb(){
     ac = 1
     return ac
 }

 bb()

 console.log(ac)