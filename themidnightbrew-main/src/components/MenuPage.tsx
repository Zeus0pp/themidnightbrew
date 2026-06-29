import React, { useState } from 'react';
import { Search, Sparkles, Flame, Coffee, Utensils, Cake, Wine, Filter, Plus, Check, ShoppingBag, ArrowRight, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { MenuItem, CategoryGroup, Page } from '../types';
import { CATEGORIES, MENU_ITEMS } from '../data/menu';

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

export const categoryImages: Record<string, string> = {
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

interface MenuPageProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  onNavigate: (page: Page) => void;
  menuItems: MenuItem[];
}

export const MenuPage: React.FC<MenuPageProps> = ({
  selectedCategory,
  onSelectCategory,
  onNavigate,
  menuItems
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeGroup, setActiveGroup] = useState<CategoryGroup>('all');
  const [vegOnly, setVegOnly] = useState(false);
  const [addedAnimationId, setAddedAnimationId] = useState<string | null>(null);

  const groups: { id: CategoryGroup; label: string; desc: string }[] = [
    { id: 'all', label: 'All Categories (10)', desc: 'Full Late Night Menu' },
    { id: 'beverages', label: 'Brew & Sip', desc: 'Coffee, Shakes, Mojitos & Iced Tea' },
    { id: 'bites', label: 'Quick Bites', desc: 'Wraps, Momos, Crispy Sides' },
    { id: 'mains', label: 'Midnight Mains', desc: 'Wok Noodles, Fried Rice, Chilli Items' },
    { id: 'desserts', label: 'Sweet Endings', desc: 'Skillet Brownies & Lava Cakes' },
  ];

  // Filter items
  const filteredItems = menuItems.filter((item) => {
    // Group filter
    if (activeGroup !== 'all' && item.group !== activeGroup) return false;
    // Category filter
    if (selectedCategory !== 'All' && item.category !== selectedCategory) return false;
    // Veg filter
    if (vegOnly && !item.isVeg) return false;
    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return item.name.toLowerCase().includes(q) || item.description.toLowerCase().includes(q) || item.category.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="min-h-screen pt-36 md:pt-24 pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      <button
        onClick={() => {
          onNavigate('home');
        }}
        className="mb-6 flex items-center justify-center w-10 h-10 rounded-full bg-[#FFFFFF] border border-[#EAE0D5] text-[#2A1810] hover:text-[#CAA662] hover:border-[#CAA662] transition-colors shadow-sm cursor-pointer"
        aria-label="Back to Home"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>

      {/* --- MENU HEADER & HOOK --- */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 animate-in fade-in slide-in-from-top-6 duration-500 pt-8 sm:pt-0">
        <span className="px-3.5 py-1 rounded-full bg-[#CAA662]/10 text-[#CAA662] border border-[#CAA662]/30 font-mono text-xs tracking-wider uppercase">
          The Conversion Engine
        </span>
        <h1 className="font-sans text-4xl sm:text-6xl font-extrabold text-[#2A1810]">
          Artisanal Midnight Menu
        </h1>
        <p className="text-sm sm:text-base text-[#2A1810]/70 font-light">
          Browse our 10 authentic culinary categories. Attach any item to your table reservation inquiry for priority kitchen preparation upon arrival.
        </p>
      </div>

      {/* --- CONTROLS BAR (Group Tabs, Veg Filter, Search) --- */}
      <div className="bg-[#FFFFFF] p-6 rounded-3xl border border-[#EAE0D5] shadow-2xl mb-10 space-y-6">
        {/* Top Group Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 border-b border-[#EAE0D5]/60 pb-6">
          {groups.map((grp) => {
            const active = activeGroup === grp.id && selectedCategory === 'All';
            return (
              <button
                key={grp.id}
                onClick={() => {
                  setActiveGroup(grp.id);
                  onSelectCategory('All');
                }}
                className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all flex flex-col items-center ${
                  active
                    ? 'bg-[#CAA662] text-[#2A1810] shadow-lg shadow-[#CAA662]/20 scale-105'
                    : 'bg-[#FAF6F0]/80 text-[#2A1810]/80 hover:bg-[#F5EBE1] hover:text-[#2A1810] border border-[#EAE0D5]'
                }`}
              >
                <span>{grp.label}</span>
                <span className={`text-[10px] font-normal ${active ? 'text-[#2A1810]/80' : 'text-[#CAA662]/80'}`}>
                  {grp.desc}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search & Subcategory Pills */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* Subcategory Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-none">
            <button
              onClick={() => onSelectCategory('All')}
              className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === 'All'
                  ? 'bg-[#2A1810] text-[#FAF6F0] font-bold'
                  : 'bg-[#FAF6F0] text-[#2A1810]/70 hover:text-[#2A1810] border border-[#EAE0D5]'
              }`}
            >
              All Subcategories
            </button>
            {CATEGORIES.filter(c => activeGroup === 'all' || c.group === activeGroup).map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.id);
                  setActiveGroup(cat.group);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  selectedCategory === cat.id
                    ? 'bg-[#CAA662] text-[#2A1810] font-bold shadow-md'
                    : 'bg-[#FAF6F0] text-[#2A1810]/70 hover:text-[#2A1810] border border-[#EAE0D5]'
                }`}
              >
                <span>{cat.name}</span>
              </button>
            ))}
          </div>

          {/* Search Input & Veg Toggle */}
          <div className="flex items-center gap-3 w-full lg:w-auto">
            <button
              onClick={() => setVegOnly(!vegOnly)}
              className={`px-4 py-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2 shrink-0 transition-all ${
                vegOnly
                  ? 'bg-emerald-600/20 border-emerald-500 text-emerald-400'
                  : 'bg-[#FAF6F0] border-[#EAE0D5] text-[#2A1810]/70 hover:text-[#2A1810]'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${vegOnly ? 'bg-emerald-400 animate-pulse' : 'bg-gray-500'}`} />
              <span>Veg Only</span>
            </button>

            <div className="relative flex-grow lg:w-64">
              <Search className="w-4 h-4 text-[#CAA662] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search coffee, momos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#FAF6F0] border border-[#EAE0D5] focus:border-[#CAA662] rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-[#2A1810] placeholder-[#2A1810]/40 focus:outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#2A1810]/40 hover:text-[#2A1810]"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* --- MENU ITEMS LIST --- */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-24 bg-[#FFFFFF] rounded-3xl border border-[#EAE0D5] p-8 space-y-4">
          <Coffee className="w-12 h-12 text-[#CAA662]/40 mx-auto" />
          <h3 className="font-sans text-2xl font-bold text-[#2A1810]">No midnight delicacies found</h3>
          <p className="text-sm text-[#2A1810]/60">
            Try adjusting your search query or switching category groups.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              onSelectCategory('All');
              setActiveGroup('all');
              setVegOnly(false);
            }}
            className="px-6 py-2.5 rounded-full bg-[#CAA662] text-[#2A1810] font-semibold text-xs"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="columns-1 md:columns-2 gap-12 sm:gap-16 space-y-12 sm:space-y-16">
          {CATEGORIES.map(category => {
            const itemsInCategory = filteredItems.filter(item => item.category === category.name);
            if (itemsInCategory.length === 0) return null;
            
            return (
              <motion.div 
                key={category.id} 
                className="break-inside-avoid"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex flex-col gap-3 border-b-2 border-[#2A1810]/80 pb-4 mb-6 items-center sm:items-start text-center sm:text-left">
                  {categoryImages[category.name] && (
                    <img 
                      src={categoryImages[category.name]} 
                      alt={category.name} 
                      loading="eager"
                      fetchPriority="high"
                      className="w-48 h-48 rounded-2xl object-cover mix-blend-multiply drop-shadow-md" 
                    />
                  )}
                  <div className="flex items-center gap-3">
                    <h2 className="font-cursive text-4xl sm:text-5xl font-bold text-[#2A1810] pt-2">
                      {category.name}
                    </h2>
                  </div>
                </div>
                <div className="flex flex-col space-y-4">
                  {itemsInCategory.map((item, index) => {
                    return (
                      <motion.div 
                        key={item.id} 
                        initial={{ opacity: 0, x: -15 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-10px" }}
                        transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
                        className="flex justify-between items-start group px-3 py-2.5 -mx-3 rounded-xl transition-all"
                      >
                        <div className="flex flex-col pr-4">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-cursive text-2xl sm:text-3xl font-medium text-[#2A1810] leading-none">
                              {item.name}
                            </span>
                            {item.isVeg ? (
                              <span className="w-2.5 h-2.5 rounded-sm border border-emerald-500 bg-emerald-500/40 inline-block mb-1" title="Vegetarian" />
                            ) : (
                              <span className="w-2.5 h-2.5 rounded-sm border border-rose-500 bg-rose-500/40 inline-block mb-1" title="Non-Vegetarian" />
                            )}
                            {item.isSpicy && (
                              <span className="text-[10px] bg-rose-100 text-rose-600 px-1.5 py-0.5 rounded uppercase tracking-wider mb-1">Spicy</span>
                            )}
                          </div>
                          {item.description && item.description !== item.name && (
                            <span className="text-xs sm:text-sm text-[#2A1810]/70 line-clamp-1 italic mt-1 font-serif">{item.description}</span>
                          )}
                        </div>
                        <span className="font-sans text-lg sm:text-xl text-[#2A1810] font-medium shrink-0 pt-1">
                          ₹{item.price}
                        </span>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            )
          })}
        </div>
      )}
    </div>
  );
};
