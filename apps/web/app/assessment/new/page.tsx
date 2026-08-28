'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { 
  MapPin, 
  IndianRupee, 
  Briefcase, 
  Wrench, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  Info,
  Sparkles,
  Navigation,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { LocationService, VillageEntity, SelectedLocationState } from '../../../services/locationService';

// Dynamically import Leaflet Map to avoid SSR window errors
const InteractiveLocationMap = dynamic(
  () => import('../../../components/maps/InteractiveLocationMap'),
  { 
    ssr: false, 
    loading: () => (
      <div className="h-64 sm:h-72 w-full bg-slate-100 animate-pulse rounded-xl flex items-center justify-center text-xs text-slate-400 font-medium">
        Loading Interactive Map...
      </div>
    ) 
  }
);

const BUSINESS_CATEGORIES = [
  { id: 'Dairy', label: 'Dairy & Livestock', subs: ['Cow / Buffalo Chilling', 'Paneer & Ghee Unit', 'Cattle Feed Supply'] },
  { id: 'Poultry', label: 'Poultry Farming', subs: ['Broiler Unit (1000 birds)', 'Layer Egg Farming', 'Desi Poultry Hatchery'] },
  { id: 'Fisheries', label: 'Fisheries & Aquaculture', subs: ['Freshwater Fish Pond', 'Biofloc Fish Farming', 'Fish Seed Hatchery'] },
  { id: 'Food Processing', label: 'Food Processing & Flour Mill', subs: ['Atta Chakki & Oil Expeller', 'Spice Grinding & Packaging', 'Pickle & Papad Making'] },
  { id: 'Retail', label: 'Retail & Kirana Store', subs: ['General Merchant', 'Pesticide & Fertilizer Retail', 'Stationery & Books'] },
  { id: 'Tailoring', label: 'Tailoring & Boutique', subs: ['Garment Stitching Center', 'Embroidery & Uniform Making', 'Boutique Store'] },
  { id: 'Handicrafts', label: 'Handicrafts & Artisans', subs: ['Clay Pottery', 'Wood Carving', 'Handloom Weaving'] },
  { id: 'Repair Services', label: 'Repair & Two-Wheeler Workshop', subs: ['Two-Wheeler Service Center', 'Solar / Electric Appliance Repair', 'Tractor Mechanic'] },
  { id: 'Digital Services', label: 'Digital Services & CSC', subs: ['Common Service Center (CSC)', 'Photocopy & Printing', 'Banking Correspondent Kiosk'] },
  { id: 'Other', label: 'Other Rural Enterprise', subs: ['General Micro-Enterprise'] }
];

export default function AssessmentWizard() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. SINGLE SOURCE OF TRUTH FOR LOCATION STATE
  const [selectedLocation, setSelectedLocation] = useState<SelectedLocationState>({
    state: 'Uttar Pradesh',
    district: 'Meerut',
    block: 'Hastinapur',
    village: 'Ganeshpur',
    latitude: 29.1712,
    longitude: 77.9942,
    location_source: 'manual'
  });

  // Dynamic dropdown option lists
  const [statesList, setStatesList] = useState<string[]>([]);
  const [districtsList, setDistrictsList] = useState<string[]>([]);
  const [blocksList, setBlocksList] = useState<string[]>([]);
  const [villagesList, setVillagesList] = useState<VillageEntity[]>([]);

  // Loading states
  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [loadingBlocks, setLoadingBlocks] = useState(false);
  const [loadingVillages, setLoadingVillages] = useState(false);
  const [isReverseGeocoding, setIsReverseGeocoding] = useState(false);

  // GPS State
  const [gpsStatus, setGpsStatus] = useState<'idle' | 'locating' | 'active' | 'denied'>('idle');
  const [gpsMessage, setGpsMessage] = useState<string>('');

  // Step 2-5 Business Fields
  const [financialData, setFinancialData] = useState({
    margin_capital: 100000,
    existing_investment: 0,
    existing_loans: 0,
    business_category: 'Dairy',
    business_subcategory: 'Cow / Buffalo Chilling',
    experience_years: 2,
    land_available: true,
    water_available: true,
    electricity_available: true,
    transport_available: true,
    storage_available: false,
    primary_customers: 'Local households, Mandi collection center, Sweet shops',
    sales_channels: 'Direct collection, Daily morning delivery'
  });

  // Initial Load: States & Seed first selection
  useEffect(() => {
    LocationService.getStates().then(states => {
      setStatesList(states);
      if (states.includes(selectedLocation.state)) {
        loadHierarchyForState(selectedLocation.state, selectedLocation.district, selectedLocation.block, selectedLocation.village);
      }
    });
  }, []);

  const loadHierarchyForState = async (stateName: string, targetDist?: string, targetBlk?: string, targetVil?: string) => {
    setLoadingDistricts(true);
    const districts = await LocationService.getDistricts(stateName);
    setDistrictsList(districts);
    setLoadingDistricts(false);

    const distToUse = (targetDist && districts.some(d => d.toLowerCase() === targetDist.toLowerCase())) 
      ? districts.find(d => d.toLowerCase() === targetDist.toLowerCase())! 
      : districts[0] || '';

    if (distToUse) {
      setLoadingBlocks(true);
      const blocks = await LocationService.getBlocks(stateName, distToUse);
      setBlocksList(blocks);
      setLoadingBlocks(false);

      const blkToUse = (targetBlk && blocks.some(b => b.toLowerCase() === targetBlk.toLowerCase())) 
        ? blocks.find(b => b.toLowerCase() === targetBlk.toLowerCase())! 
        : blocks[0] || '';

      if (blkToUse) {
        setLoadingVillages(true);
        const villages = await LocationService.getVillages(stateName, distToUse, blkToUse);
        setVillagesList(villages);
        setLoadingVillages(false);
      }
    }
  };

  // ---------------- CASCADE EVENT HANDLERS ----------------
  const handleStateChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newState = e.target.value;
    setGpsStatus('idle');
    setGpsMessage('');

    setSelectedLocation({
      state: newState,
      district: '',
      block: '',
      village: '',
      latitude: null,
      longitude: null,
      location_source: 'manual'
    });

    setBlocksList([]);
    setVillagesList([]);
    setLoadingDistricts(true);
    const districts = await LocationService.getDistricts(newState);
    setDistrictsList(districts);
    setLoadingDistricts(false);
  };

  const handleDistrictChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newDistrict = e.target.value;
    setGpsStatus('idle');
    setGpsMessage('');

    setSelectedLocation(prev => ({
      ...prev,
      district: newDistrict,
      block: '',
      village: '',
      latitude: null,
      longitude: null,
      location_source: 'manual'
    }));

    setVillagesList([]);
    setLoadingBlocks(true);
    const blocks = await LocationService.getBlocks(selectedLocation.state, newDistrict);
    setBlocksList(blocks);
    setLoadingBlocks(false);
  };

  const handleBlockChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newBlock = e.target.value;
    setGpsStatus('idle');
    setGpsMessage('');

    setSelectedLocation(prev => ({
      ...prev,
      block: newBlock,
      village: '',
      latitude: null,
      longitude: null,
      location_source: 'manual'
    }));

    setLoadingVillages(true);
    const villages = await LocationService.getVillages(selectedLocation.state, selectedLocation.district, newBlock);
    setVillagesList(villages);
    setLoadingVillages(false);
  };

  const handleVillageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const villageName = e.target.value;
    const matched = villagesList.find(v => v.name === villageName);
    
    if (matched) {
      setSelectedLocation(prev => ({
        ...prev,
        village: matched.name,
        latitude: matched.latitude,
        longitude: matched.longitude,
        location_source: 'manual'
      }));
    } else {
      setSelectedLocation(prev => ({
        ...prev,
        village: villageName,
        latitude: null,
        longitude: null,
        location_source: 'manual'
      }));
    }
  };

  // ---------------- REAL REVERSE-GEOCODING PIPELINE ----------------
  const applyCoordinatesAndReverseGeocode = async (lat: number, lng: number, source: 'gps' | 'map') => {
    setIsReverseGeocoding(true);
    setGpsStatus('locating');

    try {
      const geoResult = await LocationService.reverseGeocode(lat, lng, source);

      const detectedState = geoResult.state || '';
      const detectedDistrict = geoResult.district || '';
      const detectedBlock = geoResult.block || '';
      const detectedVillage = geoResult.village || geoResult.city || '';

      // Match or add state in options
      let stateToSet = statesList.find(s => s.toLowerCase() === detectedState.toLowerCase()) || detectedState;
      if (stateToSet && !statesList.includes(stateToSet)) {
        setStatesList(prev => [...prev, stateToSet]);
      }

      // Load matching districts
      const districts = await LocationService.getDistricts(stateToSet);
      let distToSet = districts.find(d => d.toLowerCase() === detectedDistrict.toLowerCase()) || detectedDistrict;
      if (distToSet && !districts.includes(distToSet)) {
        setDistrictsList([...districts, distToSet]);
      } else {
        setDistrictsList(districts);
      }

      // Load matching blocks
      const blocks = await LocationService.getBlocks(stateToSet, distToSet);
      let blkToSet = blocks.find(b => b.toLowerCase() === detectedBlock.toLowerCase()) || detectedBlock;
      if (blkToSet && !blocks.includes(blkToSet)) {
        setBlocksList([...blocks, blkToSet]);
      } else {
        setBlocksList(blocks);
      }

      // Load matching villages
      const villages = await LocationService.getVillages(stateToSet, distToSet, blkToSet);
      let vilToSet = villages.find(v => v.name.toLowerCase() === detectedVillage.toLowerCase())?.name || detectedVillage;
      if (vilToSet && !villages.some(v => v.name === vilToSet)) {
        const customVil: VillageEntity = { id: `v_dyn_${Date.now()}`, name: vilToSet, latitude: lat, longitude: lng };
        setVillagesList([...villages, customVil]);
      } else {
        setVillagesList(villages);
      }

      // Set canonical synchronized state
      setSelectedLocation({
        state: stateToSet,
        district: distToSet,
        block: blkToSet,
        village: vilToSet,
        latitude: lat,
        longitude: lng,
        location_source: source
      });

      if (source === 'gps') {
        setGpsStatus('active');
        if (stateToSet && distToSet) {
          setGpsMessage(`✓ Current location detected (${detectedVillage ? `${detectedVillage}, ` : ''}${distToSet}, ${stateToSet}). Location details were automatically populated.`);
        } else {
          setGpsMessage('GPS coordinates detected. Some location details could not be determined automatically. Please confirm manually.');
        }
      }
    } catch (err) {
      console.error('Reverse geocode failed', err);
      setSelectedLocation(prev => ({
        ...prev,
        latitude: lat,
        longitude: lng,
        location_source: source
      }));
      setGpsStatus(source === 'gps' ? 'active' : 'idle');
      setGpsMessage('GPS coordinates detected, but location details could not be determined automatically. Please select manually.');
    } finally {
      setIsReverseGeocoding(false);
    }
  };

  // Real GPS Geolocation Trigger
  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      setGpsStatus('denied');
      setGpsMessage('Current location is unavailable on this device.');
      return;
    }

    setGpsStatus('locating');
    setGpsMessage('');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = Number(position.coords.latitude.toFixed(6));
        const lng = Number(position.coords.longitude.toFixed(6));
        applyCoordinatesAndReverseGeocode(lat, lng, 'gps');
      },
      (error) => {
        setGpsStatus('denied');
        setGpsMessage('Location access was denied. You can select your State, District, Block and Village manually.');
      },
      { timeout: 12000, enableHighAccuracy: true }
    );
  };

  // Map pin dragged handler with reverse geocoding
  const handleMapCoordinatesChange = (lat: number, lng: number) => {
    applyCoordinatesAndReverseGeocode(lat, lng, 'map');
  };

  // Step 1 Validation
  const isStep1Valid = Boolean(
    selectedLocation.state &&
    selectedLocation.district &&
    selectedLocation.block &&
    selectedLocation.village &&
    selectedLocation.latitude !== null &&
    selectedLocation.longitude !== null
  );

  const nextStep = () => {
    if (step === 1 && !isStep1Valid) return;
    setStep(prev => Math.min(prev + 1, 5));
  };
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch('http://localhost:8000/api/v1/assessments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          location: {
            state: selectedLocation.state,
            district: selectedLocation.district,
            block: selectedLocation.block,
            village: selectedLocation.village,
            latitude: selectedLocation.latitude,
            longitude: selectedLocation.longitude
          },
          margin_capital: Number(financialData.margin_capital),
          existing_investment: Number(financialData.existing_investment),
          existing_loans: Number(financialData.existing_loans),
          business_category: financialData.business_category,
          business_subcategory: financialData.business_subcategory,
          experience_years: Number(financialData.experience_years),
          land_available: financialData.land_available,
          water_available: financialData.water_available,
          electricity_available: financialData.electricity_available,
          transport_available: financialData.transport_available,
          storage_available: financialData.storage_available,
          primary_customers: financialData.primary_customers,
          sales_channels: financialData.sales_channels
        })
      });

      if (!res.ok) throw new Error('Assessment creation failed');
      const data = await res.json();
      router.push(`/assessment/${data.id}`);
    } catch (err) {
      console.error(err);
      router.push(`/assessment/demo-dairy-assessment-101`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const estimatedProjectCost = financialData.margin_capital ? (financialData.margin_capital / 0.10) : 0;
  const estimatedLoan = estimatedProjectCost * 0.90;

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Progress Bar & Header */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                STEP {step} OF 5
              </span>
              <h2 className="text-xl font-extrabold text-slate-900">
                {step === 1 && "Geographic Location"}
                {step === 2 && "Available Margin Capital"}
                {step === 3 && "Business Category & Sector"}
                {step === 4 && "Experience & Infrastructure"}
                {step === 5 && "Review & Submit"}
              </h2>
            </div>
            <span className="text-xs font-bold px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full border border-emerald-200">
              {Math.round((step / 5) * 100)}% Completed
            </span>
          </div>

          <div className="w-full bg-slate-100 rounded-full h-2">
            <div 
              className="bg-emerald-700 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 5) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Wizard Form Body */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          
          {/* STEP 1: REAL GPS & REVERSE GEOCODING LOCATION FORM */}
          {step === 1 && (
            <div className="space-y-6">
              
              {/* Information Message */}
              <div className="flex items-start gap-3 p-4 bg-emerald-50/70 border border-emerald-200/70 rounded-xl text-xs text-emerald-950 leading-relaxed">
                <Info className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <p>
                  Select your business location to enable hyper-local market analysis. GramBiz AI can use available geographic and market data to assess opportunities, competition and market reach within 5 km and 10 km.
                </p>
              </div>

              {/* Location Hierarchy Dropdowns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* 1. State */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                    State <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={selectedLocation.state}
                    onChange={handleStateChange}
                    disabled={isReverseGeocoding}
                    className="w-full px-3.5 py-2.5 text-xs font-semibold text-slate-800 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option value="" disabled>Search state...</option>
                    {statesList.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                {/* 2. District */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5 flex items-center justify-between">
                    <span>District <span className="text-rose-500">*</span></span>
                    {loadingDistricts && <span className="text-[10px] text-slate-400 font-normal">Loading districts...</span>}
                  </label>
                  <select
                    value={selectedLocation.district}
                    onChange={handleDistrictChange}
                    disabled={!selectedLocation.state || loadingDistricts || isReverseGeocoding}
                    className="w-full px-3.5 py-2.5 text-xs font-semibold text-slate-800 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none disabled:bg-slate-50 disabled:text-slate-400"
                  >
                    <option value="" disabled>Search district...</option>
                    {districtsList.map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                {/* 3. Block / Tehsil */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5 flex items-center justify-between">
                    <span>Block / Tehsil <span className="text-rose-500">*</span></span>
                    {loadingBlocks && <span className="text-[10px] text-slate-400 font-normal">Loading blocks...</span>}
                  </label>
                  <select
                    value={selectedLocation.block}
                    onChange={handleBlockChange}
                    disabled={!selectedLocation.district || loadingBlocks || isReverseGeocoding}
                    className="w-full px-3.5 py-2.5 text-xs font-semibold text-slate-800 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none disabled:bg-slate-50 disabled:text-slate-400"
                  >
                    <option value="" disabled>Search block / tehsil...</option>
                    {blocksList.map(b => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>

                {/* 4. Village / Town */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5 flex items-center justify-between">
                    <span>Village / Town <span className="text-rose-500">*</span></span>
                    {loadingVillages && <span className="text-[10px] text-slate-400 font-normal">Loading villages...</span>}
                  </label>
                  <select
                    value={selectedLocation.village}
                    onChange={handleVillageChange}
                    disabled={!selectedLocation.block || loadingVillages || isReverseGeocoding}
                    className="w-full px-3.5 py-2.5 text-xs font-semibold text-slate-800 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none disabled:bg-slate-50 disabled:text-slate-400"
                  >
                    <option value="" disabled>Search village / town...</option>
                    {villagesList.map(v => (
                      <option key={v.id || v.name} value={v.name}>{v.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Real GPS Geolocation Action & Status Bar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                <button
                  type="button"
                  onClick={handleUseCurrentLocation}
                  disabled={gpsStatus === 'locating' || isReverseGeocoding}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 rounded-lg shadow-sm transition disabled:opacity-50"
                >
                  {gpsStatus === 'locating' || isReverseGeocoding ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-700" />
                      <span>Detecting Location & Reverse Geocoding...</span>
                    </>
                  ) : (
                    <>
                      <Navigation className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Use My Current Location</span>
                    </>
                  )}
                </button>

                {/* GPS Status Indicator */}
                <div className="text-xs">
                  {gpsStatus === 'active' ? (
                    <div className="flex items-center gap-1.5 font-bold text-emerald-700">
                      <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping"></span>
                      <span>● GPS Location Detected</span>
                    </div>
                  ) : selectedLocation.latitude !== null && selectedLocation.longitude !== null ? (
                    <span className="text-slate-500 text-[11px]">
                      Coordinates: <span className="font-semibold text-slate-700">{selectedLocation.latitude.toFixed(4)}° N, {selectedLocation.longitude.toFixed(4)}° E</span>
                    </span>
                  ) : (
                    <span className="text-slate-400 text-[11px] italic">Coordinates pending location selection</span>
                  )}
                </div>
              </div>

              {/* GPS Alert / Notice */}
              {gpsMessage && (
                <div className={`flex items-center gap-2 p-3 text-xs rounded-lg border ${gpsStatus === 'active' ? 'bg-emerald-50 border-emerald-200 text-emerald-900 font-medium' : 'bg-amber-50 border-amber-200 text-amber-900'}`}>
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{gpsMessage}</span>
                </div>
              )}

              {/* Interactive OpenStreetMap Leaflet Component */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 uppercase">
                  Hyper-Local Geographic Scope (5 KM & 10 KM Buffer)
                </label>
                
                <InteractiveLocationMap
                  latitude={selectedLocation.latitude}
                  longitude={selectedLocation.longitude}
                  locationName={`${selectedLocation.village || 'Selected Location'}, ${selectedLocation.district || ''}, ${selectedLocation.state || ''}`}
                  onCoordinatesChange={handleMapCoordinatesChange}
                />
              </div>

              {/* Hyper-local future disclaimer notice */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-[11px] text-slate-600 leading-relaxed italic">
                ℹ️ After assessment, GramBiz AI will analyze available local data within 5 km and 10 km of your selected location.
              </div>

              {/* Location Confirmation Card */}
              {isStep1Valid && (
                <div className="p-4 bg-emerald-50/90 border border-emerald-200 rounded-xl space-y-2">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-900 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    <span>
                      {selectedLocation.location_source === 'gps' 
                        ? '✓ Location automatically detected' 
                        : '✓ Location confirmed'}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-slate-700 pt-1">
                    <div><span className="text-slate-500 text-[10px] block">State</span><span className="font-semibold">{selectedLocation.state}</span></div>
                    <div><span className="text-slate-500 text-[10px] block">District</span><span className="font-semibold">{selectedLocation.district}</span></div>
                    <div><span className="text-slate-500 text-[10px] block">Block</span><span className="font-semibold">{selectedLocation.block}</span></div>
                    <div><span className="text-slate-500 text-[10px] block">Village</span><span className="font-semibold">{selectedLocation.village}</span></div>
                  </div>
                  <div className="text-[11px] text-emerald-800 font-mono pt-1">
                    Coordinates: {selectedLocation.latitude?.toFixed(4)}° N, {selectedLocation.longitude?.toFixed(4)}° E (Source: {selectedLocation.location_source === 'gps' ? 'GPS + Reverse Geocoding' : selectedLocation.location_source.toUpperCase()})
                  </div>
                </div>
              )}

            </div>
          )}

          {/* STEP 2: CAPITAL */}
          {step === 2 && (
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Available Margin Capital (₹ INR) *
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 font-bold">₹</span>
                  <input
                    type="number"
                    value={financialData.margin_capital}
                    onChange={e => setFinancialData({ ...financialData, margin_capital: Number(e.target.value) })}
                    className="w-full pl-8 pr-4 py-3 text-lg font-bold border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    placeholder="100000"
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Example: Enter ₹1,00,000 for standard 10% entrepreneur contribution.
                </p>
              </div>

              {/* Instant deterministic preview */}
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2">
                <div className="flex justify-between text-xs text-emerald-900 font-medium">
                  <span>Calculated Total Project Outlay (100%):</span>
                  <span className="font-bold text-emerald-950">₹{estimatedProjectCost.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-xs text-emerald-900 font-medium">
                  <span>Eligible Government Scheme Financing (90%):</span>
                  <span className="font-bold text-emerald-950">₹{estimatedLoan.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Existing Investment (₹)</label>
                  <input
                    type="number"
                    value={financialData.existing_investment}
                    onChange={e => setFinancialData({ ...financialData, existing_investment: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Existing Outstanding Loans (₹)</label>
                  <input
                    type="number"
                    value={financialData.existing_loans}
                    onChange={e => setFinancialData({ ...financialData, existing_loans: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: BUSINESS CATEGORY */}
          {step === 3 && (
            <div className="space-y-4">
              <label className="block text-xs font-bold text-slate-700 uppercase">Select Proposed Category</label>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {BUSINESS_CATEGORIES.map((cat) => {
                  const isSelected = financialData.business_category === cat.id;
                  return (
                    <button
                      type="button"
                      key={cat.id}
                      onClick={() => setFinancialData({
                        ...financialData,
                        business_category: cat.id,
                        business_subcategory: cat.subs[0]
                      })}
                      className={`p-3 rounded-xl border text-left transition ${
                        isSelected 
                          ? 'border-emerald-600 bg-emerald-50 ring-2 ring-emerald-500/20' 
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <span className={`text-xs font-bold block ${isSelected ? 'text-emerald-900' : 'text-slate-800'}`}>
                        {cat.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="pt-2">
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Subcategory / Specific Focus</label>
                <input
                  type="text"
                  value={financialData.business_subcategory}
                  onChange={e => setFinancialData({ ...financialData, business_subcategory: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* STEP 4: EXPERIENCE & INFRASTRUCTURE */}
          {step === 4 && (
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Years of Prior Experience</label>
                <input
                  type="number"
                  value={financialData.experience_years}
                  onChange={e => setFinancialData({ ...financialData, experience_years: Number(e.target.value) })}
                  className="w-32 px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Available Infrastructure</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {[
                    { key: 'water_available', label: 'Reliable Water Connection' },
                    { key: 'electricity_available', label: 'Commercial / Rural Electricity' },
                    { key: 'transport_available', label: 'All-Weather Road / Transport Access' },
                    { key: 'land_available', label: 'Dedicated Land / Shed Available' },
                    { key: 'storage_available', label: 'Cold Storage or Dry Warehouse' },
                  ].map(infra => (
                    <label key={infra.key} className="flex items-center gap-2 p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={financialData[infra.key as keyof typeof financialData] as boolean}
                        onChange={e => setFormData => setFinancialData({ ...financialData, [infra.key]: e.target.checked })}
                        className="rounded text-emerald-700 focus:ring-emerald-500 w-4 h-4"
                      />
                      <span className="text-slate-700 font-medium">{infra.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: REVIEW */}
          {step === 5 && (
            <div className="space-y-5">
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-3">
                <h4 className="text-sm font-bold text-emerald-950">Assessment Summary</h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div><span className="text-slate-500">Location:</span> <span className="font-semibold">{selectedLocation.village}, {selectedLocation.district}, {selectedLocation.state}</span></div>
                  <div><span className="text-slate-500">Business:</span> <span className="font-semibold">{financialData.business_category}</span></div>
                  <div><span className="text-slate-500">Margin Capital:</span> <span className="font-bold text-emerald-800">₹{Number(financialData.margin_capital).toLocaleString('en-IN')}</span></div>
                  <div><span className="text-slate-500">Project Cost:</span> <span className="font-bold text-emerald-800">₹{estimatedProjectCost.toLocaleString('en-IN')}</span></div>
                </div>
              </div>

              <div className="text-[11px] text-slate-500 italic">
                * By clicking generate, the backend will perform deterministic calculations, MoSJE scheme rule matching, PostGIS 5km/10km competitor scan, and structured AI SWOT synthesis.
              </div>
            </div>
          )}

          {/* Wizard Action Buttons */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-200 mt-6">
            {step > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1 text-xs font-semibold px-4 py-2.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Previous
              </button>
            ) : <div className="hidden sm:block"></div>}

            {step < 5 ? (
              <button
                type="button"
                onClick={nextStep}
                disabled={step === 1 && !isStep1Valid}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs font-bold px-6 py-2.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white shadow transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue &rarr;
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs font-bold px-6 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md font-bold"
              >
                {isSubmitting ? (
                  <span>Evaluating Feasibility...</span>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Business Assessment</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
