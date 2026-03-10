import { useState, useRef, useEffect } from 'react';
import Button from '../base/Button';

interface QRScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScanSuccess: (equipmentId: string) => void;
}

export default function QRScannerModal({ isOpen, onClose, onScanSuccess }: QRScannerModalProps) {
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState('');
  const [manualInput, setManualInput] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (isOpen && scanning) {
      startCamera();
    }
    return () => {
      stopCamera();
    };
  }, [isOpen, scanning]);

  const startCamera = async () => {
    try {
      setError('');
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      }
    } catch (err) {
      setError('Не удалось получить доступ к камере. Проверьте разрешения.');
      setScanning(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  const handleStartScan = () => {
    setScanning(true);
    setError('');
  };

  const handleStopScan = () => {
    setScanning(false);
    stopCamera();
  };

  const handleManualSubmit = () => {
    if (manualInput.trim()) {
      onScanSuccess(manualInput.trim());
      setManualInput('');
      onClose();
    }
  };

  const handleClose = () => {
    handleStopScan();
    setManualInput('');
    setError('');
    onClose();
  };

  // Симуляция успешного сканирования (в реальном проекте здесь будет библиотека для распознавания QR)
  const simulateScan = () => {
    const mockEquipmentId = 'EQ-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    onScanSuccess(mockEquipmentId);
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Сканирование QR-кода</h2>
            <p className="text-sm text-gray-600 mt-1">
              Наведите камеру на QR-код оборудования или введите ID вручную
            </p>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
          >
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Camera Scanner */}
          <div className="mb-6">
            <div className="bg-gray-900 rounded-lg overflow-hidden relative" style={{ height: '320px' }}>
              {scanning ? (
                <>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-64 h-64 border-4 border-blue-500 rounded-lg relative">
                      <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-blue-500"></div>
                      <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-blue-500"></div>
                      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-blue-500"></div>
                      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-blue-500"></div>
                    </div>
                  </div>
                  {/* Demo button */}
                  <button
                    onClick={simulateScan}
                    className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer"
                  >
                    <i className="ri-check-line mr-2"></i>
                    Симулировать сканирование
                  </button>
                </>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-white">
                  <div className="w-20 h-20 flex items-center justify-center bg-gray-800 rounded-full mb-4">
                    <i className="ri-qr-scan-2-line text-4xl"></i>
                  </div>
                  <p className="text-lg font-medium mb-2">Камера не активна</p>
                  <p className="text-sm text-gray-400">Нажмите кнопку ниже для начала сканирования</p>
                </div>
              )}
            </div>

            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start">
                <i className="ri-error-warning-line text-red-500 text-lg mr-2 mt-0.5"></i>
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <div className="mt-4 flex justify-center">
              {!scanning ? (
                <Button onClick={handleStartScan}>
                  <i className="ri-camera-line mr-2"></i>
                  Начать сканирование
                </Button>
              ) : (
                <Button variant="outline" onClick={handleStopScan}>
                  <i className="ri-stop-circle-line mr-2"></i>
                  Остановить
                </Button>
              )}
            </div>
          </div>

          {/* Manual Input */}
          <div className="border-t pt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Или введите ID оборудования вручную
            </label>
            <div className="flex space-x-3">
              <input
                type="text"
                value={manualInput}
                onChange={(e) => setManualInput(e.target.value)}
                placeholder="Например: EQ-12345"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                onKeyPress={(e) => e.key === 'Enter' && handleManualSubmit()}
              />
              <Button onClick={handleManualSubmit} disabled={!manualInput.trim()}>
                <i className="ri-search-line mr-2"></i>
                Найти
              </Button>
            </div>
          </div>

          {/* Info */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-start">
              <div className="w-5 h-5 flex items-center justify-center">
                <i className="ri-information-line text-blue-600"></i>
              </div>
              <div className="ml-3">
                <h4 className="text-sm font-medium text-blue-900 mb-1">Как это работает?</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Наведите камеру на QR-код, прикрепленный к оборудованию</li>
                  <li>• Система автоматически распознает код и откроет карточку оборудования</li>
                  <li>• Если QR-код не читается, введите ID вручную</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end p-6 border-t bg-gray-50">
          <Button variant="outline" onClick={handleClose}>
            Закрыть
          </Button>
        </div>
      </div>
    </div>
  );
}
