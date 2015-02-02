var _; //globals

describe("About Applying What We Have Learnt", function() {

  var products;

  beforeEach(function () { 
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {

    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {
      function nutFree(item){
        if (item.containsNuts===false){
          //console.log(_(item.ingredients).all(function(e){return e!=='mushrooms';}));
          return _(item.ingredients).all(function(e){return e!=="mushrooms";});
        }
      }
      var productsICanEat = [];
      
      var productsICanEat=products.filter(nutFree);
      //console.log(productsICanEat);
      /* solve using filter() & all() / any() */

      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {
    
    var sum = 0;
    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }
    
    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {
    var m3=_.range(0,1000,3);
    var m5=_.range(0,1000,5);
    var mul=_.map(m3,function(e){if (e%15==0) {return 0;} else return e;});
    //console.log(mul,m5);
    var sum = _([]).chain()
              .concat(m5)
              .concat(mul)
              .reduce(function(memo,e){return memo+e;})
              .value();
    /* try chaining range() and reduce() */

    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }
    //console.log(ingredientCount);
    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    //var ingredientCount = { "{ingredient name}": 0 };
    //console.log(products);
    //initialize ingredientCount:
    var ingredientCount={ "{ingredient name}": 0 };
    var ingredientCount = _(ingredientCount).chain()
                          .concat(_.map(products,function(e){return e.ingredients;}))
                          .flatten()
                          .reduce(function(memo,e){
                            ingredientCount[e]=(ingredientCount[e]||0)+1;
                            return ingredientCount;})
                          .value();
    //console.log(ingredientCount);
    //console.log('array formed in reduce:',xxx);

    /* chain() together map(), flatten() and reduce() */

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */
  //do this functionally rather than iteratively!
  it("should find the largest prime factor of a composite number", function () {
    var primeFactor=function(n){
      var i=Math.floor(n/2);
      var factor=1;
      while (i>=2){
        //console.log('i',i);
        if (n%i==0){
          var prime=true;
          for (j=2;j<i;j++){
            //console.log('i',i,'j',j);
            if (i%j===0){
              prime=false;
              break;}
          }
          if (prime===true){
            //console.log('n',n,'prime factor is',i);
            return i;
          }
        }
        i--;
      }
      
    };
    expect(primeFactor(25)).toBe(5);
    expect(primeFactor(119)).toBe(17);

  });

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {
    var palindrome=function(){
      var i=999*999;
      while (i>100*100){
        if (i.toString()===i.toString().split('').reverse().join('')){
          //console.log(i);
          for (var j=999;j>100;j--){
            if (i%j===0 && i/j-1000<0){
              //console.log(i,j,i/j);
              return i;
            }
          }
          }
        i--;
      }
    }
    
    //console.log(palindrome());
      expect(palindrome()).toBe(906609);
  });

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {
    function smallestNumber(){
      var num=1;
      for (var i=20;i>=2;i--){
        if (num%i!=0){
          var j=1;
          while (j<i){
            //console.log(num,j,num*j,i,num*j%i)
            if (num*j%i==0)
              break;
            j++;
          }
          num*=j;
          //console.log('next num',num);
        }
          }
      return num;
    }

    console.log(smallestNumber());
  });

  it("should find the difference between the sum of the squares and the square of the sums", function () {
    
  });

  it("should find the 10001st prime", function () {

  });
  });
