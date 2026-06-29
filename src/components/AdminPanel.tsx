import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, doc, setDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, User, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { MenuItem, Review, CategoryGroup } from '../types';
import { MENU_ITEMS, REVIEWS as INITIAL_REVIEWS } from '../data/menu';
import { useFirebaseData, Photo } from '../hooks/useFirebaseData';

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

const CATEGORY_TO_GROUP: Record<string, CategoryGroup> = {
  'Coffee': 'beverages',
  'Shakes': 'beverages',
  'Mojito & Iced Tea': 'beverages',
  'Wraps': 'bites',
  'Sandwich': 'bites',
  'Burger': 'bites',
  'Toast Time': 'bites',
  'Sides & More': 'bites',
  'Momos': 'bites',
  'Noodles': 'mains',
  'Fried Rice': 'mains',
  'Pasta': 'mains',
  'Pizza': 'mains',
  'Chilli Items': 'mains',
  'Salad': 'mains',
  'Desserts': 'desserts'
};

export const AdminPanel: React.FC<{ onNavigateHome?: () => void }> = ({ onNavigateHome }) => {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passcode, setPasscode] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [activeTab, setActiveTab] = useState<'menu' | 'photos' | 'reviews'>('menu');
  const [status, setStatus] = useState<{ type: 'error' | 'success'; message: string } | null>(null);
  const [confirmingAction, setConfirmingAction] = useState<{ type: 'menu' | 'photos' | 'reviews' | 'delete'; id?: string; col?: string } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Form visibility
  const [showAddForm, setShowAddForm] = useState(false);

  // Menu Form fields
  const [menuName, setMenuName] = useState('');
  const [menuCategory, setMenuCategory] = useState('Coffee');
  const [menuGroup, setMenuGroup] = useState<CategoryGroup>('beverages');
  const [menuPrice, setMenuPrice] = useState<number>(150);
  const [menuDescription, setMenuDescription] = useState('');
  const [menuImage, setMenuImage] = useState('');
  const [isBestseller, setIsBestseller] = useState(false);
  const [isChefOriginal, setIsChefOriginal] = useState(false);
  const [isSpicy, setIsSpicy] = useState(false);
  const [isVeg, setIsVeg] = useState(true);

  // Photo Form fields
  const [photoUrl, setPhotoUrl] = useState('');
  const [photoAlt, setPhotoAlt] = useState('');

  // Review Form fields
  const [reviewAuthor, setReviewAuthor] = useState('');
  const [reviewRole, setReviewRole] = useState('Customer');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewAvatar, setReviewAvatar] = useState('');
  
  const { menuItems, photos, reviews } = useFirebaseData();
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  // Update group automatically when category is selected
  const handleCategoryChange = (cat: string) => {
    setMenuCategory(cat);
    const grp = CATEGORY_TO_GROUP[cat] || 'beverages';
    setMenuGroup(grp);
  };

  const handleAddMenuItem = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    try {
      const newId = 'menu_' + Date.now().toString();
      const newItem: MenuItem = {
        id: newId,
        name: menuName,
        category: menuCategory,
        group: menuGroup,
        price: Number(menuPrice),
        description: menuDescription,
        image: menuImage || 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=600',
        isBestseller,
        isChefOriginal,
        isSpicy,
        isVeg
      };
      await setDoc(doc(db, 'menuItems', newId), newItem);
      setStatus({ type: 'success', message: `Menu item "${menuName}" added successfully!` });
      
      // Reset fields
      setMenuName('');
      setMenuDescription('');
      setMenuImage('');
      setIsBestseller(false);
      setIsChefOriginal(false);
      setIsSpicy(false);
      setIsVeg(true);
      setShowAddForm(false);
    } catch (err: any) {
      setStatus({ type: 'error', message: err.message || 'Failed to add menu item.' });
    }
  };

  const handleAddPhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    try {
      const newId = 'photo_' + Date.now().toString();
      const newPhoto: Photo = {
        id: newId,
        url: photoUrl || 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=600',
        alt: photoAlt
      };
      await setDoc(doc(db, 'photos', newId), newPhoto);
      setStatus({ type: 'success', message: 'Photo added successfully!' });
      
      // Reset fields
      setPhotoUrl('');
      setPhotoAlt('');
      setShowAddForm(false);
    } catch (err: any) {
      setStatus({ type: 'error', message: err.message || 'Failed to add photo.' });
    }
  };

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    try {
      const newId = 'review_' + Date.now().toString();
      const newReview: Review = {
        id: newId,
        author: reviewAuthor,
        role: reviewRole || 'Verified Customer',
        comment: reviewComment,
        rating: Number(reviewRating),
        avatar: reviewAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150',
        date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
      };
      await setDoc(doc(db, 'reviews', newId), newReview);
      setStatus({ type: 'success', message: 'Review added successfully!' });
      
      // Reset fields
      setReviewAuthor('');
      setReviewRole('Customer');
      setReviewComment('');
      setReviewRating(5);
      setReviewAvatar('');
      setShowAddForm(false);
    } catch (err: any) {
      setStatus({ type: 'error', message: err.message || 'Failed to add review.' });
    }
  };
  
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    try {
      if (isRegistering) {
        const correctPasscode = import.meta.env.VITE_ADMIN_PASSCODE || "THE_MIDNIGHT_BREW_ADMIN_2026";
        if (passcode !== correctPasscode) {
          setStatus({ type: 'error', message: 'Invalid Admin Registration Passcode. Registration denied.' });
          return;
        }
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, 'admins', userCredential.user.uid), {
          email: userCredential.user.email
        });
        setStatus({ type: 'success', message: 'Admin account created successfully! You are now logged in.' });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        setStatus({ type: 'success', message: 'Logged in successfully!' });
      }
    } catch (err: any) {
      setStatus({ type: 'error', message: err.message || 'An error occurred during authentication.' });
    }
  };

  const handleGoogleSignIn = async () => {
    setStatus(null);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      // Check if user is already registered as an admin
      const adminRef = doc(db, 'admins', result.user.uid);
      const adminSnap = await getDoc(adminRef);
      
      if (adminSnap.exists()) {
        setStatus({ type: 'success', message: 'Logged in successfully with Google!' });
      } else {
        // New registration with Google - require passcode!
        const correctPasscode = import.meta.env.VITE_ADMIN_PASSCODE || "THE_MIDNIGHT_BREW_ADMIN_2026";
        if (passcode !== correctPasscode) {
          await signOut(auth);
          setStatus({ 
            type: 'error', 
            message: 'Your Google account is not registered. To register, please switch to "Register" mode, enter the correct Master Passcode, and sign in with Google again.' 
          });
          return;
        }
        
        await setDoc(adminRef, {
          email: result.user.email
        });
        setStatus({ type: 'success', message: 'Logged in and registered as admin with Google successfully!' });
      }
    } catch (err: any) {
      setStatus({ type: 'error', message: err.message || 'Google Sign-In failed.' });
    }
  };
  
  const handleLogout = () => {
    signOut(auth);
    setStatus(null);
  };
  
  const seedMenu = async () => {
    setIsProcessing(true);
    try {
      for (const item of MENU_ITEMS) {
        await setDoc(doc(db, 'menuItems', item.id), item);
        await deleteDoc(doc(db, 'deletions', item.id));
      }
      setStatus({ type: 'success', message: 'Menu seeded successfully!' });
    } catch (err: any) {
      setStatus({ type: 'error', message: err.message });
    } finally {
      setIsProcessing(false);
      setConfirmingAction(null);
    }
  };

  const seedPhotos = async () => {
    setIsProcessing(true);
    try {
      for (const photo of INITIAL_GALLERY) {
        await setDoc(doc(db, 'photos', photo.id), photo);
        await deleteDoc(doc(db, 'deletions', photo.id));
      }
      setStatus({ type: 'success', message: 'Photos seeded successfully!' });
    } catch (err: any) {
      setStatus({ type: 'error', message: err.message });
    } finally {
      setIsProcessing(false);
      setConfirmingAction(null);
    }
  };

  const seedReviews = async () => {
    setIsProcessing(true);
    try {
      for (const rev of INITIAL_REVIEWS) {
        await setDoc(doc(db, 'reviews', rev.id), rev);
        await deleteDoc(doc(db, 'deletions', rev.id));
      }
      setStatus({ type: 'success', message: 'Reviews seeded successfully!' });
    } catch (err: any) {
      setStatus({ type: 'error', message: err.message });
    } finally {
      setIsProcessing(false);
      setConfirmingAction(null);
    }
  };

  const deleteItem = async (col: string, id: string) => {
    setIsProcessing(true);
    try {
      await deleteDoc(doc(db, col, id));
      await setDoc(doc(db, 'deletions', id), {
        col,
        id,
        deletedAt: new Date().toISOString()
      });
      setStatus({ type: 'success', message: 'Item deleted successfully!' });
    } catch (err: any) {
      setStatus({ type: 'error', message: err.message });
    } finally {
      setIsProcessing(false);
      setConfirmingAction(null);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[#FAF6F0] flex flex-col items-center justify-center p-4 py-20 relative">
        {onNavigateHome && (
          <button
            onClick={onNavigateHome}
            className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-[#EAE0D5] text-sm font-semibold text-[#2A1810]/80 hover:text-[#CAA662] hover:border-[#CAA662] transition-colors shadow-sm cursor-pointer z-10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </button>
        )}
        <div className="bg-white p-8 rounded-3xl shadow-xl max-w-sm w-full border border-[#EAE0D5]">
          <h2 className="text-2xl font-bold text-[#2A1810] mb-6 text-center">
            {isRegistering ? 'Create Admin Account' : 'Admin Login'}
          </h2>
          
          {status && (
            <div className={`mb-4 p-3 rounded-xl text-xs font-semibold ${status.type === 'error' ? 'bg-red-50 text-red-600 border border-red-150' : 'bg-green-50 text-green-600 border border-green-150'}`}>
              {status.message}
            </div>
          )}

          <form onSubmit={handleAuth} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-[#FAF6F0] border border-[#EAE0D5] rounded-xl px-4 py-3 text-sm focus:border-[#CAA662] focus:outline-none"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-[#FAF6F0] border border-[#EAE0D5] rounded-xl px-4 py-3 text-sm focus:border-[#CAA662] focus:outline-none"
              required
            />
            {isRegistering && (
              <input
                type="password"
                placeholder="Master Registration Passcode"
                value={passcode}
                onChange={e => setPasscode(e.target.value)}
                className="w-full bg-[#FAF6F0] border border-[#EAE0D5] rounded-xl px-4 py-3 text-sm focus:border-[#CAA662] focus:outline-none border-2 border-[#CAA662]/30"
                required
              />
            )}
            <button
              type="submit"
              className="w-full py-3 rounded-full bg-[#CAA662] text-[#2A1810] font-bold shadow-lg hover:bg-[#B89550] transition-all"
            >
              {isRegistering ? 'Register' : 'Login'}
            </button>
          </form>

          <div className="relative my-5 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#EAE0D5]"></div>
            </div>
            <span className="relative bg-white px-3 text-xs text-gray-400 font-medium">OR (RECOMMENDED)</span>
          </div>

          <button
            onClick={handleGoogleSignIn}
            className="w-full py-3 rounded-full bg-white border border-[#EAE0D5] text-gray-700 font-bold shadow hover:bg-gray-50 transition-all flex items-center justify-center gap-2 hover:border-[#CAA662]"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            Sign in with Google
          </button>

          <p className="mt-4 text-center text-[11px] text-gray-500 leading-normal">
            If you see <code className="text-red-500">auth/operation-not-allowed</code> error, please use the <strong>Sign in with Google</strong> button above. It is fully pre-configured and enabled by default!
          </p>
          <div className="mt-4 text-center">
            <button
              onClick={() => {
                setIsRegistering(!isRegistering);
                setStatus(null);
              }}
              className="text-xs text-[#CAA662] hover:underline font-semibold"
            >
              {isRegistering ? 'Already have an account? Login' : "Don't have an admin account? Register"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF6F0] p-4 sm:p-8 pt-12 sm:pt-20 pb-20">
      {/* Inline Confirmation Modal */}
      {confirmingAction && (
        <div className="fixed inset-0 bg-[#2A1810]/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-3xl max-w-sm w-full border border-[#EAE0D5] text-center shadow-2xl animate-fade-in">
            <h3 className="text-lg font-bold text-[#2A1810] mb-2">Are you sure?</h3>
            <p className="text-sm text-gray-500 mb-6">
              {confirmingAction.type === 'delete' 
                ? 'Do you really want to delete this item? This action cannot be undone.' 
                : `Do you want to seed default ${confirmingAction.type} items to Firebase?`}
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setConfirmingAction(null)}
                className="px-4 py-2 border border-[#EAE0D5] rounded-full text-sm font-semibold hover:bg-gray-50 cursor-pointer"
                disabled={isProcessing}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (confirmingAction.type === 'menu') seedMenu();
                  else if (confirmingAction.type === 'photos') seedPhotos();
                  else if (confirmingAction.type === 'reviews') seedReviews();
                  else if (confirmingAction.type === 'delete' && confirmingAction.col && confirmingAction.id) {
                    deleteItem(confirmingAction.col, confirmingAction.id);
                  }
                }}
                disabled={isProcessing}
                className="px-5 py-2 bg-[#CAA662] text-[#2A1810] rounded-full text-sm font-bold hover:bg-[#B89550] shadow-md flex items-center justify-center gap-2 cursor-pointer min-w-[100px]"
              >
                {isProcessing ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-[#2A1810]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Deleting...</span>
                  </>
                ) : 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-6 rounded-3xl shadow-sm border border-[#EAE0D5]">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            {onNavigateHome && (
              <button 
                onClick={onNavigateHome}
                className="p-2.5 bg-[#FAF6F0] hover:bg-[#EAE0D5]/50 border border-[#EAE0D5] rounded-full text-[#2A1810] transition-colors flex items-center justify-center shrink-0 cursor-pointer"
                title="Back to Home"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
            )}
            <div>
              <h1 className="text-2xl font-bold text-[#2A1810]">Admin Dashboard</h1>
              <p className="text-sm text-[#2A1810]/60 font-medium">Logged in as {user.email}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="w-full sm:w-auto px-5 py-2.5 border border-[#EAE0D5] rounded-full text-sm font-semibold hover:bg-[#FAF6F0] transition-colors shrink-0">
            Logout
          </button>
        </div>

        {status && (
          <div className={`p-4 rounded-2xl text-sm font-semibold flex justify-between items-center ${status.type === 'error' ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-green-50 text-green-600 border border-green-100'}`}>
            <span>{status.message}</span>
            <button onClick={() => setStatus(null)} className="text-xs underline hover:no-underline font-medium">Dismiss</button>
          </div>
        )}
        
        <div className="flex gap-4 border-b border-[#EAE0D5]">
          <button onClick={() => { setActiveTab('menu'); setStatus(null); setShowAddForm(false); }} className={`pb-3 px-4 font-semibold cursor-pointer ${activeTab === 'menu' ? 'text-[#CAA662] border-b-2 border-[#CAA662]' : 'text-gray-400'}`}>Menu</button>
          <button onClick={() => { setActiveTab('photos'); setStatus(null); setShowAddForm(false); }} className={`pb-3 px-4 font-semibold cursor-pointer ${activeTab === 'photos' ? 'text-[#CAA662] border-b-2 border-[#CAA662]' : 'text-gray-400'}`}>Photos</button>
          <button onClick={() => { setActiveTab('reviews'); setStatus(null); setShowAddForm(false); }} className={`pb-3 px-4 font-semibold cursor-pointer ${activeTab === 'reviews' ? 'text-[#CAA662] border-b-2 border-[#CAA662]' : 'text-gray-400'}`}>Reviews</button>
        </div>
        
        {activeTab === 'menu' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center flex-wrap gap-4">
              <h2 className="text-xl font-bold text-[#2A1810]">Menu Management</h2>
              <div className="flex gap-2">
                <button 
                  onClick={() => setShowAddForm(!showAddForm)} 
                  className="px-4 py-2 bg-[#CAA662] text-[#2A1810] rounded-full text-sm font-bold shadow hover:bg-[#B89550] transition-colors cursor-pointer"
                >
                  {showAddForm ? 'Cancel' : 'Add Menu Item'}
                </button>
                <button onClick={() => setConfirmingAction({ type: 'menu' })} className="px-4 py-2 bg-[#2A1810] text-[#CAA662] rounded-full text-sm font-bold shadow-lg hover:bg-[#3d271e] transition-colors cursor-pointer">
                  Seed Default Menu
                </button>
              </div>
            </div>

            {showAddForm && (
              <form onSubmit={handleAddMenuItem} className="bg-white p-6 rounded-3xl border border-[#EAE0D5] space-y-4 shadow-sm animate-fade-in">
                <h3 className="text-lg font-bold text-[#2A1810]">Create Custom Menu Item</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">Item Name *</label>
                    <input 
                      type="text" 
                      placeholder="e.g., Irish Coffee" 
                      value={menuName} 
                      onChange={e => setMenuName(e.target.value)} 
                      className="w-full bg-[#FAF6F0] border border-[#EAE0D5] rounded-xl px-4 py-3 text-sm focus:border-[#CAA662] focus:outline-none" 
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">Price (₹) *</label>
                    <input 
                      type="number" 
                      placeholder="180" 
                      value={menuPrice} 
                      onChange={e => setMenuPrice(Number(e.target.value))} 
                      className="w-full bg-[#FAF6F0] border border-[#EAE0D5] rounded-xl px-4 py-3 text-sm focus:border-[#CAA662] focus:outline-none" 
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">Category *</label>
                    <select 
                      value={menuCategory} 
                      onChange={e => handleCategoryChange(e.target.value)} 
                      className="w-full bg-[#FAF6F0] border border-[#EAE0D5] rounded-xl px-4 py-3 text-sm focus:border-[#CAA662] focus:outline-none cursor-pointer"
                    >
                      <option value="Coffee">Coffee</option>
                      <option value="Shakes">Shakes</option>
                      <option value="Mojito & Iced Tea">Mojito & Iced Tea</option>
                      <option value="Wraps">Wraps</option>
                      <option value="Sandwich">Sandwich</option>
                      <option value="Burger">Burger</option>
                      <option value="Toast Time">Toast Time</option>
                      <option value="Sides & More">Sides & More</option>
                      <option value="Momos">Momos</option>
                      <option value="Noodles">Noodles</option>
                      <option value="Fried Rice">Fried Rice</option>
                      <option value="Pasta">Pasta</option>
                      <option value="Pizza">Pizza</option>
                      <option value="Chilli Items">Chilli Items</option>
                      <option value="Salad">Salad</option>
                      <option value="Desserts">Desserts</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">Category Group (Auto-assigned)</label>
                    <input 
                      type="text" 
                      value={menuGroup.toUpperCase()} 
                      className="w-full bg-gray-100 border border-[#EAE0D5] rounded-xl px-4 py-3 text-sm focus:outline-none font-semibold text-[#2A1810]/70 cursor-not-allowed" 
                      disabled 
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-gray-500 mb-1">Image URL (Optional)</label>
                    <input 
                      type="url" 
                      placeholder="e.g., https://images.unsplash.com/..." 
                      value={menuImage} 
                      onChange={e => setMenuImage(e.target.value)} 
                      className="w-full bg-[#FAF6F0] border border-[#EAE0D5] rounded-xl px-4 py-3 text-sm focus:border-[#CAA662] focus:outline-none" 
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-gray-500 mb-1">Description *</label>
                    <textarea 
                      placeholder="Enter description of the dish..." 
                      value={menuDescription} 
                      onChange={e => setMenuDescription(e.target.value)} 
                      className="w-full bg-[#FAF6F0] border border-[#EAE0D5] rounded-xl px-4 py-3 text-sm focus:border-[#CAA662] focus:outline-none h-24 resize-none" 
                      required 
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-6 py-2">
                  <label className="flex items-center gap-2 text-sm text-[#2A1810]/80 font-medium cursor-pointer">
                    <input type="checkbox" checked={isVeg} onChange={e => setIsVeg(e.target.checked)} className="rounded text-[#CAA662] focus:ring-[#CAA662] w-4 h-4 cursor-pointer" />
                    <span>Vegetarian</span>
                  </label>
                  <label className="flex items-center gap-2 text-sm text-[#2A1810]/80 font-medium cursor-pointer">
                    <input type="checkbox" checked={isBestseller} onChange={e => setIsBestseller(e.target.checked)} className="rounded text-[#CAA662] focus:ring-[#CAA662] w-4 h-4 cursor-pointer" />
                    <span>Bestseller</span>
                  </label>
                  <label className="flex items-center gap-2 text-sm text-[#2A1810]/80 font-medium cursor-pointer">
                    <input type="checkbox" checked={isChefOriginal} onChange={e => setIsChefOriginal(e.target.checked)} className="rounded text-[#CAA662] focus:ring-[#CAA662] w-4 h-4 cursor-pointer" />
                    <span>Chef Original</span>
                  </label>
                  <label className="flex items-center gap-2 text-sm text-[#2A1810]/80 font-medium cursor-pointer">
                    <input type="checkbox" checked={isSpicy} onChange={e => setIsSpicy(e.target.checked)} className="rounded text-[#CAA662] focus:ring-[#CAA662] w-4 h-4 cursor-pointer" />
                    <span>Spicy</span>
                  </label>
                </div>

                <div className="flex justify-end">
                  <button type="submit" className="px-6 py-3 bg-[#2A1810] text-[#CAA662] font-bold rounded-full text-sm shadow hover:bg-[#3d271e] transition-colors cursor-pointer">
                    Save Menu Item
                  </button>
                </div>
              </form>
            )}
            
            <div className="bg-white rounded-3xl shadow-sm border border-[#EAE0D5] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-[#FAF6F0] border-b border-[#EAE0D5]">
                    <tr>
                      <th className="p-4 font-semibold text-[#2A1810]">Name</th>
                      <th className="p-4 font-semibold text-[#2A1810]">Category</th>
                      <th className="p-4 font-semibold text-[#2A1810]">Price</th>
                      <th className="p-4 font-semibold text-[#2A1810]">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {menuItems.map(item => (
                      <tr key={item.id} className="border-b border-[#EAE0D5]/50 hover:bg-[#FAF6F0]/50">
                        <td className="p-4 font-medium">{item.name}</td>
                        <td className="p-4">{item.category}</td>
                        <td className="p-4 font-semibold">₹{item.price}</td>
                        <td className="p-4">
                          <button onClick={() => setConfirmingAction({ type: 'delete', col: 'menuItems', id: item.id })} className="text-red-500 hover:underline font-semibold cursor-pointer">Delete</button>
                        </td>
                      </tr>
                    ))}
                    {menuItems.length === 0 && (
                      <tr>
                        <td colSpan={4} className="p-8 text-center text-gray-400">No menu items found. Click Seed to load defaults.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'photos' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center flex-wrap gap-4">
              <h2 className="text-xl font-bold text-[#2A1810]">Photo Management</h2>
              <div className="flex gap-2">
                <button 
                  onClick={() => setShowAddForm(!showAddForm)} 
                  className="px-4 py-2 bg-[#CAA662] text-[#2A1810] rounded-full text-sm font-bold shadow hover:bg-[#B89550] transition-colors cursor-pointer"
                >
                  {showAddForm ? 'Cancel' : 'Add Photo'}
                </button>
                <button onClick={() => setConfirmingAction({ type: 'photos' })} className="px-4 py-2 bg-[#2A1810] text-[#CAA662] rounded-full text-sm font-bold shadow-lg hover:bg-[#3d271e] transition-colors cursor-pointer">
                  Seed Default Photos
                </button>
              </div>
            </div>

            {showAddForm && (
              <form onSubmit={handleAddPhoto} className="bg-white p-6 rounded-3xl border border-[#EAE0D5] space-y-4 shadow-sm animate-fade-in">
                <h3 className="text-lg font-bold text-[#2A1810]">Add Custom Gallery Photo</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">Image URL *</label>
                    <input 
                      type="url" 
                      placeholder="e.g., https://images.unsplash.com/..." 
                      value={photoUrl} 
                      onChange={e => setPhotoUrl(e.target.value)} 
                      className="w-full bg-[#FAF6F0] border border-[#EAE0D5] rounded-xl px-4 py-3 text-sm focus:border-[#CAA662] focus:outline-none" 
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">Alt Text (Description) *</label>
                    <input 
                      type="text" 
                      placeholder="e.g., Cozy fireplace table setup" 
                      value={photoAlt} 
                      onChange={e => setPhotoAlt(e.target.value)} 
                      className="w-full bg-[#FAF6F0] border border-[#EAE0D5] rounded-xl px-4 py-3 text-sm focus:border-[#CAA662] focus:outline-none" 
                      required 
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button type="submit" className="px-6 py-3 bg-[#2A1810] text-[#CAA662] font-bold rounded-full text-sm shadow hover:bg-[#3d271e] transition-colors cursor-pointer">
                    Save Photo
                  </button>
                </div>
              </form>
            )}
            
            <div className="bg-white rounded-3xl shadow-sm border border-[#EAE0D5] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-[#FAF6F0] border-b border-[#EAE0D5]">
                    <tr>
                      <th className="p-4 font-semibold text-[#2A1810]">Preview</th>
                      <th className="p-4 font-semibold text-[#2A1810]">Alt Text</th>
                      <th className="p-4 font-semibold text-[#2A1810]">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {photos.map(item => (
                      <tr key={item.id} className="border-b border-[#EAE0D5]/50 hover:bg-[#FAF6F0]/50">
                        <td className="p-4"><img src={item.url} alt={item.alt} className="w-16 h-16 object-cover rounded-xl" /></td>
                        <td className="p-4">{item.alt}</td>
                        <td className="p-4">
                          <button onClick={() => setConfirmingAction({ type: 'delete', col: 'photos', id: item.id })} className="text-red-500 hover:underline font-semibold cursor-pointer">Delete</button>
                        </td>
                      </tr>
                    ))}
                    {photos.length === 0 && (
                      <tr>
                        <td colSpan={3} className="p-8 text-center text-gray-400">No photos found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'reviews' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center flex-wrap gap-4">
              <h2 className="text-xl font-bold text-[#2A1810]">Review Management</h2>
              <div className="flex gap-2">
                <button 
                  onClick={() => setShowAddForm(!showAddForm)} 
                  className="px-4 py-2 bg-[#CAA662] text-[#2A1810] rounded-full text-sm font-bold shadow hover:bg-[#B89550] transition-colors cursor-pointer"
                >
                  {showAddForm ? 'Cancel' : 'Add Review'}
                </button>
                <button onClick={() => setConfirmingAction({ type: 'reviews' })} className="px-4 py-2 bg-[#2A1810] text-[#CAA662] rounded-full text-sm font-bold shadow-lg hover:bg-[#3d271e] transition-colors cursor-pointer">
                  Seed Default Reviews
                </button>
              </div>
            </div>

            {showAddForm && (
              <form onSubmit={handleAddReview} className="bg-white p-6 rounded-3xl border border-[#EAE0D5] space-y-4 shadow-sm animate-fade-in">
                <h3 className="text-lg font-bold text-[#2A1810]">Write Custom Review</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">Author Name *</label>
                    <input 
                      type="text" 
                      placeholder="e.g., Aarav Sharma" 
                      value={reviewAuthor} 
                      onChange={e => setReviewAuthor(e.target.value)} 
                      className="w-full bg-[#FAF6F0] border border-[#EAE0D5] rounded-xl px-4 py-3 text-sm focus:border-[#CAA662] focus:outline-none" 
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">Role / Subtitle</label>
                    <input 
                      type="text" 
                      placeholder="e.g., Local Guide" 
                      value={reviewRole} 
                      onChange={e => setReviewRole(e.target.value)} 
                      className="w-full bg-[#FAF6F0] border border-[#EAE0D5] rounded-xl px-4 py-3 text-sm focus:border-[#CAA662] focus:outline-none" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">Rating (1-5) *</label>
                    <select 
                      value={reviewRating} 
                      onChange={e => setReviewRating(Number(e.target.value))} 
                      className="w-full bg-[#FAF6F0] border border-[#EAE0D5] rounded-xl px-4 py-3 text-sm focus:border-[#CAA662] focus:outline-none cursor-pointer"
                    >
                      <option value="5">5 Stars</option>
                      <option value="4">4 Stars</option>
                      <option value="3">3 Stars</option>
                      <option value="2">2 Stars</option>
                      <option value="1">1 Star</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">Avatar Image URL (Optional)</label>
                    <input 
                      type="url" 
                      placeholder="e.g., https://images.unsplash.com/..." 
                      value={reviewAvatar} 
                      onChange={e => setReviewAvatar(e.target.value)} 
                      className="w-full bg-[#FAF6F0] border border-[#EAE0D5] rounded-xl px-4 py-3 text-sm focus:border-[#CAA662] focus:outline-none" 
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-gray-500 mb-1">Comment *</label>
                    <textarea 
                      placeholder="Write your feedback..." 
                      value={reviewComment} 
                      onChange={e => setReviewComment(e.target.value)} 
                      className="w-full bg-[#FAF6F0] border border-[#EAE0D5] rounded-xl px-4 py-3 text-sm focus:border-[#CAA662] focus:outline-none h-24 resize-none" 
                      required 
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button type="submit" className="px-6 py-3 bg-[#2A1810] text-[#CAA662] font-bold rounded-full text-sm shadow hover:bg-[#3d271e] transition-colors cursor-pointer">
                    Save Review
                  </button>
                </div>
              </form>
            )}
            
            <div className="bg-white rounded-3xl shadow-sm border border-[#EAE0D5] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-[#FAF6F0] border-b border-[#EAE0D5]">
                    <tr>
                      <th className="p-4 font-semibold text-[#2A1810]">Author</th>
                      <th className="p-4 font-semibold text-[#2A1810]">Rating</th>
                      <th className="p-4 font-semibold text-[#2A1810]">Comment</th>
                      <th className="p-4 font-semibold text-[#2A1810]">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reviews.map(item => (
                      <tr key={item.id} className="border-b border-[#EAE0D5]/50 hover:bg-[#FAF6F0]/50">
                        <td className="p-4 font-medium">{item.author}</td>
                        <td className="p-4">{item.rating}/5</td>
                        <td className="p-4 max-w-xs truncate">{item.comment}</td>
                        <td className="p-4">
                          <button onClick={() => setConfirmingAction({ type: 'delete', col: 'reviews', id: item.id })} className="text-red-500 hover:underline font-semibold cursor-pointer">Delete</button>
                        </td>
                      </tr>
                    ))}
                    {reviews.length === 0 && (
                      <tr>
                        <td colSpan={4} className="p-8 text-center text-gray-400">No reviews found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
