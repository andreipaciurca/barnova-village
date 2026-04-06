'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cloud, CloudRain, CloudSun, Sun, Wind, Thermometer } from 'lucide-react';

interface WeatherData {
  temp: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  icon: any;
}

export function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // În mediul real am folosi un API precum OpenWeatherMap sau Meteo.ro
    // Pentru acest demo, simulăm datele meteo pentru Bârnova, Iași
    const fetchWeather = async () => {
      try {
        // Simulăm un mic delay de rețea
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockData: WeatherData = {
          temp: 18,
          condition: 'Parțial Însorit',
          humidity: 65,
          windSpeed: 12,
          icon: CloudSun
        };
        
        setWeather(mockData);
      } catch (error) {
        console.error('Error fetching weather:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-32 flex items-center justify-center animate-pulse bg-muted/20 rounded-3xl border border-border/50">
        <div className="flex gap-2 items-center text-muted-foreground font-bold">
          <CloudSun className="w-5 h-5" />
          Se încarcă vremea...
        </div>
      </div>
    );
  }

  if (!weather) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 rounded-[2.5rem] flex items-center justify-between group overflow-hidden relative backdrop-blur-2xl"
    >
      <div className="absolute top-0 right-0 p-4 opacity-[0.05] group-hover:opacity-[0.1] transition-opacity">
        <weather.icon className="w-20 h-20" />
      </div>

      <div className="flex items-center gap-6 relative z-10">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500 shadow-lg shadow-amber-500/5">
          <weather.icon className="w-10 h-10" />
        </div>
        
        <div>
          <div className="text-4xl font-black tracking-tighter flex items-baseline gap-1">
            {weather.temp}
            <span className="text-xl font-bold opacity-60">°C</span>
          </div>
          <div className="text-xs font-black uppercase tracking-widest text-muted-foreground">
            Bârnova, Iași • {weather.condition}
          </div>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-8 relative z-10">
        <div className="flex flex-col items-center">
          <Wind className="w-5 h-5 text-blue-500 mb-1" />
          <span className="text-sm font-black">{weather.windSpeed} km/h</span>
          <span className="text-[8px] font-bold text-muted-foreground uppercase">Vânt</span>
        </div>
        <div className="flex flex-col items-center">
          <Thermometer className="w-5 h-5 text-emerald-500 mb-1" />
          <span className="text-sm font-black">{weather.humidity}%</span>
          <span className="text-[8px] font-bold text-muted-foreground uppercase">Umiditate</span>
        </div>
      </div>
    </motion.div>
  );
}
