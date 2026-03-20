import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddressPicker = () => {
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [loading, setLoading] = useState(false);

    // Lấy danh sách tỉnh thành
    useEffect(() => {
        const fetchCities = async () => {
            try {
                setLoading(true);
                const response = await axios.get('https://api.example.com/cities'); // API lấy danh sách tỉnh thành
                setCities(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching cities: ", error);
                setLoading(false);
            }
        };
        fetchCities();
    }, []);

    // Lấy danh sách quận huyện khi người dùng chọn tỉnh thành
    useEffect(() => {
        const fetchDistricts = async () => {
            if (selectedCity) {
                try {
                    const response = await axios.get(`https://api.example.com/districts/${selectedCity}`);
                    setDistricts(response.data);
                } catch (error) {
                    console.error("Error fetching districts: ", error);
                }
            }
        };
        fetchDistricts();
    }, [selectedCity]);

    // Xử lý khi người dùng chọn tỉnh thành
    const handleCityChange = (e) => {
        setSelectedCity(e.target.value);
    };

    return (
        <div>
            <h1>Chọn Tỉnh Thành và Quận Huyện</h1>
            {loading ? (
                <p>Đang tải dữ liệu...</p>
            ) : (
                <>
                    <div>
                        <label htmlFor="city">Chọn Tỉnh Thành:</label>
                        <select id="city" value={selectedCity} onChange={handleCityChange}>
                            <option value="">-- Chọn Tỉnh Thành --</option>
                            {cities.map((city) => (
                                <option key={city.id} value={city.id}>
                                    {city.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {selectedCity && (
                        <div>
                            <label htmlFor="district">Chọn Quận Huyện:</label>
                            <select id="district">
                                <option value="">-- Chọn Quận Huyện --</option>
                                {districts.map((district) => (
                                    <option key={district.id} value={district.id}>
                                        {district.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default AddressPicker;
