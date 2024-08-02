import {caller} from './caller.js';
import {player} from './player.js';

export class game{
    player1;
    player2;
    call;
    constructor(player1_name,player2_name){
        this.caller = new caller("Caller");
        this.player1 = new player(player1_name);
        this.player2 = new player(player2_name);
    }

    async start_game(){

        console.log("Welcome to the Bingo Game!");
        console.log("Let's start the game!");
        console.log("Generating random numbers for Player 1...");
        this.player1.gen_random_num();
        console.log("Generating random numbers for Player 2...");
        this.player2.gen_random_num();

        while(1){

            if(this.player2.compare_array(this.player1)==true){
        
                console.log("both arrays are same! Create random arrays again!");
                this.player1.gen_random_num();
        
            }
            else{
        
                console.log("Both arrays are different!");
                break;
        
            }
        
        }
        while(1){
            var call_num = this.caller.call_num();
            
            console.log("Number called by the caller is: " + call_num);
            let p1 = new Promise((resolve,reject) => {
                    let flag1 = this.player1.mark_number(call_num);
                    if(flag1){
                        resolve(1);
                    }
                    else{
                        reject("Number not found in player1's array!");
                    }
            });
            let p2 = new Promise((resolve,reject) => {
                
                    let flag2 = this.player2.mark_number(call_num);
                    if(flag2){
                        
                        resolve(1);
                    }
                    else{
                        reject("Number not found in player2's array!");
                    }
            });
            
            await Promise.all([p1,p2]).then(values => {
                
                console.log("After player1 marking the number: " + this.player1.getnum_array());
                console.log("After player2 marking the number: " + this.player2.getnum_array());
                
            }).catch((err)=> {
                console.log("in .catch");
                console.log(err);
                console.log(err[0]);
                console.log(err[1]);
            });

            let p1_rows = new Promise((resolve,reject) => {
                let flag1 = this.player1.check_rows();
                if(flag1){
                    reject(1);
                }
                else{
                    resolve(0);
                }
            });

            let p2_rows = new Promise((resolve,reject) => {
                let flag2 = this.player2.check_rows();
                if(flag2){
                    reject(2);
                }
                else{
                    resolve(0);
                }
            });

            let p1_columns = new Promise((resolve,reject) => {
                let flag1 = this.player1.check_columns();
                if(flag1){
                    reject(1);
                }
                else{
                    resolve(0);
                }
            });

            let p2_columns = new Promise((resolve,reject) => {
                let flag2 = this.player2.check_columns();
                if(flag2){
                    reject(2);
                }
                else{
                    resolve(0);
                }
            });

            let p1_main_diagonal = new Promise((resolve,reject) => {
                let flag1 = this.player1.check_main_diagonal();
                if(flag1){
                    reject(1);
                }
                else{
                    resolve(0);
                }
            });

            let p2_main_diagonal = new Promise((resolve,reject) => {
                let flag2 = this.player2.check_main_diagonal();
                if(flag2){
                    reject(2);
                }
                else{
                    resolve(0);
                }
            });

            let p1_secondary_diagonal = new Promise((resolve,reject) => {
                let flag1 = this.player1.check_secondary_diagonal();
                if(flag1){
                    reject(1);
                }
                else{
                    resolve(0);
                }
            });

            let p2_secondary_diagonal = new Promise((resolve,reject) => {
                let flag2 = this.player2.check_secondary_diagonal();
                if(flag2){
                    reject(2);
                }
                else{
                    resolve(0);
                }
            });

            let result = await Promise.all([p1_rows,p2_rows,p1_columns,p2_columns,p1_main_diagonal,p2_main_diagonal,p1_secondary_diagonal,p2_secondary_diagonal]).catch(values => {
                
                console.log("In .catch of Promise.all");
                console.log(values);

                if(values===1){
                    console.log(`Bingo! ${this.player1.getname()} has won the game!`);
                }
                if(values===2){
                    console.log(`Bingo! ${this.player2.getname()} has won the game!`);
                }
            });

            if(result == undefined){
                console.log("Game ended.")
                break;
            }
        }
    }
}