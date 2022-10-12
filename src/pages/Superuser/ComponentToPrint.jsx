import { makeStyles, Table, TableCell, TableHead, TableRow } from "@material-ui/core";
import { TableBody } from "@mui/material";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import * as React from "react";
import "../../styling/InvoicePdf.css"
import HeadLogo from "../../static/MBS Logo.png"
import { fontSize } from "@mui/system";
import { withRouter } from "react-router-dom";
import moment from "moment";
const useStyle = makeStyles({
    headRow: {
        borderColor: "#c59a6b",
        fontSize: "20px",
        borderBottom: "2px solid #c59a6b",
        textAlign: "center",
        fontFamily:"Calibri, sans-serif"

    },
    headCell: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: "20px",
        fontFamily:"Calibri, sans-serif"

    },
    row: {
        borderColor: "#c59a6b",
        fontFamily: "Montserrat",
        fontSize: "20px",
        borderBottom: "2px solid #c59a6b",
        textAlign: "center",
        fontFamily:"Calibri, sans-serif"
    }
})


const ComponentToPrint = (props) => {
    const classes = useStyle()
    const data = props.location.state
    console.log("printt", data);
    const container = React.useRef(null);
    const pdfExportComponent = React.useRef(null);
    const exportPDFWithMethod = () => {
        let element = container.current || document.body;
        savePDF(element, {
          paperSize: "auto",
          margin: 40,
          fileName: `MBS-UID${data?.id}`,
        });
      };
      
      console.log(props);
    // const createPdf = () => createPdf(ref.current);
    let recievable = data?.cnf_price - data?.deposits
    return (
        <PDFExport ref={pdfExportComponent}
        paperSize="A4"
        margin={40}
        fileName={`MBS-UID${data?.id}`}
        author="MBS Team"
        >
            <div className="" ref={container}>
                <div className="invoicePdf__topContainer">
                    <div className="invoice__Heading">
                        <div className="invoicePdf__top">
                            <img
                                className="NAVBARLOGO"
                                src={HeadLogo} alt="" />

                        </div>
                        <div className="invoiceHeading_info">

                            <div>
                                <p>ProPalace AzuchiMachi Bldg., 2nd </p>
                                <p>Floor, 1-6-19, AzuchiMachi, Chuoku,</p>
                                <p >Osaka 541-0052, Japan </p>
                                <p style={{ marginTop: "10px" }}>Tel:  +81662640190</p>
                                <p>Fax: +81662640147</p>

                            </div>
                        </div>
                       
                    </div>
                    <div className="Horizontal_Line"></div>
                    <div style={{ marginBottom: "2px", width: "100%" }}>
                        <p style={{ textAlign: "center", textTransform: "uppercase", fontSize: "30px", lineHeight: "1.2", letterSpacing: "2px" }}>Performa invoice</p>
                        <div className="invoicePdf__dateSection">

                            <div className="invoicePdf__dateSection__client">

                                <p style={{ marginTop: "5px", fontSize: "20px" }}>M/S. <span style={{ fontWeight: "600" }}>{data?.buyer?.name}</span></p>
                                <p style={{ marginTop: "5px", fontSize: "20px", width:"20rem"}}>{data?.buyer?.address}</p>
                                
                                <p style={{ marginTop: "20px" }}>{data?.buyer?.mobile_no}</p>
                                <p style={{ marginTop: "5px" }}>{data?.buyer?.email}</p>
                            </div>
                            <div className="invoicePdf__dateSection__client">

                                <div className="invoicePdf__dateSection__client__bank">
                                    <p>Inv. No:</p>
                                    <p style={{ marginLeft: "2px" }}>{`UID${data?.id}`}</p>
                                </div>
                                <div className="invoicePdf__dateSection__client__bank" >
                                    <p>Date:</p>

                                    <p style={{ marginLeft: "2px" }}>{moment(Date.now()).format('YYYY-MM-DD')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="Horizontal_Line"></div>
                    <div className="invoicePdf__dateSection__table">
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell className={classes.headRow} style={{ fontFamily: "Montserrat" }}>
                                        Description
                                    </TableCell>
                                    <TableCell className={classes.headRow} style={{ fontFamily: "Montserrat" }}>
                                        Chassis No
                                    </TableCell>
                                    <TableCell className={classes.headRow} style={{ fontFamily: "Montserrat" }}>
                                        Total Amount
                                    </TableCell>
                                    <TableCell className={classes.headRow} style={{ fontFamily: "Montserrat" }}>
                                        Deposit
                                    </TableCell>
                                    <TableCell className={classes.headRow} style={{ fontFamily: "Montserrat" }}>
                                        Recievable
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>


                                <TableRow>
                                    <TableCell className={classes.row} style={{ fontFamily: "Montserrat" }}>
                                        <p style={{marginBottom:"-15px"}}>{`${data?.cardetails?.car_name}`}</p> <br />
                                        <p>{`${data?.cardetails?.model}`}</p>
                                    </TableCell>
                                    <TableCell className={classes.row} style={{ fontFamily: "Montserrat" }}>
                                        {data?.cardetails?.chassis}
                                    </TableCell>
                                    <TableCell className={classes.row} style={{ fontFamily: "Montserrat" }}>
                                        {`$${data?.cnf_price}`}
                                    </TableCell>
                                    <TableCell className={classes.row} style={{ fontFamily: "Montserrat" }}>
                                        {`$${data?.deposits}`}
                                    </TableCell>
                                    <TableCell className={classes.row} style={{ fontFamily: "Montserrat" }}>
                                        {`$${recievable}`}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                        <div className="grandTotal">
                            <p>Grand Total C&F:</p>
                            <p>{`$${data?.cnf_price}`}</p>
                        </div>
                        <div className="Horizontal_Line"></div>
                    </div>
                    <div className="invoicePdf__dateSection" style={{ marginTop: "2px" }}>
                        <div >
                            <h3 style={{ marginBottom: "30px" }}>Terms and Conditions:</h3>
                            <div className="invoicePdf__dateSection__client__address">
                                <h4>Shipment Ports:</h4>
                                <p >Any Japanese port to</p>
                            </div>
                            <div style={{ marginTop: "5px" }} className="invoicePdf__dateSection__client__address">
                                <h4 >Payments Terms:</h4>

                                <p>Advance payment of 30% within 7-days of issuance of invoice by T/T, <br /> balance payment 70% 10-days prior to arrival of vessel by T/T</p>
                            </div>
                            <h4>Remarks</h4>
                            <div className="doimondUl">
                                <ul typeof="dot">
                                    <li style={{ marginTop: "5px" }}>Kindly mention your invoice number on T/T slip</li>
                                    <li style={{ marginTop: "5px" }}>Failure to fulfill the payment will result in the re-sale of the car without any prior notice.</li>
                                </ul>
                            </div>

                        </div>
                    </div>
                    <div className="Horizontal_Line"></div>
                    <div className="bank">
                        <h3 style={{ fontSize: "25px", color: "#000", fontWeight:"600", marginBottom:"10px" }}>Bank Details</h3>
                        
                        <div className="bankDetails">

                            <div className="bankDetails__one">
                                <h4 style={{ color: "#000", textAlign: "left", marginBottom:"10px"}}>BENEFICIARY BANKING DETAILS</h4>
                                <div className="bankDetails__Info">
                                    <h4 >BANK NAME:</h4>
                                    {
                                       data?.bank_name == "RESONA BANK LTD"?<p>RESONA BANK LTD</p>:<p> SUMITOMO MITSUI BANKING <br /> CORPORATION</p>
                                    }
                                    
                                </div>
                                <div className="bankDetails__Info">
                                    <h4>BRANCH:</h4>
                                    {
                                       data?.bank_name == "RESONA BANK LTD"?<p>MINAMI MORIMACHI BRANCH <br /> OSAKA, JAPAN</p>:<p>OSAKA-CHUO BRANCH, JAPAN</p>
                                    }
                                </div>
                                <div className="bankDetails__Info">
                                    <h4>SWIFT CODE:</h4>
                                    <p>{data?.bank_name == "RESONA BANK LTD" ? "DIWAJPJT" : "SMBCJPJTOSA"}</p>
                                </div>
                                <div className="bankDetails__Info">

                                    <h4>A/C NO.:</h4>
                                    <p>{data?.bank_name == "RESONA BANK LTD" ? "0005552" : "0137818"}</p>
                                </div>
                                <div className="bankDetails__Info">

                                    <h4>BENEFICIARY:</h4>
                                    <p>{data?.bank_name == "RESONA BANK LTD" ? "MEIYO BOEKI SHOKAI" : "MEIYO BOEKI SHOKAI"}</p>
                                </div>
                                <div className="" >

                                    <h4>BENEFICIARY'S ADDRESS:</h4>
                                    
                                    <p style={{ marginTop: "5px" }}>{data?.bank_name == "RESONA BANK LTD" ? "PROPALACE AZUCHIMACHI BLDG. 2F, 1-6-19, AZUCHIMACHI CHUO-KU, OSAKA 541-0052, JAPAN" : "PPROPALACE AZUCHIMACHI BLDG. 2F, 1-6-19, AZUCHIMACHI CHUO-KU, OSAKA 541-0052, JAPAN"}</p>
                                </div>
                            </div>
                            <div className="bankDetails__two">
                                <h4 style={{color: "#000", textAlign: "left", marginBottom:"10px" }}>INTERMEDIARY BANKING DETAILS </h4>
                                <div className="bankDetails__Info">
                                
                                    <h4 >BANK NAME:</h4>
                                    {
                                       data?.bank_name == "RESONA BANK LTD"?<p>DEUTSCHE BANK TRUST <br /> COMPANY  AMERICAS</p>:<p>SMBC BANK</p>
                                    }
                                   
                                </div>
                                <div className="bankDetails__Info">
                                    <h4>BRANCH:</h4>
                                    <p>{data?.bank_name == "RESONA BANK LTD" ? "NEW YORK BRANCH" : "NEW YORK BRANCH"}</p>
                                </div>
                                <div className="bankDetails__Info">
                                    <h4>SWIFT CODE:</h4>
                                    <p>{data?.bank_name == "RESONA BANK LTD" ? "BKTRUS33" : "SMBCUS33"}</p>
                                </div>
                                <div className="">

                                    <h4>BENEFICIARY'S ADDRESS:</h4>

                                    <p>{data?.bank_name == "RESONA BANK LTD" ? " PROPALACE AZUCHIMACHI BLDG. 2F, 1-6-19, AZUCHIMACHI CHUO-KU, OSAKA 541-0052, JAPAN" : "PPROPALACE AZUCHIMACHI BLDG. 2F, 1-6-19, AZUCHIMACHI CHUO-KU, OSAKA 541-0052, JAPAN"}</p>
                                </div>
                                
                            </div>

                        </div>
                    </div>
                </div>
                          
            </div>
            <button onClick={exportPDFWithMethod}>pdf</button>
        </PDFExport>
    )
};
export default withRouter(ComponentToPrint)