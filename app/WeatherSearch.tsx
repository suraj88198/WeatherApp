// 2. WeatherSearch.tsx
'use client';
import { useState } from 'react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';

export function WeatherSearch({ onSearch }: { onSearch: (val: string) => void }) {
  const [city, setCity] = useState("");

  return (
    <div className="flex flex-wrap gap-3 justify-center items-center mt-[20px] mb-[20px]">
      <Input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="w-64 dark:bg-zinc-800"
      />
      <Button onClick={() => onSearch(city)} className="bg-yellow-400 hover:bg-yellow-300 text-black">Search</Button>
    </div>
  );
}