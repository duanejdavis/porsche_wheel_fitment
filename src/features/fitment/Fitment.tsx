import React from 'react';
import axios from 'axios';
import FitmentTable from './FitmentTable'

interface ModelPost {
  slug:    string;
  name:    string;
  name_en: string;
}

interface Fitment {
  slug: string,
  market: object,
  body: string,
  trim: string,
  generation: object,
  trim_attributes: [],
  trim_body_types: [],
  fuel: string,
  engine_type: string,
  power: object,
  engine_code: string,
  lock_type: string,
  lock_text: string,
  stud_holes: number,
  pcd: number,
  centre_bore: number,
  bolt_pattern: string,
  rear_axis_stud_holes: string,
  rear_axis_pcd: string,
  rear_axis_centre_bore: string,
  rear_axis_bolt_pattern: string,
  wheels: []

}

const defaultPost: ModelPost[] = [];
const defaultFitmentPost: Fitment[] = [];

export function Fitment() {
  const apiKey: string          = '13fc47255b1b4682e892e55fe9219140';
  const modelEndpoint: string   = 'HTTPS://api.wheel-size.com/v1/models/';
  const fitmentEndpoint: string = 'HTTPS://api.wheel-size.com/v1/search/by_model/';
  const make: string            = 'Porsche';
  const [modelPosts, setModelPosts]: [ModelPost[], (posts: ModelPost[]) => void] = React.useState( defaultPost );
  const [fitment, setFitment]: [Fitment[], (posts: Fitment[]) => void] = React.useState( defaultFitmentPost );
  const [loading, setLoading]: [ boolean, (loading: boolean) => void ] = React.useState<boolean>(true);
  const [error, setError]: [string, (error: string) => void ] = React.useState('');
  const [modelYear, setModelYear]: [string, (error: string) => void ] = React.useState('');
  const [trim, setTrim]: [string, (error: string) => void ] = React.useState('');
    
     
 const handleYearDropDown = (e) => {
 
   axios
      .get<ModelPost[]>(modelEndpoint, {
        params: {
          make: make,
          year: e.target.value,
          user_key: apiKey
        },
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 5000,
      })
      .then((response) => {
        setModelPosts(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
   
   setModelYear(e.target.value);

 }

 const handleModelDropDown = (e) => {
    axios
      .get<Fitment[]>(fitmentEndpoint, {
        params: {
          make: make,
          year: modelYear,
          model: e.target.value,
          user_key: apiKey
        },
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 5000,
      })
      .then((response) => {
        setFitment(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
     
 }

 const handleTrimDropDown = (e) => {     
  setTrim(e.target.value);
 }

  const getDropList = () => {
    const year = new Date().getFullYear();
    return (
      Array.from( new Array(60), (v, i) =>
       <option key={i} value={year-i}>{year-i}</option>
      )  
    )
  }

  const getModels = () => {
    return(modelPosts.map((x,y) => <option key={x.slug}>{x.name}</option>));
  }

 const getTrim = () => {
    return(fitment.map((x,y) => <option key={x.slug}>{x.trim}</option>));
  }

  const getSelectedFitment = () => {
    return(fitment.find(({ trim }) => trim === trim ));
  }

  return (
    <div>
      <p>Use this App to Quickly identify Wheel and Tire Fitment for your Porsche</p>
      <div>
          <span>
              <select onChange={(e) => handleYearDropDown(e)}>
                <option key="--">-Year-</option>                  
                  {getDropList()}
              </select>
          </span>
          <span>
             <select onChange={(e) => handleModelDropDown(e)}>
              <option key="--">-Model-</option>
                {getModels()}
             </select>
          </span>
          <span>
            <select onChange={(e) => handleTrimDropDown(e)}>
              <option key="--">-Trim-</option>
              {getTrim()}
            </select>
          </span>
      </div>
      <div>
      {trim &&
       <FitmentTable trim={trim} fitment={getSelectedFitment()} />
      }
      </div>
    </div>
  );
}
