

export class MonsterClass {
    name: string;
    id: number;

    health: number = 100;
    hunger: number = 100;
    happiness: number = 100;

    mood: { [key: string]: string };

    constructor(name: string, id: number) {
        this.name = name;
        this.id = id;
        this.mood = { name: "default", path: this.id + "/default.svg" };
    }
}

export class FoodClass {
    name: string;
    perk: number;
    iconPath: string;

    constructor(name: string, perk: number) {
        this.name = name;
        this.perk = perk;
        this.iconPath = "./resources/images/Food/" + name.toLowerCase() + '.svg';
    }
}

export function updateMood(monster: MonsterClass) {   
    // Function gets called every time an attribute changes
    if (monster.happiness <= 100 && monster.happiness > 70) { // Set thresholds for the different moods
        return { name: "default", path: monster.id + "/default.svg" }
    } else if (monster.happiness <= 60 && monster.happiness >= 40 ) {
        return { name: "concerned", path: monster.id + "/concerned.svg"}
    } else if (monster.happiness <= 40 && monster.happiness >= 20 ) {
        return { name: "angry", path: monster.id + "/upset.svg"};
    } else if (monster.happiness <= 20 && monster.happiness >= 0 ) {
        return { name: "angry", path: monster.id + "/devistated.svg"};
    }
    // } else if (monster.happiness <= 5 && monster.happiness >= 0) {
        // return { name: "dead", path: monster.id + "/dead.svg"};
    // }
    return { name: "default", path: monster.id + "/default.svg" }
}

export type onClickEvent = () => void;

export type onFoodClickEvent = (perk: number) => void;

export const breakpoints = {
    's': 700,
    'xs': 580,
}

export const devices = {
    's': `max-width: ${breakpoints.s}px`,
    'xs': `max-width: ${breakpoints.xs}px`,
}

export const Foods: FoodClass[] = [
    new FoodClass("Bread", 20),
    new FoodClass("Apple", 10),
    new FoodClass("Cheese", 10),
    new FoodClass("Banana", 15),
    new FoodClass("Egg", 30)
]