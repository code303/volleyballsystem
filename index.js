const APP = {

    currentPosition: 1,

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
            
    init: function init() {
        APP.readFromLocalStorage();
        APP.highlightCurrentPosition(APP.currentPosition); 
        APP.changeColor(document.getElementById('serviceButton'), 'white');
        APP.changeColor(document.getElementById('positionsButton'), '#727272');
        APP.changeColor(document.getElementById('defenceButton'), 'white');
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
            // const backgroundColor = (i === position) ? '#6c6c6c' : '#4c4c4c';
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
};

APP.start();