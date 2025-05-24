const fetchListings = async () => {
  try {
    setLoading(true);
    const res = await fetch('http://localhost:5000/api/listings', {
      method: 'GET',
      credentials: 'include',
    });
    
    // First check if the response is OK
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Failed to fetch listings');
    }

    const data = await res.json();
    setListings(data.listings || []);
  } catch (err) {
    console.error('Failed to fetch listings:', err);
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

