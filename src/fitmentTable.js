

const FitmentTable = (props) => {

	const trim = props.trim;
    const fitment = props.fitment; 

	return (
      <div className="fitment-wrapper">
      	   <div className="row">
            <div className="column"></div>
            <div className="column dark-gray">Front</div>
            <div className="column"></div>
            <div className="column dark-gray">Rear</div>
            <div className="column"></div>
           </div>
      	  {fitment?.wheels?.map((option:any, index: number) =>  
           <div key={index} className="row">
            <div className="column dark-gray">Fitment Option {index + 1}</div>
            <div className="column light-gray">{option.front.rim}</div>
            <div className="column light-gray">{option.front.tire}</div>
            <div className="column light-gray">{option.rear.rim}</div>
            <div className="column light-gray">{option.rear.tire}</div>
            </div>
      	  )}
       </div> 
	)
}

export default FitmentTable;