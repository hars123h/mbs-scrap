import React from 'react'
import Footer from '../component/Footer'
import Navbar from '../component/Navbar'

const HowToBuy = () => {
    document.title = "How To Buy"
    return (
        <div>
            <Navbar />
            <div className="aboutUsContainer">
                <div>
                    <h1 className="std-heading2" style={{ marginBottom: "3rem", fontSize: "2rem" }}>BEWARE OF SCAMS ADVISING MONEY TRANSFERS TO FAKE ACCOUNTS!</h1>
                    <div className="subDivBankingInfo">
                        <h2>To Our Valued Customers</h2>

                        <p>MBS is well aware of the possibility of scams occurring where individuals who are not affiliated with our company in any capacity attempt to defraud customers by sending fraudulent and fake money transfer instructions. </p>

                        <p>These scammers may pose as sales agents representing MBS, sometimes sending email communications with domain names that were not registered by us. Email communication from MBS will only carry the domain address “mbsjp.com” or “mbsautoavenue.com”. Please be aware of slight alterations in spellings to the above mentioned domain names as well, and always double check any form of email communication you receive claiming to be from MBS.</p>
                        <p>Customers should only send money to MBS’s beneficiary accounts in Japan. Your proforma invoice will mention ONLY one of the following accounts:</p>

                    </div>
                    <div className="bankingDetailsGrid">
                        <div className="bankaccountdetails">
                        <p><span>Bank Name</span> : RESONA BANK LTD</p>
                            <p><span>Branch</span> : MINAMI MORIMACHI BRANCH, OSAKA JAPAN</p>
                            <p><span>Account No.</span> : 0005552</p>
                            <p><span>Swift</span> : DIWAJPJT</p>
                            <p><span>Beneficiary</span> : MEIYO BOEKI SHOKAI</p>
                             <p>*INTERMEDIARY BANK DETAILS* (USD)</p>
                             <p><span>Bank Name</span> : DEUTSCHE BANK TRUST COMPANY AMERICAS</p>
                            <p><span>Branch</span> : New York</p>
                            <p><span>Swift</span> : BKTRUS33</p>
                        </div>
                        <p> Or</p>
                        <div className="bankaccountdetails">
                        <p><span>Account No.</span> : 0137818</p>
                            <p><span>Swift</span> : SMBCJPJT</p>
                            <p><span>Beneficiary</span> : MEIYO BOEKI SHOKAI</p>
                             <p>*INTERMEDIARY BANK DETAILS* (USD)</p>
                            <p><span>Bank Name</span> : SMBC BANK</p>
                            <p><span>Branch</span> : New York</p>
                            <p><span>Swift</span> : SMBCUS33</p>
                        </div>
                    </div>

                    <div className="subDivBankingInfo">
                        <p>Please note, that if you do send funds to any account apart from what is mentioned above, MBS is not responsible or liable in any capacity.</p>

                        <p>Your security is our top priority MBS, so please double-check all details before engaging in communication with anyone who claims to be associated with MBS, and sending money.</p>


                        <b>Regards,</b>
                        <b style={{ fontSize: "1.3rem", marginBottom: "5rem" }}>MBS Auto Avenue (A Subsidiary of Meiyo Boeki Shokai)</b>

                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default HowToBuy;
