export class Monster {
    name: string;
    id: number;

    health: number = 100;
    hunger: number = 100;
    happiness: number = 100;

    mood?: object;

    constructor(name: string, id: number) {
        this.name = name;
        this.id = id;
        this.mood = this.updateMood();
    }

    updateMood() {
        // Function gets called every time an attribute changes
        if (this.happiness >= 70) { // Set thresholds for the different moods
            return { name: "default", path: this.id + "/default.svg" }
        }
        return { name: "default", path: this.id + "/default.svg" }
    }
}