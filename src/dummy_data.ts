import { UserChat } from "./types"
const current_user = {
    id:1,
    name: "Dhairya",
    profile_picture:"https://picsum.photos/200"
}

const user_chats:UserChat[] = [
    {
        id: 2,
        name: "Dwij",
        profile_picture: "https://picsum.photos/200",
        messages: [
            {
                content: "Hii",
                from: {
                    id: 2,
                    name:"Dwij"
                },
                to: {
                    id: 1,
                    name:"Dhairya",
                }
            },
            {
                content: "Hello",
                from: {
                    id: 1,
                    name: "Dhairya",
                },
                to: {
                    id: 2,
                    name:"Dwij"
                }
            },
            {
                content: "wasup!",
                from: {
                    id: 2,
                    name:"Dwij"
                },
                to: {
                    id: 1,
                    name:"Dhairya",
                }
            },
            {
                content: "Nothing, wbu?",
                from: {
                    id: 1,
                    name:"Dhairya",
                },
                to: {
                    id: 2,
                    name:"Dwij"
                }
            }
        ]
    },
    {
        id: 3,
        name: "Heet",
        profile_picture: "https://picsum.photos/200",
        messages: [
            {
                content: "Hii",
                from: {
                    id: 1,
                    name:"Dhairya",
                },
                to: {
                    id: 3,
                    name:"Heet"
                }
            },
            {
                content: "Hello",
                from: {
                    id: 3,
                    name:"Heet"
                },
                to: {
                    id: 1,
                    name:"Dhairya",
                }
            },
            {
                content: "wasup!",
                from: {
                    id: 3,
                    name:"Heet"
                },
                to: {
                    id: 1,
                    name:"Dhairya",
                }
            },
            {
                content: "Nothing, wbu?",
                from: {
                    id: 1,
                    name:"Dhairya",
                },
                to: {
                    id: 3,
                    name:"Heet"
                }
            }
        ]
    },
    {
        id: 4,
        name: "Neel",
        profile_picture: "https://picsum.photos/200",
        messages: [
            {
                content: "Hii",
                from: {
                    id: 1,
                    name:"Dhairya",
                },
                to: {
                    id: 4,
                    name:"Neel"
                }
            },
            {
                content: "Hello",
                from: {
                    id: 4,
                    name:"Neel",
                },
                to: {
                    id: 1,
                    name:"Dhairya"
                }
            },
            {
                content: "wasup!",
                from: {
                    id: 4,
                    name:"Neel",
                },
                to: {
                    id: 1,
                    name:"Dhairya"
                }
            },
            {
                content: "Nothing, wbu?",
                from: {
                    id: 1,
                    name:"Dhairya"
                },
                to: {
                    id: 4,
                    name:"Neel",
                }
            }
        ]
    }
]

export {current_user,user_chats}