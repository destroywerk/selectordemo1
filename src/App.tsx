import React from 'react';
import PeopleSelectorContent from './components/PeopleSelectorContent';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="h-[800px] rounded-lg border-2 border-gray-200 bg-white overflow-hidden">
            <PeopleSelectorContent />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App; 