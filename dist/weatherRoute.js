"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const weatherModels_1 = __importDefault(require("./weatherModels"));
const weatherResponse_json_1 = __importDefault(require("./weatherResponse.json"));
const router = express_1.default.Router();
router.post('/SaveWeatherMapping', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const cities = req.body;
        const results = [];
        for (const { city, country } of cities) {
            const geoResponse = yield axios_1.default.get(`https://api.api-ninjas.com/v1/geocoding?city=${city}`, {
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
            const weather = weatherResponse_json_1.default.summery;
            const savedData = yield weatherModels_1.default.create({ city, country, weather, latitude, longitude });
            results.push(savedData.dataValues);
        }
        res.status(201).json({ message: 'Weather data saved successfully', data: results });
    }
    catch (error) {
        res.status(500).json({ error: ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message });
    }
}));
router.get('/weatherDashboard', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { city } = req.query;
        const queryOptions = { order: [['createdAt', 'DESC']] };
        if (city)
            queryOptions.where = { city };
        const weatherData = yield weatherModels_1.default.findAll(queryOptions);
        res.status(200).json(weatherData);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
exports.default = router;
//# sourceMappingURL=weatherRoute.js.map