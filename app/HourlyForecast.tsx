// 5. HourlyForecast.tsx
export function HourlyForecast({ data }: { data: any[] }) {
  if (!data || data.length === 0) return null;

  const nextHours = data.slice(0, 6); // Next 6 intervals (18 hours)

  return (
    <div className="bg-white/20 dark:bg-zinc-800/50 shadow-xl rounded-2xl p-4 md:p-6 backdrop-blur-md">
      <h2 className="text-[25px] md:text-3xl font-bold mb-4 text-yellow-300">Hourly Forecast</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4 overflow-x-auto scrollbar-hide">
        {nextHours.map((item, i) => {
          const iconUrl = `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`;
          return (
            <div key={i} className="bg-white/30 dark:bg-zinc-700 rounded-xl p-4 text-center shadow-md">
              <p className="text-sm font-semibold">
                {new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
              <img src={iconUrl} alt="icon" className="h-8 w-8 mx-auto" />
              <p className="text-base font-bold">{item.main.temp.toFixed(1)}°C</p>
              <p className="text-xs text-white/80">{item.weather[0].main}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}