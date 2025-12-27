import React from 'react'
import '../../Css part/footer css/foot.css'
import { Link } from 'react-router-dom'
const Foot = () => {
  return (
    <div>
        <footer>
        <div className='link'>
            <div className='leftsidelink'>
                <Link to="/">Home</Link> 
                <Link to="https://www.indiapost.gov.in/VAS/Pages/AboutUs/AboutUs.aspx">About Us</Link>
                <Link to="https://www.indiapost.gov.in/VAS/Pages/Form.aspx">Forms</Link>
                <Link to="https://www.indiapost.gov.in/vas/Pages/Content/Recruitments.aspx?Category=Recruitment">Recruitments</Link>
                <Link to="https://www.indiapost.gov.in/VAS/Pages/Holidays.aspx">Holidays</Link>
                <Link to="https://www.indiapost.gov.in/VAS/Pages/CustomerFeedback.aspx">Feedback</Link>
                <Link to="https://www.indiapost.gov.in/VAS/Pages/RTI/RTI.aspx">Right To Information</Link>
            </div>
            <div className='midlink'>
                <Link to="https://eprocure.gov.in/cppp/searchbyorg/Department%20of%20Posts">Tenders India</Link>
                <Link to="https://www.indiapost.gov.in/VAS/Pages/Content/RelatedLinks.aspx">Related sites</Link>
                <Link to="https://www.indiapost.gov.in/VAS/Pages/Content/disclaimer.aspx">Website Policies</Link>
                <Link to="https://www.indiapost.gov.in/VAS/Pages/content/ContactUs.aspx">Contact Us</Link>
                <Link to="https://utilities.cept.gov.in/DOP/">Employee Corner</Link>
                <Link to="https://www.indiapost.gov.in/VAS/pages/sitemap.aspx">Sitemap</Link>
                <Link to="https://www.indiapost.gov.in/VAS/Pages/faqs.aspx">Help</Link>
            </div>
            <div className='rightsidelink'>
                <h5>External Links</h5>
                <Link to="https://india.gov.in"><img id="indiagovin" src=".././public/footer logo/portalofindia.jpg" alt="india gov in" /></Link>
                <Link to="https://voters.eci.gov.in/login">National Voter's Service Portal</Link>
                <Link to="https://www.indiacode.nic.in/">India Code</Link>
                <Link to="https://www.indiapost.gov.in/VAS/DOP_PDFFiles/Safe_to_Host_Certificate.pdf">Application Security Audit Report</Link>
            </div>
            <div className='socialmedia'>
                <Link to="https://www.facebook.com/PostOffice.IN/?ref=hl"><img  className="socialmediaicon" src=".././public/footer logo/faceBookicon_new.png" alt="facebook" /></Link>
                <Link to="https://x.com/indiapostoffice"><img className="socialmediaicon" src=".././public/footer logo/twitterImage_new.png" alt="x" /></Link>
                <Link to="https://www.youtube.com/indiapost_dop"><img className="socialmediaicon" src=".././public/footer logo/youtubeicon_new.png" alt="youtube" /></Link>
                <Link to="https://www.instagram.com/indiapost_dop/"><img className="socialmediaicon" src=".././public/footer logo/instagramicon_new.png" alt="instagram" /></Link>
                <Link to="https://www.indiapost.gov.in/VAS/Pages/CustomerFeedback.aspx"><img className="socialmediaicon" src=".././public/footer logo/comment-dots_new.png" alt="message" /></Link>
            </div>
        </div>
    
        <p>This website belongs to <strong>Department of Posts, Ministry of Communications, GoI.</strong> Created and Managed by <strong><a id='tata' href='https://www.tcs.com/'>Tata Consultancy Services Ltd.</a></strong> 
        <br/>Content owned and updated by Department of Posts, Ministry of Communications, Government of India. Last Updated: 14 Nov 2024</p>

        </footer>
    </div>
    
  )
}

export default Foot