// DOM Elements
const apiKeyInput = document.getElementById('apiKey');
const toggleApiKeyBtn = document.getElementById('toggleApiKey');
const uploadBtn = document.getElementById('uploadBtn');
const imageInput = document.getElementById('imageInput');
const imagePreview = document.getElementById('imagePreview');
const previewImg = document.getElementById('previewImg');
const removeImageBtn = document.getElementById('removeImage');
const analyzeContainer = document.getElementById('analyzeContainer');
const analyzeBtn = document.getElementById('analyzeBtn');
const loadingSpinner = document.getElementById('loadingSpinner');
const resultsSection = document.getElementById('resultsSection');
const resultsContent = document.getElementById('resultsContent');
const errorMessage = document.getElementById('errorMessage');
const installPrompt = document.getElementById('installPrompt');
const installButton = document.getElementById('installButton');
const closeInstallPrompt = document.getElementById('closeInstallPrompt');

// State
let selectedImageBase64 = null;
let selectedImageMimeType = null;
let deferredPrompt = null;

// Constants
const API_KEY_STORAGE_KEY = 'gemini_api_key';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1alpha/models/gemini-3.5-flash:generateContent';
const NUTRITION_PROMPT = 'Kamu adalah ahli gizi profesional. Analisis foto makanan ini dengan sangat teliti, sebutkan nama makanannya, perkiraan porsinya, dan berikan estimasi jumlah Kalori, Protein, Karbohidrat, dan Lemak dalam bentuk list yang rapi dan scannable. Gunakan bahasa Indonesia yang ramah, santun, dan informatif.';

// Initialize App
function initApp() {
    loadApiKeyFromStorage();
    attachEventListeners();
    registerServiceWorker();
    setupPWAInstall();
}

// Load API Key from localStorage
function loadApiKeyFromStorage() {
    const savedApiKey = localStorage.getItem(API_KEY_STORAGE_KEY);
    if (savedApiKey) {
        apiKeyInput.value = savedApiKey;
    }
}

// Save API Key to localStorage
function saveApiKeyToStorage() {
    const apiKey = apiKeyInput.value.trim();
    if (apiKey) {
        localStorage.setItem(API_KEY_STORAGE_KEY, apiKey);
    }
}

// Attach Event Listeners
function attachEventListeners() {
    // Toggle API Key visibility
    toggleApiKeyBtn.addEventListener('click', toggleApiKeyVisibility);

    // Save API Key on input change
    apiKeyInput.addEventListener('change', saveApiKeyToStorage);
    apiKeyInput.addEventListener('blur', saveApiKeyToStorage);

    // Upload button
    uploadBtn.addEventListener('click', () => imageInput.click());

    // Image input change
    imageInput.addEventListener('change', handleImageSelection);

    // Remove image
    removeImageBtn.addEventListener('click', clearImage);

    // Analyze button
    analyzeBtn.addEventListener('click', analyzeImage);
}

// Toggle API Key Visibility
function toggleApiKeyVisibility() {
    const type = apiKeyInput.type === 'password' ? 'text' : 'password';
    apiKeyInput.type = type;
    toggleApiKeyBtn.textContent = type === 'password' ? '👁️' : '🙈';
}

// Handle Image Selection
function handleImageSelection(event) {
    const file = event.target.files[0];
    
    if (!file) {
        return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
        showError('File yang dipilih bukan gambar. Silakan pilih file gambar.');
        return;
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
        showError('Ukuran file terlalu besar. Maksimal 10MB.');
        return;
    }

    // Read and display image
    const reader = new FileReader();
    
    reader.onload = function(e) {
        previewImg.src = e.target.result;
        imagePreview.classList.remove('hidden');
        analyzeContainer.classList.remove('hidden');
        hideError();
        hideResults();
        
        // Convert to base64 for API
        convertImageToBase64(file);
    };

    reader.onerror = function() {
        showError('Gagal membaca file gambar. Silakan coba lagi.');
    };

    reader.readAsDataURL(file);
}

// Convert Image to Base64
function convertImageToBase64(file) {
    const reader = new FileReader();
    
    reader.onload = function(e) {
        // Extract base64 data (remove data:image/xxx;base64, prefix)
        const base64String = e.target.result.split(',')[1];
        selectedImageBase64 = base64String;
        selectedImageMimeType = file.type;
    };

    reader.onerror = function() {
        showError('Gagal mengkonversi gambar. Silakan coba lagi.');
    };

    reader.readAsDataURL(file);
}

// Clear Image
function clearImage() {
    imageInput.value = '';
    previewImg.src = '';
    imagePreview.classList.add('hidden');
    analyzeContainer.classList.add('hidden');
    selectedImageBase64 = null;
    selectedImageMimeType = null;
    hideResults();
    hideError();
}

// Analyze Image
async function analyzeImage() {
    // Validate API Key
    const apiKey = apiKeyInput.value.trim();
    if (!apiKey) {
        showError('Silakan masukkan API Key Anda terlebih dahulu.');
        apiKeyInput.focus();
        return;
    }

    // Validate Image
    if (!selectedImageBase64) {
        showError('Silakan pilih gambar terlebih dahulu.');
        return;
    }

    // Show loading
    showLoading();
    hideError();
    hideResults();

    try {
        // Prepare API request
        const requestBody = {
            contents: [
                {
                    parts: [
                        {
                            text: NUTRITION_PROMPT
                        },
                        {
                            inline_data: {
                                mime_type: selectedImageMimeType,
                                data: selectedImageBase64
                            }
                        }
                    ]
                }
            ],
            generationConfig: {
                temperature: 0.4,
                topK: 32,
                topP: 1,
                maxOutputTokens: 2048,
            }
        };

        // Make API request
        const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        });

        // Handle response
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error?.message || `API Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        // Extract text from response
        const resultText = extractTextFromResponse(data);

        if (!resultText) {
            throw new Error('Tidak ada hasil analisis yang diterima dari API.');
        }

        // Display results
        displayResults(resultText);

    } catch (error) {
        console.error('Error analyzing image:', error);
        handleAnalysisError(error);
    } finally {
        hideLoading();
    }
}

// Extract Text from API Response
function extractTextFromResponse(data) {
    try {
        if (data.candidates && data.candidates.length > 0) {
            const candidate = data.candidates[0];
            if (candidate.content && candidate.content.parts && candidate.content.parts.length > 0) {
                return candidate.content.parts[0].text;
            }
        }
        return null;
    } catch (error) {
        console.error('Error extracting text from response:', error);
        return null;
    }
}

// Display Results
function displayResults(text) {
    // Convert markdown-like formatting to HTML
    const formattedText = formatTextToHTML(text);
    resultsContent.innerHTML = formattedText;
    resultsSection.classList.remove('hidden');
    
    // Scroll to results
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Format Text to HTML
function formatTextToHTML(text) {
    // Replace **bold** with <strong>
    text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    
    // Replace *italic* with <em>
    text = text.replace(/\*(.+?)\*/g, '<em>$1</em>');
    
    // Convert line breaks to <br>
    text = text.replace(/\n/g, '<br>');
    
    // Convert bullet points (- or *) to list items
    const lines = text.split('<br>');
    let inList = false;
    let formattedLines = [];
    
    for (let line of lines) {
        const trimmedLine = line.trim();
        
        // Check if line starts with bullet point
        if (trimmedLine.match(/^[-*]\s+/)) {
            if (!inList) {
                formattedLines.push('<ul>');
                inList = true;
            }
            const listItem = trimmedLine.replace(/^[-*]\s+/, '');
            formattedLines.push(`<li>${listItem}</li>`);
        } else {
            if (inList) {
                formattedLines.push('</ul>');
                inList = false;
            }
            if (trimmedLine) {
                // Check if it looks like a heading (all caps or ends with :)
                if (trimmedLine.match(/^[A-Z\s]+:?$/) || trimmedLine.endsWith(':')) {
                    formattedLines.push(`<h3>${trimmedLine}</h3>`);
                } else {
                    formattedLines.push(`<p>${line}</p>`);
                }
            }
        }
    }
    
    // Close list if still open
    if (inList) {
        formattedLines.push('</ul>');
    }
    
    return formattedLines.join('');
}

// Handle Analysis Error
function handleAnalysisError(error) {
    let errorMsg = 'Terjadi kesalahan saat menganalisis gambar. ';
    
    if (error.message.includes('API_KEY_INVALID') || error.message.includes('API key not valid')) {
        errorMsg += 'API Key tidak valid. Silakan periksa kembali API Key Anda.';
    } else if (error.message.includes('PERMISSION_DENIED')) {
        errorMsg += 'API Key tidak memiliki izin yang diperlukan.';
    } else if (error.message.includes('RESOURCE_EXHAUSTED') || error.message.includes('quota')) {
        errorMsg += 'Kuota API Anda telah habis. Silakan coba lagi nanti.';
    } else if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        errorMsg += 'Gagal terhubung ke server. Periksa koneksi internet Anda.';
    } else {
        errorMsg += error.message || 'Silakan coba lagi.';
    }
    
    showError(errorMsg);
}

// Show Loading
function showLoading() {
    loadingSpinner.classList.remove('hidden');
    analyzeBtn.disabled = true;
    analyzeBtn.style.opacity = '0.6';
    analyzeBtn.style.cursor = 'not-allowed';
}

// Hide Loading
function hideLoading() {
    loadingSpinner.classList.add('hidden');
    analyzeBtn.disabled = false;
    analyzeBtn.style.opacity = '1';
    analyzeBtn.style.cursor = 'pointer';
}

// Show Error
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
    
    // Auto-hide after 8 seconds
    setTimeout(() => {
        hideError();
    }, 8000);
}

// Hide Error
function hideError() {
    errorMessage.classList.add('hidden');
}

// Hide Results
function hideResults() {
    resultsSection.classList.add('hidden');
}

// Register Service Worker
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/service-worker.js')
                .then((registration) => {
                    console.log('Service Worker registered successfully:', registration.scope);
                    
                    // Check for updates
                    registration.addEventListener('updatefound', () => {
                        const newWorker = registration.installing;
                        newWorker.addEventListener('statechange', () => {
                            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                // New service worker available
                                if (confirm('Versi baru tersedia! Refresh untuk update?')) {
                                    newWorker.postMessage({ type: 'SKIP_WAITING' });
                                    window.location.reload();
                                }
                            }
                        });
                    });
                })
                .catch((error) => {
                    console.log('Service Worker registration failed:', error);
                });
        });
    }
}

// Setup PWA Install
function setupPWAInstall() {
    // Listen for beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', (e) => {
        // Prevent the mini-infobar from appearing on mobile
        e.preventDefault();
        
        // Store the event for later use
        deferredPrompt = e;
        
        // Show custom install prompt after 3 seconds
        setTimeout(() => {
            showInstallPrompt();
        }, 3000);
    });

    // Install button click
    if (installButton) {
        installButton.addEventListener('click', async () => {
            if (!deferredPrompt) {
                return;
            }

            // Show the install prompt
            deferredPrompt.prompt();

            // Wait for the user's response
            const { outcome } = await deferredPrompt.userChoice;
            
            console.log(`User response to install prompt: ${outcome}`);

            // Clear the deferredPrompt
            deferredPrompt = null;
            
            // Hide the install prompt
            hideInstallPrompt();
        });
    }

    // Close install prompt
    if (closeInstallPrompt) {
        closeInstallPrompt.addEventListener('click', hideInstallPrompt);
    }

    // Listen for app installed event
    window.addEventListener('appinstalled', () => {
        console.log('PWA installed successfully');
        hideInstallPrompt();
        deferredPrompt = null;
    });
}

// Show Install Prompt
function showInstallPrompt() {
    // Don't show if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
        return;
    }
    
    // Don't show if user dismissed it before
    const dismissed = localStorage.getItem('install_prompt_dismissed');
    if (dismissed) {
        return;
    }
    
    if (installPrompt) {
        installPrompt.classList.remove('hidden');
    }
}

// Hide Install Prompt
function hideInstallPrompt() {
    if (installPrompt) {
        installPrompt.classList.add('hidden');
        localStorage.setItem('install_prompt_dismissed', 'true');
    }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
