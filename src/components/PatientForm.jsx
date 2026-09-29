import { presets } from '../services/api';

// Helper component for tooltips and info icons
const InfoIcon = ({ text }) => (
  <button 
    type="button" 
    className="info-icon" 
    aria-label={`More details: ${text}`}
  >
    i
    <span className="tooltip" role="tooltip">{text}</span>
  </button>
);

export default function PatientForm({ formData, setFormData, onSubmit, onReset, loading }) {
  
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const loadPreset = (presetKey) => {
    if (presets[presetKey]) {
      setFormData({ ...presets[presetKey] });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };


  return (
    <div className="card">
      <div className="card-title-group">
        <h2 className="card-title">
          <span aria-hidden="true">🩺</span> Patient Clinical History
        </h2>
        <span className="brand-subtitle">Heart Failure Risk Predictor</span>
      </div>

      {/* PRESETS ROW */}
      <div className="presets-container">
        <span className="preset-label">Quick Fill:</span>
        <button 
          type="button" 
          className="preset-btn"
          onClick={() => loadPreset('normal')}
          disabled={loading}
          title="Fill with typical low-risk patient values"
        >
          🟢 Low Risk
        </button>
        <button 
          type="button" 
          className="preset-btn"
          onClick={() => loadPreset('borderline')}
          disabled={loading}
          title="Fill with moderate-risk patient values"
        >
          🟡 Moderate Risk
        </button>
        <button 
          type="button" 
          className="preset-btn"
          onClick={() => loadPreset('critical')}
          disabled={loading}
          title="Fill with high-risk patient values"
        >
          🔴 High Risk
        </button>
      </div>

      <form onSubmit={handleFormSubmit}>
        
        {/* SECTION 1: DEMOGRAPHICS */}
        <div className="form-section">
          <h3 className="form-section-title">Demographics</h3>
          <div className="input-grid">
            
            {/* Age */}
            <div className="form-group">
              <div className="label-container">
                <label className="form-label" htmlFor="age">Age</label>
                <InfoIcon text="Patient age in years (Range: 1 - 120)" />
              </div>
              <input
                id="age"
                name="age"
                type="number"
                min="1"
                max="120"
                required
                className="form-input"
                placeholder="e.g. 60…"
                autoComplete="off"
                value={formData.age || ''}
                onChange={(e) => handleInputChange('age', e.target.value)}
                disabled={loading}
              />
            </div>

            {/* Sex */}
            <div className="form-group">
              <div className="label-container">
                <label className="form-label">Biological Sex</label>
                <InfoIcon text="Patient biological sex" />
              </div>
              <div className="toggle-switch-group" role="group" aria-label="Biological Sex">
                <button 
                  type="button"
                  className={`toggle-switch-option ${parseInt(formData.sex, 10) === 1 ? 'active' : ''}`}
                  onClick={() => handleInputChange('sex', 1)}
                  disabled={loading}
                  aria-pressed={parseInt(formData.sex, 10) === 1}
                >
                  Male
                </button>
                <button 
                  type="button"
                  className={`toggle-switch-option ${parseInt(formData.sex, 10) === 0 ? 'active' : ''}`}
                  onClick={() => handleInputChange('sex', 0)}
                  disabled={loading}
                  aria-pressed={parseInt(formData.sex, 10) === 0}
                >
                  Female
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* SECTION 2: CLINICAL HISTORY */}
        <div className="form-section">
          <h3 className="form-section-title">Clinical History</h3>
          <div className="input-grid">
            
            {/* Anaemia */}
            <div className="form-group">
              <div className="label-container">
                <label className="form-label">Anaemia</label>
                <InfoIcon text="Decrease of red blood cells or hemoglobin" />
              </div>
              <div className="toggle-switch-group" role="group" aria-label="Anaemia Status">
                <button 
                  type="button"
                  className={`toggle-switch-option ${parseInt(formData.anaemia, 10) === 1 ? 'active' : ''}`}
                  onClick={() => handleInputChange('anaemia', 1)}
                  disabled={loading}
                  aria-pressed={parseInt(formData.anaemia, 10) === 1}
                >
                  Yes
                </button>
                <button 
                  type="button"
                  className={`toggle-switch-option ${parseInt(formData.anaemia, 10) === 0 ? 'active' : ''}`}
                  onClick={() => handleInputChange('anaemia', 0)}
                  disabled={loading}
                  aria-pressed={parseInt(formData.anaemia, 10) === 0}
                >
                  No
                </button>
              </div>
            </div>

            {/* Diabetes */}
            <div className="form-group">
              <div className="label-container">
                <label className="form-label">Diabetes</label>
                <InfoIcon text="If the patient has a history of diabetes mellitus" />
              </div>
              <div className="toggle-switch-group" role="group" aria-label="Diabetes Status">
                <button 
                  type="button"
                  className={`toggle-switch-option ${parseInt(formData.diabetes, 10) === 1 ? 'active' : ''}`}
                  onClick={() => handleInputChange('diabetes', 1)}
                  disabled={loading}
                  aria-pressed={parseInt(formData.diabetes, 10) === 1}
                >
                  Yes
                </button>
                <button 
                  type="button"
                  className={`toggle-switch-option ${parseInt(formData.diabetes, 10) === 0 ? 'active' : ''}`}
                  onClick={() => handleInputChange('diabetes', 0)}
                  disabled={loading}
                  aria-pressed={parseInt(formData.diabetes, 10) === 0}
                >
                  No
                </button>
              </div>
            </div>

            {/* High Blood Pressure */}
            <div className="form-group">
              <div className="label-container">
                <label className="form-label">High Blood Pressure</label>
                <InfoIcon text="If the patient has a history of hypertension" />
              </div>
              <div className="toggle-switch-group" role="group" aria-label="High Blood Pressure Status">
                <button 
                  type="button"
                  className={`toggle-switch-option ${parseInt(formData.high_blood_pressure, 10) === 1 ? 'active' : ''}`}
                  onClick={() => handleInputChange('high_blood_pressure', 1)}
                  disabled={loading}
                  aria-pressed={parseInt(formData.high_blood_pressure, 10) === 1}
                >
                  Yes
                </button>
                <button 
                  type="button"
                  className={`toggle-switch-option ${parseInt(formData.high_blood_pressure, 10) === 0 ? 'active' : ''}`}
                  onClick={() => handleInputChange('high_blood_pressure', 0)}
                  disabled={loading}
                  aria-pressed={parseInt(formData.high_blood_pressure, 10) === 0}
                >
                  No
                </button>
              </div>
            </div>

            {/* Smoking */}
            <div className="form-group">
              <div className="label-container">
                <label className="form-label">Active Smoking</label>
                <InfoIcon text="If the patient actively smokes tobacco" />
              </div>
              <div className="toggle-switch-group" role="group" aria-label="Active Smoking Status">
                <button 
                  type="button"
                  className={`toggle-switch-option ${parseInt(formData.smoking, 10) === 1 ? 'active' : ''}`}
                  onClick={() => handleInputChange('smoking', 1)}
                  disabled={loading}
                  aria-pressed={parseInt(formData.smoking, 10) === 1}
                >
                  Yes
                </button>
                <button 
                  type="button"
                  className={`toggle-switch-option ${parseInt(formData.smoking, 10) === 0 ? 'active' : ''}`}
                  onClick={() => handleInputChange('smoking', 0)}
                  disabled={loading}
                  aria-pressed={parseInt(formData.smoking, 10) === 0}
                >
                  No
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* SECTION 3: LAB MEASUREMENTS */}
        <div className="form-section">
          <h3 className="form-section-title">Laboratory Indicators</h3>
          <div className="input-grid">
            
            {/* Ejection Fraction */}
            <div className="form-group">
              <div className="label-container">
                <label className="form-label" htmlFor="ejection_fraction">Ejection Fraction</label>
                <InfoIcon text="Percentage of blood leaving the heart each contraction. Normal: 50-70%. Low values (<40%) indicate heart failure." />
              </div>
              <input
                id="ejection_fraction"
                name="ejection_fraction"
                type="number"
                min="10"
                max="80"
                required
                className="form-input form-input-with-unit"
                placeholder="e.g. 35…"
                autoComplete="off"
                value={formData.ejection_fraction || ''}
                onChange={(e) => handleInputChange('ejection_fraction', e.target.value)}
                disabled={loading}
              />
              <span className="input-unit">%</span>
            </div>

            {/* Serum Creatinine */}
            <div className="form-group">
              <div className="label-container">
                <label className="form-label" htmlFor="serum_creatinine">Serum Creatinine</label>
                <InfoIcon text="Level of creatinine in the blood. Reflects kidney clearance. Normal: 0.6 - 1.2 mg/dL. Elevated indicates kidney dysfunction." />
              </div>
              <input
                id="serum_creatinine"
                name="serum_creatinine"
                type="number"
                step="0.1"
                min="0.1"
                max="15.0"
                required
                className="form-input form-input-with-unit"
                placeholder="e.g. 1.2…"
                autoComplete="off"
                value={formData.serum_creatinine || ''}
                onChange={(e) => handleInputChange('serum_creatinine', e.target.value)}
                disabled={loading}
              />
              <span className="input-unit">mg/dL</span>
            </div>

            {/* Serum Sodium */}
            <div className="form-group">
              <div className="label-container">
                <label className="form-label" htmlFor="serum_sodium">Serum Sodium</label>
                <InfoIcon text="Level of sodium in blood. Normal: 135 - 145 mEq/L. Low sodium levels (hyponatremia) worsen risk prognosis." />
              </div>
              <input
                id="serum_sodium"
                name="serum_sodium"
                type="number"
                min="100"
                max="150"
                required
                className="form-input form-input-with-unit"
                placeholder="e.g. 138…"
                autoComplete="off"
                value={formData.serum_sodium || ''}
                onChange={(e) => handleInputChange('serum_sodium', e.target.value)}
                disabled={loading}
              />
              <span className="input-unit">mEq/L</span>
            </div>

            {/* CPK */}
            <div className="form-group">
              <div className="label-container">
                <label className="form-label" htmlFor="creatinine_phosphokinase">Creatinine Phosphokinase</label>
                <InfoIcon text="Level of the CPK enzyme in blood. Elevated levels indicate muscle tissue damage or cardiac stress." />
              </div>
              <input
                id="creatinine_phosphokinase"
                name="creatinine_phosphokinase"
                type="number"
                min="10"
                max="10000"
                required
                className="form-input form-input-with-unit"
                placeholder="e.g. 250…"
                autoComplete="off"
                value={formData.creatinine_phosphokinase || ''}
                onChange={(e) => handleInputChange('creatinine_phosphokinase', e.target.value)}
                disabled={loading}
              />
              <span className="input-unit">mcg/L</span>
            </div>

            {/* Platelets */}
            <div className="form-group">
              <div className="label-container">
                <label className="form-label" htmlFor="platelets">Platelets Count</label>
                <InfoIcon text="Platelets in the blood. Normal range: 150,000 - 450,000 per microliter." />
              </div>
              <input
                id="platelets"
                name="platelets"
                type="number"
                min="10000"
                max="900000"
                required
                className="form-input form-input-with-unit"
                placeholder="e.g. 263000…"
                autoComplete="off"
                value={formData.platelets || ''}
                onChange={(e) => handleInputChange('platelets', e.target.value)}
                disabled={loading}
              />
              <span className="input-unit">/mcL</span>
            </div>

          </div>
        </div>

        {/* FORM ACTION BUTTONS */}
        <div className="button-bar">
          <button 
            type="button" 
            className="btn btn-secondary" 
            onClick={onReset}
            disabled={loading}
          >
            Reset Form
          </button>
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Evaluating…' : 'Run Risk Evaluation'}
          </button>
        </div>

      </form>
    </div>
  );
}
