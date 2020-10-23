// ==UserScript==
// @name         Silver Subscription - Sets of 10 Button
// @namespace    games.dominion.script
// @version      0.1
// @description  Dominion Games Silver Subscription - Add Sets of 10 it the lobby page (table creation)
// @author       barmkin
// @match        https://dominion.games/
// @grant        none
// @require      https://code.jquery.com/jquery-3.5.1.min.js
// @license	 MIT
// ==/UserScript==

/* ------------------------------------------------------------------------------- */
/* --- Cards Sets ---------------------------------------------------------------- */
// You can edit this section, see README
var cardsSets = [
    {
        'name': 'Dominion Only',
        'sets':
        [
            {'First Game': [
                'Cellar', 'Market', 'Merchant', 'Militia', 'Mine', 'Moat', 'Remodel', 'Smithy', 'Village', 'Workshop'
            ]},
            {'Size Distortion': [
                'Artisan', 'Bandit', 'Bureaucrat', 'Chapel', 'Festival', 'Gardens', 'Sentry', 'Throne Room', 'Witch', 'Workshop'
            ]},
            {'Deck Top': [
                'Artisan', 'Bureaucrat', 'Council Room', 'Festival', 'Harbinger', 'Laboratory', 'Moneylender', 'Sentry', 'Vassal', 'Village'
            ]},
            {'Sleight of Hand': [
                'Cellar', 'Council Room', 'Festival', 'Gardens', 'Library', 'Harbinger', 'Militia', 'Poacher', 'Smithy', 'Throne Room'
            ]},
            {'Improvements': [
                'Artisan', 'Cellar', 'Market', 'Merchant', 'Mine', 'Moat', 'Moneylender', 'Poacher', 'Remodel', 'Witch'
            ]},
            {'Silver \& Gold': [
                'Bandit', 'Bureaucrat', 'Chapel', 'Harbinger', 'Laboratory', 'Merchant', 'Mine', 'Moneylender', 'Throne Room', 'Vassal'
            ]}
        ]
    },
    {
        'name': 'Intrigue Only',
        'sets':
        [
            {'Victory Dance': [
                'Baron', 'Courtier', 'Duke', 'Harem', 'Ironworks', 'Masquerade', 'Mill', 'Nobles', 'Patrol', 'Replace'
            ]},
            {'The Plot Thickens': [
                'Conspirator', 'Ironworks', 'Lurker', 'Pawn', 'Mining Village', 'Secret Passage', 'Steward', 'Swindler', 'Torturer', 'Trading Post'
            ]},
            {'Best Wishes': [
                'Baron', 'Conspirator', 'Courtyard', 'Diplomat', 'Duke', 'Secret Passage', 'Shanty Town', 'Torturer', 'Upgrade', 'Wishing Well'
            ]}
        ]
    },
    {
        'name': 'Dominion \& Intrigue',
        'sets':
        [
            {'Underlings': [
                'Cellar', 'Festival', 'Library', 'Sentry', 'Vassal', 'Courtier', 'Diplomat', 'Minion', 'Nobles', 'Pawn'
            ]},
            {'Grand Scheme': [
                'Artisan', 'Council Room', 'Market', 'Militia', 'Workshop', 'Bridge', 'Mill', 'Mining Village', 'Patrol', 'Shanty Town'
            ]},
            {'Deconstruction': [
                'Bandit', 'Mine', 'Remodel', 'Throne Room', 'Village', 'Diplomat', 'Harem', 'Lurker', 'Replace', 'Swindler'
            ]}
        ]
    },
    {
        'name': 'Intrigue \& Seaside',
        'sets':
        [
            {'A Star to Steer By': [
                'Secret Passage', 'Diplomat', 'Swindler', 'Wishing Well', 'Courtier', 'Lookout', 'Treasure Map', 'Ghost Ship', 'Haven', 'Outpost'
            ]},
            {'Shore Patrol': [
                'Patrol', 'Replace', 'Shanty Town', 'Trading Post', 'Pawn', 'Island', 'Wharf', 'Cutpurse', 'Lighthouse', 'Warehouse'
            ]},
            {'Bridge Crossing': [
                'Lurker', 'Nobles', 'Duke', 'Conspirator', 'Bridge', 'Salvager', 'Embargo', 'Smugglers', 'Native Village', 'Treasury'
            ]}
        ]
    },
    {
        'name': 'Intrigue \& Prosperity',
        'sets':
        [
            {'Paths to Victory': [
                'Bishop', 'Counting House', 'Goons', 'Monument', 'Peddler', 'Baron', 'Harem', 'Pawn', 'Shanty Town', 'Upgrade'
            ]},
            {'All Along the Watchtower': [
                'Hoard', 'Talisman', 'Trade Route', 'Vault', 'Watchtower', 'Bridge', 'Mill', 'Mining Village', 'Pawn', 'Torturer'
            ]},
            {'Lucky Seven': [
                'Bank', 'Expand', 'Forge', 'King\'s Court', 'Vault', 'Bridge', 'Lurker', 'Patrol', 'Swindler', 'Wishing Well'
            ]}
        ]
    },
    {
        'name': 'Intrigue \& Cornucopia',
        'sets':
        [
            {'Last Laughs': [
                'Farming Village', 'Harvest', 'Horse Traders', 'Hunting Party', 'Jester', 'Minion', 'Nobles', 'Pawn', 'Steward', 'Swindler'
            ]},
            {'The Spice of Life': [
                'Fairgrounds', 'Horn of Plenty', 'Remake', 'Tournament', 'Young Witch', 'Courtier', 'Courtyard', 'Diplomat', 'Mining Village', 'Replace'
            ]},
            {'Small Victories': [
                'Fortune Teller', 'Hamlet', 'Hunting Party', 'Remake', 'Tournament', 'Conspirator', 'Duke', 'Harem', 'Pawn', 'Secret Passage'
            ]}
        ]
    }
];
/* ------------------------------------------------------------------------------- */

// Global variables
var inLobbyFlag = false;
var cardNumber = 0;


(function() {
    'use strict';
	waitMatchLobby(2500);
})();

function waitMatchLobby(checkFrequencyInMs) {
  (function loopSearch() {
    if (document.evaluate(
			'//button[contains(@class, \'kingdom-selection\') and text()="Select Kingdom Cards"]',
			document.body, null, XPathResult.BOOLEAN_TYPE, null).booleanValue) {
      loadMatchButtons();
      inLobbyFlag = true;
	  setTimeout(function () {
        loopSearch();
      }, 10000);
    } else {
      inLobbyFlag = false;
      cardNumber = 0;
      setTimeout(function () {
        loopSearch();
      }, 2500);
    }
  })();
}

function loadMatchButtons() {
    if(inLobbyFlag) return; // Already loaded

	console.log("Loading Sets of 10...");

    let rulesEditor = document.querySelector('.rules-editor');

    for (let sets = 0; sets < cardsSets.length; sets+=1) {

        // Loading Header...
        let lineBreak = document.createElement('br');
        rulesEditor.appendChild(lineBreak);
        let h = document.createElement("h2");
        let t = document.createTextNode(cardsSets[sets].name);
        h.appendChild(t);
        rulesEditor.appendChild(h);

        // Loading Buttons
        let button;
        let buttonText;
        for (let i = 0; i < cardsSets[sets].sets.length; i+=1) {
            button = document.createElement('button');
            button.classList.add('lobby-button');
            button.onclick = function(){
                setTimeout(loadMatch(cardsSets[sets].sets[i]), 1000);
            };

            buttonText = document.createTextNode(Object.getOwnPropertyNames(cardsSets[sets].sets[i]).toLocaleString());
            button.appendChild(buttonText);
            rulesEditor.appendChild(button);
        }
    }
}

function loadMatch(selectedMatch) {
    console.log('Load cards for ' + Object.getOwnPropertyNames(selectedMatch).toLocaleString());

    document.evaluate('//button[contains(@class, \'lobby-button\') and text()="Select Kingdom Cards"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click();

    document.body.style.cursor='progress';
    // Print waiting...
    let selectedCardsDiv = document.querySelector('.kingdom-choices');
    let loadingCardsEl = document.createElement("p");
    loadingCardsEl.style.color = "#FFFFFF";
    let loadingCardsText = document.createTextNode('Loading Cards');
    loadingCardsEl.appendChild(loadingCardsText);
    selectedCardsDiv.insertBefore(loadingCardsEl, selectedCardsDiv.firstChild);

    waitCardsLoadThenPickCards(500, selectedMatch, loadingCardsEl);
}


function waitCardsLoadThenPickCards(checkFrequencyInMs, selectedMatch, loadingCardsEl) {
  (function loopSearch() {
    let currentNumber = document.evaluate('//div[contains(@class, \'mini-card\')]', document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotLength;

    if (currentNumber > cardNumber) { // waiting page finish load
        cardNumber = currentNumber;
        setTimeout(function () {
            loopSearch();
        }, checkFrequencyInMs);
    } else if (currentNumber != 0 && currentNumber == cardNumber) { // page load all cards
        document.body.style.cursor='auto';
        pickCards(selectedMatch);
        return;
    } else { // not loading ?
      if (cardNumber <= 5) {
          console.error('Sorry, there is a script error or the page does not load cards...')
          return; // Break loop
      }
      cardNumber -= 1;
      console.info('Waiting page to load...');
      loadingCardsEl.innerText += '.';
      setTimeout(function () {
        loopSearch();
      }, checkFrequencyInMs);
    }
  })();
}

function pickCards(selectedMatch) {
    console.log('Cards are loaded, pickings....');
    let cards = selectedMatch[Object.getOwnPropertyNames(selectedMatch)];

    // Clear previous selected cards
    document.querySelector('.clear-kingdom').click()

    // Pick Cards
    for (let c = 0; c < cards.length; c+=1) {
        pickCard(cards[c]);
    }

    // Push Done
    document.evaluate('//input[contains(@class, \'lobby-button close\')]', document.body, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click();
}

function pickCard(cardName) {
    console.log("Picking " + cardName);

    if (cardName == 'Random') {
        document.evaluate('//selection-set', document.body, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click();
    }

    let miniCards = document.querySelectorAll('.mini-card');
    for(let i=0; i < miniCards.length; i++) {
        if (miniCards[i].innerHTML.includes(cardName)) {
            miniCards[i].click();
            break;
        }
    }
}
