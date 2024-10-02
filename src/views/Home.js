import React, { useState, useEffect } from "react";
import axios from 'axios';
import ErrorAlert from "../components/ErrorAlert.js";
import CloseableErrorAlert from "../components/CloseableErrorAlert.js";
import CloseableSuccessAlert from "../components/CloseableSuccessAlert.js";

const Home = () => {
    const [prompt, setPrompt] = useState('');
    const [apiKey, setApiKey] = useState('');
    const [fileType, setFileType] = useState('csv');
    const [alert, setAlert] = useState({ type: '', visible: false });
    const [inputError, setInputError] = useState({ inputName: '', value: false });
    const [isButtonDisabled, setButtonDisabled] = useState(false);

    useEffect(() => {
        chrome.storage.sync.get('api_key', ({ api_key }) => {
            if (api_key) {
                setApiKey(api_key);
                setButtonDisabled(false);
            } else {
                setAlert({ type: 'apiKeyError', visible: true });
                setButtonDisabled(true);
            }
        });
    }, []);

    const handleRadioFileTypeChange = (value) => setFileType(value);

    const handlePromptChange = (value) => {
        setPrompt(value);
        if (!value.trim()) {
            setInputError({ inputName: 'prompt', value: true })
        } else {
            setInputError({ inputName: 'prompt', value: false })
        }
    }

    const sendRequest = async () => {
        if (!prompt.trim()) {
            setInputError({ inputName: 'prompt', value: true })
        } else {
            try {
                const data = {
                    url: await getActiveTabUrl(),
                    prompt,
                    schema: {}
                };

                const headers = {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'SG-APIKEY': apiKey
                };

                const response = await axios.post("https://api.scrapegraphai.com/smart_scraper", data, { headers });
                setAlert({ type: 'requestSuccess', visible: true });

                if (fileType === 'csv') {
                    downloadCsvFile(response.data.result);
                } else if (fileType === 'json') {
                    downloadJsonFile(response.data.result);
                }
            } catch (error) {
                console.error("Request error", error);
                setAlert({ type: 'requestError', visible: true });
            }
        }
    };

    const downloadFile = (data, fileName, mimeType) => {
        const blob = new Blob([data], { type: mimeType });
        const url = URL.createObjectURL(blob);

        chrome.downloads.download({ url, filename: fileName }, () => {
            URL.revokeObjectURL(url);
        });
    };

    const downloadJsonFile = (responseData) => {
        const jsonData = JSON.stringify(responseData);
        downloadFile(jsonData, 'data.json', 'application/json');
    };

    const downloadCsvFile = async (responseData) => {
        // TODO
        const csv = "";
        downloadFile(csv, 'data.csv', 'text/csv;charset=utf-8');
    };

    const getActiveTabUrl = async () => {
        const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
        return activeTab.url;
    };

    return (
        <div className="p-6">
            {alert.visible && alert.type === 'apiKeyError' && <ErrorAlert message="API Key is not set, please go to settings." />}
            {alert.visible && alert.type === 'requestError' && <CloseableErrorAlert onClose={() => setAlert({ ...alert, visible: false })} message="Error occurred while processing your request." />}
            {alert.visible && alert.type === 'requestSuccess' && <CloseableSuccessAlert onClose={() => setAlert({ ...alert, visible: false })} message="Request processed successfully!" />}

            <label htmlFor="prompt" className="block text-sm font-bold text-gray-900">Describe what you want</label>
            <textarea
                value={prompt}
                onChange={(e) => handlePromptChange(e.target.value)}
                id="prompt"
                rows="4"
                className={`block mt-2 mr-2 p-2.5 w-full text-sm text-gray-900 rounded-lg border
                    ${inputError.value && inputError.inputName === 'prompt' ? 'bg-red-50 border-red-500 focus:outline-red-500 focus:border-red-500' : 'bg-gray-50 border-gray-300 focus:outline-gray-300 focus:border-gray-300'}`}
                placeholder="Write your thoughts here..."
            />
            {inputError.value && inputError.inputName === "prompt" && <p className="mt-1 text-xs text-red-600">The prompt cannot be empty!</p>}

            <label htmlFor="exportFormat" className="block mt-5 text-sm font-bold text-gray-900">Choose an export format</label>
            <ul id="exportFormat" className="items-center mt-2 w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg">
                {['csv', 'json'].map((type) => (
                    <li key={type} className="w-full border-b border-gray-200">
                        <div className="flex items-center ps-3">
                            <input
                                id={`horizontal-list-radio-${type}`}
                                type="radio"
                                checked={fileType === type}
                                onChange={() => handleRadioFileTypeChange(type)}
                                value={type}
                                name="fileType"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                            />
                            <label htmlFor={`horizontal-list-radio-${type}`} className="w-full py-3 ms-2 text-sm font-medium text-gray-900">{type.toUpperCase()}</label>
                        </div>
                    </li>
                ))}
            </ul>

            <button
                onClick={sendRequest}
                type="button"
                className="text-white mt-4 bg-green-700 disabled:bg-green-200 disabled:cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                disabled={isButtonDisabled}>
                Scrape
            </button>
        </div>
    );
};

export default Home;