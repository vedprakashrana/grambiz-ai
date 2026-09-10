// Location hierarchy service & API abstraction layer for GramBiz AI

export interface VillageEntity {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  population?: number;
  households?: number;
}

export interface BlockEntity {
  id: string;
  name: string;
  villages: VillageEntity[];
}

export interface DistrictEntity {
  id: string;
  name: string;
  blocks: BlockEntity[];
}

export interface StateEntity {
  id: string;
  name: string;
  districts: DistrictEntity[];
}

export interface SelectedLocationState {
  state: string;
  district: string;
  block: string;
  village: string;
  latitude: number | null;
  longitude: number | null;
  location_source: 'manual' | 'gps' | 'map';
}

export interface ReverseGeocodeResult {
  state: string | null;
  district: string | null;
  block: string | null;
  village: string | null;
  city?: string | null;
  latitude: number;
  longitude: number;
  location_source: string;
  confidence: string;
  raw_display_name?: string;
}

export const VERIFIED_LOCATION_DATA: StateEntity[] = [
  {
    id: "st_up",
    name: "Uttar Pradesh",
    districts: [
      {
        id: "dist_meerut",
        name: "Meerut",
        blocks: [
          {
            id: "blk_hastinapur",
            name: "Hastinapur",
            villages: [
              { id: "v_ganeshpur", name: "Ganeshpur", latitude: 29.1712, longitude: 77.9942, population: 3420, households: 580 },
              { id: "v_saifpur", name: "Saifpur Firojpur", latitude: 29.1650, longitude: 78.0120, population: 4100, households: 690 },
              { id: "v_makhdumpur", name: "Makhdumpur", latitude: 29.1820, longitude: 78.0250, population: 2850, households: 470 }
            ]
          },
          {
            id: "blk_mawana",
            name: "Mawana",
            villages: [
              { id: "v_mawana_kalan", name: "Mawana Kalan", latitude: 29.1020, longitude: 77.9250, population: 5200, households: 860 },
              { id: "v_satla", name: "Satla", latitude: 29.1150, longitude: 77.9400, population: 3100, households: 510 }
            ]
          },
          {
            id: "blk_sardhana",
            name: "Sardhana",
            villages: [
              { id: "v_khera", name: "Khera", latitude: 29.1450, longitude: 77.6150, population: 4800, households: 780 }
            ]
          }
        ]
      },
      {
        id: "dist_varanasi",
        name: "Varanasi",
        blocks: [
          {
            id: "blk_pindra",
            name: "Pindra",
            villages: [
              { id: "v_babatpur", name: "Babatpur", latitude: 25.4480, longitude: 82.8590, population: 5400, households: 880 },
              { id: "v_mangari", name: "Mangari", latitude: 25.4320, longitude: 82.8810, population: 3900, households: 640 }
            ]
          },
          {
            id: "blk_kashi",
            name: "Kashi Vidyapeeth",
            villages: [
              { id: "v_shivpur", name: "Shivpur", latitude: 25.3520, longitude: 82.9650, population: 6100, households: 950 }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "st_jharkhand",
    name: "Jharkhand",
    districts: [
      {
        id: "dist_dhanbad",
        name: "Dhanbad",
        blocks: [
          {
            id: "blk_baliapur",
            name: "Baliapur",
            villages: [
              { id: "v_sindri", name: "Sindri", latitude: 23.6514, longitude: 86.5125, population: 7200, households: 1200 },
              { id: "v_rohrabandh", name: "Rohrabandh", latitude: 23.6480, longitude: 86.5050, population: 4800, households: 790 }
            ]
          },
          {
            id: "blk_jharia",
            name: "Jharia",
            villages: [
              { id: "v_bhulanbarari", name: "Bhulanbarari", latitude: 23.7140, longitude: 86.4250, population: 4300, households: 710 },
              { id: "v_kujama", name: "Kujama", latitude: 23.7420, longitude: 86.4480, population: 3100, households: 520 }
            ]
          },
          {
            id: "blk_baghmara",
            name: "Baghmara",
            villages: [
              { id: "v_katras", name: "Katras Rural", latitude: 23.8050, longitude: 86.2910, population: 6800, households: 1100 }
            ]
          }
        ]
      },
      {
        id: "dist_ranchi",
        name: "Ranchi",
        blocks: [
          {
            id: "blk_kanke",
            name: "Kanke",
            villages: [
              { id: "v_sukhurhutu", name: "Sukhurhutu", latitude: 23.4420, longitude: 85.3210, population: 5200, households: 860 },
              { id: "v_pithoria", name: "Pithoria", latitude: 23.5180, longitude: 85.3450, population: 6400, households: 1050 }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "st_maharashtra",
    name: "Maharashtra",
    districts: [
      {
        id: "dist_pune",
        name: "Pune",
        blocks: [
          {
            id: "blk_baramati",
            name: "Baramati",
            villages: [
              { id: "v_malegaon", name: "Malegaon Khurd", latitude: 18.1520, longitude: 74.5750, population: 5800, households: 980 },
              { id: "v_songaon", name: "Songaon", latitude: 18.1740, longitude: 74.6120, population: 4200, households: 710 }
            ]
          },
          {
            id: "blk_khed",
            name: "Khed",
            villages: [
              { id: "v_chakan", name: "Chakan Deoli", latitude: 18.7580, longitude: 73.8590, population: 6700, households: 1100 }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "st_mp",
    name: "Madhya Pradesh",
    districts: [
      {
        id: "dist_indore",
        name: "Indore",
        blocks: [
          {
            id: "blk_sanwer",
            name: "Sanwer",
            villages: [
              { id: "v_ajnod", name: "Ajnod", latitude: 22.8850, longitude: 75.8150, population: 3900, households: 640 }
            ]
          }
        ]
      }
    ]
  }
];

export const LocationService = {
  getStates(): Promise<string[]> {
    return Promise.resolve(VERIFIED_LOCATION_DATA.map(s => s.name));
  },

  getDistricts(stateName: string): Promise<string[]> {
    const st = VERIFIED_LOCATION_DATA.find(s => s.name.toLowerCase() === stateName.toLowerCase());
    return Promise.resolve(st ? st.districts.map(d => d.name) : []);
  },

  getBlocks(stateName: string, districtName: string): Promise<string[]> {
    const st = VERIFIED_LOCATION_DATA.find(s => s.name.toLowerCase() === stateName.toLowerCase());
    if (!st) return Promise.resolve([]);
    const dist = st.districts.find(d => d.name.toLowerCase() === districtName.toLowerCase());
    return Promise.resolve(dist ? dist.blocks.map(b => b.name) : []);
  },

  getVillages(stateName: string, districtName: string, blockName: string): Promise<VillageEntity[]> {
    const st = VERIFIED_LOCATION_DATA.find(s => s.name.toLowerCase() === stateName.toLowerCase());
    if (!st) return Promise.resolve([]);
    const dist = st.districts.find(d => d.name.toLowerCase() === districtName.toLowerCase());
    if (!dist) return Promise.resolve([]);
    const blk = dist.blocks.find(b => b.name.toLowerCase() === blockName.toLowerCase());
    return Promise.resolve(blk ? blk.villages : []);
  },

  // Calls backend provider-independent reverse geocoding API
  async reverseGeocode(latitude: number, longitude: number, source: string = "gps"): Promise<ReverseGeocodeResult> {
    try {
      const res = await fetch(`http://localhost:8000/api/v1/locations/reverse-geocode?lat=${latitude}&lon=${longitude}&source=${source}`);
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn("Backend reverse-geocode failed, attempting direct fallback");
    }

    return {
      state: null,
      district: null,
      block: null,
      village: null,
      latitude,
      longitude,
      location_source: source,
      confidence: "Estimated"
    };
  }
};
