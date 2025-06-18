// 1. Main entry: app/page.tsx
'use client';
import { ThemeProvider, useTheme } from "next-themes";
import { useState, useEffect } from 'react';
import { WeatherSearch } from "./WeatherSearch";
import { CurrentWeather } from "./CurrentWeather";
import { Forecast } from "./Forecast";
import { HourlyForecast } from "./HourlyForecast";
import { Button } from "../components/ui/button";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <Button
      variant="outline"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="absolute top-4 right-4"
    >
      {theme === 'dark' ? '☀' : '🌙'}
    </Button>
  );
}

function getWeatherBackground(condition: string) {
  const desc = condition.toLowerCase();
  if (desc.includes("rain")) return "from-blue-700 to-blue-900";
  if (desc.includes("cloud")) return "from-gray-500 to-gray-800";
  if (desc.includes("clear")) return "from-yellow-400 to-orange-600";
  if (desc.includes("snow")) return "from-blue-100 to-white";
  if (desc.includes("storm")) return "from-indigo-900 to-gray-900";
  return "from-indigo-500 to-purple-700"; // default
}

export default function Home() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [city, setCity] = useState("Delhi");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async (city: string) => {
    try {
      setLoading(true);
      setError("");
      const key = "3439d9bd8c8872e28d1c5d947798d134";
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`
      );
      if (!res.ok) throw new Error("City not found");
      const data = await res.json();
      setWeatherData(data);

      const resForecast = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&units=metric`
      );
      const forecast = await resForecast.json();
      setForecastData(forecast.list);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, []);

  const handleSearch = (value: string) => {
    setCity(value);
    fetchWeather(value);
  };

  const backgroundGradient = weatherData
    ? getWeatherBackground(weatherData.weather[0].main)
    : "from-indigo-500 to-purple-700";

  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      <main className={`relative min-h-screen bg-gradient-to-br ${backgroundGradient} dark:from-gray-900 dark:to-black text-white p-4 md:p-6 transition-all duration-500`}>
        <ThemeToggle />
        <div className="max-w-5xl mx-auto text-center space-y-7">
          <h1 className="text-[25px] sm:text-[35px] md:text-[50px] font-extrabold tracking-tight text-yellow-300">Weather <span className="text-white">ForeCasts</span></h1>
          <WeatherSearch onSearch={handleSearch} />
          {loading && <p className="text-lg animate-pulse">Loading...</p>}
          {error && <p className="text-red-300 text-lg font-semibold">{error}</p>}
          {!loading && !error && (
            <div className="space-y-4">
              <CurrentWeather data={weatherData} />
              <HourlyForecast data={forecastData} />
              <Forecast data={forecastData} />

              <div className="powered-text mt-[20px]">Developed By : <span className="font-semibold text-yellow-300">Suraj Kushwah</span></div>
            </div>
          )}
        </div>
      </main>
    </ThemeProvider>
  );
}