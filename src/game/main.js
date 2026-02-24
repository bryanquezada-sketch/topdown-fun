import { Boot } from './scenes/Boot';
import { TopDown } from './scenes/TopDown';
import { Preloader } from './scenes/Preloader';
import { AUTO, Game } from 'phaser';

//  Find out more information about the Game Config at:
//  https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
const config = {
    type: AUTO,
    width: 640,
    height: 360,
    parent: 'game-container',
    backgroundColor: '#028af8',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        //Optionally use zoom for a fixed scale (e.g., 3x or 4x)
        zoom: 3
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true,
            //High tileBias prevents falling through thin pixel floors
            tileBias: 8 
        }
    },
    render: {
        pixelArt: true,
        antialias: false,
        roundPixels: true
    },
    scene: [
        Boot,
        Preloader,
        TopDown,
    ]
};

const StartGame = (parent) => {

    return new Game({ ...config, parent });

}

export default StartGame;
