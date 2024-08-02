import {player} from './player.js';
import promptSync from 'prompt-sync';

const prompt = promptSync({eot: true});

export class caller {
    name;
    called_num;
    
    constructor(name){
        this.name = name;
        this.called_num = [];
    }

    getname(){
        return this.name;
    }

    get_called_num(){
        return this.called_num;
    }

    call_num(){
        var call_num = prompt("Enter the number to call between 1 and 25: ");
        var call_num = parseInt(call_num);

        while (this.called_num.includes(call_num) === true || call_num > 25 || call_num < 1 || isNaN(call_num)){
            console.log("Invalid number entered. Number either already called or is not between 1 and 25. Please enter a number between 1 and 25.");
            call_num = prompt("Invalid number entered. Number either already called or is not between 1 and 25. Please enter a number between 1 and 25: ");
            call_num = parseInt(call_num);
        }
        this.called_num.push(call_num);
        return call_num;
    }


}