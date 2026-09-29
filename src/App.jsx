import { useState, useEffect } from 'react';
import PatientForm from './components/PatientForm';
import ResultDisplay from './components/ResultDisplay';
import { checkApiHealth, predictMortality, presets } from './services/api';

export default function App() {
  // Theme state
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  // Patient form state initialized to the Low Risk (normal) preset
  const [formData, setFormData] = useState({ ...presets.normal });
  
  // Prediction result state
  const [result, setResult] = useState(null);
  
  // API health state
  const [apiOnline, setApiOnline] = useState(null);
  
  // Loading and error states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Apply theme to documentElement
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);



  useEffect(() => {
    let active = true;
    checkApiHealth().then(isOnline => {
      if (active) {
        setApiOnline(isOnline);
      }
    });

    // Periodically verify API health every 15 seconds
    const interval = setInterval(() => {
      checkApiHealth().then(isOnline => {
        if (active) {
          setApiOnline(isOnline);
        }
      });
    }, 15000);

    return () => {
      active = false;
      clearInterval(interval);
    };
  }, []);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const handlePredict = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await predictMortality(formData);
      setResult(response);
    } catch (err) {
      console.error('Prediction failed:', err);
      let errMsg = err.message || 'Failed to communicate with prediction server.';
      if (
        errMsg.toLowerCase().includes('failed to fetch') || 
        errMsg.toLowerCase().includes('load failed') || 
        errMsg.toLowerCase().includes('networkerror') ||
        err.name === 'TypeError'
      ) {
        errMsg = 'Failed to connect to the prediction server. The backend server on Railway might be undergoing a cold start (waking up after inactivity), which can take 30-50 seconds. Please wait a moment and try again.';
      }
      setError(errMsg);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({ ...presets.normal });
    setResult(null);
    setError(null);
  };

  return (
    <>
      {/* HEADER BAR */}
      <header className="header-bar">
        <div className="brand-section">
          <h1 className="brand-title">H.A.N.A.F.I</h1>
          <span className="brand-subtitle">Heart Analysis for Notifying Advanced Failure Indicators</span>
        </div>
        <div className="control-panel">
          {/* API STATUS BADGE */}
          <div className={`api-badge ${apiOnline === null ? '' : apiOnline ? 'status-online' : 'status-offline'}`}>
            <span className={`api-dot ${apiOnline ? 'online' : apiOnline === false ? 'offline' : ''}`}></span>
            <span>API {apiOnline === null ? 'Checking…' : apiOnline ? 'Online' : 'Offline'}</span>
          </div>

          {/* THEME TOGGLER */}
          <button 
            type="button" 
            className="theme-toggle-btn"
            onClick={toggleTheme}
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </header>

      {/* ERROR BANNER */}
      {error && (
        <div className="error-banner" role="alert">
          <span style={{ flexShrink: 0, fontSize: '1rem' }}>⚠️</span>
          <span><strong>Error:&nbsp;</strong>{error}</span>
        </div>
      )}

      {/* DASHBOARD GRID */}
      <main className="dashboard-grid" style={{ position: 'relative' }}>
        {/* Loading Overlay */}
        {loading && (
          <div className="loading-overlay">
            <div className="spinner"></div>
            <p>Processing patient clinical metrics...</p>
          </div>
        )}

        {/* INPUT FORM CARD */}
        <PatientForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={handlePredict}
          onReset={handleReset}
          loading={loading}
        />

        {/* RESULT DISPLAY CARD */}
        <ResultDisplay
          result={result}
          patientData={formData}
        />
      </main>

      {/* FOOTER INFO */}
      <footer className="footer-info">
        <p>
          HANAFI AI Client Panel. &copy; {new Date().getFullYear()} Clinical Support Systems.
        </p>
      </footer>
    </>
  );
}
