import { useState } from 'react';
import ActionBar from './components/ActionBar';
import AppBackground from './components/AppBackground';
import ErrorBanner from './components/ErrorBanner';
import FileDropzone from './components/FileDropzone';
import FileList from './components/FileList';
import HeroSection from './components/HeroSection';
import ProgressBar from './components/ProgressBar';
import SettingsModal from './components/SettingsModal';
import { usePdfMerge } from './hooks/usePdfMerge';
import { useTheme } from './hooks/useTheme';

function App() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { themePreference, setThemePreference } = useTheme();
  const {
    files,
    status,
    progress,
    progressLabel,
    error,
    downloadUrl,
    canMerge,
    setError,
    handleFilesSelected,
    handleRemove,
    handleReorder,
    handleClear,
    handleMerge,
  } = usePdfMerge();

  return (
    <AppBackground>
      <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        <HeroSection
          filesCount={files.length}
          status={status}
          themePreference={themePreference}
          onOpenSettings={() => setIsSettingsOpen(true)}
        />

        <FileDropzone disabled={status === 'merging'} onFilesSelected={handleFilesSelected} />

        {error ? <ErrorBanner message={error} onDismiss={() => setError('')} /> : null}

        {status === 'merging' || status === 'success' ? (
          <ProgressBar value={progress} label={progressLabel} />
        ) : null}

        <ActionBar
          canMerge={canMerge}
          hasFiles={files.length > 0}
          isMerging={status === 'merging'}
          downloadUrl={downloadUrl}
          onMerge={handleMerge}
          onClear={handleClear}
        />

        <FileList
          items={files}
          disabled={status === 'merging'}
          onRemove={handleRemove}
          onReorder={handleReorder}
        />
      </main>

      <SettingsModal
        isOpen={isSettingsOpen}
        themePreference={themePreference}
        onClose={() => setIsSettingsOpen(false)}
        onThemeChange={setThemePreference}
      />
    </AppBackground>
  );
}

export default App;
