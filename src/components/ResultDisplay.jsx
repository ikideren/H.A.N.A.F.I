// Helper function to render a lab parameter reference range bar
const LabMeter = ({ name, value, minNormal, maxNormal, minDomain, maxDomain, unit }) => {
  const valNum = parseFloat(value);
  const isValid = typeof valNum === 'number' && !isNaN(valNum);
  
  // Calculate percentage positions for layout
  const getPercent = (v) => {
    if (typeof v !== 'number' || isNaN(v)) return 0;
    const clamped = Math.max(minDomain, Math.min(maxDomain, v));
    return ((clamped - minDomain) / (maxDomain - minDomain)) * 100;
  };

  const valPercent = getPercent(isValid ? valNum : minNormal);
  const normalMinPercent = getPercent(minNormal);
  const normalMaxPercent = getPercent(maxNormal);
  const normalWidth = normalMaxPercent - normalMinPercent;

  const isAbnormal = isValid && (valNum < minNormal || valNum > maxNormal);

  return (
    <div className="metric-bar-card">
      <div className="metric-header">
        <span className="metric-name">{name}</span>
        <span className={`metric-value-display ${isAbnormal ? 'abnormal' : 'normal'}`}>
          {value} {unit} {isAbnormal ? '⚠️' : '✓'}
        </span>
      </div>
      <div className="range-track">
        {/* Normal range highlight block */}
        <div 
          className="normal-range-highlight"
          style={{ left: `${normalMinPercent}%`, width: `${normalWidth}%` }}
        />
        {/* Patient value marker */}
        <div 
          className={`patient-marker ${isAbnormal ? 'critical' : ''}`}
          style={{ left: `${valPercent}%` }}
        />
      </div>
      <div className="metric-footer-limits">
        <span>{minDomain}</span>
        <span style={{ fontSize: '0.7rem', opacity: 0.8 }}>Ref Range: {minNormal} - {maxNormal}</span>
        <span>{maxDomain}</span>
      </div>
    </div>
  );
};

export default function ResultDisplay({ result, patientData }) {
  if (!result) {
    return (
      <div className="card" style={{ height: '100%' }}>
        <div className="empty-result-state">
          <div className="empty-icon-box">📊</div>
          <h3>Awaiting Clinical Data</h3>
          <p style={{ marginTop: '0.5rem' }}>
            Provide patient demographics, history, and lab measurements on the left, then click <strong>Run Risk Evaluation</strong> to view the mortality risk assessment.
          </p>
        </div>
      </div>
    );
  }

  const { mortality_risk_probability, predicted_death_event, threshold, risk_level } = result;

  const validProbability = typeof mortality_risk_probability === 'number' && !isNaN(mortality_risk_probability) 
    ? mortality_risk_probability 
    : 0;

  // Percentage conversion
  const riskPercent = Math.round(validProbability * 100);

  // SVG Circular Gauge Calculations
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (validProbability * circumference);

  // Get color category class
  const getRiskClass = () => {
    if (risk_level === 'high') return 'high';
    if (risk_level === 'medium') return 'medium';
    return 'low';
  };

  const riskClass = getRiskClass();


  // Dynamic clinical summaries based on risk prediction
  const getClinicalSummary = () => {
    if (risk_level === 'high') {
      return {
        title: 'Critical Risk Level Determined',
        desc: 'The model indicates a high probability of mortality. Close inpatient monitoring, adjustment of heart failure therapies (including neurohormonal blockade), and immediate cardiovascular consult are strongly recommended.',
      };
    }
    if (risk_level === 'medium') {
      return {
        title: 'Moderate Risk Level Determined',
        desc: 'The patient exhibits moderate clinical risks. It is recommended to perform routine cardiac diagnostics (e.g. echo) and verify compliance with guideline-directed medical therapy (GDMT). Follow up in 2-4 weeks.',
      };
    }
    return {
      title: 'Low Risk Level Determined',
      desc: 'The patient is classified as low risk. Continue standard maintenance care, educate on symptom monitoring (weight gain, swelling), and schedule normal periodic evaluations.',
    };
  };

  const summary = getClinicalSummary();

  return (
    <div className="card">
      <div className="card-title-group">
        <h2 className="card-title">
          <span>📊</span> Prediction Analysis
        </h2>
        <span className="brand-subtitle">Model Threshold: {threshold}</span>
      </div>

      {/* GAUGE DISP */}
      <div className="risk-gauge-container">
        <div className="gauge-svg-wrapper">
          <svg width="200" height="200" className="gauge-svg">
            <circle
              cx="100"
              cy="100"
              r={radius}
              className="gauge-track"
            />
            <circle
              cx="100"
              cy="100"
              r={radius}
              className={`gauge-indicator ${riskClass}`}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
            />
          </svg>
          <div className="gauge-inner-content">
            <span className="gauge-value">{riskPercent}%</span>
            <span className="gauge-label">Mortality Risk</span>
          </div>
        </div>
        <span className={`risk-level-badge ${riskClass}`}>
          {riskClass} Risk
        </span>
      </div>

      {/* CLASSIFICATION BADGES */}
      <div className={`recommendation-box ${riskClass}`}>
        <h4 className="rec-title">{summary.title}</h4>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>{summary.desc}</p>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
          <strong>Predicted death event:</strong> {predicted_death_event === 1 ? 'Yes (Death event predicted)' : 'No (Event not predicted)'}
        </p>
      </div>

      {/* LABS METRICS ANALYSIS COMPARISON */}
      <h3 className="form-section-title" style={{ fontSize: '0.9rem', marginBottom: '0.75rem' }}>
        Diagnostic Values vs. Medical Reference Ranges
      </h3>
      
      <div className="metrics-analysis-container">
        
        {/* Ejection Fraction */}
        <LabMeter
          name="Ejection Fraction"
          value={patientData.ejection_fraction}
          minNormal={50}
          maxNormal={70}
          minDomain={10}
          maxDomain={80}
          unit="%"
        />

        {/* Serum Creatinine */}
        <LabMeter
          name="Serum Creatinine"
          value={patientData.serum_creatinine}
          minNormal={0.6}
          maxNormal={1.2}
          minDomain={0.1}
          maxDomain={5.0}
          unit="mg/dL"
        />

        {/* Serum Sodium */}
        <LabMeter
          name="Serum Sodium"
          value={patientData.serum_sodium}
          minNormal={135}
          maxNormal={145}
          minDomain={115}
          maxDomain={150}
          unit="mEq/L"
        />

        {/* Platelets */}
        <LabMeter
          name="Platelets Count"
          value={patientData.platelets}
          minNormal={150000}
          maxNormal={450000}
          minDomain={50000}
          maxDomain={600000}
          unit="/mcL"
        />

      </div>

      {/* MEDICAL DISCLAIMER */}
      <p className="disclaimer-text">
        ⚠️ <strong>Important Medical Disclaimer:</strong> This clinical decision support tool is for educational and research purposes only. It should not be used as a final clinical decision or diagnostic standard without professional medical evaluation.
      </p>
    </div>
  );
}
