import { useState, useEffect } from 'react';
import { Plus, Package, Edit, Trash2, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { MainLayout } from '../layouts/MainLayout';
import { itemService } from '../services';
import { AnimatedButton, EditListingModal, DeleteConfirmationModal, EmptyState, CardSkeleton, AnimatedCard, TrustBadge } from '../components';
import { animations } from '../utils/animations';

interface Item {
  id: string;
  title: string;
  category: string;
  condition: string;
  rental_price: number;
  is_available: boolean;
  created_at: string;
  images?: { image_url: string }[];
}

export const MyItemsPage = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [deletingItem, setDeletingItem] = useState<Item | null>(null);

  useEffect(() => {
    const fetchMyItems = async () => {
      try {
        const response = await itemService.getMyItems();
        if (response.success) {
          setItems(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyItems();
  }, []);

  const handleDelete = async (itemId: string) => {
    try {
      const response = await itemService.deleteItem(itemId);
      if (response.success) {
        setItems(items.filter(item => item.id !== itemId));
        toast.success('Item deleted successfully');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to delete item');
    }
    setDeletingItem(null);
  };

  const handleUpdate = async (itemId: string, updates: any) => {
    try {
      const response = await itemService.updateItem(itemId, updates);
      if (response.success) {
        setItems(items.map(item => item.id === itemId ? { ...item, ...updates } : item));
        toast.success('Item updated successfully');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update item');
    }
    setEditingItem(null);
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="max-w-6xl mx-auto p-6">
          <motion.div 
            className="mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="h-8 bg-gray-200 rounded w-48 mb-6"></div>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <CardSkeleton key={i} />
            ))}
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto p-6">
      <motion.div 
        className="flex justify-between items-center mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={animations.ease.spring}
      >
        <h1 className="text-3xl font-bold text-gray-900">My Items</h1>
        <Link to="/items/create">
          <AnimatedButton variant="gradient" glow icon={<Plus className="w-4 h-4" />}>
            Add Item
          </AnimatedButton>
        </Link>
      </motion.div>

      {items.length === 0 ? (
        <EmptyState
          icon={<Package className="w-16 h-16" />}
          title="No items yet"
          description="Start by listing your first item and build your campus sharing economy"
          action={
            <Link to="/items/create">
              <AnimatedButton variant="gradient" glow>
                List Your First Item
              </AnimatedButton>
            </Link>
          }
        />
      ) : (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={animations.staggerContainer}
          initial="initial"
          animate="animate"
        >
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              variants={animations.staggerItem}
              transition={{ delay: index * 0.1 }}
            >
              <AnimatedCard hover tilt>
                <div className="h-48 bg-gray-200 relative rounded-xl overflow-hidden">
                  {item.images?.[0] ? (
                    <img 
                      src={item.images[0].image_url} 
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <Package className="w-12 h-12 text-gray-400" />
                    </div>
                  )}
                  <div className="absolute top-2 right-2">
                    <TrustBadge 
                      type={item.is_available ? 'trusted' : 'trending'}
                      animated
                    />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{item.category}</p>
                  <p className="text-lg font-bold text-primary-600 mb-3">₹{item.rental_price}/day</p>
                  <div className="flex space-x-2">
                    <Link to={`/items/${item.id}`} className="flex-1">
                      <motion.button 
                        className="w-full px-3 py-1.5 text-sm bg-transparent text-gray-700 hover:bg-gray-100 rounded-xl transition-all duration-200 flex items-center justify-center space-x-1 border border-gray-200"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Eye className="w-4 h-4" />
                        <span>View</span>
                      </motion.button>
                    </Link>
                    <motion.button 
                      className="px-3 py-1.5 text-sm bg-transparent text-gray-700 hover:bg-gray-100 rounded-xl transition-all duration-200 flex items-center space-x-1 border border-gray-200"
                      onClick={() => setEditingItem(item)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Edit className="w-4 h-4" />
                      <span>Edit</span>
                    </motion.button>
                    <motion.button 
                      className="px-3 py-1.5 text-sm bg-transparent text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 border border-red-200"
                      onClick={() => setDeletingItem(item)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </AnimatedCard>
            </motion.div>
          ))}
        </motion.div>
      )}
      </div>

      {editingItem && (
        <EditListingModal
          isOpen={true}
          onClose={() => setEditingItem(null)}
          listing={editingItem}
          type="item"
          onUpdate={(updates) => handleUpdate(editingItem.id, updates)}
        />
      )}

      {deletingItem && (
        <DeleteConfirmationModal
          isOpen={true}
          onClose={() => setDeletingItem(null)}
          onConfirm={() => handleDelete(deletingItem.id)}
          title={`Delete ${deletingItem.title}`}
          message="Are you sure you want to delete this item? This action cannot be undone."
        />
      )}
    </MainLayout>
  );
};