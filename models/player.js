import promptSync from 'prompt-sync';

const prompt = promptSync({eot: true});

export class player{
    #name;
    #num_array=[];

    constructor(name){
        this.#name = name;
        for (let i=0; i<5; i++){
            this.#num_array[i]=[];
            for (let j=0;j<5;j++){
                this.#num_array[i][j]=0;
            }
        }
    }

    getname(){
        return this.#name;
    }
    getnum_array(){
        return this.#num_array;
    }

    random_check(num){
        for (let i=0; i<5; i++){
            for (let j=0; j<5; j++){
                if (this.#num_array[i][j] === num){
                    return true;
                }
            }
        }
        return false;
    }

    gen_random_num(){
        
        for (let i=0; i < 5; i++){
            for (let j=0;j < 5;j++){
                var r = Math.floor(Math.random() * 25) + 1;
                if(this.random_check(r) === false){
                    this.#num_array[i][j]=r;
                }
                else{
                    j--;
                }
            }
        }
        console.log("Printing array after generating random numbers : " + this.#num_array);
        return this.#num_array;
    }

    compare_array(player2){
        let player2_arr=player2.getnum_array();

        console.log(player2_arr);
        console.log(this.#num_array);

        for (let i=0; i < 5; i++){
            for (let j=0; j < 5; j++){
                if (this.#num_array[i][j] !== player2_arr[i][j]){
                    return false;
                }
            }
        }
        return true;
    }

    mark_number(num){
        console.log(`${this.#name} Marking the number:  ${num}`);
        for (let i=0; i < 5; i++){
            for (let j=0; j < 5; j++){
                if (this.#num_array[i][j] === num){
                    this.#num_array[i][j] = 0;
                    return true;
                }
            }
        }
        return false;
    }

    check_rows(){
        let flag = false;
        for(let i =0; i < 5; i++){
            for (let j = 0; j < 5; j++){
                if(this.#num_array[i][j] !== 0){
                    flag = false;
                    break;
                }
                else {
                    flag = true;
                }
            }   
            if (flag === true){
                return true;
            }
        }
        return false;
    }
    check_columns(){
        let flag = false;
        for(let j =0; j < 5; j++){
            for (let i = 0; i < 5; i++){
                if(this.#num_array[i][j] !== 0){
                    flag = false;
                    break;
                }
                else {
                    flag = true;
                }
            }   
            if (flag === true){
                return true;
            }
        }
        return false;
    }
    check_main_diagonal(){
        for (let i = 0; i < 5; i++){
            if(this.#num_array[i][i] !== 0){
                return false;
            }
        }
        return true;
    }
    check_secondary_diagonal(){
        for (let i = 0; i < 5; i++){
            if(this.#num_array[i][4-i] !== 0){
                return false;
            }
        }
        return true;
    }
}


