import { useState } from 'react';
import axios from 'axios';
import './index.css';

function App() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const callGeminiAPI = async () => {
    if (!prompt.trim()) {
      setResponse('Lỗi: Vui lòng nhập câu hỏi');
      return;
    }
    console.log('API URL:', import.meta.env.VITE_API_URL); // Log URL
    console.log('Prompt gửi:', prompt); // Log prompt
    setLoading(true);
    setResponse('');
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/ask`, { prompt });
      setResponse(res.data.response);
    } catch (error) {
      console.error('Chi tiết lỗi:', error.response?.data || error.message); // Log lỗi
      setResponse(`Lỗi: ${error.response?.data?.error || error.message}`);
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <h1>Hỏi đáp bài viết với Gemini API</h1>
      <textarea
        placeholder="Nhập câu hỏi liên quan đến bài viết..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button onClick={callGeminiAPI} disabled={loading}>
        {loading ? 'Đang xử lý...' : 'Gửi'}
      </button>
      <div className="response">{response}</div>
    </div>
  );
}

export default App;