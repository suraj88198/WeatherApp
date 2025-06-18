// 3. CurrentWeather.tsx
export function CurrentWeather({ data }: { data: any }) {
  if (!data) return null;
  const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  return (
    <div className="bg-white/20 dark:bg-zinc-800/50 shadow-xl rounded-2xl p-6 text-left backdrop-blur-md flex items-center justify-between">
      <div>
      <h2 className="text-3xl font-bold mb-4 text-yellow-300">Current Weather</h2>
      <p className="text-xl font-medium mb-2">City: <span className="text-white">{data.name}</span></p>
      </div>
      <div className="flex items-center gap-6">
        <img src={iconUrl} alt="weather icon" className="h-24 w-24" />
        <div className="space-y-1 text-lg">
          <p>🌡️ Temp: {data.main.temp}°C</p>
          <p>☁️ {data.weather[0].description}</p>
          <p>💧 Humidity: {data.main.humidity}%</p>
          <p>🌬️ Wind: {data.wind.speed} m/s</p>
        </div>
      </div>
    </div>
  );
}