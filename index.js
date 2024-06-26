const APP = {

    currentRotation: 'rotation1',
    currentStep: 0,
    currentAction: 'service',
    teamData: {},
    DEFENCE_COLOR: '#33b5e5',
    ATTACK_COLOR: '#98cc00',

    start: function start() {
        window.onresize = APP.onResize;
        window.onload = APP.onResize;
        document.getElementById('lineupButton').addEventListener('click', (event) => {APP.init();});
        document.getElementById('serviceButton').addEventListener('click', (event) => {APP.startServiceAnimation();});
        document.getElementById('defenceButton').addEventListener('click', (event) => {APP.startDefenceAnimation();});
        document.getElementById('actionButton').addEventListener('click', (event) => {APP.nextMove();});
        APP.registerClickEventsForPositionButtons();
        APP.registerClickEventsForPlayerNames();
        APP.fetchPositionData();
    },

    onResize: function onResize() {
        APP.resizeContentContainer();
        APP.init();
    },

    resizeContentContainer: function resizeContentContainer() {
        const headerPanelHeight = document.getElementById('header').scrollHeight;
        const rotationSelectorPanelHeight = document.getElementById('rotationSelectorPanel').scrollHeight;
        const buttonPanelHeight = document.getElementById('buttonPanel').scrollHeight;
        const screenWidth = document.getElementById('rotationSelectorPanel').scrollWidth;
        const availableHight = document.getElementById('container').scrollHeight - rotationSelectorPanelHeight - buttonPanelHeight;
        
        document.getElementById('contentContainer').style.top = (headerPanelHeight + rotationSelectorPanelHeight) + 'px';
        document.getElementById('contentContainer').style.bottom = buttonPanelHeight + 'px';
        
        if(availableHight > screenWidth) {
            document.getElementById('floor').style.left = 0 + 'p';
            document.getElementById('floor').style.right = 0 + 'px';
            document.getElementById('floor').style.bottom = document.getElementById('contentContainer').scrollHeight - screenWidth + 'px';
        } else {
            document.getElementById('floor').style.left = (screenWidth - availableHight)/2 + 'px';
            document.getElementById('floor').style.right = (screenWidth - availableHight)/2 + 'px';
            document.getElementById('floor').style.bottom = 0 + 'px';
        }
    },

    lineupTeam: function lineupTeam(rotation) {
        if (APP.teamData && APP.teamData.positions && APP.teamData.positions[rotation]) {
            APP.showDescription('lineup');
            const lineup = APP.teamData.positions[rotation].lineup;
            for (let i = 1; i <= 6; i++) {
                const name = APP.readPlayerNameFromLocalStorage(lineup['player' + i].playerId);
                const role = APP.getPlayerRole(lineup['player' + i].playerId);
                APP.setPlayerNameAndRole('player' + i, name, role);
                const x = lineup['player' + i].x;
                const y = lineup['player' + i].y;
                const color = lineup['player' + i].color;
                APP.moveElement('player'+ i, x, y, color); 
            }
        };
    },

    getPlayerRole: function getPlayerRole(id) {
        return APP.teamData.players.find(p => p.id === id).role;
    },

    init: function init() {
        APP.readFromLocalStorage();
        APP.highlightCurrentPosition(APP.currentRotation); 
        APP.changeColor(document.getElementById('serviceButton'), 'white');
        APP.changeColor(document.getElementById('lineupButton'), '#727272');
        APP.changeColor(document.getElementById('defenceButton'), 'white');
        APP.lineupTeam(APP.currentRotation);
        APP.disableActionButton();
        APP.currentStep = 0;
        console.log('init() -> currentRotation: ' + APP.currentRotation);
    },

    // Prompts the user to input the name,
    // adjust the output on screen, save to local storage
    promptName: function promptName(id, htmlId) {
        const name = prompt('Gib den Namen des Spielers ein:', '');
        if (name != null) {
            APP.setPlayerNameAndRole(htmlId, name, this.getPlayerRole(id));
            const player = {id, name};
            APP.savePlayerToLocalStorage(player);
        }
    },

    setPlayerNameAndRole: function setPlayerNameAndRole(htmlId, name, role) {
        if (name === null || name === '') {
            document.getElementById(htmlId).innerHTML = '<b>' + role + '</b><br/>';;
        } else {
            document.getElementById(htmlId).innerHTML = '<b>' + name + '</b><br/><small>' + role + '</small>';
        }
    },

    changeColor: function changeColor(element, color) {
        element.style.color = color;
    },

    savePositionDataToLocalStorage: function savePositionDataToLocalStorage(data) {
        this.saveToLocalStorage('teamData', JSON.stringify(data));
    },

    savePlayerToLocalStorage: function savePlayerToLocalStorage(playerData) {
        APP.saveToLocalStorage('player' + playerData.id, playerData.name);
    },

    saveCurrentRotationToLocalStorage: function saveCurrentRotationToLocalStorage(rotation) {
        APP.saveToLocalStorage('currentRotation', rotation);
    },
    
    saveToLocalStorage: function saveToLocalStorage(key, value) {
        if (typeof(Storage) !== 'undefined') {
            localStorage.setItem(key, value);
        } else {
            alert('Sorry, your browser does not support web storage...');
        }
    },
        
    readFromLocalStorage: function readFromLocalStorage() {
        APP.currentRotation = typeof localStorage.currentRotation == 'undefined' ? 'rotation1' : localStorage.currentRotation;
        APP.teamData = typeof localStorage.teamData == 'undefined' ? {} : JSON.parse(localStorage.teamData);
    },

    readPlayerNameFromLocalStorage: function readPlayerNameFromLocalStorage(id) {
        return typeof localStorage['player' + id] == 'undefined' ? "" : localStorage['player' + id];
    },

    reloadNewPosition: function reloadNewPosition(newRotation) {
        APP.currentRotation = newRotation;
        APP.saveCurrentRotationToLocalStorage(APP.currentRotation);
        APP.highlightCurrentPosition(newRotation);
        APP.init();
        APP.showDescription('lineup');
    },

    highlightCurrentPosition: function highlightCurrentPosition(rotation) {
        let i;
        for (i = 1; i <= 6; i++) {
            const backgroundColor = ('rotation' + i === rotation) ? '#6c6c6c' : '#4c4c4c';
            document.getElementById('rotation' + i).style.background = backgroundColor;
        }
    },

    registerClickEventsForPositionButtons: function registerClickEventsForPositionButtons() {
        document.getElementById('rotation1').addEventListener('click', (event) => {APP.reloadNewPosition('rotation1');});
        document.getElementById('rotation2').addEventListener('click', (event) => {APP.reloadNewPosition('rotation2');});
        document.getElementById('rotation3').addEventListener('click', (event) => {APP.reloadNewPosition('rotation3');});
        document.getElementById('rotation4').addEventListener('click', (event) => {APP.reloadNewPosition('rotation4');});
        document.getElementById('rotation5').addEventListener('click', (event) => {APP.reloadNewPosition('rotation5');});
        document.getElementById('rotation6').addEventListener('click', (event) => {APP.reloadNewPosition('rotation6');});
    },

    registerClickEventsForPlayerNames: function registerClickEventsForPlayerNames() {
        document.getElementById('player1').addEventListener('click', (event) => {APP.promptName(1, 'player1');});
        document.getElementById('player2').addEventListener('click', (event) => {APP.promptName(2, 'player2');});
        document.getElementById('player3').addEventListener('click', (event) => {APP.promptName(3, 'player3');});
        document.getElementById('player4').addEventListener('click', (event) => {APP.promptName(4, 'player4');});
        document.getElementById('player5').addEventListener('click', (event) => {APP.promptName(5, 'player5');});
        document.getElementById('player6').addEventListener('click', (event) => {APP.promptName(6, 'player6');});
    },

    startServiceAnimation: function startServiceAnimation() {
        APP.changeColor(document.getElementById('serviceButton'), '#727272');
        APP.changeColor(document.getElementById('lineupButton'), 'white');
        APP.changeColor(document.getElementById('defenceButton'), '#727272');
        APP.enableActionButton();
        APP.currentStep = 0;
        APP.currentAction = 'serve';
        APP.animateAction(APP.currentStep, APP.currentAction);
        const description = APP.teamData.positions[APP.currentRotation][APP.currentAction].steps[0]['description'];
        APP.showDescription(description);
    },

    showDescription: function showDescription(description) {
        const descriptionDiv = document.getElementById('description');
        if (description === 'lineup') {
            descriptionDiv.innerHTML = APP.teamData.positions[APP.currentRotation].lineup.description;
            return;
        } else {
            descriptionDiv.innerHTML = description;
        }
    },

    startDefenceAnimation: function startDefenceAnimation() {
        APP.changeColor(document.getElementById('serviceButton'), '#727272');
        APP.changeColor(document.getElementById('lineupButton'), 'white');
        APP.changeColor(document.getElementById('defenceButton'), '#727272');
        APP.enableActionButton();
        APP.currentStep = 0;
        APP.currentAction = 'receive';
        APP.animateAction(APP.currentStep, APP.currentAction);
        const description = APP.teamData.positions[APP.currentRotation][APP.currentAction].steps[0]['description'];
        APP.showDescription(description);
    },

    getWidthOfElement: function getWidthOfElement(elementId) {
        const element = document.getElementById(elementId);
        return element.getBoundingClientRect().width;
    },

    getHeightOfElement: function getHeightOfElement(elementId) {
        const element = document.getElementById(elementId);
        return element.getBoundingClientRect().height;
    },

    convertXPositionFromPercentToPixel: function convertXPositionFromPercentToPixel(positionInPercent) {
        const containerWidth = APP.getWidthOfElement('floor');
        return containerWidth * positionInPercent / 100;
    },

    convertYPositionFromPercentToPixel: function convertYPositionFromPercentToPixel(positionInPercent) {
        const containerHeight = APP.getHeightOfElement('floor');
        return containerHeight * positionInPercent / 100;
    },

    moveElement: function moveElement(elementId, x, y, color) {
        const element = document.getElementById(elementId);
        const newLeft = APP.convertXPositionFromPercentToPixel(x) - element.clientWidth / 2;
        const newTop = APP.convertYPositionFromPercentToPixel(y) - element.clientHeight / 2;
        element.style.transform = 'translate(' + newLeft + 'px, ' + newTop + 'px)';
        element.style.backgroundColor = color;
    },

    animateAction: function animateAction(stepNumber, action) {
        const rotation = APP.currentRotation;
        if (APP.teamData && APP.teamData.positions && APP.teamData.positions[rotation]) {
            const nextPositions = APP.teamData.positions[rotation][action].steps[stepNumber];
            for (let i = 1; i <= 6; i++) {
                const name = APP.readPlayerNameFromLocalStorage(nextPositions['player' + i].playerId);
                const role = APP.getPlayerRole(nextPositions['player' + i].playerId);
                APP.setPlayerNameAndRole('player' + i, name, role);
                const x = nextPositions['player' + i].x;
                const y = nextPositions['player' + i].y;
                const color = nextPositions['player' + i].color;
                APP.moveElement('player'+ i, x, y, color); 
            }
            const description = APP.teamData.positions[APP.currentRotation][APP.currentAction].steps[stepNumber]['description'];
            APP.showDescription(description);
        };
        
        if (stepNumber >= APP.getNumberOfSteps(APP.currentRotation, action) - 1) {
            APP.disableActionButton();
        }
    },

    getNumberOfSteps: function getNumberOfSteps(rotation, action) {
        return APP.teamData.positions[rotation][action]['steps'].length;
    },

    fetchPositionData: function fetchPositionData() {
        const url = './positions_team_default.json';
        fetch(url)
        .then((resp) => resp.json())
        .then(function(data) {
        console.log(data);
            APP.savePositionDataToLocalStorage(data);
            APP.init();
        })
        .catch(function(error) {
            console.log('Fetching JSON data failed. ' + error);
        });
    },

    nextMove: function nextMove() {
        APP.currentStep++;
        APP.animateAction(APP.currentStep, APP.currentAction);
    },

    disableActionButton: function disableActionButton() {
        document.getElementById('actionButton').style.display = 'none';
    },

    enableActionButton: function enableActionButton() {
        document.getElementById('actionButton').style.display = 'block';
    }

};

APP.start();
