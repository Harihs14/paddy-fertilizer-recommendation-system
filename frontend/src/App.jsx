import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import options from './assets/frontend_options.json';
import CustomMarkdown from './CustomMarkdown';
import Together from "together-ai";

const Combobox = ({ name, value, onChange, options, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(value);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const filtered = options.filter(option =>
      option.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOptions(filtered);
  }, [searchTerm, options]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
        inputRef.current && !inputRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    onChange({ target: { name, value: e.target.value } });
    if (!isOpen) setIsOpen(true);
  };

  const handleSelectOption = (option) => {
    setSearchTerm(option);
    onChange({ target: { name, value: option } });
    setIsOpen(false);
    inputRef.current.focus();
  };

  return (
    <div className="relative">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          className="w-full p-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
          placeholder={placeholder}
        />
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {isOpen && filteredOptions.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto"
        >
          <ul className="py-1">
            {filteredOptions.map((option, index) => (
              <li
                key={index}
                onClick={() => handleSelectOption(option)}
                className="px-3 py-2 hover:bg-green-50 cursor-pointer transition"
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// Loading spinner component for reuse
const LoadingSpinner = () => (
  <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

const App = () => {
  const [formData, setFormData] = useState({
    "Plant Name": "",
    "Soil Type": "",
    "pH Level": "",
    "Climate": "",
    "Irrigation Type": "",
    "Organic Matter %": ""
  });
  const [temperature, setTemperature] = useState('24.6');
  const [humidity, setHumidity] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [genAiLoading, setGenAiLoading] = useState(false);
  const [error, setError] = useState(null);
  const [genAiError, setGenAiError] = useState(null);
  const [genAiResult, setGenAiResult] = useState('');
  const [serverOnline, setServerOnline] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/health') // Use your Render URL in production
      .then(res => {
        if (res.ok) {
          setServerOnline(true);
        } else {
          setServerOnline(false);
        }
      })
      .catch(() => {
        setServerOnline(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const together = new Together({ apiKey: import.meta.env.VITE_TOGETHER_API_KEY });

  const handleGenAi = async (fertilizer) => {
    if (!fertilizer) return;

    setGenAiLoading(true);
    setGenAiError(null);

    try {
      const user_prompt = `
      You are an expert Paddy fertilizer expert.
      Recommend about the fertilizer that is suggested from the decision tree, based on the input.
      model input: ${JSON.stringify(formData)}, ${temperature}, ${humidity}.
      model result: use ${fertilizer}.

      Your job is to describe what fertilizer it is, how it works, and how to use it. 
      expected output format:

      ## About ${fertilizer}:
      <In 5 to 8 lines>

      ## How it works:
      <In 5 to 8 lines>

      ## How to use it:
      <In 5 to 8 lines, usually tell how to and how much to use it and what combinations of fertilizers can be used to get best results.>
      
      Recommended Combinations of Fertilizers:
      <Recommended Combinations of Fertilizers for optimal Paddy growth>
      STRICTLY OUTPUT THE EXPECTED FORMAT ONLY. AVOID UN NECESSERY EXPLANATIONS AND PREFIX OR SUFFIX. GIVE RESULT IN CORRECT MARKDOWN FORMAT.
      `;

      const response = await together.chat.completions.create({
        messages: [{ "role": "user", "content": user_prompt }],
        model: "meta-llama/Llama-3.2-3B-Instruct-Turbo"
      });

      setGenAiResult(response.choices[0].message.content);
    } catch (err) {
      console.error("GenAI Error:", err);
      setGenAiError("Failed to generate fertilizer details. Please try again.");
    } finally {
      setGenAiLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setGenAiResult('');
    setGenAiError(null);

    try {
      const res = await axios.post("http://127.0.0.1:5000/predict", formData);
      const recommendedFertilizer = res.data.recommended_fertilizer;
      setResult(recommendedFertilizer);
      handleGenAi(recommendedFertilizer);
    } catch (err) {
      console.error("Prediction Error:", err);
      setError("Failed to get recommendation. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex flex-col items-center p-6">
      <div className="w-full max-w-2xl">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-800 font-sans">Paddy Fertilizer Recommendation🌾</h1>
          <p className="text-gray-600 mt-2">Find the perfect fertilizer for your paddy based on soil and environmental conditions</p>
        </header>

        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Paddy Name</label>
                <Combobox
                  name="Plant Name"
                  value={formData["Plant Name"]}
                  onChange={handleChange}
                  options={options["Plant Name"] || []}
                  placeholder="Select or type plant name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Soil Type</label>
                <Combobox
                  name="Soil Type"
                  value={formData["Soil Type"]}
                  onChange={handleChange}
                  options={options["Soil Type"] || []}
                  placeholder="Select or type soil type"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Climate</label>
                <Combobox
                  name="Climate"
                  value={formData["Climate"]}
                  onChange={handleChange}
                  options={options["Climate"] || []}
                  placeholder="Select or type climate"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Irrigation Type</label>
                <select
                  name="Irrigation Type"
                  className="w-full p-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                  value={formData["Irrigation Type"]}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Irrigation Type</option>
                  {options["Irrigation Type"]?.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Humidity %</label>
                <input
                  type="number"
                  name="Humidity"
                  step="0.1"
                  min="0"
                  max="100"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                  value={humidity}
                  onChange={(e) => setHumidity(e.target.value)}
                  placeholder="Enter Humidity Level (0%-100%)"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Temperature</label>
                <input
                  type="number"
                  name="Temperature"
                  step="0.1"
                  min="0"
                  max="50"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                  value={temperature}
                  onChange={(e) => setTemperature(e.target.value)}
                  placeholder="Temperature (0-40C)"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">pH Level</label>
                <input
                  type="number"
                  name="pH Level"
                  step="0.1"
                  min="0"
                  max="14"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                  value={formData["pH Level"]}
                  onChange={handleChange}
                  placeholder="Enter pH level (0-14)"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Organic Matter %</label>
                <input
                  type="number"
                  name="Organic Matter %"
                  step="0.1"
                  min="0"
                  max="100"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                  value={formData["Organic Matter %"]}
                  onChange={handleChange}
                  placeholder="Enter organic matter percentage"
                  required
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading || genAiLoading}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-md transition-colors duration-200 flex justify-center items-center shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {(loading || genAiLoading) && <LoadingSpinner />}
                {loading || genAiLoading ? "Processing..." : "Get Recommendation"}
              </button>
            </div>
          </form>
        </div>

        {error && (
          <div className="mt-6 bg-red-50 border border-red-200 p-4 rounded-lg shadow w-full text-center">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {result && !error && (
          <div className="mt-6 bg-green-50 border border-green-200 p-6 rounded-lg shadow-md w-full">
            <h2 className="text-2xl font-bold text-green-800 mb-4 text-center">Recommendation Results</h2>

            <div className="bg-white rounded-md p-4 mb-6">
              <h3 className="text-lg font-semibold text-green-700 mb-2">Recommended Fertilizer:</h3>
              <p className="text-xl font-medium text-green-800">{result}</p>
            </div>

            {genAiLoading && (
              <div className="bg-white rounded-md p-6 text-center">
                <div className="flex flex-col items-center justify-center space-y-3">
                  <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-green-500"></div>
                  <p className="text-gray-600">Generating fertilizer details...</p>
                </div>
              </div>
            )}

            {genAiError && (
              <div className="bg-red-50 border border-red-200 p-4 rounded-md text-center">
                <p className="text-red-700">{genAiError}</p>
              </div>
            )}

            {genAiResult && !genAiLoading && (
              <div className="bg-white rounded-md p-4 prose prose-green max-w-none">
                <h3 className="text-lg font-semibold text-green-700 mb-2">Detailed Information:</h3>
                <CustomMarkdown markdown={genAiResult} />
              </div>
            )}

            <p className="mt-4 text-sm text-gray-600 text-center">Based on your input parameters, this is the optimal fertilizer for your Paddy.</p>
          </div>
        )}
      </div>

      <div className={`fixed bottom-4 right-4 p-2 text-sm font-semibold w-fit rounded ${serverOnline === null ? 'bg-gray-400' : serverOnline ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
        Server : {serverOnline === null ? 'Checking...' : serverOnline ? 'Online' : 'Offline'}
      </div>

      <footer className="mt-12 text-center text-gray-600 text-sm">
        <p>© {new Date().getFullYear()} Paddy Fertilizer Recommendation System</p>
      </footer>
    </div>
  );
};

export default App;