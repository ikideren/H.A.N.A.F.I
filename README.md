# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.




# Heart Failure Mortality Risk Prediction

## About the Project

This project focuses on predicting heart failure mortality risk using machine learning techniques. By analyzing clinical and health-related parameters, the system aims to assist medical professionals in identifying high-risk patients early, evaluating survival factors, and supporting data-driven clinical decisions.

## Machine Learning Workflow

1. Data Collection & Survey: Gathering clinical datasets and relevant survey data parameters.
2. Exploratory Data Analysis (EDA): Inspecting distributions, correlations, and cleaning data features.
3. Preprocessing: Handling missing values, scaling features, and data encoding.
4. Model Training & Tuning: Training and optimizing various classification algorithms (such as Logistic Regression, Decision Trees, SVM, and Neural Networks).
5. Model Evaluation: Assessing model performance using key metrics (Accuracy, Precision, Recall, F1-Score).
6. Deployment: Integrating the trained model into a functional application interface.

## Tech Stack & Tools

- Language: Python
- Libraries: Scikit-Learn, Pandas, NumPy, Matplotlib/Seaborn
- Backend & Deployment: Flask / FastAPI / Streamlit (or relevant framework)

## Project Structure

heart-failure-prediction/
├── dataset/
├── notebooks/
├── src/
│   ├── data_preprocessing.py
│   ├── train.py
│   └── evaluate.py
├── app.py
├── requirements.txt
└── README.md

## Getting Started Locally

1. Clone the repository:
   git clone https://github.com/ikideren/heart-failure-mortality-risk.git
   cd heart-failure-mortality-risk

2. Install dependencies:
   pip install -r requirements.txt

3. Run the application:
   python app.py

## Team & Responsibilities

- Rafly – Model Training & Backend
- Darren – Deployment
- Anggit – Data Collection & Frontend Development
- Jozio – Frontend & Survey Data Collection
- Tian – Model Evaluation, Documentation & Testing