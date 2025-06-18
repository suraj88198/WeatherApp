// 4. Forecast.tsx
export function Forecast({ data }: { data: any[] }) {
  if (!data || data.length === 0) return null;

  const dailyData = Array.from(
    new Map(
      data.map((item) => {
        const date = new Date(item.dt * 1000).toDateString();
        return [date, item];
      })
    ).values()
  ).slice(0, 5);

  return (
    <div className="bg-white/20 dark:bg-zinc-800/50 shadow-xl rounded-2xl p-4 md:p-6 backdrop-blur-md">
      <h2 className="text-[25px] md:text-3xl font-bold mb-4 text-yellow-300">5-Day Forecast</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {dailyData.map((item, i) => {
          const iconUrl = `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`;
          return (
            <div key={i} className="bg-white/30 dark:bg-zinc-700 rounded-xl p-4 text-center shadow-lg backdrop-blur-xl">
              <p className="font-semibold text-sm mb-1 text-white">
                {new Date(item.dt * 1000).toLocaleDateString(undefined, { weekday: 'short' })}
              </p>
              <img src={iconUrl} alt="icon" className="h-10 w-10 mx-auto my-1" />
              <p className="text-base font-bold">{item.main.temp.toFixed(1)}°C</p>
              <p className="text-xs text-white/80">{item.weather[0].main}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}