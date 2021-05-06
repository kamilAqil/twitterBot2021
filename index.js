require('dotenv').config()

const functions = require('./functions')



const mainFunc = async()=>{
    console.log(`running main func`);
    
    let id = '104053996'
    let usersFollowed = []

    // // get userID 
    // try {
    //     id = await functions.getUserID(`heubertMungus`)
        
    // } catch (error) {
    //     console.log(`something went wrong trying to getUserID`,error);
    // }


    if(id !== ''){
        
        try {
            await functions.getUsersFollowed(id)
        } catch (error) {
            console.log(`SOMETHING WENT WRONG getUsersFollowed`,error);
        }
    }

} 




mainFunc()