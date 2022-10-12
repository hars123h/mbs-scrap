
const services=[{
    id:1,
    msg:"Personal Account",
    msginner:"Using your own log-in details, you have access to a personalized account that enables you to manage your bids, add to favorites, view your bid history, track your purchased vehicles, stay updated on your payments, and more."
},{
    id:2,
    msg:"Vehicle Search",
    msginner:"With access to every auction house in Japan, our customers have indirect access to all vehicles coming up in the auctions on a daily basis. In addition, customers have access to one-price units, as well as MBS’s stock of vehicles, providing a vast variety to choose from."
},{
    id:3,
    msg:"Placing Bids",
    msginner:"Our customers can indirectly place their bid price on the vehicles that they are interested in. We will then place the bids in the auction houses in accordance with your price, and you will be notified in your account’s dashboard whenever we win the bid on your behalf. This allows our customers to get the vehicles they demand at the best prices possible."
},{
    id:4,
    msg:"Vehicle Tracking",
    msginner:"After we successfully purchase a vehicle, our customers can then track the shipment progress either on their personal accounts, or using the tracking link provided. Whether the shipment process has been initiated, what stage it is in, the ETD, our customers will always know where there vehicle is."
},{
    id:5,
    msg:"Documentation",
    msginner:"For each purchase, all documentation will be done on your account. As we prepare the necessary documents for shipment, we will upload them onto the vehicle card, which will enable our customers to view and download the documents at their convenience"
},{
    id:6,
    msg:"Fund Management",
    msginner:"Our customers can manage their payments and track their funds all in their secure personal accounts. When payments are made, we will add it to your wallet, letting you know the exact funds currently held by us. We will also update the payments completed for each individual vehicle you have purchased with us, as well as update your receivables."
}
]

const faqs=[{
        key:1,
        ques:"How do I purchase a vehicle?",
        ans:"In order to purchase vehicles from MBS, you must become a registered member. Once registration is completed, we will send you your login credentials, and your account will be active. Once your account is active, you can purchase any vehicle you want."
    },{
        key:2,
        ques:"What payment methods do you accept?",
        ans:"Currently, MBS only accepts payments by direct remittance to our bank accounts. Due to the high frequency of credit card frauds, we currently do not accept this mode of payment."
    },{
        key:3,
        ques:"How long will it take to receive the shipment of my vehicle?",
        ans:"We cannot give you an exact ETA for your vehicle shipment, as it depends on the shipment schedules and availability. However, we will do our very best to complete shipments for your purchases as soon as possible."
    },{
        key:4,
        ques:"Do you inspect the cars before shipment?",
        ans:"Every car is inspected before shipment, ensuring that there are no major issues with the vehicles, and that the specifications match those mentioned on the auction sheets."
    }
]

const brands=[{
    key:1,
    name:"Toyota",
    img:"https://i.pinimg.com/564x/17/10/bd/1710bd267238997cd1d7c00f4f3ec4f7.jpg"
},{
    key:2,
    name:"Nissan ",
    img:"https://i.pinimg.com/564x/59/a5/26/59a526a3f6146549714f829936da41b4.jpg"
},{
    key:3,
    name:"Honda",
    img:"https://i.pinimg.com/564x/17/80/23/178023e5d2795435c5f03b737149dbff.jpg"
},{
    key:4,
    name:"BMW",
    img:"https://i.pinimg.com/564x/bb/8a/22/bb8a22af120485e71602305b6fbeef59.jpg"
},{
    key:5,
    name:"Audi",
    img:"https://pictures.dealer.com/j/jimellisaudiatlantaaoa/1047/70e485452c868b71f14cd5e1286ed574x.jpg"
},{
    key:6,
    name:"Mercedes Benz",
    img:"https://i.pinimg.com/564x/b9/9b/ae/b99bae6d18a63bab1472d5aa818795a2.jpg"
},{
    key:7,
    name:"Daihatsu",
    img:"https://i.pinimg.com/564x/ff/16/1e/ff161e61e74d1597379b550eed344e65.jpg"
},{
    key:8,
    name:"Land Rover",
    img:"https://i.pinimg.com/564x/c5/a2/a8/c5a2a8924cc26fd3df5547950ec42216.jpg"
}
]



const dueReminders=[
    {
        key:1,
        heading:"Reminder Due 1",
        dueDate:new Date().getTime(),
        amount:40000
    },  
    {
        key:2,
        heading:"Reminder Due 1",
        dueDate:new Date().getTime(),
        amount:40000
    },
    {
        key:3,
        heading:"Reminder Due 1",
        dueDate:new Date().getTime(),
        amount:40000
    },
    {
        key:4,
        heading:"Reminder Due 1",
        dueDate:new Date().getTime(),
        amount:40000
    },
    {
        key:5,
        heading:"Reminder Due 1",
        dueDate:new Date().getTime(),
        amount:40000
    },
    {
        key:6,
        heading:"Reminder Due 1",
        dueDate:new Date().getTime(),
        amount:40000
    }
]

export {services,faqs,brands,dueReminders}