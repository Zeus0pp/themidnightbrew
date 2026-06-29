import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, MapPin, Clock, Utensils, Coffee, Star, ChevronRight, ShieldCheck, Moon, Flame, ChevronDown, X } from 'lucide-react';
import { Page, MenuItem } from '../types';
import { MENU_ITEMS, CATEGORIES, REVIEWS as INITIAL_REVIEWS, CAFE_INFO } from '../data/menu';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import coffeeImg from '../assets/images/coffee_pastel_1782563509119.jpg';
import shakesImg from '../assets/images/shakes_pastel_1782563519881.jpg';
import mojitoImg from '../assets/images/mojito_pastel_1782563531623.jpg';
import wrapsImg from '../assets/images/wraps_pastel_1782563545343.jpg';
import sandwichImg from '../assets/images/sandwich_pastel_1782563558559.jpg';
import burgerImg from '../assets/images/burger_pastel_1782563572344.jpg';
import toastImg from '../assets/images/toast_pastel_1782563617414.jpg';
import sidesImg from '../assets/images/sides_pastel_1782563631642.jpg';
import momosImg from '../assets/images/momos_pastel_1782563642373.jpg';
import noodlesImg from '../assets/images/noodles_pastel_1782563654030.jpg';
import riceImg from '../assets/images/rice_pastel_1782563665865.jpg';
import pastaImg from '../assets/images/pasta_pastel_1782563677181.jpg';
import pizzaImg from '../assets/images/pizza_pastel_1782563585376.jpg';
import chilliImg from '../assets/images/chilli_pastel_1782563691394.jpg';
import saladImg from '../assets/images/salad_pastel_1782563705648.jpg';
import dessertsImg from '../assets/images/desserts_pastel_1782563597668.jpg';

const categoryImages: Record<string, string> = {
  'Coffee': coffeeImg,
  'Shakes': shakesImg,
  'Mojito & Iced Tea': mojitoImg,
  'Wraps': wrapsImg,
  'Sandwich': sandwichImg,
  'Burger': burgerImg,
  'Toast Time': toastImg,
  'Sides & More': sidesImg,
  'Momos': momosImg,
  'Noodles': noodlesImg,
  'Fried Rice': riceImg,
  'Pasta': pastaImg,
  'Pizza': pizzaImg,
  'Chilli Items': chilliImg,
  'Salad': saladImg,
  'Desserts': dessertsImg
};

import { Review } from '../types';
import { Photo } from '../hooks/useFirebaseData';
import { db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

interface HomePageProps {
  onNavigate: (page: Page) => void;
  onSelectCategory: (cat: string) => void;
  menuItems: MenuItem[];
  photos: Photo[];
  reviews: Review[];
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onSelectCategory,
  menuItems,
  photos: galleryImages,
  reviews
}) => {
  const chefFavorites = menuItems.filter(item => item.isChefOriginal || item.isBestseller).slice(0, 6);

  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 1000], ['0%', '15%']);
  const textY = useTransform(scrollY, [0, 600], ['0%', '40%']);
  const textOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  const [isGalleryExpanded, setIsGalleryExpanded] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{src: string, alt: string} | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const newImage = {
          id: Date.now().toString(),
          url: reader.result as string,
          alt: 'User uploaded image',
        };
        try {
          await setDoc(doc(db, 'photos', newImage.id), newImage);
        } catch (err) {
          console.error(err);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const [ratingFilter, setRatingFilter] = useState<number | 'all'>('all');
  const [visibleCount, setVisibleCount] = useState(6);
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
  const [newReview, setNewReview] = useState({ name: '', rating: 5, comment: '' });

  const averageRating = (reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviews.length).toFixed(1);
  const filteredReviews = reviews.filter(rev => ratingFilter === 'all' || rev.rating === ratingFilter);
  const displayedReviews = filteredReviews.slice(0, visibleCount);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.comment) return;
    
    const submittedReview = {
      id: `r${Date.now()}`,
      author: newReview.name,
      role: 'Customer',
      comment: newReview.comment,
      rating: newReview.rating,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      date: 'Just now'
    };

    try {
      await setDoc(doc(db, 'reviews', submittedReview.id), submittedReview);
      setIsReviewFormOpen(false);
      setNewReview({ name: '', rating: 5, comment: '' });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen">
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[100vh] flex flex-col items-center justify-start overflow-hidden px-4 pt-32 pb-16">
        {/* Background Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{ y: bgY }}
          className="absolute inset-0 z-0 origin-top bg-[#FAF6F0]"
        >
          <img
            src="/coffee-shop-1209863_1920-1.jpg"
            alt="Warm cozy modern coffee bar interior"
            className="w-full h-full object-cover object-center brightness-[0.85] contrast-[1.05]"
          />
          {/* Elegant overlay combining brightness with a subtle dark element for warmth and image visibility */}
          <div className="absolute inset-0 bg-[#2A1810]/10 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAF6F0] via-[#FAF6F0]/20 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#2A1810]/35 via-transparent to-[#FAF6F0]/10 pointer-events-none" />
        </motion.div>

        {/* Hero Content */}
        <div className="relative z-10 w-full flex flex-col items-center justify-between min-h-[calc(100vh-120px)] mt-4">
          <motion.div 
            style={{ y: textY, opacity: textOpacity }}
            className="flex flex-col items-center w-full max-w-5xl mx-auto relative flex-grow justify-center pb-20"
          >
            {/* Soft bright glow behind the text to enhance readability without obscuring image */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[160%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.4)_0%,rgba(255,255,255,0.1)_40%,transparent_70%)] pointer-events-none blur-3xl -z-10" />

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/60 backdrop-blur-md text-[#2A1810] text-[11px] sm:text-xs font-bold tracking-widest uppercase mb-6 border border-white/50 shadow-sm"
            >
              <Moon className="w-4 h-4 text-[#CAA662]" />
              <span>Open Late · Brewed Fresh</span>
            </motion.div>

            <h1 
              className="font-sans text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-[#2A1810] leading-tight text-center tracking-tight mb-6 sm:mb-8 flex flex-col justify-center items-center gap-y-2 sm:gap-y-3"
            >
              <motion.span
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                style={{ textShadow: '0 2px 8px rgba(255,255,255,0.95), 0 4px 20px rgba(255,255,255,0.8)' }}
              >
                Your Neighborhood
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl py-1 px-2 sm:px-4"
                style={{ 
                  color: '#CAA662', 
                  fontWeight: 400, 
                  fontFamily: '"Great Vibes", "Parisienne", cursive', 
                  textDecorationLine: 'none',
                  display: 'inline-block',
                  textShadow: '0 2px 10px rgba(255,255,255,0.9), 0 4px 24px rgba(255,255,255,0.8)'
                }}
              >
                Sanctuary
              </motion.span>
            </h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="max-w-3xl mx-auto text-lg sm:text-3xl text-[#2A1810]/90 font-medium text-center mb-10 sm:mb-14 px-2"
              style={{ textShadow: '0 1px 6px rgba(255,255,255,0.95), 0 3px 14px rgba(255,255,255,0.8)' }}
            >
              Artisanal brews and community vibes.
            </motion.p>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
              <motion.button
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                onClick={() => {
                  onNavigate('menu');
                }}
                className="px-9 py-3.5 rounded-full bg-[#CAA662] text-[#2A1810] font-bold text-base shadow-xl shadow-[#CAA662]/30 hover:bg-[#B89550] hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>View Menu</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>

          {/* Merged Visit Us Box - Separated so it stays visible while scrolling the hero */}
          <motion.div 
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2, type: "spring", bounce: 0.3 }}
            className="w-full max-w-5xl mx-auto rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.1)] p-6 sm:p-12 relative overflow-hidden text-left mt-8 md:sticky md:bottom-6 z-40"
          >
            {/* Top Header */}
            <div className="text-center mb-8 sm:mb-10">
              <span className="text-[#CAA662] text-xs sm:text-sm tracking-[0.2em] uppercase block mb-2 font-medium drop-shadow-sm">Find Us</span>
              <h2 className="font-sans text-3xl sm:text-5xl font-bold text-[#2A1810]">Visit Us</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-16 relative z-10 mb-8 sm:mb-10">
              {/* Left Column: Opening Hours */}
              <div className="flex gap-4 sm:gap-5">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-[#2A1810]/20 bg-white/30 flex items-center justify-center text-[#CAA662]">
                    <Clock className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />
                  </div>
                </div>
                <div className="pt-1">
                  <h3 className="font-sans text-xl sm:text-2xl text-[#2A1810] mb-2 sm:mb-3">Opening Hours</h3>
                  <div className="space-y-1 sm:space-y-1.5">
                    <p className="text-[#2A1810]/80 text-sm sm:text-base">Tuesday – Sunday</p>
                    <p className="text-[#2A1810] text-base sm:text-lg font-bold">12:00 PM – 3:00 AM</p>
                    <p className="text-[#2A1810]/70 text-xs sm:text-sm">Closed on Mondays</p>
                  </div>
                </div>
              </div>

              {/* Right Column: Address */}
              <div className="flex gap-4 sm:gap-5">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-[#2A1810]/20 bg-white/30 flex items-center justify-center text-[#CAA662]">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />
                  </div>
                </div>
                <div className="pt-1">
                  <h3 className="font-sans text-xl sm:text-2xl text-[#2A1810] mb-2 sm:mb-3">Our Address</h3>
                  <p className="text-[#2A1810]/80 text-sm sm:text-base leading-relaxed pr-4">
                    {CAFE_INFO.address}
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-2 sm:pt-4">
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(CAFE_INFO.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#CAA662] text-[#2A1810] font-bold text-base hover:bg-[#B89550] shadow-md shadow-[#CAA662]/20 transition-all flex items-center justify-center gap-2 min-w-[200px] cursor-pointer"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                <span>Get Directions</span>
              </a>
              <button
                onClick={() => {
                  onNavigate('contact');
                }}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-transparent border border-[#2A1810]/30 text-[#2A1810] font-semibold text-base hover:bg-[#2A1810]/5 transition-colors min-w-[200px] cursor-pointer"
              >
                Contact Us
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- THE MIDNIGHT ORIGINALS (Horizontal / Grid Highlights) --- */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 border-b border-[#EAE0D5]/60 pb-6">
          <div>
            <div className="flex items-center gap-2 text-[#CAA662] text-xs font-mono tracking-widest uppercase mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Curated Highlights</span>
            </div>
            <h2 className="font-sans text-3xl sm:text-4xl font-bold text-[#2A1810]">
              The Midnight Originals
            </h2>
          </div>
          <button
            onClick={() => {
              onNavigate('menu');
            }}
            className="text-sm font-semibold text-[#CAA662] hover:text-[#2A1810] flex items-center gap-1.5 self-start md:self-auto transition-colors group"
          >
            <span>Explore all 10 categories</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Grid of Categories */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {CATEGORIES.slice(0, 7).map((category) => (
            <div
              key={category.id}
              onClick={() => {
                onSelectCategory(category.name);
                onNavigate('menu');
              }}
              className="bg-[#FFFFFF] rounded-3xl border border-[#EAE0D5] overflow-hidden hover:border-[#CAA662] shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
            >
              <div className="relative aspect-square overflow-hidden flex items-center justify-center bg-[#FAF6F0]">
                {categoryImages[category.name] ? (
                  <img
                    src={categoryImages[category.name]}
                    alt={category.name}
                    className="w-full h-full object-cover mix-blend-multiply drop-shadow-md group-hover:scale-105 transition-transform duration-500 p-6"
                  />
                ) : (
                  <div className="w-full h-full bg-[#EAE0D5]/30 flex items-center justify-center">
                    <Utensils className="w-12 h-12 text-[#CAA662]/50" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#FFFFFF] via-transparent to-transparent opacity-60" />
              </div>
              <div className="p-4 sm:p-5 text-center flex-grow flex items-center justify-center">
                <h3 className="font-cursive text-xl sm:text-2xl font-bold text-[#2A1810] group-hover:text-[#CAA662] transition-colors leading-none">
                  {category.name}
                </h3>
              </div>
            </div>
          ))}

          {/* View More Block */}
          <div
            onClick={() => {
              onSelectCategory('All');
              onNavigate('menu');
            }}
            className="bg-[#FAF6F0] rounded-3xl border-2 border-dashed border-[#CAA662]/40 overflow-hidden hover:border-[#CAA662] shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center justify-center group cursor-pointer aspect-square sm:aspect-auto"
          >
            <div className="flex flex-col items-center justify-center space-y-3 p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-[#FFFFFF] shadow-sm flex items-center justify-center text-[#CAA662] group-hover:scale-110 transition-transform duration-300">
                <ArrowRight className="w-8 h-8" />
              </div>
              <h3 className="font-sans font-bold text-lg text-[#2A1810] group-hover:text-[#CAA662] transition-colors">
                View All<br />Categories
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* --- ABOUT US & CAFÉ-MEETS-BISTRO POSITIONING --- */}
      <section className="bg-[#F2EBE1] py-24 border-y border-[#EAE0D5]/80 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-mono tracking-[0.25em] text-[#CAA662] uppercase">
                Café-Meets-Bistro Positioning
              </span>
              <h2 className="font-sans text-3xl sm:text-5xl font-bold text-[#2A1810] leading-tight">
                Not Just Coffee. <br />
                <span className="text-[#CAA662]">A Full Evening Dining Spot.</span>
              </h2>
              <p className="text-base sm:text-lg text-[#2A1810]/80 leading-relaxed font-light">
                When late-night hunger hits, ordinary cafe pastries don't cut it. That's why <strong className="text-[#2A1810] font-semibold">The Midnight Brew</strong> combines third-wave espresso standards with a full kitchen wok and tandoor grill.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#EAE0D5] space-y-2">
                  <Coffee className="w-6 h-6 text-[#CAA662]" />
                  <h3 className="font-sans font-bold text-lg text-[#2A1810]">Brew & Sip</h3>
                  <p className="text-xs text-[#2A1810]/70">
                    Artisanal lattes, thick shakes, refreshing peach hibiscus iced teas, and electric spicy mojitos.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#EAE0D5] space-y-2">
                  <Utensils className="w-6 h-6 text-[#CAA662]" />
                  <h3 className="font-sans font-bold text-lg text-[#2A1810]">Midnight Mains</h3>
                  <p className="text-xs text-[#2A1810]/70">
                    Burnt garlic wok noodles, sizzling dragon chili chicken, Kurkure crunchy momos, and loaded wraps.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <img
                  src="https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80"
                  alt="Barista pouring latte art"
                  className="rounded-3xl shadow-2xl border-2 border-[#EAE0D5] rotate-1 hover:rotate-0 transition-transform duration-500 w-full"
                />
                <div className="absolute -bottom-8 -left-8 bg-[#FFFFFF] p-6 rounded-3xl border border-[#CAA662] shadow-2xl max-w-xs hidden sm:block">
                  <div className="flex items-center gap-2 text-[#CAA662] mb-1">
                    <Star className="w-4 h-4 fill-[#CAA662]" />
                    <Star className="w-4 h-4 fill-[#CAA662]" />
                    <Star className="w-4 h-4 fill-[#CAA662]" />
                    <Star className="w-4 h-4 fill-[#CAA662]" />
                    <Star className="w-4 h-4 fill-[#CAA662]" />
                  </div>
                  <p className="text-xs text-[#2A1810]/90 font-sans italic">
                    "The only spot in Greater Noida where I can get a legit double shot espresso AND fiery Schezwan noodles at 2 AM."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* --- PHOTO GALLERY --- */}
      <section className="py-20 bg-[#FAF6F0] px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-3 mb-16">
            <span className="px-4 py-1.5 rounded-full bg-[#FFFFFF] border border-[#CAA662]/40 text-[#CAA662] text-xs font-mono uppercase tracking-widest">
              @TheMidnightBrew
            </span>
            <h2 className="font-sans text-3xl sm:text-4xl font-bold text-[#2A1810]">
              Inside the Sanctuary
            </h2>
            <p className="text-sm text-[#2A1810]/70 max-w-2xl mx-auto">
              Our cozy modern sanctuary.
            </p>
          </div>

          <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0 rounded-3xl overflow-hidden shadow-xl">
            <AnimatePresence>
              {(isGalleryExpanded ? galleryImages : galleryImages.slice(0, 8)).map((img) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={img.id}
                  className="w-full aspect-square relative"
                >
                  <img
                    src={img.url || (img as any).src}
                    alt={img.alt}
                    onClick={() => setSelectedImage({src: img.url || (img as any).src, alt: img.alt})}
                    className="w-full h-full object-cover hover:opacity-90 transition-opacity bg-[#EAE0D5] cursor-pointer"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
            {galleryImages.length > 8 && (
              <button
                onClick={() => setIsGalleryExpanded(!isGalleryExpanded)}
                className="w-full sm:w-auto px-8 py-3 rounded-full bg-[#FFFFFF] border border-[#EAE0D5] text-[#2A1810] font-semibold hover:border-[#CAA662] transition-colors cursor-pointer text-center"
              >
                {isGalleryExpanded ? 'View Less' : 'View More Photos'}
              </button>
            )}
            
            <div className="w-full sm:w-auto">
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={handleImageUpload}
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full sm:w-auto px-8 py-3 rounded-full bg-[#2A1810] text-[#FFFFFF] font-semibold hover:bg-[#1A0F0A] transition-colors shadow-lg shadow-[#2A1810]/20 flex items-center justify-center gap-2 cursor-pointer text-center"
              >
                <Sparkles className="w-4 h-4 text-[#CAA662]" />
                Share Your Photo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- SOCIAL PROOF CUSTOMER REVIEWS --- */}
      <section className="py-20 bg-[#F2EBE1] border-t border-[#EAE0D5]/80 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-3 mb-10">
            <h2 className="font-sans text-3xl sm:text-4xl font-bold text-[#2A1810]">
              Loved by Night Owls & Students
            </h2>
            <p className="text-sm text-[#2A1810]/70 flex items-center justify-center gap-2">
              <span className="text-lg font-bold text-[#2A1810]">{averageRating}</span>
              <span className="flex text-[#CAA662]"><Star className="w-4 h-4 fill-[#CAA662]"/><Star className="w-4 h-4 fill-[#CAA662]"/><Star className="w-4 h-4 fill-[#CAA662]"/><Star className="w-4 h-4 fill-[#CAA662]"/><Star className="w-4 h-4 text-[#CAA662] fill-transparent"/></span>
              <span>({reviews.length} reviews)</span>
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <button onClick={() => { setRatingFilter('all'); setVisibleCount(6); }} className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${ratingFilter === 'all' ? 'bg-[#2A1810] text-white' : 'bg-[#FFFFFF] border border-[#EAE0D5] text-[#2A1810]/70 hover:border-[#CAA662]'}`}>
                All
              </button>
              {[5, 4, 3, 2, 1].map(rating => (
                <button key={rating} onClick={() => { setRatingFilter(rating); setVisibleCount(6); }} className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${ratingFilter === rating ? 'bg-[#2A1810] text-white' : 'bg-[#FFFFFF] border border-[#EAE0D5] text-[#2A1810]/70 hover:border-[#CAA662]'}`}>
                  {rating} <Star className={`w-3 h-3 ${ratingFilter === rating ? 'fill-white' : 'fill-[#CAA662] text-[#CAA662]'}`} />
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsReviewFormOpen(!isReviewFormOpen)}
              className="w-full md:w-auto px-6 py-2.5 rounded-full bg-[#CAA662] text-[#2A1810] font-semibold text-sm hover:bg-[#B89550] transition-colors shadow-sm cursor-pointer"
            >
              {isReviewFormOpen ? 'Cancel' : 'Write a Review'}
            </button>
          </div>

          <AnimatePresence>
            {isReviewFormOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden mb-10"
              >
                <form onSubmit={handleReviewSubmit} className="bg-[#FFFFFF] p-6 rounded-3xl border border-[#CAA662] shadow-xl max-w-2xl mx-auto space-y-4">
                  <h3 className="font-bold text-[#2A1810] text-lg">Leave your thoughts</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#2A1810]/70 mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        value={newReview.name}
                        onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                        className="w-full px-4 py-2 rounded-xl bg-[#F2EBE1] border border-[#EAE0D5] focus:border-[#CAA662] focus:ring-1 focus:ring-[#CAA662] outline-none text-sm text-[#2A1810]"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#2A1810]/70 mb-1">Rating</label>
                      <div className="flex items-center gap-2 h-10">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            type="button"
                            key={star}
                            onClick={() => setNewReview({ ...newReview, rating: star })}
                            className="focus:outline-none cursor-pointer"
                          >
                            <Star className={`w-6 h-6 ${star <= newReview.rating ? 'fill-[#CAA662] text-[#CAA662]' : 'text-[#EAE0D5]'}`} />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#2A1810]/70 mb-1">Your Experience</label>
                    <textarea
                      required
                      value={newReview.comment}
                      onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#F2EBE1] border border-[#EAE0D5] focus:border-[#CAA662] focus:ring-1 focus:ring-[#CAA662] outline-none text-sm text-[#2A1810] resize-none h-24"
                      placeholder="Tell us what you loved..."
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-[#2A1810] text-[#CAA662] hover:bg-[#1A0F0A] font-semibold text-sm transition-all cursor-pointer"
                  >
                    Submit Review
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div layout className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatePresence>
              {displayedReviews.length > 0 ? (
                displayedReviews.map((rev) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    key={rev.id}
                    className="bg-[#FFFFFF] p-8 rounded-3xl border border-[#EAE0D5] space-y-6 flex flex-col justify-between shadow-sm hover:shadow-xl transition-shadow"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center gap-1 text-[#CAA662]">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < rev.rating ? 'fill-[#CAA662]' : 'text-[#EAE0D5]'}`} />
                        ))}
                      </div>
                      <p className="text-sm text-[#2A1810]/90 font-sans leading-relaxed italic line-clamp-4">
                        "{rev.comment}"
                      </p>
                    </div>

                    <div className="flex items-center gap-4 pt-4 border-t border-[#EAE0D5]/60">
                      <div>
                        <h4 className="font-bold text-sm text-[#2A1810]">{rev.author}</h4>
                        <span className="text-xs text-[#CAA662] font-mono">{rev.role}</span>
                      </div>
                      <span className="ml-auto text-xs text-[#2A1810]/50 font-mono">{rev.date}</span>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="col-span-1 md:col-span-3 text-center py-10"
                >
                  <p className="text-[#2A1810]/70 font-sans text-lg">No reviews found for this rating.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          
          {visibleCount < filteredReviews.length && (
             <div className="mt-12 flex justify-center w-full">
               <button 
                 onClick={() => setVisibleCount(prev => prev + 6)}
                 className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#FFFFFF] border border-[#CAA662] text-[#2A1810] font-semibold text-sm hover:bg-[#CAA662] hover:text-[#2A1810] transition-colors cursor-pointer text-center"
               >
                 View More <ChevronDown className="w-4 h-4" />
               </button>
             </div>
          )}
        </div>
      </section>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm cursor-zoom-out"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 z-50 p-3 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="w-full h-full max-w-[100vw] max-h-[100dvh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
