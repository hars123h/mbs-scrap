import React from 'react'
import Navbar from '../../component/Navbar'
import Footer from '../../component/Footer'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import GavelIcon from '@mui/icons-material/Gavel'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

const HowToBuy = () => {
    document.title="How To Buy - MBS Auto Avenue"
    return (
        <div>
            <Navbar/>
            <div className="aboutUsContainer" style={{paddingBottom:"5rem"}}>
                <div>
                    <h1 className="std-heading2">How To Buy ?</h1>

                    <div className='howtobuyind'>
                         <span>STEP 1 : Create an Account <AccountBoxIcon/></span>
                         <p><DoubleArrowIcon/>To register an account, please send us the requested details, which we at MBS will review. If approved, we will send your login credentials, and your personal account on MBS Auto Avenue is ready to access.</p>
                    </div>
                    <div className='howtobuyind'>
                         <span>STEP 2 : Find Your Vehicle <DriveEtaIcon/></span>
                         <p><DoubleArrowIcon/>Look through our vast variety of vehicle options across all auction houses, one-price units, and our own stock across Japan, giving you access to all the details and images for your desired automobiles.</p>
                    </div>
                    <div className='howtobuyind'>
                         <span>STEP 3 : Place Your Bid <GavelIcon/></span>
                         <p><DoubleArrowIcon/>Once you have chosen the vehicles that you want to purchase, place your bid prices directly on the unit. We will receive your list of bids, and purchase the vehicles as per your price. If we successfully purchase the vehicle, you will be notified on your dashboard.</p>
                    </div>
                    <div className='howtobuyind'>
                         <span>STEP 4 : Manage Your Purchases <ManageAccountsIcon/></span>
                         <p><DoubleArrowIcon/>Once we successfully purchase your desired vehicle, you can then track the shipment progress, payments, and documentation all within the dashboard of your personal account.</p>
                    </div>           
                </div>
            </div>
           <Footer/>
        </div>
    )
}

export default HowToBuy
