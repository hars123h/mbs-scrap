import { Divider } from '@mui/material';
import axios from 'axios';
import currency from 'currency.js';
import { keyBy } from 'lodash';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import common from '../../baseUrl';
import SuTop from '../../component/Heading/SuTop'
import SaTotalFundsAgent from "../../pages/Superadmin/SaTotalFundsAgent"
import "../../styling/saFunds.css"
import SaAllfundsModal from './SaAllfundsModal';
import SaCustomerModel from './SaCustomerModel';
function SaAllFunds(props) {
    let onClickFunction = (arg) => alert(arg)
    const [data, setData] = useState([])
    const [fundSearch, setFundSearch] = useState([])
    const [showCustomerModal, setShowCustomerModal] = useState(false)
    const [propsData, setPropsData] = useState("")
    const [agentName, setAgentName] = useState("")
    const [reciavable, setReciavable] = useState()
    const [carData, setCarData] = useState()
    const [CustomerName, setCutomerName] = useState()
    var TotalFund = 0

    const submitProp = (data) => {

        setPropsData(data)
    }
  

    data.forEach((fund) => {
        TotalFund += fund.Fund
    })
    const handleSearch = () => {
        return (data.filter((item) => {
            return (
                fundSearch ? item?.agent_name?.toLowerCase().includes(fundSearch) || item?.agent_name?.toLowerCase().includes(fundSearch) : data
            )
        })
        );
    };

    useEffect(async () => {
        const url = "Funds/getAllFundsData/"
        const AllFunds = await axios({
            method: "get",
            url: `${common.baseUrl}${url}`,
            headers: {
                Authorization: `Token ${localStorage.getItem("token")}`
            },
        })

        setData(AllFunds.data?.all_data)
        setReciavable(AllFunds.data?.total_receivables)
    }, [])

    return (
        <>

            {
                showCustomerModal && <SaCustomerModel CustomerName={CustomerName} carDetail={carData} onClose={() => setShowCustomerModal(false)} />
            }
            {/* {
                saFundsModal && <SaAllfundsModal onClose={() => setSaFundsModal(false)} />
            } */}
            <div className='saAllFunds'>
                <SuTop title="Funds - All Agents" />
                <div className="fundsTitle">
                    <div>
                        <p>Total Receivables</p>
                        <h1 style={{ fontSize: "2vw" }}>{currency(reciavable, { precision: 0 }).format()} </h1>

                    </div>

                </div>
                <div className='saAllFunds__search'>

                    <div className='saAllFundLoad__Button'>
                        {/* <button onClick={() => setSaFundsModal(true)}>Load</button> */}
                    </div>
                    <input type="search" placeholder='Search by name' onChange={(e) => setFundSearch(e.target.value)} />
                </div>
                <Divider />
                {
                    data.length>=1?
                        <div className="saAllFunds__cards">
                            <div className="saAllFunds__cards__left">
                                <div className='saAllFunds__cards__left__card__container'>
                                    {
                                        handleSearch()?.map((items) => {
                                            return (



                                                <div key={items.agent_id} onClick={(e) => {
                                                    submitProp(items)
                                                }} className="saAllFunds__cards__left__card">
                                                    <h3>{items?.agent_name}</h3>
                                                    <br />
                                                    <h5 style={{ fontSize: "1vw" }}>{currency(items?.agent_receivables, { precision: 0 }).format()}</h5>
                                                </div>



                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className="saAllFunds__cards__right">
                                <SaTotalFundsAgent
                                    onShow={() => setShowCustomerModal(true)}
                                    propsData={propsData}
                                    agentName={agentName}
                                    setCarData={setCarData}
                                    setCutomerName={setCutomerName}

                                />
                            </div>
                        </div> 
                        :
                         <div style={{display:"flex", justifyContent:"center", alignItems:"center", marginTop:"10rem"}}> 
                            <p style={{ opacity: ".3", fontWeight: "500", fontSize: "23px", marginTop: "5px" }}>No Data Found</p>
                        </div>
                }

            </div>
        </>
    )
}

export default SaAllFunds