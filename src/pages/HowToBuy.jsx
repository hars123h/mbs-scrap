import React from 'react'
import Footer from '../component/Footer'
import Navbar from '../component/Navbar'

const HowToBuy = () => {
    document.title="About Us - MBS Auto Avenue"
    return (
        <div>
            <Navbar/>
            <div className="aboutUsContainer">
                <div>
                    <h1 className="std-heading2">About MBS Auto Avenue</h1>

                    <p><span>MBS Auto Avenue</span> is a subsidiary of Meiyo Boeki Shokai, based in the financial epicenter of <span>Osaka, Japan</span>. MBS has been exporting used vehicles from Japan <span>since 1974</span>, servicing the demands of our long-term clients in the Caribbean, Africa, Europe, and the Middle East. </p>

                    <p>Our selection of vehicles is vast and versatile. Whether you are looking for Japanese-made automobiles, European and American imports, we can fulfill your requirements. </p>

                    <p>With the <span>launch</span> of our new website, you can search for vehicles across all auction houses on our website, place your bids, and manage your purchases on <span>MBS Auto Avenue</span>. We have taken an all-in approach to the purchase, tracking, shipments, documentation, and accounting for our customers, through the creation of personalized accounts.</p>

                    <p>Our new website, coupled with our strength in the level of service we offer our clients, is what makes <span>MBS</span> stand out amongst the competition. Our aim is to provide the most secure and seamless experience for our customers, while continuing to develop our approach to the market of Japanese second-hand vehicles.</p>
                </div>
            </div>
           <Footer/>
        </div>
    )
}

export default HowToBuy
