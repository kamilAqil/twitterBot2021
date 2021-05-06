const axios = require('axios').default;
const fs = require('fs')
const bearerToken = process.env.BEARER_TOKEN

const basePath = `https://api.twitter.com/2`

const testFunc = async() => {
    console.log(`running test function`);
}




const getUserID = async(username) => {
    let urlPath = `https://api.twitter.com/2/users/by/username/${username}`
    let accountName = `heubertMungus`
    

    let config = {
        url : urlPath,
        method : 'get',
        headers : {
            Authorization : `Bearer ${bearerToken}`
        },
       
    }

    
    let id = await axios.request(config).then((data)=>{
       
        return data.data.data.id
    }).catch((err)=>{
        console.log(`something went wrong getting user data from twitter`,err.response.data);
        throw err.response.data
    })

    console.log(`id before returning`);

    return id
}



const getUsersFollowed = async(id) => {
    let needToGetMore = true
    let nextToken = ''
    let tempArrOfUsersFollowed = []
    console.log(`going to run getUsersFollowed for user `,id);
    let urlPath = `${basePath}/users/${id}/following`
    console.log(`urlPath for getUsersFollowed`,urlPath);

    let config = {
        url : urlPath,
        method : 'get',
        headers : {
            Authorization : `Bearer ${bearerToken}`
        },
        
    }

        // if(nextToken !== ''){
        //     console.log(`running with nextToken`,nextToken);
        //     config.params.pagination_token = nextToken
        // }



        // let usersFollowed = await axios.request(config).then((data)=>{
        //     console.log(`data from usersFollowed`,data.data);
     
        //     let dataArr = data.data.data
        //     let meta = data.data.meta
        //     console.log(`meta stuffs`,meta);
        //     if(meta.next_token){
        //         // need to get more true
        //         nextToken = meta.next_token
        //         console.log(`there is a next token`,nextToken);
        //         needToGetMore = true
        //     }else{
        //         // need to get more false
        //         nextToken = ''
        //         needToGetMore = false
        //     }

        //     tempArrOfUsersFollowed = tempArrOfUsersFollowed.concat(dataArr)
        //     console.log(`dataArr in usersFollowed`,dataArr.length);
        // }).catch((err)=>{
        //     throw err
        // })



        while(needToGetMore){
            if(nextToken !== ''){
                console.log(`running with nextToken`,nextToken);
                config.params = {}

                config.params.pagination_token = nextToken
            }
            let usersFollowed = await axios.request(config).then((data)=>{
                // console.log(`data from usersFollowed`,data.data);
            
                let dataArr = data.data.data
                let meta = data.data.meta
                console.log(`meta stuffs`,meta);
                if(meta.next_token){
                    // need to get more true
                    nextToken = meta.next_token
                    needToGetMore = true
                }else{
                    // need to get more false
                    nextToken = ''
                    needToGetMore = false
                }
    
                tempArrOfUsersFollowed = tempArrOfUsersFollowed.concat(dataArr)
                console.log(`dataArr in usersFollowed`,dataArr.length);
            }).catch((err)=>{
                throw err
            })
        }

      
     console.log(`tempArrOfUsersFollowed after while loop`,tempArrOfUsersFollowed);


      
        try {
            fs.writeFile('usersFollowed.json', tempArrOfUsersFollowed, (err) => {
                if (err) throw err;
                console.log('Data written to file');
            });
        } catch (error) {
            console.log(error);
        }

     



}


exports.testFunc = testFunc
exports.getUserID = getUserID

exports.getUsersFollowed = getUsersFollowed