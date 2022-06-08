import {useState, useEffect} from 'react';
import FitmentTable from './fitmentTable'
import useAxios from './useAxios'

const Fitment = () => {

  
  const modelEndpoint   = '/v1/models/';
  const fitmentEndpoint = '/v1/search/by_model/';
  const make            = 'Porsche';
  const apiKey          = '13fc47255b1b4682e892e55fe9219140';
  const year            = new Date().getFullYear();

  const [status, setStatus]         = useState('');
  const [model, setModel]           = useState('');
  const [models, setModels]         = useState([]);
  const [fitment, setFitment]       = useState([]);
  const [modelYear, setModelYear]   = useState('');
  const [trim, setTrim]             = useState('');
  const [request, setRequest]       = useState(null)

  const {response, error, loading } = useAxios(request);
  
  useEffect(() => {
    
    switch(status){
      case 'models':
       setModels(response)
       break;

      case 'trim':
       setFitment(response);
       break;

    }
     
  },[request, status, response])
    

   const handleYearDropDown = (value) => { 

     const myRequest = {
       method: 'GET',
       url: modelEndpoint,
       withCredentials: false,
       headers: {
         'Content-Type': 'application/json',
       },
       params: {
          make: make,
          year: value,
          user_key: apiKey
       },
     }
    
    setStatus('models');
    setModelYear(value);
    setModel('');
    setFitment([]);
    setRequest(myRequest);
 
   }

   const handleModelDropDown = (value) => {

    const myRequest = {
       method: 'GET',
       url: fitmentEndpoint,
       withCredentials: false,
       headers: {
         'Content-Type': 'application/json',
       },
       params: {
          make: make,
          year: modelYear,
          model: value,
          user_key: apiKey
       },
     }
    
    setStatus('trim');
    setModel(value);
    setRequest(myRequest);
   	
   }

   const handleTrimDropDown = (value) => {
     setTrim(value)
   }

	return (
      <>
       <p>Use this App to Quickly identify Wheel and Tire Fitment for your Porsche</p>
      <div>
          <span>
              <select onChange={(e) => handleYearDropDown(e.target.value)}>
                <option key="--">-Year-</option>                  
                  {Array.from( new Array(60), (v, i) =>
                    <option key={i} value={year-i}>{year-i}</option>
                  )}
              </select>
          </span>
          <span>
             <select onChange={(e) => handleModelDropDown(e.target.value)}>
              <option key="--">-Model-</option>
                {models &&
                  models.map((x,y) => <option key={x.slug}>{x.name}</option>)
                }
             </select>
          </span>
          <span>
            <select onChange={(e) => handleTrimDropDown(e.target.value)}>
              <option key="--">-Trim-</option>
              {fitment &&
                fitment.map((x,y) => <option key={x.slug}>{x.trim}</option>)
              }
            </select>
          </span>
      </div>
      <div>
      {trim &&
       <FitmentTable trim={trim} fitment={fitment?.find(({ trim }) => trim === trim )} />
      }
      </div>

      </>
	)
}

export default Fitment;