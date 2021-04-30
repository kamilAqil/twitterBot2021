const axios = require('axios').default;
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

        if(nextToken !== ''){
            config.params.pagination_token = nextToken
        }


        while(needToGetMore){

          




            console.log(`running loop`);
            let usersFollowed = await axios.request(config).then((data)=>{
                console.log(`data from usersFollowed`,data.data);
                if(data.data.meta.next_token){
                    nextToken = data.data.meta.next_token
                    needToGetMore = false
                }else{
                    nextToken = ''
                    needToGetMore = false
                }
                let dataArr = data.data.data
                tempArrOfUsersFollowed.concat(dataArr)
            }).catch((err)=>{
                throw err
            })
        }


       console.log(`tempArrOfUsersFollowed`,tempArrOfUsersFollowed);



}


exports.testFunc = testFunc
exports.getUserID = getUserID

exports.getUsersFollowed = getUsersFollowed