const creatures = [

{
    name: "Flaretail",
    type: "Flame",
    hp: 60,
    attack: 12,
    rarity: "Starter"
},

{
    name: "Aquafang",
    type: "Tide",
    hp: 65,
    attack: 10,
    rarity: "Starter"
},

{
    name: "Leafhorn",
    type: "Grove",
    hp: 70,
    attack: 9,
    rarity: "Starter"
},

{
    name: "Sparkit",
    type: "Storm",
    hp: 40,
    attack: 11,
    rarity: "Common"
},

{
    name: "Mosshell",
    type: "Grove",
    hp: 55,
    attack: 8,
    rarity: "Common"
},

{
    name: "Pebbite",
    type: "Stone",
    hp: 60,
    attack: 7,
    rarity: "Common"
},

{
    name: "Thunderclaw",
    type: "Storm",
    hp: 75,
    attack: 14,
    rarity: "Rare"
},

{
    name: "Crystalback",
    type: "Stone",
    hp: 90,
    attack: 10,
    rarity: "Rare"
}

];
let gameData = {

starter: null,

coins: 100,

unlocked: [],

collection: []
};
let playerCreature = null;
let currentEnemy = null;

loadGame();

function chooseStarter(name)
{
    gameData.starter = name;

    gameData.unlocked.push(name);

    gameData.collection.push(name);

    playerCreature =
    JSON.parse(
        JSON.stringify(
            creatures.find(
                c => c.name === name
            )
        )
    );

    document.getElementById(
        "starterSelection"
    ).style.display = "none";

    document.getElementById(
        "game"
    ).style.display = "block";

    updateCoins();

    saveGame();
}

function saveGame()
{
    localStorage.setItem(
        "creatureGame",
        JSON.stringify(gameData)
    );
}

function loadGame()
{
    const save =
    localStorage.getItem(
        "creatureGame"
    );

    if(save)
    {
        gameData = JSON.parse(save);

        document.getElementById(
            "starterSelection"
        ).style.display = "none";

        document.getElementById(
            "game"
        ).style.display = "block";
    }
}

function updateCoins()
{
    document.getElementById(
        "coins"
    ).textContent =
    gameData.coins;
}

setTimeout(updateCoins,100);

function openPack()
{
    if(gameData.coins < 10)
    {
        alert("Not enough coins!");
        return;
    }

    gameData.coins -= 10;

    updateCoins();

    const available =
    creatures.filter(c =>
        gameData.unlocked.includes(
            c.name
        )
    );

let rarity;

const roll =
Math.random() * 100;

if(roll < 70)
{
    rarity = "Common";
}
else if(roll < 95)
{
    rarity = "Rare";
}
else
{
    rarity = "Starter";
}

let pool =
available.filter(
c => c.rarity === rarity
);

if(pool.length === 0)
{
    pool = available;
}

const pull =
pool[
Math.floor(
Math.random()
* pool.length
)
];

    gameData.collection.push(
        pull.name
    );

    document.getElementById(
        "output"
    ).innerHTML =
    `
    <h2>Pack Opened!</h2>
    <p>${pull.name}</p>
    `;

    saveGame();
}

function goSafari()
{
    const safariPool = [

    "Sparkit",
    "Mosshell",
    "Pebbite",
    "Thunderclaw",
    "Crystalback"

    ];

    const enemyName =
    safariPool[
        Math.floor(
            Math.random()
            * safariPool.length
        )
    ];
function showBattle()
{

function attack()
{
currentEnemy.hp -=
playerCreature.attack;

if(currentEnemy.hp <= 0)
{
victory();
return;
}

playerCreature.hp -=
currentEnemy.attack;

if(playerCreature.hp <= 0)
{
defeat();
return;
}

showBattle();
}

function victory()
{
gameData.coins += 25;

if(
!gameData.unlocked.includes(
currentEnemy.name
))
{
gameData.unlocked.push(
currentEnemy.name
);
}

document.getElementById(
"output"
).innerHTML =

`
<h2>
Victory!
</h2>

<p>
${currentEnemy.name}
unlocked for packs.
</p>

<p>
+25 Coins
</p>
`;

playerCreature =
JSON.parse(
JSON.stringify(
creatures.find(
c =>
c.name ===
gameData.starter
)
)
);

updateCoins();

saveGame();
}

function defeat()
{
document.getElementById(
"output"
).innerHTML =

`
<h2>
Defeat...
</h2>

<p>
Your starter recovered.
</p>
`;

playerCreature =
JSON.parse(
JSON.stringify(
creatures.find(
c =>
c.name ===
gameData.starter
)
)
);
}
document.getElementById(
"output"
).innerHTML =

`
<h2>
Wild ${currentEnemy.name}
</h2>

<p>
Type: ${currentEnemy.type}
</p>

<p>
Enemy HP:
${currentEnemy.hp}
</p>

<p>
Your HP:
${playerCreature.hp}
</p>

<button onclick="attack()">
Attack
</button>
`;
}
    currentEnemy =
    JSON.parse(
        JSON.stringify(
            creatures.find(
                c => c.name === enemyName
            )
        )
    );

    showBattle();
}
function fight(name)
{
    gameData.coins += 20;

    if(
        !gameData.unlocked.includes(
            name
        )
    )
    {
        gameData.unlocked.push(
            name
        );
    }

    document.getElementById(
        "output"
    ).innerHTML =
    `
    <h2>You defeated ${name}!</h2>

    <p>
    Species unlocked for packs!
    </p>
    `;

    updateCoins();

    saveGame();
}

function showCollection()
{
    let html =
    "<h2>Collection</h2>";

    const counts = {};

    gameData.collection.forEach(
    c =>
    {
        counts[c] =
        (counts[c] || 0) + 1;
    });

    for(const name in counts)
    {
        html +=
        `<p>${name} x${counts[name]}</p>`;
    }

    document.getElementById(
        "output"
    ).innerHTML =
    html;
}
