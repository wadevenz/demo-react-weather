import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL } from "../../api";

const Search = ({ onSearchChange }) => {
    const [search, setSearch] = useState(null);

    const loadOptions = async (inputValue) => {
        const geoApiOptions = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '6a49dc75eamsh240f980df18b2ccp1e5221jsn2b80c92b4488',
                'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
            }
        };

        try {
            const response = await fetch(
                `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
                geoApiOptions
            );
            const result = await response.json(); // Parse response as JSON
            // console.log(result);

            if (result.data) {
                return {
                    options: result.data.map((city) => ({
                        value: `${city.latitude}, ${city.longitude}`,
                        label: `${city.name}, ${city.countryCode}`,
                    })),
                };
            } else {
                console.error("No data found in the response");
                return {
                    options: [],
                };
            }
        } catch (error) {
            console.error(error);
            return {
                options: [],
            };
        }
    };

    const handleOnChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData);
    };

    return (
        <AsyncPaginate
            placeholder="Search for city"
            debounceTimeout={600}
            value={search}
            onChange={handleOnChange}
            loadOptions={loadOptions}
        />
    );
};

export default Search;