import React, { useState, useEffect } from 'react';
import { OpportunityReport } from './types';
import Modal from './components/Modal';
import ReportForm from './components/ReportForm';
import ReportCard from './components/ReportCard';
import ReportDetails from './components/ReportDetails';
import { PlusCircle, Search } from 'lucide-react';
import { API_URL } from './config';

function App() {
  const [reports, setReports] = useState<OpportunityReport[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'todos' | 'abierto' | 'en proceso' | 'cerrado'>('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await fetch(`${API_URL}/api/reports`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setReports(data.map((report: any) => ({
        id: report.id.toString(),
        guestName: report.nombre,
        roomNumber: report.numero_habitacion.toString(),
        reservationNumber: report.folio,
        reportedBy: report.reportadopor,
        department: report.departamento,
        arrivalDate: report.fecha_entrada,
        departureDate: report.fecha_salida,
        incidentReport: report.descripcion_reporte,
        guestMood: report.estado_animo,
        updates: [],
        status: report.estado_oportunidad,
        agency: report.agencia,
        createdAt: report.fecha_creacion,
      })));
      setError(null);
    } catch (error) {
      console.error('Error fetching reports:', error);
      setError('Error al cargar los reportes. Por favor, intente de nuevo más tarde.');
    }
  };

  // ... (rest of the component remains the same)

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-100">Registro de Reportes de Oportunidad</h1>
        {error && (
          <div className="bg-red-600 text-white p-4 rounded-lg mb-4">
            {error}
          </div>
        )}
        {/* ... (rest of the JSX remains the same) */}
      </div>
    </div>
  );
}

export default App;