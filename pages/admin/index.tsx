import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useAuth } from '../../components/AuthProvider';
import { uploadOutfitImages } from '../../lib/storage';
import { createOutfit, getOutfits, deleteOutfit, updateOutfit, Outfit } from '../../lib/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../lib/firebase';
import styles from '../../styles/Admin.module.css';

const AdminDashboard = () => {
  const {user} = useAuth();
  const [outfits, setOutfits] = useState<Outfit[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [newOutfit, setNewOutfit] = useState({
    title: '',
    description: '',
    style: 'Streetwear',
    tags: '',
    isHot: false,
    isSponsored: false,
    isTrending: false
  });

  const [editingOutfit, setEditingOutfit] = useState<Outfit | null>(null);
  const [outfitImages, setOutfitImages] = useState<File[]>([]);

  const [items, setItems] = useState([{
    name: '',
    brand: '',
    category: 'tops',
    shopeeLink: '',
    tiktokLink: '',
    embedTiktokLink: '',
    image: null as File | null
  }]);

  useEffect(() => {
    loadOutfits();
  }, []);

  const loadOutfits = async () => {
    try {
      setLoading(true);
      const {outfits: loadedOutfits} = await getOutfits(50);
      setOutfits(loadedOutfits);
    } catch (error) {
      console.error('Error loading outfits:', error);
      alert('Error loading outfits');
    } finally {
      setLoading(false);
    }
  };

  const handleItemImageChange = (index: number, file: File | null) => {
    const updatedItems = [...items];
    updatedItems[index] = {...updatedItems[index], image: file};
    setItems(updatedItems);
  };

  const handleOutfitImagesChange = (files: File[]) => {
    setOutfitImages(files);
  };

  const handleEditOutfit = (outfit: Outfit) => {
    setEditingOutfit(outfit);
    setNewOutfit({
      title: outfit.title,
      description: outfit.description,
      style: outfit.style,
      tags: outfit.tags.join(', '),
      isHot: outfit.isHot || false,
      isSponsored: outfit.isSponsored || false,
      isTrending: outfit.isTrending || false
    });
    
    // Set items with existing data
    const outfitItems = outfit.items.map(item => ({
      name: item.name,
      brand: item.brand,
      category: item.category,
      shopeeLink: item.shopeeLink || '',
      tiktokLink: item.tiktokLink || '',
      embedTiktokLink: item.embedTiktokLink || '',
      image: null as File | null,
      existingImage: item.image // Keep reference to existing image
    }));
    setItems(outfitItems);
    setOutfitImages([]);
  };

  const cancelEdit = () => {
    setEditingOutfit(null);
    setNewOutfit({
      title: '',
      description: '',
      style: 'Streetwear',
      tags: '',
      isHot: false,
      isSponsored: false,
      isTrending: false
    });
    setItems([{
      name: '',
      brand: '',
      category: 'tops',
      shopeeLink: '',
      tiktokLink: '',
      embedTiktokLink: '',
      image: null as File | null
    }]);
    setOutfitImages([]);
  };

  const addItem = () => {
    setItems([...items, {
      name: '',
      brand: '',
      category: 'tops',
      shopeeLink: '',
      tiktokLink: '',
      embedTiktokLink: '',
      image: null as File | null
    }]);
  };

  const updateItem = (index: number, field: string, value: string) => {
    const updatedItems = [...items];
    updatedItems[index] = {...updatedItems[index], [field]: value};
    setItems(updatedItems);
  };

  const removeItem = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const createNewOutfit = async () => {
    if (!user) {
      alert('Please sign in to create outfits');
      return;
    }

    if (!newOutfit.title || !newOutfit.description) {
      alert('Please fill in title and description');
      return;
    }

    // For editing, allow items without new images if they have existing images
    const validItems = items.filter(item => 
      item.name && item.brand && (item.image || (item as any).existingImage)
    );
    if (validItems.length === 0) {
      alert('Please add at least one complete item with all required fields and an image');
      return;
    }

    // Check if all items have required fields
    const incompleteItems = items.some(item => 
      !item.name || !item.brand || (!item.image && !(item as any).existingImage)
    );
    if (incompleteItems) {
      alert('All items must have name, brand, and image filled in');
      return;
    }

    try {
      setUploading(true);

      // Use existing outfit ID for editing, or create new for creating
      const outfitId = editingOutfit?.id || Date.now().toString();

      // Upload new outfit images if provided
      let outfitImageUrls: string[] = [];
      if (outfitImages.length > 0) {
        outfitImageUrls = await Promise.all(
          outfitImages.map(async (image, index) => {
            const imagePath = `outfits/${outfitId}/outfit_${index}_${Date.now()}`;
            const imageRef = ref(storage, imagePath);
            const snapshot = await uploadBytes(imageRef, image);
            return await getDownloadURL(snapshot.ref);
          })
        );
      } else if (editingOutfit) {
        // Keep existing outfit images if no new ones provided
        outfitImageUrls = editingOutfit.images || [];
      }

      // Upload item images to Firebase Storage
      const itemsWithImages = await Promise.all(
        validItems.map(async (item, index) => {
          let imageUrl = (item as any).existingImage || '';
          
          if (item.image) {
            const imagePath = `outfits/${outfitId}/item_${index}_${Date.now()}`;
            const imageRef = ref(storage, imagePath);
            const snapshot = await uploadBytes(imageRef, item.image);
            imageUrl = await getDownloadURL(snapshot.ref);
          }
          
          return {
            id: editingOutfit ? editingOutfit.items[index]?.id || `${outfitId}-item-${index}` : `${outfitId}-item-${index}`,
            name: item.name,
            brand: item.brand,
            category: item.category,
            shopeeLink: item.shopeeLink,
            tiktokLink: item.tiktokLink,
            embedTiktokLink: item.embedTiktokLink,
            image: imageUrl
          };
        })
      );

      // Filter out null items
      const finalItems = itemsWithImages.filter(item => item !== null);

      // Create images array combining outfit images and item images
      const allImageUrls = [...outfitImageUrls, ...finalItems.map(item => item!.image)].filter(url => url);

      // Prepare outfit data
      const outfitData = {
        title: newOutfit.title,
        description: newOutfit.description,
        images: allImageUrls,
        items: finalItems,
        tags: newOutfit.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        style: newOutfit.style,
        createdAt: editingOutfit?.createdAt || new Date().toISOString(),
        createdBy: user.uid,
        isHot: newOutfit.isHot,
        isSponsored: newOutfit.isSponsored,
        isTrending: newOutfit.isTrending
      };

      // Save to Firestore
      if (editingOutfit) {
        await updateOutfit(editingOutfit.id!, outfitData);
      } else {
        await createOutfit(outfitData);
      }

      // Reset form
      cancelEdit();

      // Reload outfits
      await loadOutfits();
      alert(editingOutfit ? 'Outfit updated successfully!' : 'Outfit created successfully!');

    } catch (error) {
      console.error('Error creating outfit:', error);
      alert('Error creating outfit');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteOutfit = async (outfitId: string) => {
    if (window.confirm('Are you sure you want to delete this outfit?')) {
      try {
        await deleteOutfit(outfitId);
        await loadOutfits();
        alert('Outfit deleted successfully!');
      } catch (error) {
        console.error('Error deleting outfit:', error);
        alert('Error deleting outfit');
      }
    }
  };

  const getLabelEmoji = (outfit: Outfit) => {
    if (outfit.isHot) return '🔥';
    if (outfit.isSponsored) return '💰';
    if (outfit.isTrending) return '📈';
    return '';
  };

  if (!user) {
    return (
      <main className={styles.main}>
        <h1>Please sign in to access the admin panel</h1>
        <Link href="/auth/signin">
          <button className={styles.addButton}>Sign In</button>
        </Link>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <section className={styles.uploadSection}>
        <h2>{editingOutfit ? 'Edit Outfit' : 'Create New Outfit'}</h2>
        {editingOutfit && (
          <button
            onClick={cancelEdit}
            className={styles.cancelButton}
          >
            Cancel Edit
          </button>
        )}
        <div className={styles.form}>
          <input
            type="text"
            placeholder="Outfit Title"
            value={newOutfit.title}
            onChange={(e) => setNewOutfit({...newOutfit, title: e.target.value})}
            className={styles.input}
          />

          <textarea
            placeholder="Outfit Description"
            value={newOutfit.description}
            onChange={(e) => setNewOutfit({...newOutfit, description: e.target.value})}
            className={styles.input}
            rows={3}
          />

          <select
            value={newOutfit.style}
            onChange={(e) => setNewOutfit({...newOutfit, style: e.target.value})}
            className={styles.select}
          >
            <option value="Streetwear">Streetwear</option>
            <option value="Vintage">Vintage</option>
            <option value="Clean Girl">Clean Girl</option>
            <option value="Japan Style">Japan Style</option>
            <option value="Formal">Formal</option>
            <option value="Casual">Casual</option>
          </select>

          <input
            type="text"
            placeholder="Tags (comma separated)"
            value={newOutfit.tags}
            onChange={(e) => setNewOutfit({...newOutfit, tags: e.target.value})}
            className={styles.input}
          />

          <div className={styles.checkboxGroup}>
            <label>
              <input
                type="checkbox"
                checked={newOutfit.isHot}
                onChange={(e) => setNewOutfit({...newOutfit, isHot: e.target.checked})}
              />
              🔥 Hot
            </label>
            <label>
              <input
                type="checkbox"
                checked={newOutfit.isSponsored}
                onChange={(e) => setNewOutfit({...newOutfit, isSponsored: e.target.checked})}
              />
              💰 Sponsored
            </label>
            <label>
              <input
                type="checkbox"
                checked={newOutfit.isTrending}
                onChange={(e) => setNewOutfit({...newOutfit, isTrending: e.target.checked})}
              />
              📈 Trending
            </label>
          </div>

          <div className={styles.outfitImagesSection}>
            <h3>Outfit Images (Optional - for main gallery)</h3>
            <div className={styles.imageUpload}>
              <label htmlFor="outfit-images">Upload Outfit Images:</label>
              <input
                id="outfit-images"
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => {
                  const files = Array.from(e.target.files || []);
                  handleOutfitImagesChange(files);
                }}
                className={styles.input}
              />
              {outfitImages.length > 0 && (
                <div className={styles.imagePreview}>
                  {outfitImages.map((image, index) => (
                    <div key={index} className={styles.previewImage}>
                      <img 
                        src={URL.createObjectURL(image)} 
                        alt={`Preview ${index + 1}`}
                        className={styles.previewImg}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newImages = outfitImages.filter((_, i) => i !== index);
                          setOutfitImages(newImages);
                        }}
                        className={styles.removeImageBtn}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {editingOutfit && editingOutfit.images && editingOutfit.images.length > 0 && (
              <div className={styles.existingImages}>
                <h4>Current Outfit Images:</h4>
                <div className={styles.imagePreview}>
                  {editingOutfit.images.map((image, index) => (
                    <div key={index} className={styles.previewImage}>
                      <img 
                        src={image} 
                        alt={`Current ${index + 1}`}
                        className={styles.previewImg}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className={styles.itemsSection}>
            <h3>Outfit Items (Each item requires an image)</h3>
            {items.map((item, index) => (
              <div key={index} className={styles.itemForm}>
                <div className={styles.itemHeader}>
                  <h4>Item {index + 1}</h4>
                  {items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      className={styles.removeButton}
                    >
                      Remove
                    </button>
                  )}
                </div>
                
                <input
                  type="text"
                  placeholder="Item Name *"
                  value={item.name}
                  onChange={(e) => updateItem(index, 'name', e.target.value)}
                  className={styles.input}
                  required
                />
                <input
                  type="text"
                  placeholder="Brand *"
                  value={item.brand}
                  onChange={(e) => updateItem(index, 'brand', e.target.value)}
                  className={styles.input}
                  required
                />
                <select
                  value={item.category}
                  onChange={(e) => updateItem(index, 'category', e.target.value)}
                  className={styles.select}
                  required
                >
                  <option value="tops">Tops</option>
                  <option value="bottoms">Bottoms</option>
                  <option value="dresses">Dresses</option>
                  <option value="accessories">Accessories</option>
                </select>
                
                <div className={styles.imageUpload}>
                  <label htmlFor={`item-image-${index}`}>Item Image *:</label>
                  <input
                    id={`item-image-${index}`}
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      handleItemImageChange(index, file);
                    }}
                    className={styles.input}
                    required={!(item as any).existingImage}
                  />
                  {item.image && (
                    <div className={styles.newImagePreview}>
                      <p className={styles.imageSelected}>✓ New image selected: {item.image.name}</p>
                      <img 
                        src={URL.createObjectURL(item.image)} 
                        alt="New item preview"
                        className={styles.itemPreviewImg}
                      />
                    </div>
                  )}
                  {!item.image && (item as any).existingImage && (
                    <div className={styles.existingImagePreview}>
                      <p className={styles.imageSelected}>✓ Current image:</p>
                      <img 
                        src={(item as any).existingImage} 
                        alt="Current item"
                        className={styles.itemPreviewImg}
                      />
                    </div>
                  )}
                </div>
                
                <input
                  type="url"
                  placeholder="Shopee Link"
                  value={item.shopeeLink}
                  onChange={(e) => updateItem(index, 'shopeeLink', e.target.value)}
                  className={styles.input}
                />
                <input
                  type="url"
                  placeholder="TikTok Shop Link"
                  value={item.tiktokLink}
                  onChange={(e) => updateItem(index, 'tiktokLink', e.target.value)}
                  className={styles.input}
                />
                <input
                  type="url"
                  placeholder="TikTok Embed Link (for video display)"
                  value={item.embedTiktokLink}
                  onChange={(e) => updateItem(index, 'embedTiktokLink', e.target.value)}
                  className={styles.input}
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addItem}
              className={styles.addItemButton}
            >
              Add Another Item
            </button>
          </div>

          <button
            onClick={createNewOutfit}
            className={styles.addButton}
            disabled={uploading}
          >
            {uploading ? (editingOutfit ? 'Updating...' : 'Creating...') : (editingOutfit ? 'Update Outfit' : 'Create Outfit')}
          </button>
        </div>
      </section>

      <section className={styles.statsSection}>
        <h2>Outfit Management</h2>
        {loading ? (
          <p>Loading outfits...</p>
        ) : (
          <div className={styles.productGrid}>
            {outfits.map((outfit) => (
              <div key={outfit.id} className={styles.productCard}>
                <div className={styles.productHeader}>
                  <h3>{outfit.title}</h3>
                  <span className={styles.label}>
                      {getLabelEmoji(outfit)} {outfit.style}
                    </span>
                </div>
                <p className={styles.productInfo}>
                  {outfit.description}
                </p>
                <div className={styles.tags}>
                  {outfit.tags.map((tag, index) => (
                    <span key={index} className={styles.tag}>#{tag}</span>
                  ))}
                </div>
                <div className={styles.stats}>
                    <span className={styles.clicks}>
                      📸 {outfit.images.length} images
                    </span>
                  <span className={styles.clicks}>
                      👕 {outfit.items.length} items
                    </span>
                </div>
                <div className={styles.actions}>
                  <Link href={`/outfit/${outfit.id}`}>
                    <button className={styles.linkButton}>
                      View Outfit
                    </button>
                  </Link>
                  <button
                    onClick={() => handleEditOutfit(outfit)}
                    className={styles.editButton}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteOutfit(outfit.id!)}
                    className={styles.deleteButton}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default AdminDashboard;