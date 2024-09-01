'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

interface RoverPhoto {
  id: number;
  sol: number;
  camera: {
    id: number;
    name: string;
    rover_id: number;
    full_name: string;
  };
  img_src: string;
  earth_date: string;
  rover: {
    id: number;
    name: string;
    landing_date: string;
    launch_date: string;
    status: string;
  };
}

interface ApiResponse {
  photos: RoverPhoto[];
}

export default function Home() {
  const [photo, setPhoto] = useState<RoverPhoto | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchAPIData() {
      const NASA_KEY = process.env.NEXT_PUBLIC_NASA_API_KEY;
      const URL = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=2&api_key=${NASA_KEY}`;

      try {
        setLoading(true);
        const res = await fetch(URL);
        const apiData: ApiResponse = await res.json();

        // Set the first object from the photos array
        if (apiData.photos && apiData.photos.length > 0) {
          setPhoto(apiData.photos[0]);
        } else {
          console.log('No photos found');
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    }

    fetchAPIData();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {loading ? (
        <p>Loading...</p>
      ) : (
        photo && (
          <div>
            <Image
              src={photo.img_src}
              width={500}
              height={500}
              alt={`Mars Rover ${photo.rover.name}`}
            />
            <ul>
              {Object.entries(photo).map(([key, value]) => (
                <li key={key}>
                  <strong>{key}:</strong> {value.toString()}
                </li>
              ))}
            </ul>
          </div>
        )
      )}
    </main>
  );
}
