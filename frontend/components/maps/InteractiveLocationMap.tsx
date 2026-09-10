'use client';

import React, { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

interface InteractiveMapProps {
  latitude: number | null;
  longitude: number | null;
  locationName: string;
  onCoordinatesChange?: (lat: number, lng: number) => void;
}

export default function InteractiveLocationMap({
  latitude,
  longitude,
  locationName,
  onCoordinatesChange
}: InteractiveMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const circle5kmRef = useRef<L.Circle | null>(null);
  const circle10kmRef = useRef<L.Circle | null>(null);

  // Setup / Initialize Leaflet Map once
  useEffect(() => {
    if (!mapContainerRef.current) return;

    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    });

    const initialLat = latitude ?? 20.5937;
    const initialLng = longitude ?? 78.9629;
    const initialZoom = (latitude && longitude) ? 12 : 5;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [initialLat, initialLng],
        zoom: initialZoom,
        zoomControl: true,
        scrollWheelZoom: false
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18,
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    return () => {
      // Keep map instance alive across rerenders
    };
  }, []);

  // Synchronize Map, Marker, and 5km/10km Radius whenever coordinates change
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clean up old circles & marker first
    if (markerRef.current) {
      markerRef.current.remove();
      markerRef.current = null;
    }
    if (circle5kmRef.current) {
      circle5kmRef.current.remove();
      circle5kmRef.current = null;
    }
    if (circle10kmRef.current) {
      circle10kmRef.current.remove();
      circle10kmRef.current = null;
    }

    if (latitude === null || longitude === null) {
      // No coordinates - show default country overview
      map.setView([20.5937, 78.9629], 5);
      return;
    }

    // Move map to the exact selected location
    map.setView([latitude, longitude], 12, { animate: true });

    // Create Custom Pin
    const customIcon = L.divIcon({
      className: 'custom-leaflet-marker',
      html: `
        <div style="
          background-color: #065f46;
          color: #ffffff;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 3px solid #ffffff;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.35);
        ">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    });

    const marker = L.marker([latitude, longitude], { icon: customIcon, draggable: true }).addTo(map);
    marker.bindPopup(`<b>${locationName}</b><br/>${latitude.toFixed(4)}° N, ${longitude.toFixed(4)}° E`).openPopup();

    marker.on('dragend', () => {
      const pos = marker.getLatLng();
      if (onCoordinatesChange) {
        onCoordinatesChange(Number(pos.lat.toFixed(6)), Number(pos.lng.toFixed(6)));
      }
    });

    // 5 KM Radius Circle (5000 meters)
    const circle5 = L.circle([latitude, longitude], {
      color: '#059669',
      fillColor: '#10b981',
      fillOpacity: 0.14,
      radius: 5000,
      weight: 1.5,
      dashArray: '4, 6'
    }).addTo(map);

    // 10 KM Radius Circle (10000 meters)
    const circle10 = L.circle([latitude, longitude], {
      color: '#0284c7',
      fillColor: '#38bdf8',
      fillOpacity: 0.07,
      radius: 10000,
      weight: 1.5,
      dashArray: '6, 8'
    }).addTo(map);

    markerRef.current = marker;
    circle5kmRef.current = circle5;
    circle10kmRef.current = circle10;

  }, [latitude, longitude, locationName, onCoordinatesChange]);

  if (latitude === null || longitude === null) {
    return (
      <div className="space-y-3">
        <div className="relative w-full h-64 sm:h-72 rounded-xl overflow-hidden border border-dashed border-slate-300 bg-slate-100 flex flex-col items-center justify-center text-center p-4">
          <p className="text-xs font-bold text-slate-700">Map coordinates are unavailable for this selection.</p>
          <p className="text-[11px] text-slate-500 mt-1">Please select a village or click "Use My Current Location".</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="relative w-full h-64 sm:h-72 rounded-xl overflow-hidden border border-slate-200 shadow-inner">
        <div ref={mapContainerRef} className="w-full h-full z-0" />
      </div>

      {/* Legend & 5km / 10km Visual Scope Description */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs">
        <div className="flex items-center space-x-4">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full border border-emerald-600 bg-emerald-100"></span>
            <span className="font-semibold text-slate-700">5 KM Radius</span>
            <span className="text-[10px] text-slate-500">(5,000m Catchment)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full border border-sky-600 bg-sky-100"></span>
            <span className="font-semibold text-slate-700">10 KM Radius</span>
            <span className="text-[10px] text-slate-500">(10,000m Regional Reach)</span>
          </div>
        </div>

        <span className="text-[11px] text-emerald-800 font-medium italic">
          * Drag pin to fine-tune exact enterprise coordinates
        </span>
      </div>
    </div>
  );
}
