// idVsName resolver

//message {
// id, content, context {from, to, time}
// }

// const user_chats:UserChat[] = [
//     {
//         id: "2",
//         name: "Dwij",
//         profilePicture: "https://picsum.photos/200",
//         messages: [
//             {
//                 content: "Hii",
//                 from: {
//                     id: "2",
//                     name:"Dwij"
//                 },
//                 to: {
//                     id: "1",
//                     name:"Dhairya",
//                 }
//             },
//             {
//                 content: "Hello",
//                 from: {
//                     id: "1",
//                     name: "Dhairya",
//                 },
//                 to: {
//                     id: "2",
//                     name:"Dwij"
//                 }
//             },
//             {
//                 content: "wasup!",
//                 from: {
//                     id: "2",
//                     name:"Dwij"
//                 },
//                 to: {
//                     id: "1",
//                     name:"Dhairya",
//                 }
//             },
//             {
//                 content: "Nothing, wbu?",
//                 from: {
//                     id: "1",
//                     name:"Dhairya",
//                 },
//                 to: {
//                     id: "2",
//                     name:"Dwij"
//                 }
//             }
//         ]
//     },
//     {
//         id: "3",
//         name: "Heet",
//         profilePicture: "https://picsum.photos/200",
//         messages: [
//             {
//                 content: "Hii",
//                 from: {
//                     id: "1",
//                     name:"Dhairya",
//                 },
//                 to: {
//                     id: "3",
//                     name:"Heet"
//                 }
//             },
//             {
//                 content: "Hello",
//                 from: {
//                     id: "3",
//                     name:"Heet"
//                 },
//                 to: {
//                     id: "1",
//                     name:"Dhairya",
//                 }
//             },
//             {
//                 content: "wasup!",
//                 from: {
//                     id: "3",
//                     name:"Heet"
//                 },
//                 to: {
//                     id: "1",
//                     name:"Dhairya",
//                 }
//             },
//             {
//                 content: "Nothing, wbu?",
//                 from: {
//                     id: "1",
//                     name:"Dhairya",
//                 },
//                 to: {
//                     id: "3",
//                     name:"Heet"
//                 }
//             }
//         ]
//     },
//     {
//         id: "4",
//         name: "Neel",
//         profilePicture: "https://picsum.photos/200",
//         messages: [
//             {
//                 content: "Hii",
//                 from: {
//                     id: "1",
//                     name:"Dhairya",
//                 },
//                 to: {
//                     id: "4",
//                     name:"Neel"
//                 }
//             },
//             {
//                 content: "Hello",
//                 from: {
//                     id: "4",
//                     name:"Neel",
//                 },
//                 to: {
//                     id: "1",
//                     name:"Dhairya"
//                 }
//             },
//             {
//                 content: "wasup!",
//                 from: {
//                     id: "4",
//                     name:"Neel",
//                 },
//                 to: {
//                     id: "1",
//                     name:"Dhairya"
//                 }
//             },
//             {
//                 content: "Nothing, wbu?",
//                 from: {
//                     id: "1",
//                     name:"Dhairya"
//                 },
//                 to: {
//                     id: "4",
//                     name:"Neel",
//                 }
//             }
//         ]
//     }
// ]

// export { current_user, user_chats }


// Normalaization of the data

import { getMessageCreationDetails } from "./components/chatBox/components/chatBoxBody/utils/messageUtils";

// export const _users = {
//     "USER ID": {
//         id:"USER ID",
//         name: "Dhairya",
//         profilePicture: "some URL",
//         personalChats: ["CHATID"],
//         groupChat:["CHATID"]
//     }
// }

// export const _messages = {
//     "MESSAGE ID": {
//         id:"MESSAGE ID",
//         content: "MESSAGE CONTENT",
//         from: "SENDER ID",
//         to:"RECIEVER ID"
//     }
// }


// Personal chat ID will be the composite key of the User IDs  
// userid1#userid2 like this 
// export const _personalChats = {
//     "COMPOSITE PERSONAL CHAT ID": {
//         id:"COMPOSITE PERSONAL CHAT ID",
//         PARTICIPANTS: ["USERID1", "USERID2"],
//         MESSAGES:["MESSAGEID..."]
//     }
// }

// TODO: FEATURE ON HOLD 
// export const _groupChats = {
//     "GROUP ID": {
//         id:"GROUP ID",
//         GROUPNAME: "GROUP",
//         PARTICIPANTS: ["USERID1", "USERID2", "USERID3"],
//         MESSAGES:["MESSAGEID..."]
//     }
// }



const { timestamp, creationDate } = getMessageCreationDetails();

export const CurrentUser = {
    id: "1",
    name: "Dhairya",
    profilePicture: "https://picsum.photos/200",
    password:"dhairya",
    personalChats: ["1#2","1#3","1#5"],
    groupChats:[]
}

export const Users = {
    1: {
        id: "1",
        name: "Dhairya",
        profilePicture: "https://picsum.photos/200",
        chatRooms: ["1#2", "1#3", "1#5"],
        password:"dhairya",
    },
    2: {
        id: "2",
        name: "Dwij",
        profilePicture: "https://picsum.photos/200",
        password:"dwij",
        chatRooms: ["1#2"],
    },
    3: {
        id: "3",
        name: "Heet",
        profilePicture: "https://picsum.photos/200",
        password:"heet",
        chatRooms: ["1#3"],
    },
    4: {
        id: "4",
        name: "Neel",
        profilePicture: "https://picsum.photos/200",
        password:"neel",
        chatRooms: [],
    },
    5: {
        id: "5",
        name: "Karan",
        profilePicture: "https://picsum.photos/200",
        password:"karan",
        chatRooms: ["1#5"],
    }
}

export const Messages = {
    1: {
        id: "1",
        content: "Hii",
        from: "1",
        to: "2",
        timestamp,
        creationDate
    },
    2: {
        id: "2",
        content: "Hii",
        from: "2",
        to: "1",
        timestamp,
        creationDate
        
    },
    3: {
        id: "3",
        content: "Yo bro",
        from: "1",
        to: "3",
        timestamp,
        creationDate
        
    },
    4: {
        id: "4",
        content: "Hey, wasup?",
        from: "3",
        to: "1",
        timestamp,
        creationDate
        
    },
    5: {
        id: "5",
        content: "Hey...",
        from: "1",
        to: "5",
        timestamp,
        creationDate
       
    },
    6: {
        id: "6",
        content: "Let's go home!!!",
        from: "1",
        to: "2",
        timestamp,
        creationDate
        
    }
}

export const ChatRoomRecord = {
    "1#2": {
        id: "1#2",
        participants: ["1", "2"],
        messages:["1","2","6"]
    },
    "1#3": {
        id: "1#3",
        participants: ["1", "3"],
        messages:["3","4"]
    },
    "1#5": {
        id: "1#5",
        participants: ["1", "5"],
        messages:["5"]
    }
}

