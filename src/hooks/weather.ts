import { useEffect, useState } from 'react';
import axios from 'axios';
import Geolocation from '@react-native-community/geolocation';

interface WeatherData {
  temperature: number;
  description: string;
  city: string;
}

interface WeatherResponse {
  main: {
    temp: number;
  };
  weather: {
    description: string;
  }[];
  name: string;
}

const API_KEY = 'c8f7a4970d3909f1514086306550ecc9';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const useWeather = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async (lat: number, lon: number) => {
      try {
        const response = await axios.get<WeatherResponse>(BASE_URL, {
          params: {
            lat,
            lon,
            appid: API_KEY,
            units: 'metric',
          },
        });
        const data = response.data;
        setWeather({
          temperature: data.main.temp,
          description: data.weather[0].description,
          city: data.name,
        });
        setLoading(false);
      } catch (fetchError) {
        const error = fetchError as Error;
        setError(error.message);
        setLoading(false);
      }
    };

    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeather(latitude, longitude);
      },
      (geoError) => {
        setError(geoError.message);
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  }, []);

  return { weather, loading, error };
};
