const APP = {

    currentPosition: 1,
    DEFENCE_COLOR: "#33b5e5",
    ATTACK_COLOR: "#98cc00",

    start: function start() {
        window.onresize = APP.onResize;
        window.onload = APP.onResize;
        document.getElementById('positionsButton').addEventListener('click', (event) => {APP.init();});
        document.getElementById('serviceButton').addEventListener('click', (event) => {APP.startServiceAnimation();});
        document.getElementById('defenceButton').addEventListener('click', (event) => {APP.startDefenceAnimation();});
        APP.registerClickEventsForPositionButtons();
        APP.registerClickEventsForPlayerNames();
    },

    onResize: function onResize() {
        APP.resizeContentContainer();
        APP.init();
    },

    resizeContentContainer: function resizeContentContainer() {
        const positionSelectorPanelHeight = document.getElementById("positionSelectorPanel").scrollHeight;
        const buttonPanelHeight = document.getElementById("buttonPanel").scrollHeight;
        const screenWidth = document.getElementById("positionSelectorPanel").scrollWidth;
        const availableHight = document.getElementById("container").scrollHeight - positionSelectorPanelHeight - buttonPanelHeight;
        
        document.getElementById("contentContainer").style.top = positionSelectorPanelHeight + "px";
        document.getElementById("contentContainer").style.bottom = buttonPanelHeight + "px";
        
        if(availableHight > screenWidth) {
            document.getElementById("floor").style.left = 0 + "px";
            document.getElementById("floor").style.right = 0 + "px";
            document.getElementById("floor").style.bottom = document.getElementById("contentContainer").scrollHeight - screenWidth + "px";
        } else {
            document.getElementById("floor").style.left = (screenWidth - availableHight)/2 + "px";
            document.getElementById("floor").style.right = (screenWidth - availableHight)/2 + "px";
            document.getElementById("floor").style.bottom = 0 + "px";
        }
    },

    setTeamIntoPosition: function setTeamIntoPosition(position) {
        APP.moveElement('setter', 70, 60, APP.DEFENCE_COLOR);
        APP.moveElement('outsideOne', 30, 60, APP.DEFENCE_COLOR);
        APP.moveElement('middleOne', 50, 60, APP.DEFENCE_COLOR);
        APP.moveElement('middleTwo', 50, 20, APP.ATTACK_COLOR);
        APP.moveElement('outsideTwo', 70, 20, APP.ATTACK_COLOR);
        APP.moveElement('opposite', 30, 20, APP.ATTACK_COLOR);
    },

    init: function init() {
        APP.readFromLocalStorage();
        APP.highlightCurrentPosition(APP.currentPosition); 
        APP.changeColor(document.getElementById('serviceButton'), 'white');
        APP.changeColor(document.getElementById('positionsButton'), '#727272');
        APP.changeColor(document.getElementById('defenceButton'), 'white');
        APP.setTeamIntoPosition(APP.currentPosition);
        console.log('init() -> currentPosition: ' + APP.currentPosition);
    },

    // Prompts the user to input the name,
    // adjust the output on screen, save to local storage
    promptName: function promptName(id, position) {
        const person = prompt("Gib den Namen des Spielers ein:", "");
        if (person != null) {
            document.getElementById(id).innerHTML = "<b>" + person + "</b><br/><small>" + position + "</small>";
            APP.saveToLocalStorage();
        }
    },

    changeColor: function changeColor(element, color) {
        element.style.color = color;
    },

    saveToLocalStorage: function saveToLocalStorage() {
        if (typeof(Storage) !== 'undefined') {
            localStorage.currentPosition = APP.currentPosition;
        } else {
            alert('Sorry, your browser does not support web storage...');
        }
    },
        
    readFromLocalStorage: function readFromLocalStorage() {
        APP.currentPosition = typeof localStorage.currentPosition == "undefined" ? 1 : localStorage.currentPosition;
    },

    reloadNewPosition: function reloadNewPosition(newPosition) {
        APP.currentPosition = newPosition;
        APP.saveToLocalStorage();
        APP.highlightCurrentPosition(newPosition);
        APP.init();
    },

    highlightCurrentPosition: function highlightCurrentPosition(position) {
        let i;
        for (i = 1; i <= 6; i++) {
            const backgroundColor = (i === parseInt(position)) ? '#6c6c6c' : '#4c4c4c';
            document.getElementById("pos" + i).style.background = backgroundColor;
        }
    },

    registerClickEventsForPositionButtons: function registerClickEventsForPositionButtons() {
        document.getElementById('pos1').addEventListener('click', (event) => {APP.reloadNewPosition(1);});
        document.getElementById('pos2').addEventListener('click', (event) => {APP.reloadNewPosition(2);});
        document.getElementById('pos3').addEventListener('click', (event) => {APP.reloadNewPosition(3);});
        document.getElementById('pos4').addEventListener('click', (event) => {APP.reloadNewPosition(4);});
        document.getElementById('pos5').addEventListener('click', (event) => {APP.reloadNewPosition(5);});
        document.getElementById('pos6').addEventListener('click', (event) => {APP.reloadNewPosition(6);});
    },

    registerClickEventsForPlayerNames: function registerClickEventsForPlayerNames() {
        document.getElementById('setter').addEventListener('click', (event) => {APP.promptName('setter','Zuspieler');});
        document.getElementById('outsideOne').addEventListener('click', (event) => {APP.promptName('outsideOne','Au&szlig;en 1');});
        document.getElementById('middleOne').addEventListener('click', (event) => {APP.promptName('middleOne', 'Mitte 1')});
        document.getElementById('opposite').addEventListener('click', (event) => {APP.promptName('opposite','Diagonal');});
        document.getElementById('outsideTwo').addEventListener('click', (event) => {APP.promptName('outsideTwo','Au&szlig;en 2');});
        document.getElementById('middleTwo').addEventListener('click', (event) => {APP.promptName('middleTwo','Mitte 2');});
    },

    startServiceAnimation: function startServiceAnimation() {
        APP.changeColor(document.getElementById('serviceButton'), '#727272');
        APP.changeColor(document.getElementById('positionsButton'), 'white');
        APP.changeColor(document.getElementById('defenceButton'), 'white');
        APP.animateService();
    },

    startDefenceAnimation: function startDefenceAnimation() {
        APP.changeColor(document.getElementById('serviceButton'), 'white');
        APP.changeColor(document.getElementById('positionsButton'), 'white');
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
        element.style.transform = "translate(" + newLeft + "px, " + newTop + "px)";
        element.style.backgroundColor = color;
    },

    animateService: function animateService() {
        console.log("animateService");
        APP.moveElement('setter', 50, 33, APP.DEFENCE_COLOR);
        APP.moveElement('middleOne', 95, 105, '#ff2222');
        APP.moveElement('middleTwo', 50, 5, APP.ATTACK_COLOR);
    },

    animateDefence: function animateDefence() {
        console.log("animateDefence");
    }   
};

APP.start();