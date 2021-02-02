import React, {useState, useEffect } from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';

import { fetchCountries } from '../../api';

import styles from './CountryPicker.module.css';

//CountryPicker (was replaced by Countries)
// Line 33:16. Error fix HERES
const Countries = ({ handleCountryChange }) => {
    const [countries, setCountries] = useState([]);

//fetchedCountries, setFetchedCountries (replaced by countries, setCountries)



    useEffect(() => {
        const fetchAPI = async () => {
            setCountries (await fetchCountries());
        };
        //setFetchedCountries replaced by setCountries

        fetchAPI();
    }, []);
//setFetchedCountries replaced by BLANK 
    
    return (
        <FormControl className={styles.formControl}>
            <NativeSelect defaultValue="" onChange={(e) => handleCountryChange(e.target.value)}>
                <option value="">United States</option>
    {countries.map((country, i) => <option key={i} value={country}>{country}</option> )}
            </NativeSelect>
        </FormControl>
    );
};
// fetchedCountries replaced by countries

export default Countries;

//CountryPicker replaced by Countries