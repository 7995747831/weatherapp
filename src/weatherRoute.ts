import express, { Request, Response } from 'express';
import axios from 'axios';
import Weather from './weatherModels';
import weatherResponse from './weatherResponse.json'
 
const router = express.Router();
 
router.post('/SaveWeatherMapping', async (req: Request, res: Response): Promise<any> => {
  try {
    const cities: { city: string; country: string }[] = req.body;
    const results = [];
 
    for (const { city, country } of cities) {
      const geoResponse = await axios.get<{ latitude: number; longitude: number }[]>(`https://api.api-ninjas.com/v1/geocoding?city=${city}`, {
        headers: { 'X-Api-Key': 'nUCe57ZDk2m4r82RytNacw==fPaqIAZ44kkZun3n' },
      });
 
      if (!geoResponse.data || !geoResponse.data.length) {
        return res.status(400).json({ error: `Coordinates not found for ${city}` });
      }
 
      const { latitude, longitude } = geoResponse.data[0];
    //   const weatherResponse = await axios.get('https://weather-api167.p.rapidapi.com/api/weather/current', {
    //     params: { q: `${latitude},${longitude}` },
    //     headers: { 'x-rapidapi-key': 'c544651a36msh145c0def5927f84p14bc91jsn5e392573dbdf',
    //       'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com',
    //       useQueryString: true},
    //   });
 
      const weather = weatherResponse.summery

      const savedData = await Weather.create({ city, country, weather, latitude, longitude });
      results.push(savedData.dataValues);
    }
 
    res.status(201).json({ message: 'Weather data saved successfully', data: results });
  } catch (error: any) {
    res.status(500).json({ error: error.response?.data || error.message });
  }
});
 
router.get('/weatherDashboard', async (req: Request, res: Response): Promise<any> => {
  try {
    const { city } = req.query;
    const queryOptions: any = { order: [['createdAt', 'DESC']] };
    if (city) queryOptions.where = { city };
 
    const weatherData = await Weather.findAll(queryOptions);
    res.status(200).json(weatherData);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});
 
export default router;
 