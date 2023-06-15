function test() {
  var myName = "fn_outer"
  let age = 78;
  var innerObj = {
      getName:function(){
          console.log(age);
          return myName
      },
      setName:function(newName){
          myName = newName
      }
  }
  return innerObj
}
var t = test();
console.log(t.getName());//fn_outer 
t.setName("global")
console.log(t.getName())//global
