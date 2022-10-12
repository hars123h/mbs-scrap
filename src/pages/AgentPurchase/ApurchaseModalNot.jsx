import { makeStyles, Table, TableBody, TableCell, TableRow } from '@material-ui/core'
import React from 'react'
const useStyle = makeStyles({
    invoiceRow: {
        border: "none"
    }
})

function ApurchaseModalNot(props) {
    const classes = useStyle()
    return (
        <div className=''>
            <div onClick={() => props.onClose ? props.onClose() : ""} className={`sapurchaseModal ${props.class ? props.class : ""}`} >
                <div onClick={(e) => e.stopPropagation()} className='sapurchaseModal__sort'>
                    <div className='sapurchaseModal__sort__title'>
                        <h2>Tracking</h2>

                    </div>
                    <div className='sapurchaseModal__sort__table'>
                        <Table>
                            <TableBody>
                                <TableRow >
                                    <TableCell className={classes.invoiceRow} style={{ fontWeight: "600", fontSize: "20px" }}>Agent Wise</TableCell>
                                    <TableCell className={classes.invoiceRow}> <input type="text" placeholder='Agent Wise' /></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className={classes.invoiceRow} style={{ fontWeight: "600", fontSize: "20px" }}>Date</TableCell>
                                    <TableCell className={classes.invoiceRow}><input type="date" /></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className={classes.invoiceRow} style={{ fontWeight: "600", fontSize: "20px" }}>Carrier</TableCell>
                                    <TableCell className={classes.invoiceRow}><input type="text" placeholder='Carrier' /></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className={classes.invoiceRow} style={{ fontWeight: "600", fontSize: "20px" }}>Shipment</TableCell>
                                    <TableCell className={classes.invoiceRow}><input type="text" placeholder='Shipment' /></TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                        <div className='sapurchaseModal__sort__submit__button'>
                            <button>
                                Sort
                            </button>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default ApurchaseModalNot