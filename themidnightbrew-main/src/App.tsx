/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Page, MenuItem } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { MenuPage, categoryImages } from './components/MenuPage';
import { ContactPage } from './components/ContactPage';
import { AdminPanel } from './components/AdminPanel';
import { CustomCursor } from './components/CustomCursor';
import { LoadingScreen } from './components/LoadingScreen';
import { motion, AnimatePresence } from 'motion/react';

import { useFirebaseData } from './hooks/useFirebaseData';

export default function App() {
  const { menuItems, photos, reviews, loading: isFirebaseLoading } = useFirebaseData();
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [direction, setDirection] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Preload menu images to prevent delay when navigating to menu
  useEffect(() => {
    Object.values(categoryImages).forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Restore scroll positions when navigating
  const navigateTo = (p: Page) => {
    if (currentPage === p) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    if (currentPage === 'home') {
      sessionStorage.setItem('homeScrollPos', window.scrollY.toString());
    } else if (currentPage === 'menu') {
      sessionStorage.setItem('menuScrollPos', window.scrollY.toString());
    }

    if (p === 'home') {
      setDirection(-1);
    } else {
      setDirection(1);
    }
    
    setCurrentPage(p);
  };

  // Initial mount behavior to always start at top
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
    sessionStorage.removeItem('homeScrollPos');
    sessionStorage.removeItem('menuScrollPos');
  }, []);

  const handleExitComplete = () => {
    if (currentPage === 'home') {
      const pos = sessionStorage.getItem('homeScrollPos');
      if (pos) {
        window.scrollTo({ top: parseInt(pos, 10), behavior: 'instant' });
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <motion.div 
        className="min-h-screen bg-[#FAF6F0] text-[#2A1810] flex flex-col selection:bg-[#CAA662] selection:text-[#2A1810] overflow-x-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <CustomCursor />
        {/* Fixed Sticky Header Navigation */}
        {currentPage !== 'admin' && (
          <Navbar
            currentPage={currentPage}
            onNavigate={navigateTo}
            onSelectCategory={(cat) => setSelectedCategory(cat)}
          />
        )}

      {/* Main Page Content Engine */}
      <main className="flex-grow relative overflow-hidden">
        <AnimatePresence mode="wait" custom={direction} onExitComplete={handleExitComplete}>
          {currentPage === 'home' && (
            <motion.div
              key="home"
              custom={direction}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="w-full"
            >
              <HomePage
                onNavigate={navigateTo}
                onSelectCategory={(cat) => setSelectedCategory(cat)}
                menuItems={menuItems}
                photos={photos}
                reviews={reviews}
              />
            </motion.div>
          )}

          {currentPage === 'menu' && (
            <motion.div
              key="menu"
              custom={direction}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="w-full"
            >
              <MenuPage
                selectedCategory={selectedCategory}
                onSelectCategory={(cat) => setSelectedCategory(cat)}
                onNavigate={navigateTo}
                menuItems={menuItems}
              />
            </motion.div>
          )}

          {currentPage === 'contact' && (
            <motion.div
              key="contact"
              custom={direction}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="w-full"
            >
              <ContactPage
                onNavigate={navigateTo}
              />
            </motion.div>
          )}

          {currentPage === 'admin' && (
            <motion.div
              key="admin"
              custom={direction}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="w-full"
            >
              <AdminPanel onNavigateHome={() => navigateTo('home')} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Global Sanctuary Footer */}
      {currentPage !== 'admin' && (
        <Footer
          onNavigate={navigateTo}
        />
      )}
    </motion.div>
    </>
  );
}
