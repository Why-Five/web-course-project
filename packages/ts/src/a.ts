// src/a.js
class Person {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
    say = (who: string) => {
        // God：上帝 / god：神
        const firstChar = who.charAt(0).toLocaleUpperCase();
        console.log(`${firstChar}${who.slice(1)} bless you`);
    };
}

let DPZ = new Person("DPZ");
let 主 = 'god'; // 6 | 'god' | 'Trisolaran' (三体人)
DPZ.say(主);