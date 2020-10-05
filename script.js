function Traveler(name) {
    this.name = name;
    this.food = 1;
    this.isHealthy = true;
}

function Wagon(capacity) {
    this.capacity = capacity;
    this.passageiros = [];
}

Traveler.prototype = {
    constructor: Traveler,
    hunt: function() {
        this.food += 2
    },
    eat: function() {
        if (this.food > 0) {
            this.food += -1
        }
        if (this.food <= 0 && this.isHealthy != false) {
            this.isHealthy = false
        }
    }
}

Wagon.prototype = {
    constructor: Wagon,
    getAvailableSeatCount: function() {
        return this.capacity - this.passageiros.length
    },
    join: function(traveler) {
        if (this.capacity > this.passageiros.length) {
            this.passageiros.push(traveler)
        }
    },
    shouldQuarantine: function() {
        for (let i = 0; i < this.passageiros.length; i++) {
            if (!this.passageiros.isHealthy) {
                return true
            }
        }
        return false
    },
    totalFood: function() {
        let soma = 0
        for (let i = 0; i < this.passageiros.length; i++) {
            soma += this.passageiros[i].food
        }
        return soma
    }

}


// Criar uma carroça que comporta 2 pessoas
let wagon = new Wagon(2);
// Criar três viajantes
let henrietta = new Traveler('Henrietta');
let juan = new Traveler('Juan');
let maude = new Traveler('Maude');

console.log(`${wagon.getAvailableSeatCount()} should be 2`);

wagon.join(henrietta);
console.log(`${wagon.getAvailableSeatCount()} should be 1`);

wagon.join(juan);
wagon.join(maude); // Não tem espaço para ela!
console.log(`${wagon.getAvailableSeatCount()} should be 0`);

henrietta.hunt(); // pega mais comida
juan.eat();
juan.eat(); // juan agora está com fome (doente)

console.log(`${wagon.shouldQuarantine()} should be true since juan is sick`);
console.log(`${wagon.totalFood()} should be 3`);