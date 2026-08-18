const zodiacSigns = [
  { id: 'aries', name: 'Aries', symbol: '♈', index: 0, startLong: 0, endLong: 30, element: 'Fire', modality: 'Cardinal', ruler: 'Mars' },
  { id: 'taurus', name: 'Taurus', symbol: '♉', index: 1, startLong: 30, endLong: 60, element: 'Earth', modality: 'Fixed', ruler: 'Venus' },
  { id: 'gemini', name: 'Gemini', symbol: '♊', index: 2, startLong: 60, endLong: 90, element: 'Air', modality: 'Mutable', ruler: 'Mercury' },
  { id: 'cancer', name: 'Cancer', symbol: '♋', index: 3, startLong: 90, endLong: 120, element: 'Water', modality: 'Cardinal', ruler: 'Moon' },
  { id: 'leo', name: 'Leo', symbol: '♌', index: 4, startLong: 120, endLong: 150, element: 'Fire', modality: 'Fixed', ruler: 'Sun' },
  { id: 'virgo', name: 'Virgo', symbol: '♍', index: 5, startLong: 150, endLong: 180, element: 'Earth', modality: 'Mutable', ruler: 'Mercury' },
  { id: 'libra', name: 'Libra', symbol: '♎', index: 6, startLong: 180, endLong: 210, element: 'Air', modality: 'Cardinal', ruler: 'Venus' },
  { id: 'scorpio', name: 'Scorpio', symbol: '♏', index: 7, startLong: 210, endLong: 240, element: 'Water', modality: 'Fixed', ruler: 'Mars' },
  { id: 'sagittarius', name: 'Sagittarius', symbol: '♐', index: 8, startLong: 240, endLong: 270, element: 'Fire', modality: 'Mutable', ruler: 'Jupiter' },
  { id: 'capricorn', name: 'Capricorn', symbol: '♑', index: 9, startLong: 270, endLong: 300, element: 'Earth', modality: 'Cardinal', ruler: 'Saturn' },
  { id: 'aquarius', name: 'Aquarius', symbol: '♒', index: 10, startLong: 300, endLong: 330, element: 'Air', modality: 'Fixed', ruler: 'Saturn' }, // traditional ruler Saturn (or Uranus)
  { id: 'pisces', name: 'Pisces', symbol: '♓', index: 11, startLong: 330, endLong: 360, element: 'Water', modality: 'Mutable', ruler: 'Jupiter' }, // traditional ruler Jupiter (or Neptune)
];

const getSignByLongitude = (longitude) => {
  // Normalize longitude to 0-360
  let normLong = longitude % 360;
  if (normLong < 0) normLong += 360;
  
  const sign = zodiacSigns.find(s => normLong >= s.startLong && normLong < s.endLong) || zodiacSigns[0];
  const degree = normLong - sign.startLong;
  
  return {
    sign: sign.name,
    degree: Number(degree.toFixed(2))
  };
};

module.exports = {
  zodiacSigns,
  getSignByLongitude
};
