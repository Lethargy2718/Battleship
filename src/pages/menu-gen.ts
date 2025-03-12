import { Ship } from "../types";
import battleshipSvg from "../assets/Battleships/battleship.svg"
import submarineSvg from "../assets/Battleships/submarine.svg"
import carrierSvg from "../assets/Battleships/battleship.svg"
import cruiserSvg from "../assets/Battleships/cruiser.svg"
import destroyerSvg from "../assets/Battleships/destroyer.svg"

export default function createMainMenu(): HTMLElement {
    // Create the main container
    const main = document.createElement('main');
    main.classList.add('main', 'container');

    // Create the direction button list
    const directionButtonList = document.createElement('div');
    directionButtonList.classList.add('button-list', 'direction-button-list');

    const horizontalBtn = document.createElement('button');
    horizontalBtn.classList.add('menu-button', 'active');
    horizontalBtn.id = 'horizontalBtn';
    horizontalBtn.textContent = 'Horizontal';

    const verticalBtn = document.createElement('button');
    verticalBtn.classList.add('menu-button');
    verticalBtn.id = 'verticalBtn';
    verticalBtn.textContent = 'Vertical';

    directionButtonList.appendChild(horizontalBtn);
    directionButtonList.appendChild(verticalBtn);

    // Create the game board
    const gameBoard = document.createElement('div');
    gameBoard.classList.add('game-board');

    // Create the button list
    const buttonList = document.createElement('div');
    buttonList.classList.add('button-list');

    const startBtn = document.createElement('button');
    startBtn.classList.add('menu-button');
    startBtn.id = 'startBtn';
    startBtn.textContent = 'Start';

    const resetBtn = document.createElement('button');
    resetBtn.classList.add('menu-button');
    resetBtn.id = 'resetBtn';
    resetBtn.textContent = 'Reset';

    const randomBtn = document.createElement('button');
    randomBtn.classList.add('menu-button');
    randomBtn.id = 'randomBtn';
    randomBtn.textContent = 'Random';

    buttonList.appendChild(startBtn);
    buttonList.appendChild(resetBtn);
    buttonList.appendChild(randomBtn);

    // Create the ship list
    const shipList = document.createElement('ul');
    shipList.classList.add('ship-list');

    const ships: ShipElement[] = [
        { name: 'Battleship', id: 'battleshipImg', dataShip: Ship.Battleship, src: battleshipSvg },
        { name: 'Submarine', id: 'submarineImg', dataShip: Ship.Submarine, src: submarineSvg },
        { name: 'Carrier', id: 'carrierImg', dataShip: Ship.Carrier, src: carrierSvg },
        { name: 'Cruiser', id: 'cruiserImg', dataShip: Ship.Cruiser, src: cruiserSvg },
        { name: 'Destroyer', id: 'destroyerImg', dataShip: Ship.Destroyer, src: destroyerSvg }
    ];

    ships.forEach(ship => {
        const listItem = document.createElement('li');
        listItem.classList.add('ship-list__item');

        const heading = document.createElement('h4');
        heading.textContent = ship.name;

        const imgContainer = document.createElement('div');
        imgContainer.classList.add('img-container');
        imgContainer.setAttribute('data-container', ship.dataShip);

        const img = document.createElement('img');
        img.src = ship.src;
        img.classList.add('ship__img');
        img.id = ship.id;
        img.setAttribute('data-ship', ship.dataShip);
        img.setAttribute('draggable', 'true');
        img.alt = ship.name.toLowerCase();

        imgContainer.appendChild(img);
        listItem.appendChild(heading);
        listItem.appendChild(imgContainer);
        shipList.appendChild(listItem);
    });

    // Append all elements to the main container
    main.appendChild(directionButtonList);
    main.appendChild(gameBoard);
    main.appendChild(buttonList);
    main.appendChild(shipList);

    return main;
}

interface ShipElement {
    name: string,
    id: string,
    dataShip: Ship,
    src,
}