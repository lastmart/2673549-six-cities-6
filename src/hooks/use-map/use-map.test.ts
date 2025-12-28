import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { Map} from 'leaflet';
import useMap from './use-map';
import { City } from 'types/city';
import { makeFakeCity } from 'lib/test-utils/mocks';

vi.mock('leaflet', () => {
  const mockMapInstance = {
    setView: vi.fn().mockReturnThis(),
    addLayer: vi.fn().mockReturnThis(),
  };

  const mockTileLayer = vi.fn(() => ({
    addTo: vi.fn().mockReturnThis(),
  }));

  const mockMap = vi.fn(() => mockMapInstance);

  return {
    Map: mockMap,
    TileLayer: vi.fn(() => mockTileLayer()),
    tileLayer: vi.fn(() => mockTileLayer()),
  };
});

describe('Hook: useUserAnswers', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize map on first render when mapRef.current is not null', () => {
    const mapRef = { current: document.createElement('div') };
    const city: City = makeFakeCity();

    const { result } = renderHook(() => useMap(mapRef, city));

    expect(result.current).not.toBeNull();
  });

  it('should not initialize map on first render when mapRef.current is null', () => {
    const mapRef = { current: null };
    const city: City = makeFakeCity();

    const { result } = renderHook(() => useMap(mapRef, city));

    expect(result.current).toBeNull();
  });

  it('should render correct city', () => {
    const mapRef = { current: document.createElement('div') };
    const initialCity: City = makeFakeCity();

    const { result } = renderHook(
      ({ city }) => useMap(mapRef, city),
      { initialProps: { city: initialCity } }
    );

    const mapInstance = result.current;
    expect(mapInstance).not.toBeNull();

    expect(Map).toHaveBeenCalledWith(
      mapRef.current,
      expect.objectContaining({
        center: {
          lat: initialCity.location.latitude,
          lng: initialCity.location.longitude,
        },
        zoom: initialCity.location.zoom,
      })
    );
  });

  it('should render city change', () => {
    const mapRef = { current: document.createElement('div') };
    const initialCity: City = makeFakeCity();

    const { rerender, result } = renderHook(
      ({ city }) => useMap(mapRef, city),
      { initialProps: { city: initialCity } }
    );

    const mapInstance = result.current;
    expect(mapInstance).not.toBeNull();

    expect(Map).toHaveBeenCalledWith(
      mapRef.current,
      expect.objectContaining({
        center: {
          lat: initialCity.location.latitude,
          lng: initialCity.location.longitude,
        },
        zoom: initialCity.location.zoom,
      })
    );

    const changeCity: City = makeFakeCity();
    rerender({ city: changeCity });

    expect(mapInstance?.setView).toHaveBeenCalledWith(
      [changeCity.location.latitude, changeCity.location.longitude],
      changeCity.location.zoom
    );
  });
});
