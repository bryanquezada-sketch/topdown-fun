//INTERACTION MANAGER
//Handles the logic of checking for nearby NPCs
//Allows 

export default class InteractionController {
    constructor(scene, player, npcs) {
        this.scene = scene;
        this.player = player;
        this.npcs = npcs;

        this.interactionZone = scene.add.zone(0, 0, 32, 32);
        scene.physics.add.existing(this.interactionZone);
    }
    
    updateZone (facingX, facingY) {
        const offset = 30;

        this.interactionZone.x = this.player.x + (facingX * offset);
        this.interactionZone.y = this.player.y + (facingY * offset);
    }

    check() {
        let target = null;
        this.scene.physics.overap(this.zone, this.npcs, (zone, npc) => {
            target = npc;
        });
        
        if (target) {
            this.interact(target);
        }
    }

    interact(npc) {
        console.log("Interacting with NPC", npc.texture.key);
        if (npc.talk) npc.talk();
    }
}


/* NEEDS EXPLANATION
  check() {
    let target = null;
    this.scene.physics.overlap(this.zone, this.npcs, (zone, npc) => {
      target = npc;
    });

    if (target) {
      this.interact(target);
    }
  }

  interact(npc) {
    console.log("Interacting with NPC:", npc.texture.key);
    // You can trigger custom NPC logic here
    if (npc.talk) npc.talk();
  }
}


This section is the "brain" of your interaction logic. It bridges the gap between a physical collision (the zone hitting an NPC) and a gameplay event (talking to them).
Here is the line-by-line breakdown:

The check() Method
This is called when the player presses the interaction key (e.g., E).
let target = null;
We create a temporary variable to "catch" the NPC we find. We start it as null because, at the start of the check, we haven't found anyone yet.
this.scene.physics.overlap(...)
This is a Phaser physics command. It asks the physics engine: "Are any members of the npcs group currently touching the zone?"
(zone, npc) => { target = npc; }
This is a Callback Function. If Phaser finds an overlap, it runs this tiny piece of code immediately. It passes the specific NPC it found into the function, and we save that NPC into our target variable.
if (target) { ... }
After the physics check is finished, we check if target is still null. If it’s NOT null, it means we successfully found an NPC!
this.interact(target);
If we found a target, we move to the next step: actually performing the interaction.

The interact(npc) Method
This is called only when a valid target is confirmed.
console.log("Interacting with NPC:", npc.texture.key);
A helpful debug line. It prints the name of the sprite’s image (like "boar" or "villager") to the console so you know exactly who you're talking to.
if (npc.talk) npc.talk();
This is a "Safe Call." It checks if the NPC object has a function named talk.
If it’s a Boar, it might not have a talk function, so nothing happens (and the game doesn't crash).
If it’s a Shopkeeper, and you've given them a talk() function, the game will execute that specific NPC's dialogue code.

Why we use target = npc instead of interacting immediately?
You might wonder: "Why not just put the interaction code inside the overlap callback?"
The "Multiple Hits" Problem: If your player is standing between two NPCs, the overlap check might find both. By using target = npc, we ensure we only interact with one at a time. It also keeps the physics check (finding the object) separate from the gameplay logic (talking to the object), making it much easier to debug.
*/