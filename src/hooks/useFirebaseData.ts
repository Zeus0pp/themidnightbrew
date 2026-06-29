import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { MenuItem, Review } from '../types';
import { MENU_ITEMS as FALLBACK_MENU, REVIEWS as FALLBACK_REVIEWS } from '../data/menu';

export interface Photo {
  id: string;
  url: string;
  alt: string;
  createdAt?: string;
}

const INITIAL_GALLERY: Photo[] = [
  { id: '1', url: '/1.jpg', alt: 'The Midnight Brew Exterior' },
  { id: '2', url: '/2.jpg', alt: 'Delicious Food and Drinks' },
  { id: '3', url: '/3.jpg', alt: 'Cafe Interior' },
  { id: '4', url: '/4.jpg', alt: 'Happiness is a cup of coffee' },
  { id: '5', url: '/5.jpg', alt: 'Beautiful Cafe Setup' },
  { id: '6', url: '/6.jpg', alt: 'Burger and Pasta' },
  { id: '7', url: '/7.jpg', alt: 'Cold Coffee and Pasta' },
  { id: '8', url: '/8.jpg', alt: 'Cafe Table' },
  { id: '9', url: '/9.jpg', alt: 'Pizza and Snacks' },
  { id: '10', url: '/10.jpg', alt: 'Harry Potter Books' },
  { id: '11', url: '/11.jpg', alt: 'Harry Potter Books Close Up' }
];

export const useFirebaseData = () => {
  const [rawMenuItems, setRawMenuItems] = useState<MenuItem[]>(FALLBACK_MENU);
  const [rawPhotos, setRawPhotos] = useState<Photo[]>(INITIAL_GALLERY);
  const [rawReviews, setRawReviews] = useState<Review[]>(FALLBACK_REVIEWS);
  const [deletedIds, setDeletedIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubs: (() => void)[] = [];

    const unsubDeletions = onSnapshot(collection(db, 'deletions'), (snap) => {
      const ids = new Set<string>();
      snap.docs.forEach(doc => {
        ids.add(doc.id);
      });
      setDeletedIds(ids);
    });
    unsubs.push(unsubDeletions);

    const unsubMenu = onSnapshot(collection(db, 'menuItems'), (snap) => {
      if (!snap.empty) {
        const dbItems = snap.docs.map(d => ({ ...d.data(), id: d.id } as MenuItem));
        const hasSeeded = dbItems.some(item => !item.id.startsWith('menu_'));
        if (hasSeeded) {
          setRawMenuItems(dbItems);
        } else {
          // If not seeded, merge custom items with the fallback menu items
          setRawMenuItems([...FALLBACK_MENU, ...dbItems]);
        }
      } else {
        setRawMenuItems(FALLBACK_MENU);
      }
    });
    unsubs.push(unsubMenu);

    const unsubPhotos = onSnapshot(collection(db, 'photos'), (snap) => {
      if (!snap.empty) {
        const dbPhotos = snap.docs.map(d => ({ ...d.data(), id: d.id } as Photo));
        const hasSeeded = dbPhotos.some(p => !p.id.startsWith('photo_'));
        if (hasSeeded) {
          setRawPhotos(dbPhotos);
        } else {
          // If not seeded, merge custom photos with the default gallery
          setRawPhotos([...INITIAL_GALLERY, ...dbPhotos]);
        }
      } else {
        setRawPhotos(INITIAL_GALLERY);
      }
    });
    unsubs.push(unsubPhotos);

    const unsubReviews = onSnapshot(collection(db, 'reviews'), (snap) => {
      if (!snap.empty) {
        const dbReviews = snap.docs.map(d => ({ ...d.data(), id: d.id } as Review));
        const hasSeeded = dbReviews.some(r => !r.id.startsWith('review_'));
        if (hasSeeded) {
          setRawReviews(dbReviews);
        } else {
          // If not seeded, merge custom reviews with the fallback reviews
          setRawReviews([...FALLBACK_REVIEWS, ...dbReviews]);
        }
      } else {
        setRawReviews(FALLBACK_REVIEWS);
      }
    });
    unsubs.push(unsubReviews);

    // Initial timeout to drop loading state
    const timer = setTimeout(() => setLoading(false), 800);

    return () => {
      unsubs.forEach(u => u());
      clearTimeout(timer);
    };
  }, []);

  const menuItems = rawMenuItems.filter(item => !deletedIds.has(item.id));
  const photos = rawPhotos.filter(item => !deletedIds.has(item.id));
  const reviews = rawReviews.filter(item => !deletedIds.has(item.id));

  return { menuItems, photos, reviews, loading };
};
