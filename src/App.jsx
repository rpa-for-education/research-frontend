import { useState } from 'react';
import axios from 'axios';
import './index.css';

function App() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [modelType, setModelType] = useState('qwen'); // qwen mặc định

  const callAPI = async () => {
    if (!prompt.trim()) {
      setResponse('Lỗi: Vui lòng nhập câu hỏi');
      return;
    }

    setLoading(true);
    setResponse('');

    try {
      const res = await axios.post(
        `https://neu-research-backend.vercel.app/api/ask`,
        { prompt, modelType }
      );
      setResponse(res.data.response);
    } catch (error) {
      console.error('Chi tiết lỗi:', error.response?.data || error.message);
      setResponse(`Lỗi: ${error.response?.data?.error || error.message}`);
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <h1>Hỏi đáp sự kiện khoa học</h1>

      {/* Chọn model */}
      <div className="model-select">
        <label>Chọn mô hình: </label>
        <select value={modelType} onChange={(e) => setModelType(e.target.value)}>
          <option value="qwen">Qwen</option>
          <option value="gemini">Gemini</option>
        </select>
      </div>

      <textarea
        placeholder="Nhập câu hỏi liên quan đến sự kiện khoa học..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button onClick={callAPI} disabled={loading}>
        {loading ? 'Đang xử lý...' : 'Gửi'}
      </button>

      <div className="response">{response}</div>
    </div>
  );
}

export default App;
