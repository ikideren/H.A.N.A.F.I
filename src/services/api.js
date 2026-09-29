export const API_URL = "https://hanafi-be-production.up.railway.app";

/**
 * Predefined clinical presets to test prediction capabilities.
 * Values reflect characteristic medical patterns of heart failure risks.
 */
export const presets = {
  normal: {
    name: 'Low Risk Profile',
    age: 50,
    anaemia: 0,
    creatinine_phosphokinase: 150,
    diabetes: 0,
    ejection_fraction: 60,
    high_blood_pressure: 0,
    platelets: 250000,
    serum_creatinine: 0.8,
    serum_sodium: 140,
    sex: 1, // Male
    smoking: 0
  },
  borderline: {
    name: 'Moderate Risk Profile',
    age: 65,
    anaemia: 1,
    creatinine_phosphokinase: 250,
    diabetes: 0,
    ejection_fraction: 38,
    high_blood_pressure: 1,
    platelets: 180000,
    serum_creatinine: 1.3,
    serum_sodium: 136,
    sex: 1, // Male
    smoking: 1
  },
  critical: {
    name: 'High Risk Profile',
    age: 75,
    anaemia: 1,
    creatinine_phosphokinase: 582,
    diabetes: 1,
    ejection_fraction: 20,
    high_blood_pressure: 1,
    platelets: 120000,
    serum_creatinine: 1.9,
    serum_sodium: 130,
    sex: 0, // Female
    smoking: 0
  }
};

/**
 * Check if the FastAPI backend is running and has the model loaded.
 * @returns {Promise<boolean>}
 */
export async function checkApiHealth() {
  try {
    const response = await fetch(`${API_URL}/health`);
    if (!response.ok) return false;
    const data = await response.json();
    return !!data.model_loaded;
  } catch (error) {
    console.error('API health check failed:', error);
    return false;
  }
}

/**
 * Send clinical patient data to backend prediction endpoint.
 * Ensures fields are correctly parsed into floats and ints.
 * @param {Object} rawData 
 * @returns {Promise<Object>}
 */
export async function predictMortality(rawData) {
  const formattedData = {
    age: parseFloat(rawData.age),
    anaemia: parseInt(rawData.anaemia, 10),
    creatinine_phosphokinase: parseFloat(rawData.creatinine_phosphokinase),
    diabetes: parseInt(rawData.diabetes, 10),
    ejection_fraction: parseFloat(rawData.ejection_fraction),
    high_blood_pressure: parseInt(rawData.high_blood_pressure, 10),
    platelets: parseFloat(rawData.platelets),
    serum_creatinine: parseFloat(rawData.serum_creatinine),
    serum_sodium: parseFloat(rawData.serum_sodium),
    sex: parseInt(rawData.sex, 10),
    smoking: parseInt(rawData.smoking, 10)
  };

  // Validate all fields are provided and numeric
  const missingOrInvalid = [];
  for (const [key, value] of Object.entries(formattedData)) {
    if (value === null || value === undefined || isNaN(value)) {
      // Get user-friendly name
      const name = key.replace(/_/g, ' ');
      missingOrInvalid.push(name.charAt(0).toUpperCase() + name.slice(1));
    }
  }

  if (missingOrInvalid.length > 0) {
    throw new Error(`Missing or invalid value(s) for: ${missingOrInvalid.join(', ')}. Please ensure all fields are filled out correctly.`);
  }

  const response = await fetch(`${API_URL}/predict`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formattedData)
  });

  if (!response.ok) {
    let errorDetail;
    try {
      const errorJson = await response.json();
      errorDetail = errorJson.detail || JSON.stringify(errorJson);
    } catch {
      errorDetail = response.statusText;
    }
    throw new Error(errorDetail || 'Backend error');
  }

  return await response.json();
}
