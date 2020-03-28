const HashMap = require('./chaining.js');

function main() {
    //some code
    const lotr = new HashMap();
    lotr.MAX_LOAD_RATIO = 0.5;
    lotr.SIZE_RATIO = 3;

    lotr.set("Hobbit", "Bilbo");
    lotr.set("Hobbit", "Frodo");
    lotr.set("Wizard", "Gandalf");
    lotr.set("Human", "Aragorn");
    lotr.set("Elf", "Legolas");
    lotr.set("Maiar", "The Necromancer");
    lotr.set("Maiar", "Sauron");
    lotr.set("RingBearer", "Gollum");
    lotr.set("LadyOfLight", "Galadriel");
    lotr.set("HalfElven", "Arwen");
    lotr.set("Ent", "Treebeard");

    //Print your hash map and notice the length and items that are hashed in your hash map. 
    //Have you hashed all the items you were asked to?
    console.log(lotr);
    //no, Only one hobbit and one maiar got hashed

    //Retrieve the value that is hashed in the key "Maiar" and Hobbit.
    // console.log(lotr.get("Maiar"));
    //We get Frodo for Hobbit and Sauron for Maiar, both are the second attempt of adding a value of its kind

    //What is the capacity of your hash table after you have hashed all the above items? Explain your answer.
    //The capacity is still 8. The resize function may be broken because it should resize once you attempt to add a 5th element, but it doesn't
}

const WhatDoesThisDo = function(){
    let str1 = 'Hello World.';
    let str2 = 'Hello World.';
    let map1 = new HashMap();
    map1.set(str1,10);
    map1.set(str2,20);
    let map2 = new HashMap();
    let str3 = str1;
    let str4 = str2;
    map2.set(str3,20);
    map2.set(str4,10);

    console.log(map1.get(str1));
    console.log(map2.get(str3));
}

//WhatDoesThisDo();
//What is the output of the following code? explain your answer.
//10 and 20. Output is actually 20 and 10. My guess is that the get function
//looks at the most recent location of the hashed string and finds the most recent value.

main();

// function removeDuplicate(string) {
//     let chars = string.toLowerCase().split("");
//     let charsHash = new HashMap();

//     for (let i = 0; i < chars.length; i++) {
//         charsHash.set(chars[i], i);
//     }
//     //pull out each key/value pair and sort based on the value (position) to reconstruct the string
//     for (let i = 0; i < charsHash.length; i++) {
//         console.log(charsHash._hashTable[i].key);
//     }
//     //console.log(charsHash);
// }

// removeDuplicate("google");

// function palindromeDetector(string) {
//     let chars = string.toLowerCase().split("");
//     let charsHash = new HashMap();

//     for (let i = 0; i < chars.length; i++) {
//         try {
//             let tempValue = charsHash.get(chars[i]);
//             charsHash.set(chars[i], tempValue.value + 1);
//         }
//         catch(error) {
//             charsHash.set(chars[i], 1);
//         }
//     }

//     let even = 0;
//     let odd = 0;

//     for (let i = 0; i < charsHash.length; i++) {
//         if (charsHash._hashTable[i] === undefined) {
//             i++;
//         } else {
//             if (charsHash._hashTable[i].value % 2 === 0) {
//                 even++;
//             } else {
//                 odd++;
//             }
//         }
//     }


//     if (odd > 1) {
//         return "This is not a palindrome";
//     } else {
//         return "This IS a palindrome";
//     }
// }

// console.log(palindromeDetector("acecarr"));

let array = ['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race'];
function anagrams(array) {
  let results = [];
  let alphaHash = new HashMap();
  array.forEach(word => {
    let alpha = word.split('').sort().join('');
    try {
      let index = alphaHash.get(alpha);
      results[index].push(word);
    }
    catch (e) {
      alphaHash.set(alpha, results.length);
      results.push([word]);
    }
  });
  return results;
}

// console.log(JSON.stringify(anagrams(array)));

