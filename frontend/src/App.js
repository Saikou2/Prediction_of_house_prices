import React, { useState } from 'react';
import './App.css'; // Vous pouvez créer ou modifier ce fichier CSS

function App() {
  // Définir l'état pour chaque champ du formulaire
  // NOUVEAU: Ajout de date, street, city, statezip
  const [date, setDate] = useState('2025-01-15'); // Exemple de date
  const [street, setStreet] = useState('123 Main St'); // Exemple de rue
  const [city, setCity] = useState('Seattle'); // Exemple de ville
  const [statezip, setStatezip] = useState('WA 98101'); // Exemple d'état/code postal

  const [sqft_living, setSqftLiving] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [grade, setGrade] = useState('');
  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');
  const [yr_built, setYrBuilt] = useState('');
  const [waterfront, setWaterfront] = useState(0); // 0 ou 1
  const [view, setView] = useState(0); // 0 à 4
  const [condition, setCondition] = useState(1); // 1 à 5
  const [floors, setFloors] = useState('');
  const [zipcode, setZipcode] = useState(''); // Garder en string si le backend l'attend en string
  const [yr_renovated, setYrRenovated] = useState('');
  const [sqft_lot, setSqftLot] = useState('');
  const [sqft_above, setSqftAbove] = useState('');
  const [sqft_basement, setSqftBasement] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(null);
    setPrediction(null);

    // Collecter les données du formulaire
    const formData = {
      // NOUVEAU: Inclure les champs manquants
      date: date,
      street: street,
      city: city,
      statezip: statezip,

      sqft_living: parseInt(sqft_living), // Backend attend int
      bedrooms: parseFloat(bedrooms), // Backend attend float
      bathrooms: parseFloat(bathrooms), // Backend attend float
      grade: parseInt(grade), // Backend attend int
      lat: parseFloat(lat), // Backend attend float
      long: parseFloat(long), // Backend attend float
      yr_built: parseInt(yr_built), // Backend attend int
      waterfront: parseInt(waterfront), // Backend attend int
      view: parseInt(view), // Backend attend int
      condition: parseInt(condition), // Backend attend int
      floors: parseFloat(floors), // Backend attend float
      zipcode: zipcode, // Backend attend str (ou int si vous le changez)
      yr_renovated: parseInt(yr_renovated), // Backend attend int
      sqft_lot: parseInt(sqft_lot), // Backend attend int
      sqft_above: parseInt(sqft_above), // Backend attend int
      sqft_basement: parseInt(sqft_basement), // Backend attend int
      // 'country' est optionnel, donc pas besoin de l'envoyer si vous ne le voulez pas.
      // country: "USA", // Si vous voulez l'envoyer
    };

    try {
      const response = await fetch('/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Erreur lors de la prédiction');
      }

      const data = await response.json();
      setPrediction(data.predicted_price);
    } catch (err) {
      console.error("Erreur de prédiction :", err);
      setError(err.message || 'Une erreur inattendue est survenue.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Prédiction du Prix de la Maison 🏡</h1>
        <form onSubmit={handleSubmit} className="prediction-form">
          {/* NOUVEAUX CHAMPS DU FORMULAIRE */}
          <div className="form-group">
            <label>Date (AAAA-MM-JJ):</label>
            <input type="text" value={date} onChange={(e) => setDate(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Rue (street):</label>
            <input type="text" value={street} onChange={(e) => setStreet(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Ville (city):</label>
            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>État et Zip (statezip):</label>
            <input type="text" value={statezip} onChange={(e) => setStatezip(e.target.value)} required />
          </div>

          {/* CHAMPS EXISTANTS */}
          <div className="form-group">
            <label>Surface habitable (sqft_living):</label>
            <input type="number" value={sqft_living} onChange={(e) => setSqftLiving(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Chambres (bedrooms):</label>
            <input type="number" value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Salles de bain (bathrooms):</label>
            <input type="number" step="0.5" value={bathrooms} onChange={(e) => setBathrooms(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Niveau de qualité (grade, 1-13):</label>
            <input type="number" value={grade} onChange={(e) => setGrade(e.target.value)} min="1" max="13" required />
          </div>
          <div className="form-group">
            <label>Latitude (lat):</label>
            <input type="number" step="any" value={lat} onChange={(e) => setLat(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Longitude (long):</label>
            <input type="number" step="any" value={long} onChange={(e) => setLong(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Année de construction (yr_built):</label>
            <input type="number" value={yr_built} onChange={(e) => setYrBuilt(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Bord de l'eau (waterfront, 0 ou 1):</label>
            <select value={waterfront} onChange={(e) => setWaterfront(e.target.value)}>
              <option value="0">Non</option>
              <option value="1">Oui</option>
            </select>
          </div>
          <div className="form-group">
            <label>Vue (view, 0-4):</label>
            <input type="number" value={view} onChange={(e) => setView(e.target.value)} min="0" max="4" />
          </div>
          <div className="form-group">
            <label>État (condition, 1-5):</label>
            <input type="number" value={condition} onChange={(e) => setCondition(e.target.value)} min="1" max="5" />
          </div>
          <div className="form-group">
            <label>Étages (floors):</label>
            <input type="number" step="0.5" value={floors} onChange={(e) => setFloors(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Code postal (zipcode):</label>
            <input type="text" value={zipcode} onChange={(e) => setZipcode(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Année de rénovation (yr_renovated, 0 si jamais):</label>
            <input type="number" value={yr_renovated} onChange={(e) => setYrRenovated(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Taille du terrain (sqft_lot):</label>
            <input type="number" value={sqft_lot} onChange={(e) => setSqftLot(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Surface au-dessus du sol (sqft_above):</label>
            <input type="number" value={sqft_above} onChange={(e) => setSqftAbove(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Surface du sous-sol (sqft_basement):</label>
            <input type="number" value={sqft_basement} onChange={(e) => setSqftBasement(e.target.value)} required />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Prédiction en cours...' : 'Prédire le prix'}
          </button>
        </form>

        {error && <p className="error-message">Erreur: {error}</p>}

        {prediction !== null && (
          <div className="prediction-result">
            <h2>Prix Prédit : {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'USD' }).format(prediction)}</h2>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;