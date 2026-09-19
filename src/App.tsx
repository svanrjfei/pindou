/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ScreenType, TabType, CanvasProject, PatternItem } from './types';
import { mockProjects, mockPatterns } from './data/mockData';
import { HomeScreen } from './components/HomeScreen';
import { PatternsScreen } from './components/PatternsScreen';
import { CreateCanvasScreen } from './components/CreateCanvasScreen';
import { CanvasEditorScreen } from './components/CanvasEditorScreen';
import { PreviewScreen } from './components/PreviewScreen';
import { StrategyScreen } from './components/StrategyScreen';
import { ConstructionSettingsScreen } from './components/ConstructionSettingsScreen';
import { ActiveWorkbenchScreen } from './components/ActiveWorkbenchScreen';
import { QualityInspectionScreen } from './components/QualityInspectionScreen';
import { StatsScreen } from './components/StatsScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { BottomNav } from './components/BottomNav';
import { Toast } from './components/Toast';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [screenHistory, setScreenHistory] = useState<ScreenType[]>(['home']);
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [projects, setProjects] = useState<CanvasProject[]>(mockProjects);
  const [patterns] = useState<PatternItem[]>(mockPatterns);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  const handleNavigate = (screen: ScreenType) => {
    setScreenHistory((prev) => [...prev, screen]);
    setCurrentScreen(screen);

    // Keep active tab in sync if navigating to a primary tab
    if (screen === 'home') setActiveTab('home');
    else if (screen === 'patterns') setActiveTab('patterns');
    else if (screen === 'stats') setActiveTab('stats');
    else if (screen === 'profile') setActiveTab('profile');
  };

  const handleBack = () => {
    if (screenHistory.length > 1) {
      const newHistory = [...screenHistory];
      newHistory.pop();
      const prevScreen = newHistory[newHistory.length - 1];
      setScreenHistory(newHistory);
      setCurrentScreen(prevScreen);

      if (prevScreen === 'home') setActiveTab('home');
      else if (prevScreen === 'patterns') setActiveTab('patterns');
      else if (prevScreen === 'stats') setActiveTab('stats');
      else if (prevScreen === 'profile') setActiveTab('profile');
    } else {
      setCurrentScreen('home');
      setActiveTab('home');
    }
  };

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setScreenHistory(['home', tab]);
    setCurrentScreen(tab);
  };

  // Determine if bottom navigation should be shown
  const isBottomNavVisible =
    currentScreen === 'home' ||
    currentScreen === 'patterns' ||
    currentScreen === 'stats' ||
    currentScreen === 'profile';

  return (
    <div className="relative min-h-screen bg-[#F8F9FF] text-[#001C39] font-sans flex flex-col items-center justify-start overflow-x-hidden antialiased">
      {/* Toast Notification Container */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />

      {/* Screen Router */}
      <div className="w-full flex-1 flex flex-col items-center justify-start">
        {currentScreen === 'home' && (
          <HomeScreen
            projects={projects}
            onNavigate={handleNavigate}
            onShowToast={showToast}
          />
        )}

        {currentScreen === 'patterns' && (
          <PatternsScreen
            patterns={patterns}
            onNavigate={handleNavigate}
            onShowToast={showToast}
          />
        )}

        {currentScreen === 'create_canvas' && (
          <CreateCanvasScreen
            onBack={handleBack}
            onNavigate={handleNavigate}
            onShowToast={showToast}
          />
        )}

        {currentScreen === 'editor' && (
          <CanvasEditorScreen
            onBack={handleBack}
            onNavigate={handleNavigate}
            onShowToast={showToast}
          />
        )}

        {currentScreen === 'preview' && (
          <PreviewScreen
            onBack={handleBack}
            onNavigate={handleNavigate}
            onShowToast={showToast}
          />
        )}

        {currentScreen === 'strategy' && (
          <StrategyScreen
            onBack={handleBack}
            onNavigate={handleNavigate}
            onShowToast={showToast}
          />
        )}

        {currentScreen === 'construction_settings' && (
          <ConstructionSettingsScreen
            onBack={handleBack}
            onNavigate={handleNavigate}
            onShowToast={showToast}
          />
        )}

        {currentScreen === 'workbench' && (
          <ActiveWorkbenchScreen
            onBack={handleBack}
            onNavigate={handleNavigate}
            onShowToast={showToast}
          />
        )}

        {currentScreen === 'quality_inspection' && (
          <QualityInspectionScreen
            onBack={handleBack}
            onNavigate={handleNavigate}
            onShowToast={showToast}
          />
        )}

        {currentScreen === 'stats' && (
          <StatsScreen
            onNavigate={handleNavigate}
            onShowToast={showToast}
          />
        )}

        {currentScreen === 'profile' && (
          <ProfileScreen
            onNavigate={handleNavigate}
            onShowToast={showToast}
          />
        )}
      </div>

      {/* Global Tab Navigation */}
      {isBottomNavVisible && (
        <BottomNav currentTab={activeTab} onChangeTab={handleTabChange} />
      )}
    </div>
  );
}

