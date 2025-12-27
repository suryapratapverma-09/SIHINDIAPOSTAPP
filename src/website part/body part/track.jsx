import React,{useState} from 'react'
import '../../Css part/body css/track.css'


const Track = () => {
    const [selectedBox,setSelectedBox]=useState("consignment");

    function handlebuttonclick(state){
        setSelectedBox(state);
    }

  return (
    <div className='maintrack'>
        <form action="post">
            <div className='userchoosenbox'>
                <div className='radiobox'>
                    <div className='choosenbox'>
                    <input type="radio" id="Consignment" name="Consignment" value="Consignment" checked={selectedBox === 'consignment'} onChange={()=>{handlebuttonclick("consignment")}}/>
                    <label className="label" htmlFor="Consignment">Consignment</label>
                    </div>
                    <div className='choosenbox'>
                    <input type="radio" id='RefNo' name='Ref No' value="Ref No" checked={selectedBox === 'ref no'} onChange={()=>{handlebuttonclick("ref no")}}/>
                    <label className="label" htmlFor="RefNo">Ref No</label>
                    </div>
                    <div className='choosenbox'>
                    <input type="radio" id='Complaint' name='Complaint' value="Complaint" checked={selectedBox === 'complaint'} onChange={()=>{handlebuttonclick("complaint")}}/>
                    <label className="label" htmlFor="Complaint">Complaint</label>
                    </div>
                    
                </div>
            
                <div className='codebox'>
                    {selectedBox === 'consignment' &&
                        <input id="inputbox1" type="text" placeholder={`enter ${selectedBox} number`}/>
                    }
                    {selectedBox === 'ref no' &&
                        <input id="inputbox2" type="text" placeholder={`enter ${selectedBox} number`}/>
                    }
                    {selectedBox === 'complaint' &&
                        <input id="inputbox3" type="number" placeholder={`enter ${selectedBox} number`}/>
                    }
                </div>
            </div>
            <div>
                <div>
                    <h6></h6>
                    <div>
                        <div>
                        {/* catptcha */}
                        {/* reloding part */}
                        {/* sound part */}
                        </div>
                        <input id="captcha" type="text" placeholder=""/>
                    </div>
                    <p></p>
                    <button type="submit">Track Now</button>
                    <p></p>
                </div>
            </div>
        </form>
    </div>
  );
}

export default Track;