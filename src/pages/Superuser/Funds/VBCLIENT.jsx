import React,{useState,useEffect} from 'react'
import _ from "lodash";

const VBAGENT = ({allFunds}) => {

    const [vbagent,setVBAgent]=useState([{}])
    useEffect(()=>{
    const temp1=[],temp3=[],temp4=[];
    _.map(allFunds,(ITEM)=>{
        temp1.push({buyer:ITEM.buyer.id,name:ITEM.buyer.name,wallet:ITEM.buyer.wallet.amount})
    })
    let temp2=_.uniqBy(temp1,"buyer")
    _.map(temp2,(agent)=>{
            let fAIndividual=0;
                _.map(allFunds,(ITEM)=>{
                    if(ITEM.buyer.id===agent.buyer){
                        fAIndividual+=(ITEM.cnf_price-ITEM.amount_paid);
                    }
                })
            temp3.push({agent_id:agent.buyer,name:agent.name,walletamt:agent.wallet,due_amount:fAIndividual})
            setVBAgent(temp3)
    })
    },[])
    return (
        <div className="fundsSubContainer">

            <div className="vbaIndividual" style={{gridTemplateColumns:"repeat(3,1fr)"}}>
                <b>Customer</b>
                <b style={{justifySelf:"center"}}>Due Amount ($)</b>
                <b>Wallet Balance ($)</b>
            </div>
            {vbagent.map((item,key)=>{
                return(
                    <div key={key} className="vbaIndividual" style={{gridTemplateColumns:"repeat(3,1fr)"}}>
                        <p>{item.name}</p>
                        <p>{item.due_amount}</p>
                        <p>{item.walletamt}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default VBAGENT
