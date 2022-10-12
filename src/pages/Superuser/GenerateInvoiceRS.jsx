import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import common from "../../baseUrl"
import { error } from '../../component/Toast'
import { useParams } from 'react-router'
import SuTop from '../../component/Heading/SuTop'
import _ from "lodash"
import ZeroResMessage from '../../component/Heading/ZeroResMessage'
import { AttachMoney, Receipt } from '@mui/icons-material'
import { IconButton, Tooltip } from '@material-ui/core'
import ChooseBank from '../../component/Dialogs/ChooseBank'
import { Pagination } from '@mui/material'

var fileDownload = require('js-file-download');

const GenerateInvoiceRS = () => {

    const [rp, setRp] = useState([])
    const [fd, setFd] = useState([])
    const [agent, setAgent] = useState("")
    const [resultCount, setResultCount] = useState(0)
    const [openBankSelect, setOpenBankSelect] = useState({ open: false, id: '' })
    const { id } = useParams()

    useEffect(() => {
        const getAllPh = async () => {
            const response = await axios({
                method: "post",
                headers: {
                    Authorization: `Token ${localStorage.getItem("token")}`
                },
                url: `${common.baseUrl}Funds/ShowReceivables/`,
                data: {
                    agent_id: id
                }
            })
            if (response.status === 200) {
                setResultCount(response.data.count)
                setRp(response.data.results)
                !_.isEmpty(response.data.results)
                    &&
                    setAgent(response.data.results[0].buyer.agent.name)
            } else {
                error("Something went wrong!")
            }
        }
        getAllPh()
        const shipmentDetails = async () => {
            const response = await axios({
                method: "post",
                headers: {
                    Authorization: `Token ${localStorage.getItem("token")}`
                },
                url: `${common.baseUrl}Tracking/AllShipmentDetails/`,
                data: {
                    agent_id: id
                }
            })
            // console.log(response)
            if (response.status === 200) {
                setFd(response.data)
                // setRp(response.data)
                // !_.isEmpty(response.data)
                // &&
                // setAgent(response.data[0].buyer.agent.name)
            } else {
                error("Something went wrong!")
            }
        }
        shipmentDetails()
    }, [])

    const generateInvoice = (id, bank) => {
        axios({
            method: "post",
            url: `${common.baseUrl}Documents/Invoice/`,
            headers: {
                Authorization: `Token ${localStorage.getItem("token")}`
            },
            data: {
                id,
                account: bank
            },
            responseType: "blob"
        }).then(res => {
            fileDownload(res.data, `Invoice.pdf`);
        }).catch(err => {
            error(err)
        })
    }

    const nextPage = async (pageNumber) => {

        const response = await axios({
            method: "post",
            headers: {
                Authorization: `Token ${localStorage.getItem("token")}`
            },
            url: `${common.baseUrl}Funds/ShowReceivables/?page=${pageNumber}`,
            data: {
                agent_id: id
            }
        })
        if (response.status === 200) {
            setRp(response.data.results)
            !_.isEmpty(response.data.results)
                &&
                setAgent(response.data.results[0].buyer.agent.name)
        } else {
            error("Something went wrong!")
        }
    }


    return (
        <>
            <div
                className="phContainer"
            >
                <div className="phPurchases"
                style={{ overflowY: 'auto' }}>
                    <SuTop title={!_.isEmpty(agent) && agent + "'s Purchases"} />

                    <div className="purchases">
                        {
                            rp.length == 0
                                ?
                                <ZeroResMessage message="No Results to Show" />
                                :
                                rp.map((item, key) => {
                                    return (
                                        <div style={{ position: 'relative' }}>
                                            <Tooltip title="generate invoice" placement="right">
                                                <IconButton style={{ position: 'absolute', top: 20, right: 20 }} onClick={() => setOpenBankSelect({ open: true, id: item.id })}><Receipt /></IconButton>
                                            </Tooltip>

                                            <Link
                                                to={`/sac/alldetails/${item.id}`}
                                                key={key}
                                                className="purchase"
                                            >
                                                <div>
                                                    <div className="text" >
                                                        <p>{item.cardetails.auction_place}</p>
                                                        <p><span>Lot No: </span>{item.cardetails.lot_no}</p>
                                                        <h3>{item.cardetails.car_name.slice(0, 10)}...</h3>
                                                        <p><span>Chassis ID: </span>{item.cardetails.model}</p>
                                                    </div>
                                                    <img
                                                        className="img"
                                                        src={item.cardetails.url}
                                                        alt={"Specific img Purchase History" + key} />
                                                </div>
                                            </Link>
                                        </div>
                                    )
                                })
                        }
                    </div>
                {
                    Math.ceil(resultCount / 16) > 1 ?
                        <Pagination count={Math.ceil(resultCount / 16)} sx={{ mb: 1 }} onChange={(e, pageNumber) => nextPage(pageNumber)} /> :
                        ''
                }
                </div>
            </div>
            <ChooseBank show={openBankSelect} set={setOpenBankSelect} onClose={generateInvoice} />
        </>
    )
}

export default GenerateInvoiceRS
