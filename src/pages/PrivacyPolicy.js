import React from 'react'
import Footer from '../component/Footer'
import Navbar from '../component/Navbar'

const PrivacyPolicy = () => {
    document.title = "Privacy Policy - MBS Auto Avenue"
    return (
        <div>
            <Navbar />
            <div className="aboutUsContainer">
                <div>
                    <h1 className="std-heading2">Privacy Policy</h1>
                    <p style={{ textAlign: 'left', fontWeight: 'bold', color: '#8a28d9' }}> General Terms</p>
                    <p style={{ textAlign: 'left' }}>
                        1. MBS reserves the right to modify our Privacy Policy any time without notifying our users. We recommend that you stay up to date on our Privacy Policy so that you are aware of any changes that may occur from time to time. Once we update the Privacy Policy, the new terms automatically supersede the old terms, and all your information will be governed as per the new terms.

                        <br /><br />2. If at any time you do not agree with our Privacy Policy, you can request MBS to return, delete, and/or destroy your information.

                    </p>

                    <p style={{ textAlign: 'left', fontWeight: 'bold', color: '#8a28d9' }}> Collection of Information* </p>
                    <p style={{ textAlign: 'left' }}>
                        1. During the account registration process on our website mbsautoavenue.com, we collect your personal information such as your name, company name, address, email address, telephone number, mobile number, fax number, etc.

                        <br /><br />2. We may collect and retain the aforementioned information, even if you do not complete a transaction with us, but have either attempted to, or successfully registered an account with us.
                         <br /><br />
                        3. If you make a purchase with us, or attempt any form of transaction through our website, MBS, its employees, and/or its partners may collect additional information including billing information, shipping information, payment information, etc. We may collect this additional information even if a transaction is not fully completed with us, and use such information as per the terms of our Privacy Policy.

                        <br /><br />4. MBS collects aggregate statistical and usage information such as the pages viewed, browser, operating system, time spent, number of sessions, unique visitors, favorites, etc. We may collect this information even if you do not successfully register an account with us, or whether you complete any purchase/transaction with us, and we will use such information as per the terms of our Privacy Policy.
                         <br /><br />
                        5. We may use your information to provide you with additional products and services that MBS determines you might be interested in. 


                        <br /><br />

                    </p>

                    <p style={{ textAlign: 'left', fontWeight: 'bold', color: '#8a28d9' }}> Use of Your Information </p>
                    <p style={{ textAlign: 'left' }}>
                        1. Your personal information will be held and used, but will not be disclosed to any unauthorized person or body, unless requested by a governmental authority under situations of wrong-doings, non-compliance with laws and regulations,

                        <br /><br /> 2. Where appropriate, we may use such information in carrying out marketing activity
                        
                        <br /><br /> 3. The information we request and collect during the registration process may be checked for completeness, accuracy, and validity. In such cases, we may share the information you provide with our employees, agents, relevant agencies, and any necessary third parties in order to do our due diligence before We accept your request and provide you with an account on the Site.
                        
                        <br /><br /> 4. We use statistical information to diagnose any problems, issues and errors that may occur with the Site, and to make improvements based on usage information, analysis, patterns, and any other relevant data that we collect.
                        
                        <br /><br /> 5. We may provide your collected information to third parties involved in billing, payments and shipping including but not limited to, banks, third party payment services, carriers, local transport companies, repair and inspection service providers.
                        
                        <br /><br /> 6. We reserve the right to disclose your collected information in the case of breach of contract, breach of our Terms & Conditions, and the violations of our Privacy Policy, to the relevant authorities, agencies, partners, and firms in order to pursue our claim and prevent any further injury to MBS or others.
                        
                        <br /><br /> 7. MBS cannot be held liable for any privacy/security/confidentiality practices employed by third parties. The privacy policies and confidentiality agreements may differ from ours, and we have no control over their practices, or the information that you or we submit to third parties. We recommend that you read the privacy policies of any third party you deal with before providing any information.

                    </p>

                    <p style={{ textAlign: 'left', fontWeight: 'bold', color: '#8a28d9' }}> Security of Your Information </p>
                    <p style={{ textAlign: 'left' }}>
                        1. MBS employs the best possible security measures to protect your information from unauthorized access and incorrect usage.

                        <br /><br /> 2. MBS takes no guarantees that any information transferred, transmitted, or communicated over digital or physical means is perfectly secure. In such instances, if your information is breached, MBS cannot be held liable, but we will do everything we can to retrieve any information that has been breached, prevent incorrect usage, and/or find out who is responsible.

                    </p>

                </div>
            </div>
            <Footer />
        </div>
    )
}

export default PrivacyPolicy
