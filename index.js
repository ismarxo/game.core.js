class Game {
    start() {
        console.log('Game.start');

        const layout = new Layout(900, 500);        
        const player = new Player();
        const keyboard = new Keyboard(player);

        window.addEventListener('keypress', (event) => {
            keyboard.listen(event);
        });

        window.addEventListener('keypress', (event) => {
            keyboard.listen(event);
        });
        

        setInterval(() => {
            player.domRefreshRender();
            player.changeStepSize(player.inMove);
        }, 10);
    }

    stop() {
        console.log('Game.stop');
    }
}

class Layout {
    constructor(width, height) {
        let layout = document.createElement('div');
        layout.id = 'layout';
        layout.style.width = width + 'px';
        layout.style.height = height + 'px';

        document.querySelector('body').appendChild(layout);
    }
}

class World {
    test = '123';
}

class Player {
    constructor() {
        this.width = 10;
        this.height = 10;
        this.posX = 0;
        this.posY = 0;
        this.stepSize = 1;
        this.timePress = 0;
        this.domElement = this.domFirstRender();
        this.inMove = false;
    }

    domFirstRender() {
        let element = document.createElement('div');
        element.id = 'player';
        element.style.width = this.width + 'px';
        element.style.height = this.height + 'px';
        element.style.top = this.posY + 'px';
        element.style.left = this.posX + 'px';
        
        document.querySelector('#layout').appendChild(element);       

        return element;
    }

    domRefreshRender() {      
        this.domElement.style.width = this.width + 'px';
        this.domElement.style.height = this.height + 'px';
        this.domElement.style.top = this.posY + 'px';
        this.domElement.style.left = this.posX + 'px';
    }

    changeStepSize(bool) {        
        if(bool) {
            this.timePress = this.timePress + 1;
        } else {
            if(this.timePress != 0) {
                this.timePress = this.timePress - 1;
            }            
        }
        
        this.stepSize = this.timePress;
    }

    move(direction) {        
        console.log('stepSize = ', this.stepSize);
        if(this.allowMove(direction)) {
            this.inMove = true;
            this.changeStepSize(this.inMove);
            switch (direction) {
                case 'top':
                    this.posY = this.posY - this.stepSize;           
                    break;
                case 'down':
                    this.posY = this.posY + this.stepSize;           
                    break;
                case 'left':
                    this.posX = this.posX - this.stepSize;           
                    break;
                case 'right':
                    this.posX = this.posX + this.stepSize;           
                    break;
            
                default:
                    break;
            }
            
        }        
    }

    allowMove(direction) {
        return true;
    }   
}



class Keyboard {
    constructor(player) {
        this.player = player;
        this.info = 1;
        console.log(this.player);
    }
    listen(event) {   
        console.log(event);         
        switch (event.code) {
            case 'KeyW':
                this.player.move('top');
                break;
            case 'KeyS':
                this.player.move('down');
                break; 
            case 'KeyA':
                this.player.move('left');
                break;  
            case 'KeyD':
                this.player.move('right');
                break;         
            default:
                console.log(event);
                break;
        }
    }
}

const game = new Game;
game.start();

