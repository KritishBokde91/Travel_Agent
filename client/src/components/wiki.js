async function getLocationImages(location) {
  try {
    // Step 1: Get page info and images
    const pageUrl = `https://en.wikipedia.org/api/rest_v1/page/media-list/${encodeURIComponent(location)}`;
    const response = await fetch(pageUrl);
    
    if (!response.ok) {
      throw new Error(`Location "${location}" not found on Wikipedia`);
    }
    
    const data = await response.json();
    const imageUrls = [];
    
    // Step 2: Process each image
    for (const item of data.items) {
      if (item.type === 'image' && imageUrls.length < 10) {
        try {
          // Get full image details
          const imageInfoUrl = `https://en.wikipedia.org/api/rest_v1/page/media/${encodeURIComponent(item.title)}`;
          const imageResponse = await fetch(imageInfoUrl);
          
          if (imageResponse.ok) {
            const imageInfo = await imageResponse.json();
            
            // Filter out unwanted images (logos, icons, etc.)
            const filename = item.title.toLowerCase();
            const skipPatterns = [
              'commons-logo', 'wikimedia', 'edit-icon', 'ambox',
              'question_book', 'folder', 'icon', 'symbol', 'logo',
              'flag', 'coat_of_arms', 'map_', 'diagram'
            ];
            
            const shouldSkip = skipPatterns.some(pattern => 
              filename.includes(pattern)
            );
            
            // Only add actual location photos
            if (!shouldSkip && imageInfo.original && imageInfo.original.source) {
              imageUrls.push(imageInfo.original.source);
            }
          }
        } catch (error) {
          // Skip failed images and continue
          continue;
        }
      }
      
      // Stop when we have 10 images
      if (imageUrls.length >= 10) break;
    }
    
    return imageUrls;
    
  } catch (error) {
    console.error(`Error fetching images for "${location}":`, error.message);
    return [];
  }
}

// Usage examples:
async function examples() {
  // Get 10 images of Paris
  const parisImages = await getLocationImages("Paris");
  console.log("Paris images:", parisImages);
  console.log(`Found ${parisImages.length} images`);
  
  // Get 10 images of Tokyo
  const tokyoImages = await getLocationImages("Tokyo");
  console.log("Tokyo images:", tokyoImages);
  console.log(`Found ${tokyoImages.length} images`);
  
  // Get 10 images of New York City
  const nycImages = await getLocationImages("New York City");
  console.log("NYC images:", nycImages);
  console.log(`Found ${nycImages.length} images`);
}

// Uncomment to test:
// examples();


export default getLocationImages