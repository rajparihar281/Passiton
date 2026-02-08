import { useState, useRef, useEffect } from 'react';
import { MainLayout } from '../layouts/MainLayout';

export const DashboardPage = () => {
  const [activeSection, setActiveSection] = useState<'service' | 'resources'>('service');
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    
    if (Math.abs(diff) > 50) {
      if (diff > 0 && activeSection === 'service') {
        setActiveSection('resources');
      } else if (diff < 0 && activeSection === 'resources') {
        setActiveSection('service');
      }
    }
    setIsDragging(false);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setStartX(e.clientX);
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const endX = e.clientX;
    const diff = startX - endX;
    
    if (Math.abs(diff) > 50) {
      if (diff > 0 && activeSection === 'service') {
        setActiveSection('resources');
      } else if (diff < 0 && activeSection === 'resources') {
        setActiveSection('service');
      }
    }
    setIsDragging(false);
  };

  return (
    <MainLayout>
      <div className="h-full flex flex-col">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <button
            onClick={() => setActiveSection('service')}
            className={`p-6 rounded-lg font-semibold text-lg transition-all ${
              activeSection === 'service'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Service
          </button>
          <button
            onClick={() => setActiveSection('resources')}
            className={`p-6 rounded-lg font-semibold text-lg transition-all ${
              activeSection === 'resources'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Resources
          </button>
        </div>

        <div
          ref={containerRef}
          className="flex-1 bg-white rounded-lg shadow p-6 overflow-hidden cursor-grab active:cursor-grabbing"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={() => setIsDragging(false)}
        >
          <div className={`transition-opacity duration-300 ${
            activeSection === 'service' ? 'opacity-100' : 'opacity-0 hidden'
          }`}>
            <h2 className="text-2xl font-bold mb-4">Service</h2>
            <p className="text-gray-600">Service content goes here.</p>
          </div>
          <div className={`transition-opacity duration-300 ${
            activeSection === 'resources' ? 'opacity-100' : 'opacity-0 hidden'
          }`}>
            <h2 className="text-2xl font-bold mb-4">Resources</h2>
            <p className="text-gray-600">Resources content goes here.</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
