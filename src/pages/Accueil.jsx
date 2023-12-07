import { useEffect, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { switchDark } from '../reducers/settings';


export default function Index() {
    const [countries, setCountries] = useState([])
    const [copy, setCopy] = useState()
    const [input, setInput] = useState("");

    const dispatch = useDispatch();
    const darkmode = useSelector((state) => state.settings.dark);


    useEffect(() => {
        fetch(`https://restcountries.com/v3.1/all`)
            .then(response => response.json())
            .then(data => {
                setCountries(data);
            })
            .catch(() => {
                setCountries([]);
            })
    }, [])

    useMemo(() => {
        if (!countries) return setCopy([]);

        setCopy(countries.filter((country) => country.name.common.toLowerCase().includes(input.toLowerCase())));
    }, [countries, input]);

    return (
        <div className={darkmode ? "darkmode container" : "container"}>
            <div>
                <button onClick={() => dispatch(switchDark())}>Set {darkmode === true ? "lightmode" : "darkmode"} </button>
                <input type='text' value={input} onChange={(e) => setInput(e.target.value)} />
            </div>
            {
                copy && copy.map((item, index) => (
                    <div className='card' key={index}>
                        <img src={item.flags.png} />
                        <div>
                            <h2>Pays : {item.name.common}</h2>
                            <h2>Capital : {item.capital}</h2>
                            <h2>Continent : {item.continents[0]}</h2>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}