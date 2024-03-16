const APP = {

    currentRotation: 'rotation1',
    DEFENCE_COLOR: '#33b5e5',
    ATTACK_COLOR: '#98cc00',

    start: function start() {
        window.onresize = APP.onResize;
        window.onload = APP.onResize;
        document.getElementById('lineupButton').addEventListener('click', (event) => {APP.init();});
        document.getElementById('serviceButton').addEventListener('click', (event) => {APP.startServiceAnimation();});
        document.getElementById('defenceButton').addEventListener('click', (event) => {APP.startDefenceAnimation();});
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

    setTeamIntoPosition: function setTeamIntoPosition(position) {
        APP.moveElement('player1', 70, 60, APP.DEFENCE_COLOR);
        APP.moveElement('player2', 30, 60, APP.DEFENCE_COLOR);
        APP.moveElement('player3', 50, 60, APP.DEFENCE_COLOR);
        APP.moveElement('player4', 50, 20, APP.ATTACK_COLOR);
        APP.moveElement('player5', 70, 20, APP.ATTACK_COLOR);
        APP.moveElement('player6', 30, 20, APP.ATTACK_COLOR);
    },

    init: function init() {
        APP.readFromLocalStorage();
        APP.highlightCurrentPosition(APP.currentRotation); 
        APP.changeColor(document.getElementById('serviceButton'), 'white');
        APP.changeColor(document.getElementById('lineupButton'), '#727272');
        APP.changeColor(document.getElementById('defenceButton'), 'white');
        APP.setTeamIntoPosition(APP.currentRotation);
        console.log('init() -> currentRotation: ' + APP.currentRotation);
    },

    // Prompts the user to input the name,
    // adjust the output on screen, save to local storage
    promptName: function promptName(id, htmlId, position) {
        const name = prompt('Gib den Namen des Spielers ein:', '');
        if (name != null) {
            document.getElementById(htmlId).innerHTML = '<b>' + name + '</b><br/><small>' + position + '</small>';
            const player = {id, name, position};
            APP.savePlayerToLocalStorage(player);
        }
    },

    changeColor: function changeColor(element, color) {
        element.style.color = color;
    },

    savePositionDataToLocalStorage: function savePositionDataToLocalStorage(data) {
        this.saveToLocalStorage('positionData', JSON.stringify(data));
    },

    savePlayerToLocalStorage: function savePlayerToLocalStorage(playerData) {
        const player = {
            id: playerData.id,
            name: playerData.name,
            position: playerData.position
        };
        APP.saveToLocalStorage('player' + player.id, JSON.stringify(player));
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
    },

    reloadNewPosition: function reloadNewPosition(newRotation) {
        APP.currentRotation = newRotation;
        APP.saveCurrentRotationToLocalStorage(APP.currentRotation);
        APP.highlightCurrentPosition(newRotation);
        APP.init();
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
        document.getElementById('player1').addEventListener('click', (event) => {APP.promptName(1,'player1','Zuspieler');});
        document.getElementById('player2').addEventListener('click', (event) => {APP.promptName(2, 'player2','Au&szlig;en 1');});
        document.getElementById('player3').addEventListener('click', (event) => {APP.promptName(3, 'player3', 'Mitte 1')});
        document.getElementById('player4').addEventListener('click', (event) => {APP.promptName(4, 'player4','Diagonal');});
        document.getElementById('player5').addEventListener('click', (event) => {APP.promptName(5, 'player5','Au&szlig;en 2');});
        document.getElementById('player6').addEventListener('click', (event) => {APP.promptName(6, 'player6','Mitte 2');});
    },

    startServiceAnimation: function startServiceAnimation() {
        APP.changeColor(document.getElementById('serviceButton'), '#727272');
        APP.changeColor(document.getElementById('lineupButton'), 'white');
        APP.changeColor(document.getElementById('defenceButton'), 'white');
        APP.animateService();
    },

    startDefenceAnimation: function startDefenceAnimation() {
        APP.changeColor(document.getElementById('serviceButton'), 'white');
        APP.changeColor(document.getElementById('lineupButton'), 'white');
        APP.changeColor(document.getElementById('defenceButton'), '#727272');
        APP.animateDefence();
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

    animateService: function animateService() {
        console.log('animateService');
        APP.moveElement('player1', 50, 33, APP.DEFENCE_COLOR);
        APP.moveElement('player3', 95, 105, '#ff2222');
        APP.moveElement('player6', 50, 5, APP.ATTACK_COLOR);
    },

    animateDefence: function animateDefence() {
        console.log('animateDefence');
    },
    
    fetchPositionData: function fetchPositionData() {
        const url = './positions_team_default.json';
        fetch(url)
        .then((resp) => resp.json())
        .then(function(data) {
            console.log(data);
            APP.savePositionDataToLocalStorage(data);
        })
        .catch(function(error) {
            console.log('Fetching JSON data failed. ' + error);
        });
    }
};

APP.start();