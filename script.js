const creatures = [

{
name: "Flaretail",
rarity: "Starter"
},

{
name: "Aquafang",
rarity: "Starter"
},

{
name: "Leafhorn",
rarity: "Starter"
},

{
name: "Sparkit",
rarity: "Common"
},

{
name: "Mosshell",
rarity: "Common"
},

{
name: "Pebbite",
rarity: "Common"
},

{
name: "Thunderclaw",
rarity: "Rare"
},

{
name: "Crystalback",
rarity: "Rare"
}

];

let gameData = {

starter: null,

coins: 100,

unlocked: [],

collection: []

};

loadGame();

function chooseStarter(name)
{
    gameData.starter = name;

    gameData.unlocked.push(name);

    gameData.collection.push(name);

    document.getElementById(
        "starterSelection"
    ).style.display = "none";

    document.getElementById(
        "game"
    ).style.display = "block";

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

    const pull =
    available[
        Math.floor(
            Math.random()
            * available.length
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

    const wild =
    safariPool[
        Math.floor(
            Math.random()
            * safariPool.length
        )
    ];

    document.getElementById(
        "output"
    ).innerHTML =
    `
    <h2>Wild ${wild} appeared!</h2>

    <button onclick="fight('${wild}')">
    Attack
    </button>
    `;
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
