/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { MediaItem, Episode, ViewState, UserProfile } from './types';
import { StorageService } from './utils/storage';
import { toggleWatchlistId } from './utils/logic';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { VideoPlayerModal } from './components/VideoPlayerModal';
import { AuthModal } from './components/AuthModal';

import { HomeView } from './views/HomeView';
import { ExploreView } from './views/ExploreView';
import { DetailsView } from './views/DetailsView';
import { WatchlistView } from './views/WatchlistView';
import { SubscriptionsView } from './views/SubscriptionsView';
import { InvestorsView } from './views/InvestorsView';
import { AdminView } from './views/AdminView';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>({ type: 'home' });
  const [mediaItems, setMediaItems] = useState<MediaItem[]>(() => StorageService.getMediaItems());
  const [watchlist, setWatchlist] = useState<string[]>(() => StorageService.getWatchlist());
  const [user, setUser] = useState<UserProfile>(() => StorageService.getUser());
  
  const [searchQuery, setSearchQuery] = useState('');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  
  // Video player modal state
  const [activePlayingMedia, setActivePlayingMedia] = useState<{
    item: MediaItem;
    episode?: Episode;
  } | null>(null);

  // Scroll to top on view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  const handleNavigate = (view: ViewState) => {
    setCurrentView(view);
  };

  const handlePlay = (item: MediaItem, episode?: Episode) => {
    setActivePlayingMedia({ item, episode });
  };

  const handleSelectMedia = (item: MediaItem) => {
    setCurrentView({ type: 'details', mediaId: item.id });
  };

  const handleToggleWatchlist = (item: MediaItem) => {
    const updated = toggleWatchlistId(watchlist, item.id);
    setWatchlist(updated);
    StorageService.saveWatchlist(updated);
  };

  const handleClearWatchlist = () => {
    setWatchlist([]);
    StorageService.saveWatchlist([]);
  };

  const handleUpdateUserPlan = (plan: 'free' | 'monthly' | 'annual') => {
    const updatedUser = { ...user, plan };
    setUser(updatedUser);
    StorageService.saveUser(updatedUser);
  };

  const handleLogout = () => {
    StorageService.resetAllData();
    setUser(StorageService.getUser());
    setWatchlist(StorageService.getWatchlist());
    setMediaItems(StorageService.getMediaItems());
    setCurrentView({ type: 'home' });
  };

  const handleResetData = () => {
    StorageService.resetAllData();
    setMediaItems(StorageService.getMediaItems());
    setWatchlist(StorageService.getWatchlist());
    setUser(StorageService.getUser());
  };

  return (
    <div className="min-h-screen bg-[#052329] text-[#F1F5F2] flex flex-col font-sans selection:bg-[#234536] selection:text-white" dir="rtl">
      
      {/* Sticky Top Navigation */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        watchlistCount={watchlist.length}
        user={user}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main View Router */}
      <main className="flex-1 w-full">
        {currentView.type === 'home' && (
          <HomeView
            mediaItems={mediaItems}
            watchlist={watchlist}
            onPlay={handlePlay}
            onSelect={handleSelectMedia}
            onToggleWatchlist={handleToggleWatchlist}
            onNavigate={handleNavigate}
            onLeadAdded={() => {}}
          />
        )}

        {currentView.type === 'explore' && (
          <ExploreView
            mediaItems={mediaItems}
            watchlist={watchlist}
            initialTypeFilter={currentView.filterType || 'all'}
            initialCategory={currentView.category || 'all'}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onPlay={handlePlay}
            onSelect={handleSelectMedia}
            onToggleWatchlist={handleToggleWatchlist}
          />
        )}

        {currentView.type === 'series' && (
          <ExploreView
            mediaItems={mediaItems}
            watchlist={watchlist}
            initialTypeFilter="series"
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onPlay={handlePlay}
            onSelect={handleSelectMedia}
            onToggleWatchlist={handleToggleWatchlist}
          />
        )}

        {currentView.type === 'shows' && (
          <ExploreView
            mediaItems={mediaItems}
            watchlist={watchlist}
            initialTypeFilter="show"
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onPlay={handlePlay}
            onSelect={handleSelectMedia}
            onToggleWatchlist={handleToggleWatchlist}
          />
        )}

        {currentView.type === 'shorts' && (
          <ExploreView
            mediaItems={mediaItems}
            watchlist={watchlist}
            initialTypeFilter="short"
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onPlay={handlePlay}
            onSelect={handleSelectMedia}
            onToggleWatchlist={handleToggleWatchlist}
          />
        )}

        {currentView.type === 'details' && (
          <DetailsView
            mediaId={currentView.mediaId}
            mediaItems={mediaItems}
            watchlist={watchlist}
            onPlay={handlePlay}
            onToggleWatchlist={handleToggleWatchlist}
            onSelectSimilar={handleSelectMedia}
            onBack={() => setCurrentView({ type: 'home' })}
          />
        )}

        {currentView.type === 'watchlist' && (
          <WatchlistView
            watchlist={watchlist}
            mediaItems={mediaItems}
            onPlay={handlePlay}
            onSelect={handleSelectMedia}
            onToggleWatchlist={handleToggleWatchlist}
            onClearWatchlist={handleClearWatchlist}
            onNavigate={handleNavigate}
          />
        )}

        {currentView.type === 'subscriptions' && (
          <SubscriptionsView
            user={user}
            onUpdateUserPlan={handleUpdateUserPlan}
            onNavigate={handleNavigate}
          />
        )}

        {currentView.type === 'investors' && (
          <InvestorsView onNavigate={handleNavigate} />
        )}

        {currentView.type === 'admin' && (
          <AdminView
            mediaItems={mediaItems}
            onUpdateMediaItems={setMediaItems}
            onResetData={handleResetData}
          />
        )}
      </main>

      {/* Global Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Active Video Player Modal */}
      {activePlayingMedia && (
        <VideoPlayerModal
          item={activePlayingMedia.item}
          initialEpisodeId={activePlayingMedia.episode?.id}
          onClose={() => setActivePlayingMedia(null)}
          onSelectEpisode={(ep) =>
            setActivePlayingMedia({ item: activePlayingMedia.item, episode: ep })
          }
        />
      )}

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={(loggedUser) => setUser(loggedUser)}
      />

    </div>
  );
}
