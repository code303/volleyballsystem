const APP = {

    currentPosition: 1,
    attackPlayerColor: '#99cc00',
    defencePlayerColor: '#33b5e5',

    onResize: function onResize() {
        APP.resizeContentContainer();
        APP.init();
    },

    resizeContentContainer: function resizeContentContainer() {
        const positionSelectorStripeHeight = document.getElementById("positionSelectorStripe").scrollHeight;
        const buttonStripeHeight = document.getElementById("buttonStripe").scrollHeight;
        const screenWidth = document.getElementById("positionSelectorStripe").scrollWidth;
        const availableHight = document.getElementById("container").scrollHeight - positionSelectorStripeHeight - buttonStripeHeight;
        
        document.getElementById("contentContainer").style.top = positionSelectorStripeHeight + "px";
        document.getElementById("contentContainer").style.bottom = buttonStripeHeight + "px";
        
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
            
    // Prompts the user to input the name,
    // adjust the output on screen, save to local storage
    promptName: function promptName(id, position) {
        const person = prompt("Gib den Namen des Spielers ein:", "");
        if (person != null) {
            document.getElementById(id).innerHTML = "<b>" + person + "</b><br/><small>" + position + "</small>";
            APP.saveToLocalStorage();
        }
    },

    startServiceAnimation: function startServiceAnimation() {
        document.getElementById('setter').className ='setterOffence' + APP.currentPosition;
        document.getElementById('outsideOne').className ='outsideOneOffence' + APP.currentPosition;
        document.getElementById('middleOne').className ='middleOneOffence' + APP.currentPosition;
        document.getElementById('opposite').className ='oppositeOffence' + APP.currentPosition;
        document.getElementById('outsideTwo').className ='outsideTwoOffence' + APP.currentPosition;
        document.getElementById('middleTwo').className ='middleTwoOffence' + APP.currentPosition;

        // dis- and enable the buttons (visually)
        APP.changeColor(document.getElementById('serviceButton'), '#727272');
        APP.changeColor(document.getElementById('positionsButton'), 'white');
        APP.changeColor(document.getElementById('defenceButton'), '#727272');
    },

    startDefenceAnimation: function startDefenceAnimation() {
        document.getElementById('setter').className ='setterDefence' + APP.currentPosition;
        document.getElementById('outsideOne').className ='outsideOneDefence' + APP.currentPosition;
        document.getElementById('middleOne').className ='middleOneDefence' + APP.currentPosition;
        document.getElementById('opposite').className ='oppositeDefence' + APP.currentPosition;
        document.getElementById('outsideTwo').className ='outsideTwoDefence' + APP.currentPosition;
        document.getElementById('middleTwo').className ='middleTwoDefence' + APP.currentPosition;
        
        // dis- and enable the buttons (visually)
        APP.changeColor(document.getElementById('serviceButton'), '#727272');
        APP.changeColor(document.getElementById('positionsButton'), 'white');
        APP.changeColor(document.getElementById('defenceButton'), '#727272');
    },

    changeColor: function changeColor(element, color) {
        element.style.color = color;
    },

    saveToLocalStorage: function saveToLocalStorage() {
        if (typeof(Storage) !== 'undefined') {
            localStorage.currentPosition = APP.currentPosition;
            localStorage.setter = document.getElementById('setter').innerHTML;
            localStorage.outsideOne = document.getElementById('outsideOne').innerHTML;
            localStorage.middleOne = document.getElementById('middleOne').innerHTML;
            localStorage.opposite = document.getElementById('opposite').innerHTML;
            localStorage.outsideTwo = document.getElementById('outsideTwo').innerHTML;
            localStorage.middleTwo = document.getElementById('middleTwo').innerHTML;
        } else {
            alert('Sorry, your browser does not support web storage...');
        }
    },
        
    readFromLocalStorage: function readFromLocalStorage() {
        APP.currentPosition = typeof localStorage.currentPosition == "undefined" ? 1 : localStorage.currentPosition;
        document.getElementById("setter").innerHTML = typeof localStorage.setter == "undefined" ? 'Zuspieler' : localStorage.setter;
        document.getElementById("outsideOne").innerHTML = typeof localStorage.outsideOne == "undefined" ? 'Au&szlig;en 1' : localStorage.outsideOne;
        document.getElementById("middleOne").innerHTML = typeof localStorage.middleOne == "undefined" ? 'Mitte 1' : localStorage.middleOne;
        document.getElementById("opposite").innerHTML = typeof localStorage.opposite == "undefined" ? 'Diagonal' : localStorage.opposite;
        document.getElementById("outsideTwo").innerHTML = typeof localStorage.outsideTwo == "undefined" ? 'Au&szlig;en 2' : localStorage.outsideTwo;
        document.getElementById("middleTwo").innerHTML = typeof localStorage.middleTwo == "undefined" ? 'Mitte 2' : localStorage.middleTwo;
    },

    adjustAllOffset: function adjustAllOffset() {
        // set the div to the middle
        APP.adjustOffset(document.getElementById("setter"));
        APP.adjustOffset(document.getElementById("outsideOne"));
        APP.adjustOffset(document.getElementById("middleOne"));
        APP.adjustOffset(document.getElementById("opposite"));
        APP.adjustOffset(document.getElementById("outsideTwo"));
        APP.adjustOffset(document.getElementById("middleTwo"));
    },

    adjustOffset: function adjustOffset(div) {
        const divWidth = div.offsetWidth;
        const currentPosition = div.offsetLeft;// - div.scrollLeft + div.clientLeft;
        const newPosition = currentPosition - parseInt(divWidth/2);
        const parentWidth = div.parentNode.scrollWidth;
        div.style.left = 100 * newPosition/parentWidth + "%";
    },

    reloadNewPosition: function reloadNewPosition(newPosition) {
        APP.currentPosition = newPosition;
        APP.saveToLocalStorage();
        APP.highlightCurrentPosition(newPosition);
        APP.init();
    },

    setBasePosition: function setBasePosition() {
        APP.highlightCurrentPosition(APP.currentPosition);
        switch(parseInt(APP.currentPosition)) {
            case 1:
                APP.setPlayersToPosition(75,50,   75,20,   50,20,   25,20,   25,50,   50,50);
                break;
            case 2:
                APP.setPlayersToPosition(75,20,   50,20,   25,20,   25,50,   50,50,   75,50);
                break;
            case 3:
                APP.setPlayersToPosition(50,20,   25,20,   25,50,   50,50,   75,50,   75,20);
                break;
            case 4:
                APP.setPlayersToPosition(25,20,   25,50,   50,50,   75,50,   75,20,   50,20);
                break;
            case 5:
                APP.setPlayersToPosition(25,50,   50,50,   75,50,   75,20,   50,20,   25,20);
                break;
            case 6:
                APP.setPlayersToPosition(50,50,   75,50,   75,20,   50,20,   25,20,   25,50);
                break;
            default:
                APP.setPlayersToPosition(75,50,   75,20,   50,20,   25,20,   25,50,   50,50);
                break;
        }
    },

    highlightCurrentPosition: function highlightCurrentPosition(position) {
        let i;
        for (i = 1; i <= 6; i++) {
            // const backgroundColor = (i === position) ? '#6c6c6c' : '#4c4c4c';
            const backgroundColor = (i === parseInt(position)) ? '#6c6c6c' : '#4c4c4c';
            document.getElementById("pos" + i).style.background = backgroundColor;
        }
    },

    setPlayersToPosition: function setPlayersToPosition(setterLeft, setterTop, outsideOneLeft, outsideOneTop, middleOneLeft, middleOneTop, oppositeLeft, oppositeTop, outsideTwoLeft, outsideTwoTop, middleTwoLeft, middleTwoTop) {
        document.getElementById("setter").style.left = setterLeft+"%";
        document.getElementById("setter").style.top = setterTop+"%";
        document.getElementById("setter").style.background = setterTop < 50 ? APP.attackPlayerColor : APP.defencePlayerColor;
        document.getElementById("outsideOne").style.left = outsideOneLeft + "%";
        document.getElementById("outsideOne").style.top = outsideOneTop + "%";
        document.getElementById("outsideOne").style.background = outsideOneTop < 50 ? APP.attackPlayerColor : APP.defencePlayerColor;
        document.getElementById("middleOne").style.left = middleOneLeft + "%";
        document.getElementById("middleOne").style.top = middleOneTop + "%";
        document.getElementById("middleOne").style.background = middleOneTop < 50 ? APP.attackPlayerColor : APP.defencePlayerColor;
        document.getElementById("opposite").style.left = oppositeLeft + "%";
        document.getElementById("opposite").style.top = oppositeTop + "%";
        document.getElementById("opposite").style.background = oppositeTop < 50 ? APP.attackPlayerColor : APP.defencePlayerColor;
        document.getElementById("outsideTwo").style.left = outsideTwoLeft + "%";
        document.getElementById("outsideTwo").style.top = outsideTwoTop + "%";
        document.getElementById("outsideTwo").style.background = outsideTwoTop < 50 ? APP.attackPlayerColor : APP.defencePlayerColor;
        document.getElementById("middleTwo").style.left = middleTwoLeft + "%";
        document.getElementById("middleTwo").style.top = middleTwoTop + "%";
        document.getElementById("middleTwo").style.background = middleTwoTop < 50 ? APP.attackPlayerColor : APP.defencePlayerColor;
    },

    resetClassName: function resetClassName() {
        document.getElementById("setter").className = "player";
        document.getElementById("outsideOne").className = "player";
        document.getElementById("middleOne").className = "player";
        document.getElementById("opposite").className = "player";
        document.getElementById("outsideTwo").className = "player";
        document.getElementById("middleTwo").className = "player";
    },

    init: function init() {
        APP.resetClassName();
        APP.readFromLocalStorage(); 
        APP.setBasePosition();
        APP.adjustAllOffset();
        APP.changeColor(document.getElementById('serviceButton'), 'white');
        APP.changeColor(document.getElementById('positionsButton'), '#727272');
        APP.changeColor(document.getElementById('defenceButton'), 'white');
    },

    start: function start() {
        console.log("APP.start.");
        window.onresize = APP.onResize;
        window.onload = APP.onResize;
        document.getElementById('positionsButton').addEventListener('click', (event) => {APP.init();});
        document.getElementById('serviceButton').addEventListener('click', (event) => {APP.startServiceAnimation();});
        document.getElementById('defenceButton').addEventListener('click', (event) => {APP.startDefenceAnimation();});
        APP.registerClickEventsForPositionButtons();
        APP.registerClickEventsForPlayerNames();
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
    }
};

APP.start();