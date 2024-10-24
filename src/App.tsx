import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { KanbanBoard } from './components/KanbanBoard';
import { SignIn } from './components/SignIn';
import { ThemeProvider } from './context/ThemeContext';
import { ContentItem, ViewMode, Platform, Status, FilterOptions } from './types';
import { loadFromSheets, updateStatus } from './services/sheets';
import { AdvancedFilters } from './components/AdvancedFilters';
import { ExportMenu } from './components/ExportMenu';
import toast from 'react-hot-toast';

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [items, setItems] = useState<ContentItem[]>([]);
  const [currentView, setCurrentView] = useState<ViewMode>('list');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<FilterOptions>({});
  const [selectedContentId, setSelectedContentId] = useState<string | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);

  const dashboardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        setIsLoading(true);
        const data = await loadFromSheets();
        setItems(data);
      } catch (error) {
        console.error('Error loading content:', error);
        toast.error('Failed to load content');
      } finally {
        setIsLoading(false);
      }
    };
    loadContent();
  }, []);

  const handleApprove = async (id: string) => {
    try {
      await updateStatus(id, 'Approved');
      setItems(prevItems => prevItems.map(item =>
        item.id === id ? { 
          ...item, 
          status: 'Approved',
          dateApproved: new Date().toISOString(),
          approvedBy: 'Hamza'
        } : item
      ));
      toast.success('Content approved successfully');
    } catch (error) {
      console.error('Error approving content:', error);
      toast.error('Failed to approve content');
    }
  };

  const handleRequestChanges = async (id: string, feedback: string) => {
    try {
      await updateStatus(id, 'Changes Requested', feedback);
      setItems(prevItems => prevItems.map(item =>
        item.id === id ? {
          ...item,
          status: 'Changes Requested',
          lastFeedback: feedback,
          lastFeedbackDate: new Date().toISOString()
        } : item
      ));
      toast.success('Changes requested successfully');
    } catch (error) {
      console.error('Error requesting changes:', error);
      toast.error('Failed to request changes');
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: Status) => {
    try {
      await updateStatus(id, newStatus);
      setItems(prevItems => prevItems.map(item =>
        item.id === id ? { 
          ...item, 
          status: newStatus,
          updatedAt: new Date().toISOString()
        } : item
      ));
      toast.success(`Status updated to ${newStatus}`);
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    }
  };

  const handleNotificationClick = (contentId: string) => {
    const item = items.find(item => item.id === contentId);
    if (item) {
      setSelectedItem(item);
      setIsViewModalOpen(true);
      setCurrentView('list'); // Switch to list view to show the item
      
      // Scroll to the item's section based on status
      if (dashboardRef.current) {
        const section = dashboardRef.current.querySelector(`[data-status="${item.status}"]`);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }
  };

  const filteredItems = items.filter(item => {
    if (selectedPlatform && item.platform !== selectedPlatform) return false;
    if (filters.platform && item.platform !== filters.platform) return false;
    if (filters.status && item.status !== filters.status) return false;
    if (filters.topic && !item.topic.toLowerCase().includes(filters.topic.toLowerCase())) return false;
    if (filters.dateRange) {
      const itemDate = new Date(item.createdAt);
      if (itemDate < filters.dateRange.start || itemDate > filters.dateRange.end) return false;
    }
    return true;
  });

  if (!isSignedIn) {
    return (
      <ThemeProvider>
        <SignIn onSignIn={setIsSignedIn} />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <Header
          onSignOut={() => setIsSignedIn(false)}
          onFilterChange={setSelectedPlatform}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          isSidebarOpen={isSidebarOpen}
          onNotificationClick={handleNotificationClick}
        />
        
        <Sidebar
          currentView={currentView}
          onViewChange={setCurrentView}
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        <main className={`transition-all duration-300 ${isSidebarOpen ? 'ml-48' : 'ml-16'}`}>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8" ref={dashboardRef}>
            {/* Filters and Export */}
            <div className="mb-6 flex justify-between items-center">
              <AdvancedFilters filters={filters} onFilterChange={setFilters} />
              <ExportMenu items={filteredItems} />
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              </div>
            ) : currentView === 'list' ? (
              <Dashboard
                items={filteredItems}
                onApprove={handleApprove}
                onRequestChanges={handleRequestChanges}
                onUpdateStatus={handleUpdateStatus}
                selectedItem={selectedItem}
                isViewModalOpen={isViewModalOpen}
                onCloseModal={() => {
                  setIsViewModalOpen(false);
                  setSelectedItem(null);
                }}
              />
            ) : (
              <KanbanBoard
                items={filteredItems}
                onUpdateStatus={handleUpdateStatus}
                onApprove={handleApprove}
                onRequestChanges={handleRequestChanges}
              />
            )}
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
