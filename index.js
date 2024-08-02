import {game} from './models/game.js';
import promptSync from 'prompt-sync';
const prompt = promptSync({eot: true});

var player1_name = prompt("Enter the name of Player 1: ");
var player2_name = prompt("Enter the name of Player 2: ");
var Game = new game(player1_name,player2_name);
Game.start_game();