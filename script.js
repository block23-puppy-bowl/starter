
const playerContainer = document.getElementById('all-players-container');
const newPlayerFormContainer = document.getElementById('new-player-form');


// Add your cohort name to the cohortName variable below, replacing the 'COHORT-NAME' placeholder
// const cohortName = 'YOUR COHORT NAME HERE';
// const cohortName = '2302-acc-et-web-pt-a';
const cohortName = '2302-ACC-ET-WEB-PT-A';
// Use the APIURL variable for fetch requests
// const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/`;
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/players`;
// const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/2302-ACC-ET-WEB-PT-A`;
const APIURLBYID = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/players/PLAYER-ID`;


/**
 * It fetches all players from the API and returns them
 * @returns An array of objects.
 */

// get all players
 async function fetchAllPlayers () {
    try {
    const response = await fetch(`${APIURL}`);
    const data = await response.json();
    return data;
    } catch (err) {
    console.error('Trouble fetching players', err);
    }
};

const fetchSinglePlayer = async (id) => {
    try {
        try {
            const response = await fetch(`${APIURLBYID}`);
            const player = await response.json();
            console.log(player)
            return player;
          } catch (err) {
            console.error(err);
          }

    } catch (err) {
        console.err(`Oh no, trouble fetching player #${playerId}!`, err);
    }
};

const addNewPlayer = async (playerObj) => {
    try {

    } catch (err) {
        console.error('Oops, something went wrong with adding that player!', err);
    }
};

const removePlayer = async (playerId) => {
    try {
        const response = await fetch(`${APIURLBYID}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            },
          });
          const player = await response.json();
          // return party;
          const partyList = await fetchAllPlayers();
        console.log(partyList); 
        // renderAllParties(parties)
        renderAllPlayers(partyList)

    } catch (err) {
        console.error(
            `Whoops, trouble removing player #${playerId} from the roster!`,
            err
        );
    }
};

/**
 * It takes an array of player objects, loops through them, and creates a string of HTML for each
 * player, then adds that string to a larger string of HTML that represents all the players. 
 * 
 * Then it takes that larger string of HTML and adds it to the DOM. 
 * 
 * It also adds event listeners to the buttons in each player card. 
 * 
 * The event listeners are for the "See details" and "Remove from roster" buttons. 
 * 
 * The "See details" button calls the `fetchSinglePlayer` function, which makes a fetch request to the
 * API to get the details for a single player. 
 * 
 * The "Remove from roster" button calls the `removePlayer` function, which makes a fetch request to
 * the API to remove a player from the roster. 
 * 
 * The `fetchSinglePlayer` and `removePlayer` functions are defined in the
 * @param playerList - an array of player objects
 * @returns the playerContainerHTML variable.
 */

    const renderAllPlayers = (playerList) => {
    try {
        console.log(playerContainer);
        playerContainer.innerHTML = '';

        playerList.forEach((player) => {
          const playerElement = document.createElement('div');
          playerElement.classList.add('player');
          playerElement.innerHTML = `
                    <h2>${player.name}</h2>
                    <p>${player.breed}</p>
                    <p>${player.status}</p>
                    <p>${player.id}</p>
                    <img class="puppy-image" src=${player.imageUrl} alt="puppy">
                    
                    <button class="delete-button" data-id="${player.id}">Delete Player</button>
                `;
          playerContainer.appendChild(playerElement);
    
        //   // see details
        //   const addButton = playerElement.querySelector('.add-button');
        //   addButton.addEventListener('click', async (event) => {
        //     // your code here
        //     console.log('hello getplayerById');
        //     await renderSingleplayerById(player.id);
        //   });
    
          // delete player
          const deleteButton = playerElement.querySelector('.delete-button');
          deleteButton.addEventListener('click', async (event) => {
            // your code here
            console.log('hello');
            await removePlayer(player.id);
            
          });
        });
        
    } catch (err) {
        console.error('Uh oh, trouble rendering players!', err);
    }
};


/**
 * It renders a form to the DOM, and when the form is submitted, it adds a new player to the database,
 * fetches all players from the database, and renders them to the DOM.
 */
const renderNewPlayerForm = () => {
    try {
        
    } catch (err) {
        console.error('Uh oh, trouble rendering the new player form!', err);
    }
}

const init = async () => {
    const playerList = await fetchAllPlayers();
    console.log(playerList);

    // Only works with arrays
    // renderAllPlayers(playerList);
    // Since we are working with objects and we use .forEach in renderAllPlayers
    renderAllPlayers(playerList.data.players);
    

    // renderAllPlayers(players);
    // renderNewPlayerForm();
}

init();